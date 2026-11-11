"use client";

import { useState } from "react";
import "./inventory.css";

type Category = "FRONTEND" | "BACKEND" | "DATA" | "IOT" | "TOOLS";
type Skill = {
  name: string;
  icon: string;
  category: Category;
  description: string;
  projects: string[];
};

const skills: Skill[] = [
  { name: "Python", icon: "🐍", category: "BACKEND", description: "Procesamiento de datos, lógica de negocio y desarrollo de servicios.", projects: ["TriageMed", "Smart Parking — análisis de datos"] },
  { name: "JavaScript", icon: "⚡", category: "FRONTEND", description: "Interactividad web, comunicación con servicios y actualización de interfaces.", projects: ["Smart Parking"] },
  { name: "TypeScript", icon: "🔷", category: "FRONTEND", description: "Tipado y organización de componentes web; tecnología utilizada en este portfolio.", projects: ["THIAGO DEV QUEST"] },
  { name: "Next.js", icon: "▲", category: "FRONTEND", description: "Desarrollo de interfaces y aplicaciones con React.", projects: ["TriageMed", "THIAGO DEV QUEST"] },
  { name: "HTML / CSS", icon: "🎨", category: "FRONTEND", description: "Estructura, estilos y diseño responsivo de páginas web.", projects: ["Smart Parking"] },
  { name: "FastAPI", icon: "🚀", category: "BACKEND", description: "Creación de APIs y servicios backend en Python.", projects: ["TriageMed"] },
  { name: "SQLite / SQL", icon: "🗄️", category: "BACKEND", description: "Consultas y almacenamiento de información estructurada.", projects: ["TriageMed"] },
  { name: "Pandas", icon: "📊", category: "DATA", description: "Limpieza, procesamiento y análisis de registros.", projects: ["TriageMed", "Smart Parking"] },
  { name: "Google Colab", icon: "📈", category: "DATA", description: "Notebooks de Python para análisis y visualización.", projects: ["Smart Parking"] },
  { name: "Firebase", icon: "🔥", category: "IOT", description: "Sincronización de estados de plazas entre dispositivos y aplicación web.", projects: ["Smart Parking"] },
  { name: "ESP8266", icon: "🔌", category: "IOT", description: "Integración de sensores, conexión Wi-Fi y control de barreras.", projects: ["Smart Parking"] },
  { name: "Git / GitHub", icon: "🌿", category: "TOOLS", description: "Control de versiones, repositorios y colaboración.", projects: ["TriageMed", "Smart Parking"] },
];

const filters = ["ALL", "FRONTEND", "BACKEND", "DATA", "IOT", "TOOLS"] as const;
type Filter = (typeof filters)[number];

export default function Inventory() {
  const [filter, setFilter] = useState<Filter>("ALL");
  const [selectedName, setSelectedName] = useState("Python");
  const visible = skills.filter((skill) => filter === "ALL" || skill.category === filter);
  const selected = visible.find((skill) => skill.name === selectedName) ?? visible[0];

  return (
    <section id="skills" className="inventory-section" aria-labelledby="inventory-title">
      <div className="inventory-shell">
        <div className="inventory-heading">
          <span>★ ITEM COLLECTION / 012</span>
          <h2 id="inventory-title">INVENTORY</h2>
          <p>Las herramientas que llevo en mi aventura como desarrollador. Elegí una para conocer cómo la utilizo.</p>
        </div>

        <div className="inventory-frame">
          <div className="inventory-topbar">
            <span>🎒 DEVELOPER BACKPACK</span>
            <span>{String(skills.length).padStart(2, "0")} / {String(skills.length).padStart(2, "0")} ITEMS</span>
          </div>

          <div className="inventory-filters" role="group" aria-label="Filtrar tecnologías">
            {filters.map((category) => (
              <button
                type="button"
                key={category}
                className={category === filter ? "inventory-filter active" : "inventory-filter"}
                aria-pressed={category === filter}
                onClick={() => {
                  setFilter(category);
                  const first = skills.find((skill) => category === "ALL" || skill.category === category);
                  if (first) setSelectedName(first.name);
                }}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="inventory-layout">
            <div className="inventory-grid" aria-label="Objetos del inventario">
              {visible.map((skill) => (
                <button
                  type="button"
                  key={skill.name}
                  aria-pressed={selected.name === skill.name}
                  className={selected.name === skill.name ? "inventory-item selected" : "inventory-item"}
                  onClick={() => setSelectedName(skill.name)}
                >
                  <span className="inventory-item-icon" aria-hidden="true">{skill.icon}</span>
                  <span className="inventory-item-name">{skill.name}</span>
                  <span className="inventory-item-category">{skill.category}</span>
                </button>
              ))}
            </div>

            <aside className="inventory-detail" aria-live="polite">
              <span className="inventory-detail-kicker">✦ ITEM INSPECTED</span>
              <div className="inventory-detail-icon" aria-hidden="true">{selected.icon}</div>
              <h3>{selected.name}</h3>
              <span className="inventory-type">{selected.category} / TOOL</span>
              <p>{selected.description}</p>
              <div className="inventory-used">
                <strong>UTILIZADO EN</strong>
                {selected.projects.map((project) => <span key={project}>✧ {project}</span>)}
              </div>
              <a href="#missions" className="inventory-quest-link">▶ VER MISIONES</a>
            </aside>
          </div>
          <div className="inventory-footer">ITEMS UNLOCKED • SEGUÍ EXPLORANDO</div>
        </div>
      </div>
    </section>
  );
}
