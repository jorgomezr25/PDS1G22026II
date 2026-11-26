import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Procesamiento de Señales I · Grupo 2 · 2026II · Notas y asistencia",
  description: "Notas y asistencia por código estudiantil.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <header className="cabecera">
          <div className="ancho">
            <small>Universidad del Magdalena · Facultad de Ingeniería</small>
            <h1>Procesamiento de Señales I · Grupo 2 · 2026II · Notas y asistencia</h1>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}
