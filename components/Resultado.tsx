import { Fragment } from "react";
import { fechaCorta, pts } from "@/lib/formato";
import type { Curso, NotasEstudiante } from "@/lib/tipos";
import Asistencia from "./Asistencia";

const Pendiente = () => <span className="pendiente">Pendiente</span>;

export default function Resultado({ curso, notas, onSalir }: { curso: Curso; notas: NotasEstudiante; onSalir: () => void }) {
  const st = curso.estadisticas;
  const aprueba = notas.definitiva >= curso.nota_minima;

  return (
    <>
      <div className="tarjeta">
        <div className="encabezado">
          <div>
            <p className="nombre">{notas.nombre ?? `Código ${notas.codigo}`}</p>
            <div className="sub">
              {notas.nombre ? `Código ${notas.codigo} · ` : ""}{curso.curso} · Grupo {curso.grupo} · {curso.periodo}
            </div>
          </div>
          <div className="final">
            <div className="sub">Nota definitiva acumulada</div>
            <div className="n">{notas.definitiva}<span className="de"> / {curso.max_total}</span></div>
            <div className={`pildora ${aprueba ? "ok" : "mal"}`}>
              {aprueba ? "Aprobando" : `Por debajo de ${curso.nota_minima}`}
            </div>
          </div>
        </div>

        <div className="cortes">
          {curso.cortes.map((k, i) => {
            const v = notas.cortes[i];
            const prom = st.cortes[i];
            return (
              <div className="corte" key={k.corte}>
                <h3>{k.nombre}</h3>
                <div className="v">
                  {v == null ? <Pendiente /> : pts(v)} <span>/ {k.max} pts</span>
                </div>
                <div className="pista-barra" title={prom == null ? "" : `Promedio del grupo: ${pts(prom)} pts`}>
                  <div className="relleno" style={{ width: `${v == null ? 0 : Math.min(100, (v / k.max) * 100)}%` }} />
                  {prom != null && <div className="marca" style={{ left: `${(prom / k.max) * 100}%` }} />}
                </div>
              </div>
            );
          })}
        </div>
        <div className="leyenda">
          <span><i />Promedio del grupo</span>
          <span>Escala de 0 a {curso.max_total} puntos; se aprueba con {curso.nota_minima}.</span>
        </div>
      </div>

      <div className="tarjeta desplazable">
        <table>
          <thead>
            <tr>
              <th>Actividad</th>
              <th className="num">Peso</th>
              <th className="num">Puntos</th>
              <th className="num">Prom. grupo</th>
            </tr>
          </thead>
          <tbody>
            {curso.cortes.map((k) => (
              <Fragment key={k.corte}>
                <tr className="grupo"><td colSpan={2}>{k.nombre}</td><td className="num">{notas.cortes[curso.cortes.indexOf(k)] ?? "—"} / {k.max}</td><td className="num">{st.cortes[curso.cortes.indexOf(k)] ?? "—"}</td></tr>
                {curso.componentes.map((m, i) => {
                  if (m.corte !== k.corte) return null;
                  const v = notas.componentes[i];
                  const prom = st.componentes[i];
                  return (
                    <tr key={i}>
                      <td>
                        {m.nombre}
                        {m.fecha && <div className="tenue fecha">{fechaCorta(m.fecha)}</div>}
                      </td>
                      <td className="num">{m.peso}%</td>
                      <td className="num">{v == null ? <Pendiente /> : <><b>{pts(v)}</b> / {m.max}</>}</td>
                      <td className="num tenue">{prom == null ? "—" : pts(prom)}</td>
                    </tr>
                  );
                })}
                {k.nota && <tr><td colSpan={4} className="nota sin-borde">{k.nota}</td></tr>}
              </Fragment>
            ))}
          </tbody>
        </table>
        <p className="nota">{curso.aviso} Promedio del grupo calculado con {st.n} estudiantes.</p>
      </div>

      {curso.sesiones && curso.sesiones.length > 0 && notas.asistencia && (
        <Asistencia curso={curso} estados={notas.asistencia} />
      )}

      <button className="secundario" onClick={onSalir}>← Volver al listado</button>
    </>
  );
}
