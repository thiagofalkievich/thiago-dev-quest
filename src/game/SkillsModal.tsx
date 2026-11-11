"use client";

import { useEffect, useState } from "react";
import "./skills-modal.css";

type Category = "ALL" | "FRONTEND" | "BACKEND" | "DATA" | "IOT" | "TOOLS";
type Skill = {
  id: string;
  name: string;
  category: Exclude<Category, "ALL">;
  symbol: string;
  description: string;
  usedIn: string;
};

const skills: Skill[] = [
  { id: "python", name: "Python", category: "BACKEND", symbol: "🐍", description: "Lógica, APIs y procesamiento de datos.", usedIn: "TriageMed, Mi Trámite y análisis de Smart Parking" },
  { id: "javascript", name: "JavaScript", category: "FRONTEND", symbol: "⚡", description: "Interactividad, interfaces y comunicación con servicios.", usedIn: "Dashboard de Smart Parking" },
  { id: "typescript", name: "TypeScript", category: "FRONTEND", symbol: "🔷", description: "JavaScript con tipos para interfaces más mantenibles.", usedIn: "Thiago Dev Quest" },
  { id: "next", name: "Next.js", category: "FRONTEND", symbol: "▲", description: "Desarrollo de aplicaciones web con React.", usedIn: "TriageMed, Mi Trámite y este portfolio" },
  { id: "htmlcss", name: "HTML / CSS", category: "FRONTEND", symbol: "🎨", description: "Estructura y estilos de sitios responsivos.", usedIn: "Smart Parking y portfolio" },
  { id: "fastapi", name: "FastAPI", category: "BACKEND", symbol: "🚀", description: "Creación de endpoints y servicios REST en Python.", usedIn: "TriageMed y Mi Trámite" },
  { id: "sql", name: "SQL / SQLite", category: "BACKEND", symbol: "🗄️", description: "Consultas, modelado y persistencia relacional.", usedIn: "TriageMed y trabajos de bases de datos" },
  { id: "pandas", name: "Pandas", category: "DATA", symbol: "📊", description: "Limpieza, transformación y análisis de conjuntos de datos.", usedIn: "TriageMed y análisis de Smart Parking" },
  { id: "colab", name: "Google Colab", category: "DATA", symbol: "📈", description: "Notebooks para explorar y visualizar datos.", usedIn: "Análisis de registros de ThingSpeak" },
  { id: "firebase", name: "Firebase", category: "IOT", symbol: "🔥", description: "Sincronización en tiempo real entre dispositivos y web.", usedIn: "Smart Parking" },
  { id: "esp", name: "ESP8266", category: "IOT", symbol: "🔌", description: "Lectura de sensores y control de actuadores por Wi-Fi.", usedIn: "Smart Parking" },
  { id: "git", name: "Git / GitHub", category: "TOOLS", symbol: "🌿", description: "Versionado y colaboración en repositorios.", usedIn: "Hackathons y proyectos personales" },
];

const categories: Category[] = ["ALL", "FRONTEND", "BACKEND", "DATA", "IOT", "TOOLS"];

export default function SkillsModal({ onClose }: { onClose: () => void }) {
  const [category, setCategory] = useState<Category>("ALL");
  const [selectedId, setSelectedId] = useState("python");
  const shown = skills.filter((skill) => category === "ALL" || skill.category === category);
  const selected = skills.find((skill) => skill.id === selectedId) ?? skills[0];

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.stopImmediatePropagation();
        onClose();
      }
    };
    window.addEventListener("keydown", onKeyDown, true);
    return () => window.removeEventListener("keydown", onKeyDown, true);
  }, [onClose]);

  return (
    <div className="inventory-overlay" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
      <section className="inventory-panel" role="dialog" aria-modal="true" aria-labelledby="inventory-title">
        <header className="inventory-header">
          <span id="inventory-title">✦ INVENTORY / SKILLS</span>
          <button type="button" className="inventory-close" onClick={onClose} aria-label="Cerrar inventario">✕</button>
        </header>
        <div className="inventory-body">
          <p className="inventory-kicker">✦ EQUIPMENT UNLOCKED</p>
          <h3>MI INVENTARIO</h3>
          <p className="inventory-intro">Tecnologías que utilizo para construir proyectos. Seleccioná un objeto para ver sus detalles.</p>
          <div className="inventory-tabs" aria-label="Categorías de habilidades">
            {categories.map((item) => (
              <button type="button" key={item} className={category === item ? "active" : ""} onClick={() => {
                setCategory(item);
                const first = skills.find((skill) => item === "ALL" || skill.category === item);
                if (first) setSelectedId(first.id);
              }}>{item}</button>
            ))}
          </div>
          <div className="inventory-layout">
            <div className="inventory-grid" aria-label="Tecnologías">
              {shown.map((skill) => (
                <button type="button" key={skill.id} className={`inventory-slot ${skill.id === selected.id ? "selected" : ""}`} onClick={() => setSelectedId(skill.id)} aria-pressed={skill.id === selected.id}>
                  <span className="inventory-icon" aria-hidden="true">{skill.symbol}</span>
                  <span>{skill.name}</span>
                </button>
              ))}
            </div>
            <aside className="inventory-details">
              <div className="inventory-detail-icon" aria-hidden="true">{selected.symbol}</div>
              <span className="inventory-type">{selected.category} • SKILL ITEM</span>
              <h4>{selected.name}</h4>
              <p>{selected.description}</p>
              <div className="inventory-used-in"><span>USADO EN</span><strong>{selected.usedIn}</strong></div>
            </aside>
          </div>
          <p className="inventory-footer">ESC PARA VOLVER AL JUEGO</p>
        </div>
      </section>
    </div>
  );
}
