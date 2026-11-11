"use client";

import { useState } from "react";
import Image from "next/image";
import "./missions.css";

type Mission = {
  id: string;
  code: string;
  name: string;
  category: string;
  subtitle: string;
  description: string;
  objective: string;
  role: string;
  achievements: string[];
  technologies: string[];
  architecture: string[];
  image: string;
  demo?: string;
  github?: string;
  accent: "cyan" | "gold";
};

const missions: Mission[] = [
  {
    id: "triagemed",
    code: "MISSION 01",
    name: "TriageMed",
    category: "HEALTH TECH / HACKATHON",
    subtitle: "Señales de salud basadas en datos",
    description:
      "Prototipo de apoyo al triaje médico que analiza datos clínicos y registros de dispositivos wearables para identificar señales de riesgo y presentar evidencia en un dashboard.",
    objective:
      "Transformar grandes volúmenes de información sanitaria en señales comprensibles que ayuden a priorizar la atención.",
    role: "Desarrollo de software en equipo: frontend y backend.",
    achievements: [
      "11.º puesto en la hackathon internacional RISA Data V1.0",
      "Procesamiento de información clínica y de wearables",
      "Visualización de señales, puntajes de riesgo y evidencia",
    ],
    technologies: ["Python", "FastAPI", "Next.js", "Pandas", "SQLite"],
    architecture: ["Datos clínicos y wearables", "Procesamiento con Python y Pandas", "API con FastAPI", "Dashboard con Next.js"],
    image: "/images/projects/triagemed.png",
    accent: "cyan",
  },
  {
    id: "smart-parking",
    code: "MISSION 02",
    name: "Smart Parking",
    category: "IOT / WEB APPLICATION",
    subtitle: "Estacionamiento inteligente",
    description:
      "Sistema IoT que detecta plazas libres u ocupadas mediante sensores infrarrojos, sincroniza datos con Firebase y permite visualizar el estacionamiento y accionar barreras desde una aplicación web.",
    objective:
      "Monitorear cuatro plazas en tiempo real e integrar hardware, web e información histórica en una misma solución.",
    role: "Desarrollo de la aplicación web e integración de datos IoT.",
    achievements: [
      "Monitoreo de cuatro plazas",
      "Control de barreras mediante servomotores",
      "Registro y análisis de datos históricos con ThingSpeak y Pandas",
    ],
    technologies: ["ESP8266", "Firebase", "JavaScript", "HTML / CSS", "ThingSpeak", "Pandas"],
    architecture: ["Sensores IR y ESP8266", "Firebase Realtime Database", "Dashboard web", "ThingSpeak y análisis con Pandas"],
    image: "/images/projects/smart-parking.png",
    demo: "https://smart-parking-1d316.web.app/",
    accent: "gold",
  },
];

function ProjectPreview({ mission }: { mission: Mission }) {
  const [failed, setFailed] = useState(false);
  return (
    <div className={`mission-preview ${mission.accent}`}>
      {!failed ? (
        <Image
          src={mission.image}
          alt={`Captura de ${mission.name}`}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          className="mission-preview-image"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="mission-preview-empty">
          <span aria-hidden="true">▣</span>
          <strong>SCREENSHOT NOT FOUND</strong>
          <small>Agregá {mission.image.replace("/images/projects/", "")} en public/images/projects/</small>
        </div>
      )}
    </div>
  );
}

export default function Missions() {
  const [selected, setSelected] = useState(0);
  const mission = missions[selected];

  return (
    <section id="missions" className="missions-section" aria-labelledby="missions-heading">
      <div className="missions-container">
        <div className="missions-intro">
          <span className="missions-eyebrow">★ QUEST JOURNAL / COMPLETED MISSIONS</span>
          <h2 id="missions-heading">MISSIONS</h2>
          <p>Dos proyectos reales en los que combiné programación, trabajo en equipo y soluciones tecnológicas.</p>
        </div>

        <div className="missions-shell">
          <div className="missions-topbar">
            <span>★ QUEST LOG</span>
            <span>02 / 02 COMPLETED</span>
          </div>

          <div className="missions-layout">
            <div className="missions-list" aria-label="Elegir proyecto">
              {missions.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  aria-pressed={selected === index}
                  className={`mission-picker ${selected === index ? "selected" : ""}`}
                  onClick={() => setSelected(index)}
                >
                  <span className="mission-picker-number">{item.code}</span>
                  <strong>{item.name}</strong>
                  <small>{item.subtitle}</small>
                  <span className="mission-picker-arrow" aria-hidden="true">▶</span>
                </button>
              ))}
              <div className="missions-completion">QUESTS COMPLETED <strong>02 / 02</strong></div>
              <p className="missions-nav-hint">Seleccioná una misión para consultar sus detalles.</p>
            </div>

            <article className={`mission-detail ${mission.accent}`} key={mission.id}>
              <div className="mission-detail-header">
                <span>{mission.category}</span>
                <span>✓ COMPLETED</span>
                <h3>{mission.name}</h3>
              </div>

              <ProjectPreview mission={mission} />

              <div className="mission-detail-body">
                <p className="mission-description">{mission.description}</p>

                <div className="mission-facts">
                  <div><small>OBJETIVO</small><p>{mission.objective}</p></div>
                  <div><small>MI ROL</small><p>{mission.role}</p></div>
                </div>

                <h4>✦ ACHIEVEMENTS</h4>
                <ul className="mission-achievements">
                  {mission.achievements.map((achievement) => <li key={achievement}>{achievement}</li>)}
                </ul>

                <h4>✦ SYSTEM FLOW</h4>
                <div className="mission-flow">
                  {mission.architecture.map((step, i) => (
                    <div className="mission-flow-step" key={step}>
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      {step}
                    </div>
                  ))}
                </div>

                <h4>✦ TECH STACK</h4>
                <div className="mission-tags">
                  {mission.technologies.map((tech) => <span key={tech}>{tech}</span>)}
                </div>

                <div className="mission-actions">
                  {mission.demo ? (
                    <a href={mission.demo} target="_blank" rel="noopener noreferrer">▶ VER DEMO ↗</a>
                  ) : (
                    <span className="mission-action-disabled">DEMO NO DISPONIBLE</span>
                  )}
                  {mission.github && (
                    <a href={mission.github} target="_blank" rel="noopener noreferrer" className="secondary">GITHUB ↗</a>
                  )}
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
