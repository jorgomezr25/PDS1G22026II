export const num = (v: number, decimales = 1) =>
  v.toLocaleString("es-CO", { minimumFractionDigits: decimales, maximumFractionDigits: decimales });

/** Puntos: sin decimales si son enteros, uno si no. */
export const pts = (v: number) => num(v, Number.isInteger(v) ? 0 : 1);

export const fechaCorta = (iso: string) =>
  new Date(`${iso}T12:00`).toLocaleDateString("es-CO", { day: "numeric", month: "short" });
