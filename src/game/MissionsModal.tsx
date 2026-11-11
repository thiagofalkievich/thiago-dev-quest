"use client";

import { useEffect, useRef, useState } from "react";
import "./missions-modal.css";

type Mission = {
  id: string;
  number: string;
  name: string;
  subtitle: string;
  category: string;
  icon: string;
  description: string;
  role: string;
  objective: string;
  technologies: string[];
  highlights: string[];
  demo?: string;
};

const missions: Mission[] = [
  {
    id: "triagemed",
    number: "01",
    name: "TriageMed",
    subtitle: "Señales de salud basadas en datos",
    category: "HEALTH TECH / HACKATHON",
    icon: "✚",
    description:
      "Prototipo de apoyo al triaje médico que procesa datos clínicos y de dispositivos wearables para detectar señales de riesgo y presentar evidencia en un dashboard.",
    role: "Desarrollo de software en equipo: frontend y backend",
    objective: "Transformar datos de salud en información útil para apoyar la priorización de pacientes.",
    technologies: ["Python", "FastAPI", "Next.js", "Pandas", "SQLite"],
    highlights: ["Hackathon internacional RISA Data V1.0", "11.º puesto", "Dashboard de señales y evidencias"],
  },
  {
    id: "smartparking",
    number: "02",
    name: "Smart Parking",
    subtitle: "Estacionamiento inteligente IoT",
    category: "IOT / WEB APP",
    icon: "▣",
    description:
      "Sistema de estacionamiento inteligente con sensores infrarrojos, monitoreo de plazas libres u ocupadas y control de barreras desde una aplicación web.",
    role: "Aplicación web e integración de datos IoT",
    objective: "Visualizar la disponibilidad de plazas y conectar hardware con servicios en tiempo real.",
    technologies: ["ESP8266", "Firebase", "JavaScript", "HTML / CSS", "ThingSpeak", "Pandas"],
    highlights: ["4 plazas monitoreadas", "Barreras con servomotores", "Análisis de registros históricos"],
    demo: "https://smart-parking-1d316.web.app",
  },
];

export default function MissionsModal({ onClose }: { onClose: () => void }) {
  const [selectedId, setSelectedId] = useState(missions[0].id);
  const selected = missions.find((mission) => mission.id === selectedId) ?? missions[0];
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  return (
    <div
      className="missions-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section className="missions-window" role="dialog" aria-modal="true" aria-labelledby="missions-title">
        <header className="missions-header">
          <span>★ QUEST LOG / 002 MISSIONS</span>
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Cerrar misiones">✕</button>
        </header>

        <div className="missions-content">
          <p className="missions-eyebrow">✦ MISSIONS UNLOCKED</p>
          <h2 id="missions-title">MIS PROYECTOS</h2>
          <p className="missions-intro">Elegí una misión para descubrir qué construí, cómo funciona y qué tecnologías utilicé.</p>

          <div className="missions-layout">
            <div className="missions-list" aria-label="Elegir misión">
              {missions.map((mission) => (
                <button
                  type="button"
                  key={mission.id}
                  className={`missions-item ${selected.id === mission.id ? "selected" : ""}`}
                  onClick={() => setSelectedId(mission.id)}
                  aria-pressed={selected.id === mission.id}
                >
                  <span className="missions-item-icon" aria-hidden="true">{mission.icon}</span>
                  <span className="missions-item-copy">
                    <small>MISSION {mission.number}</small>
                    <strong>{mission.name}</strong>
                    <span>{mission.subtitle}</span>
                  </span>
                  <span className="missions-item-arrow" aria-hidden="true">▶</span>
                </button>
              ))}
              <div className="missions-progress">QUESTS COMPLETED <strong>02 / 02</strong></div>
            </div>

            <article className="missions-detail" aria-live="polite">
              <div className="missions-detail-banner">
                <span className="missions-banner-icon" aria-hidden="true">{selected.icon}</span>
                <div>
                  <small>{selected.category}</small>
                  <h3>{selected.name}</h3>
                </div>
                <span className="missions-status">UNLOCKED</span>
              </div>

              <div className="missions-detail-body">
                <p>{selected.description}</p>
                <div className="missions-facts">
                  <div><small>OBJETIVO</small><span>{selected.objective}</span></div>
                  <div><small>MI ROL</small><span>{selected.role}</span></div>
                </div>
                <h4>✦ LOGROS</h4>
                <ul>{selected.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
                <h4>✦ STACK</h4>
                <div className="missions-tech">{selected.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div>
                <div className="missions-actions">
                  {selected.demo ? (
                    <a href={selected.demo} target="_blank" rel="noopener noreferrer">▶ VER DEMO ↗</a>
                  ) : (
                    <span className="missions-no-demo">DEMO NO DISPONIBLE POR AHORA</span>
                  )}
                </div>
              </div>
            </article>
          </div>
          <p className="missions-footer">PRESIONÁ ESC PARA VOLVER AL JUEGO</p>
        </div>
      </section>
    </div>
  );
}
