"use client";

import Image from "next/image";
import { useState } from "react";
import "./player-info.css";

const achievements = [
  {
    symbol: "★",
    title: "INTERNATIONAL HACKATHON",
    description: "11.º puesto en RISA Data V1.0 con TriageMed.",
  },
  {
    symbol: "◆",
    title: "REAL-WORLD BUILDER",
    description: "Desarrollo de Smart Parking, integrando web e IoT.",
  },
  {
    symbol: "✦",
    title: "TEAM PLAYER",
    description: "Experiencia trabajando en equipo y creando prototipos.",
  },
];

export default function PlayerInfo() {
  const [storyOpen, setStoryOpen] = useState(false);

  return (
    <section id="player" className="character-section" aria-labelledby="character-title">
      <div className="character-shell">
        <div className="character-section-heading">
          <span className="character-overline">★ CHARACTER FILE / PLAYER 001</span>
          <h2 id="character-title">PLAYER INFO</h2>
          <p>La historia detrás del personaje.</p>
        </div>

        <div className="character-panel">
          <div className="character-panel-top">
            <span>CHARACTER PROFILE</span>
            <span className="character-panel-status">● PROFILE UNLOCKED</span>
          </div>

          <div className="character-panel-grid">
            <div className="character-left">
              <div className="character-art">
                <span className="character-art-tag">PLAYER 01</span>
                <div className="character-art-glow" aria-hidden="true" />
                
<Image
  src="/images/characters/thiago-profile.png"
  alt="Thiago representado como personaje pixel art"
  width={512}
  height={768}
  unoptimized
  className="character-fullbody"
/>

                <div className="character-art-ground" aria-hidden="true" />
              </div>
              <div className="character-identity">
                <h3>THIAGO MIRANDA</h3>
                <span>SOFTWARE DEVELOPER</span>
              </div>
            </div>

            <div className="character-right">
              <span className="character-overline">WELCOME, PLAYER ONE</span>
              <h3>Hola, soy Thiago<span className="character-cursor">_</span></h3>
              <p className="character-intro">
                Estudio Desarrollo de Software y disfruto convertir ideas en proyectos
                que resuelvan problemas reales. Me interesa construir soluciones
                completas, aprender nuevas herramientas y trabajar en equipo.
              </p>

              <div className="character-facts">
                <div><span>CLASS</span><strong>Software Developer</strong></div>
                <div><span>LOCATION</span><strong>Argentina</strong></div>
                <div><span>EDUCATION</span><strong>Tecnicatura en Desarrollo de Software</strong></div>
                <div><span>CURRENT QUEST</span><strong>Seguir aprendiendo y creando</strong></div>
              </div>

              <div className="character-story">
                <button
                  type="button"
                  className="character-story-button"
                  aria-expanded={storyOpen}
                  aria-controls="character-story-content"
                  onClick={() => setStoryOpen((current) => !current)}
                >
                  <span>{storyOpen ? "▼" : "▶"} {storyOpen ? "CLOSE MY STORY" : "READ MY STORY"}</span>
                  <span aria-hidden="true">{storyOpen ? "−" : "+"}</span>
                </button>
                {storyOpen && (
                  <div id="character-story-content" className="character-story-content">
                    <p>
                      Actualmente curso la Tecnicatura Superior en Desarrollo de Software
                      en el Instituto San José. Me gusta explorar distintas áreas del
                      desarrollo y llevar lo aprendido a proyectos concretos.
                    </p>
                    <p>
                      Participé en una hackathon internacional con TriageMed y desarrollé
                      una aplicación web para Smart Parking, un proyecto que une sensores,
                      datos y software. Estas experiencias me ayudaron a fortalecer la
                      colaboración, la resolución de problemas y la construcción de prototipos.
                    </p>
                  </div>
                )}
              </div>

              <div className="character-achievements-heading">
                <span>🏆</span><h4>ACHIEVEMENTS UNLOCKED</h4>
              </div>
              <div className="character-achievements">
                {achievements.map((achievement) => (
                  <div className="character-achievement" key={achievement.title}>
                    <span className="character-achievement-icon" aria-hidden="true">{achievement.symbol}</span>
                    <div>
                      <strong>{achievement.title}</strong>
                      <p>{achievement.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <a className="character-quest-link" href="#missions">▶ VIEW COMPLETED QUESTS</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
