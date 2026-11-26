"use client";

import { useEffect, useMemo, useState } from "react";
import { num } from "@/lib/formato";
import type { Curso, CursoIndice, NotasEstudiante } from "@/lib/tipos";
import Resultado from "./Resultado";

const porcentajeAsistencia = (e: NotasEstudiante) => {
  const reg = (e.asistencia ?? []).filter((x) => x !== null);
  return reg.length ? (reg.filter((x) => x === "P" || x === "R").length / reg.length) * 100 : null;
};

export default function Consulta() {
  const [cursos, setCursos] = useState<CursoIndice[]>([]);
  const [curso, setCurso] = useState<Curso | null>(null);
  const [filtro, setFiltro] = useState("");
  const [codigo, setCodigo] = useState<string | null>(null);
  const [error, setError] = useState("");

  async function cargarCurso(c: CursoIndice) {
    setCurso(null);
    const r = await fetch(`/${c.archivo.replace(/^\/+/, "")}`, { cache: "no-store" });
    setCurso(await r.json());
  }

  useEffect(() => {
    fetch("/data/cursos.json", { cache: "no-store" })
      .then((r) => r.json())
      .then((lista: CursoIndice[]) => {
        setCursos(lista);
        if (lista.length) return cargarCurso(lista[0]);
      })
      .catch(() => setError("No se pudieron cargar los datos del curso."));
  }, []);

  // El código seleccionado vive en la URL (#codigo) para que funcione el botón Atrás.
  useEffect(() => {
    const leer = () => setCodigo(decodeURIComponent(location.hash.slice(1)) || null);
    leer();
    window.addEventListener("hashchange", leer);
    return () => window.removeEventListener("hashchange", leer);
  }, []);

  const lista = useMemo(() => {
    const todos = curso?.estudiantes ?? [];
    const f = filtro.replace(/\s/g, "");
    return f ? todos.filter((e) => e.codigo.includes(f)) : todos;
  }, [curso, filtro]);

  const seleccionado = curso?.estudiantes?.find((e) => e.codigo === codigo) ?? null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [seleccionado]);

  return (
    <>
      <main className="ancho contenido">
        {error && <div className="tarjeta mensaje">{error}</div>}
        {curso && seleccionado ? (
          <Resultado curso={curso} notas={seleccionado} onSalir={() => { location.hash = ""; }} />
        ) : curso ? (
          <section className="tarjeta">
            <div className="encabezado">
              <div>
                <h2 className="titulo-seccion">{curso.curso} · Grupo {curso.grupo} · {curso.periodo}</h2>
                <div className="sub">{curso.estudiantes?.length ?? 0} estudiantes · Haz clic en tu código para ver el detalle</div>
              </div>
              {cursos.length > 1 && (
                <select className="selector" aria-label="Curso" onChange={(e) => cargarCurso(cursos[+e.target.value])}>
                  {cursos.map((c, i) => <option key={c.id} value={i}>{c.titulo}</option>)}
                </select>
              )}
            </div>
            <input className="buscador" inputMode="numeric" placeholder="Buscar código…" value={filtro}
              onChange={(e) => setFiltro(e.target.value)} aria-label="Buscar código" />
            <div className="desplazable">
              <table className="listado">
                <thead>
                  <tr>
                    <th>Código</th>
                    <th className="num">Nota definitiva</th>
                    <th className="num">Estado</th>
                    <th className="num">Asistencia</th>
                  </tr>
                </thead>
                <tbody>
                  {lista.map((e) => {
                    const ok = e.definitiva >= curso.nota_minima;
                    const pa = porcentajeAsistencia(e);
                    return (
                      <tr key={e.codigo} onClick={() => { location.hash = e.codigo; }}>
                        <td><a href={`#${e.codigo}`} className="codigo">{e.codigo}</a></td>
                        <td className="num"><b>{e.definitiva}</b> <span className="tenue">/ {curso.max_total}</span></td>
                        <td className="num"><span className={`pildora ${ok ? "ok" : "mal"}`}>{ok ? "Aprobando" : "Por debajo"}</span></td>
                        <td className="num">{pa == null ? "—" : `${num(pa, 0)}%`}</td>
                      </tr>
                    );
                  })}
                  {lista.length === 0 && (
                    <tr><td colSpan={4} className="tenue">Ningún código coincide con la búsqueda.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          !error && <div className="tarjeta tenue">Cargando…</div>
        )}
      </main>
      {curso && (
        <footer className="ancho pie">
          {curso.curso} · {curso.programa} · Grupo {curso.grupo} · {curso.periodo} · Prof. {curso.profesor}.
          Actualizado: {curso.actualizado}. {curso.aviso}
        </footer>
      )}
    </>
  );
}
