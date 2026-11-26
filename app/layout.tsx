import type { Metadata, Viewport } from "next";
import { SITIO } from "@/lib/sitio";
import "./globals.css";

export const metadata: Metadata = {
  title: SITIO.titulo,
  description: "Notas y asistencia por código estudiantil.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="cabecera">
          <div className="ancho cabecera-fila">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img className="logo" src="/logo-unimagdalena.png" alt={`Escudo de la ${SITIO.universidad}`} width={64} height={64} />
            <div className="cabecera-texto">
              <small>{SITIO.universidad} · {SITIO.facultad} · {SITIO.programa}</small>
              <h1>{SITIO.titulo}</h1>
              <div className="profesor">
                {SITIO.profesor} · <a href={`mailto:${SITIO.correo}`}>{SITIO.correo}</a>
              </div>
            </div>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
