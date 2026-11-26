# PDS1G22026II · notas y asistencia (Next.js)

Procesamiento de Señales I, grupo 2, periodo 2026II · Ingeniería Electrónica · Universidad del Magdalena. Escala de 0 a 500 puntos sin decimales; se aprueba con 300.

Listado de notas y asistencia por código estudiantil, sin nombres. Al hacer clic en un código se ve el detalle (cortes, actividades y asistencia por clase). Cada estudiante tiene enlace directo: `/#<código>`.

## Estructura
```
app/            layout, página y estilos (App Router)
components/     Consulta (listado), Resultado (detalle) y Asistencia
lib/            tipos y formato de números
public/data/    cursos.json (índice) y el JSON del grupo (sin nombres)
next.config.mjs cabeceras: noindex, seguridad y sin caché en /data
```

## Desarrollo
```
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Despliegue en Vercel
Proyecto propuesto: `pds1g22026ii` (https://pds1g22026ii.vercel.app), conectado al repositorio para que cada push a `main` publique.

## Actualizar notas
Los JSON de `public/data/` los genera `generar_notas_web.py` con `config_PDS1G22026II.json` a partir del libro de Excel del profesor. Nunca incluyen nombres. Este sitio es solo del grupo 2.

La nota oficial es la registrada en AYRE.
