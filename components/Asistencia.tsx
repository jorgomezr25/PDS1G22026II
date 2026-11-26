import { fechaCorta, num } from "@/lib/formato";
import type { Curso, EstadoAsistencia } from "@/lib/tipos";

const ETIQUETA: Record<string, { texto: string; clase: string }> = {
  P: { texto: "Presente", clase: "presente" },
  R: { texto: "Retardo", clase: "retardo" },
  F: { texto: "Ausente", clase: "ausente" },
  J: { texto: "Falta justificada", clase: "justificada" },
};

export default function Asistencia({ curso, estados }: { curso: Curso; estados: EstadoAsistencia[] }) {
  const sesiones = curso.sesiones ?? [];
  const contar = (e: EstadoAsistencia) => estados.filter((x) => x === e).length;
  const presentes = contar("P"), retardos = contar("R"), faltas = contar("F"), justificadas = contar("J");
  const registradas = estados.filter((x) => x !== null).length;
  const pct = registradas ? ((presentes + retardos) / registradas) * 100 : 0;

  return (
    <div className="tarjeta desplazable">
      <div className="encabezado">
        <h2 className="titulo-seccion">Asistencia a clase</h2>
        <div className="final">
          <div className="n pequeno">{num(pct, 0)}%</div>
        </div>
      </div>

      <div className="resumen-asistencia">
        <span className="estado presente">{presentes} presente{presentes === 1 ? "" : "s"}</span>
        <span className="estado retardo">{retardos} retardo{retardos === 1 ? "" : "s"}</span>
        <span className="estado ausente">{faltas} ausencia{faltas === 1 ? "" : "s"}</span>
        {justificadas > 0 && <span className="estado justificada">{justificadas} justificada{justificadas === 1 ? "" : "s"}</span>}
        <span className="sub">de {registradas} clases registradas</span>
      </div>

      <table>
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Clase</th>
            <th className="num">Estado</th>
          </tr>
        </thead>
        <tbody>
          {sesiones.map((s, i) => {
            const e = estados[i];
            const et = e ? ETIQUETA[e] : null;
            return (
              <tr key={s.fecha}>
                <td className="fecha-col">{fechaCorta(s.fecha)}</td>
                <td>{s.tema}</td>
                <td className="num">{et ? <span className={`estado ${et.clase}`}>{et.texto}</span> : <span className="tenue">Sin registro</span>}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {curso.asistencia_nota && <p className="nota">{curso.asistencia_nota}</p>}
    </div>
  );
}
