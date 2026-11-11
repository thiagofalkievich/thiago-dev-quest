"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import SkillsModal from "./SkillsModal";
import MissionsModal from "./MissionsModal";
import "./game.css";
import "./player-modal.css";

type Portal = {
  id: "player" | "skills" | "missions";
  title: string;
  x: number;
  href: string;
  color: string;
};

type Player = {
  x: number;
  y: number;
  velocityY: number;
  facing: 1 | -1;
  walking: boolean;
  frame: number;
};

const WORLD_WIDTH = 1100;
const PLAYER_WIDTH = 68;
const GROUND = 74;
const PORTALS: Portal[] = [
  { id: "player", title: "PLAYER INFO", x: 250, href: "#player", color: "cyan" },
  { id: "skills", title: "SKILLS", x: 560, href: "#skills", color: "purple" },
  { id: "missions", title: "MISSIONS", x: 885, href: "#missions", color: "gold" },
];
const INITIAL: Player = {
  x: 55,
  y: 0,
  velocityY: 0,
  facing: 1,
  walking: false,
  frame: 0,
};

export default function GameScene() {
  const [player, setPlayer] = useState<Player>(INITIAL);
  const [near, setNear] = useState<Portal | null>(null);
  const [activePortal, setActivePortal] = useState<Portal["id"] | null>(null);
  const activePortalRef = useRef<Portal["id"] | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const keys = useRef<Set<string>>(new Set());
  const playerRef = useRef<Player>(INITIAL);
  const stageRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const lastRef = useRef(0);

  const closePortal = useCallback(() => {
    activePortalRef.current = null;
    setActivePortal(null);
    keys.current.clear();
  }, []);

  const activate = useCallback(() => {
    const portal = PORTALS.find(
      (p) => Math.abs(playerRef.current.x + PLAYER_WIDTH / 2 - p.x) < 95
    );
    if (!portal || activePortalRef.current) return;

    keys.current.clear();
    if (portal.id === "player" || portal.id === "skills" || portal.id === "missions") {
      activePortalRef.current = portal.id;
      setActivePortal(portal.id);
    } else {
      document.getElementById(portal.id)?.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    const onDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      if (key === "escape" && activePortalRef.current) {
        event.preventDefault();
        closePortal();
        return;
      }
      if (activePortalRef.current) return;
      if (["INPUT", "TEXTAREA", "SELECT"].includes((event.target as HTMLElement)?.tagName)) return;

      if (["arrowleft", "arrowright", "arrowup", " ", "a", "d", "w", "e"].includes(key)) {
        event.preventDefault();
      }
      keys.current.add(key);
      if (key === "e" && !event.repeat) activate();
    };
    const onUp = (event: KeyboardEvent) => keys.current.delete(event.key.toLowerCase());
    const onBlur = () => keys.current.clear();

    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
      window.removeEventListener("blur", onBlur);
    };
  }, [activate, closePortal]);

  useEffect(() => {
    const tick = (time: number) => {
      const dt = Math.min((time - (lastRef.current || time)) / 16.667, 2);
      lastRef.current = time;
      if (activePortalRef.current) {
        frameRef.current = requestAnimationFrame(tick);
        return;
      }

      const k = keys.current;
      const p = { ...playerRef.current };
      const dx = Number(k.has("d") || k.has("arrowright")) -
        Number(k.has("a") || k.has("arrowleft"));
      p.x = Math.max(0, Math.min(WORLD_WIDTH - PLAYER_WIDTH, p.x + dx * 4.4 * dt));
      p.walking = dx !== 0;
      if (dx !== 0) p.facing = dx > 0 ? 1 : -1;
      if ((k.has("w") || k.has("arrowup") || k.has(" ")) && p.y === 0) {
        p.velocityY = 13.8;
      }
      p.y += p.velocityY * dt;
      p.velocityY -= 0.68 * dt;
      if (p.y <= 0) {
        p.y = 0;
        p.velocityY = 0;
      }
      p.frame = p.y > 0
        ? Math.floor(time / 160) % 3
        : p.walking
          ? Math.floor(time / 115) % 6
          : Math.floor(time / 420) % 4;

      playerRef.current = p;
      setPlayer(p);
      const nearest = PORTALS.find(
        (portal) => Math.abs(p.x + PLAYER_WIDTH / 2 - portal.x) < 95
      ) ?? null;
      setNear((old) => old?.id === nearest?.id ? old : nearest);

      const stage = stageRef.current;
      if (stage && stage.clientWidth < WORLD_WIDTH) {
        const desired = p.x - stage.clientWidth / 2;
        if (Math.abs(stage.scrollLeft - desired) > 80) {
          stage.scrollLeft = Math.max(0, desired);
        }
      }
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frameRef.current);
      lastRef.current = 0;
    };
  }, []);

  useEffect(() => {
    if (activePortal === "player") closeButtonRef.current?.focus();
  }, [activePortal]);

  const mobileKey = (key: string, down: boolean) => {
    if (activePortalRef.current) return;
    if (down) keys.current.add(key);
    else keys.current.delete(key);
  };

  return (
    <section className="game-section" aria-label="Mundo interactivo de Thiago">
      <div className="game-heading">
        <span className="game-kicker">LEVEL 01 — MY WORLD</span>
        <h2>EXPLORA MI MUNDO</h2>
        <p>Usá A/D o ←/→ para moverte, W o ESPACIO para saltar y E para entrar en un portal.</p>
      </div>

      <div className="game-viewport" ref={stageRef}>
        <div className="game-world">
          <div className="game-moon" aria-hidden="true" />
          <div className="game-mountain one" aria-hidden="true" />
          <div className="game-mountain two" aria-hidden="true" />
          <div className="game-hills" aria-hidden="true" />

          {PORTALS.map((portal) => (
            <div
              key={portal.id}
              className={`game-portal ${portal.color} ${near?.id === portal.id ? "near" : ""}`}
              style={{ left: portal.x }}
            >
              <span className="portal-label">{portal.title}</span>
              <span className="portal-door"><span>✦</span></span>
              <span className="portal-base" />
            </div>
          ))}

          <div className="game-player" style={{ left: player.x, bottom: GROUND + player.y }}>
            <Image
              src={`/images/characters/frames/${player.y > 0 ? "jump" : player.walking ? "walk" : "idle"}-${player.frame}.png`}
              width={96}
              height={160}
              unoptimized
              alt="Thiago, personaje pixel art animado"
              draggable={false}
              style={{ transform: `scaleX(${player.facing})`, objectFit: "contain" }}
            />
          </div>
          <div className="game-ground" />
          <div className="game-ground-top" />
        </div>
      </div>

      <div className="game-hud">
        <span>{near ? `✦ ${near.title} — PRESIONÁ E` : "🎮 PLAYER 1 — READY"}</span>
        <div className="game-mobile-controls">
          <button type="button" onPointerDown={() => mobileKey("a", true)} onPointerUp={() => mobileKey("a", false)} onPointerCancel={() => mobileKey("a", false)}>◀</button>
          <button type="button" onPointerDown={() => mobileKey("d", true)} onPointerUp={() => mobileKey("d", false)} onPointerCancel={() => mobileKey("d", false)}>▶</button>
          <button type="button" onPointerDown={() => mobileKey("w", true)} onPointerUp={() => mobileKey("w", false)} onPointerCancel={() => mobileKey("w", false)}>⤒</button>
          <button type="button" onClick={activate}>E</button>
        </div>
      </div>

      {activePortal === "player" && (
        <div
          className="rpg-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closePortal();
          }}
        >
          <div role="dialog" aria-modal="true" aria-labelledby="rpg-player-title" className="rpg-window">
            <div className="rpg-window-header">
              <span>★ PLAYER CARD / 001</span>
              <button
                ref={closeButtonRef}
                type="button"
                className="rpg-close"
                aria-label="Cerrar perfil"
                onClick={closePortal}
              >✕</button>
            </div>

            <div className="rpg-player-layout">
              <div className="rpg-portrait">
                <Image
                  src="/images/characters/thiago-avatar.png"
                  width={300}
                  height={300}
                  alt="Retrato pixel art de Thiago"
                />
                <span>PLAYER 01</span>
              </div>

              <div className="rpg-player-details">
                <span className="rpg-eyebrow">CHARACTER UNLOCKED</span>
                <h3 id="rpg-player-title">THIAGO MIRANDA</h3>
                <p className="rpg-class">&lt; SOFTWARE DEVELOPER /&gt;</p>
                <p className="rpg-description">
                  Desarrollador de software interesado en crear soluciones reales con frontend,
                  backend, análisis de datos e IoT. Me gusta aprender, experimentar y transformar
                  ideas en proyectos.
                </p>
                <div className="rpg-details-grid">
                  <div><small>CLASS</small><strong>Developer</strong></div>
                  <div><small>SPECIALTY</small><strong>Full Stack</strong></div>
                  <div><small>QUESTS</small><strong>2 proyectos destacados</strong></div>
                  <div><small>STATUS</small><strong>Disponible para colaborar</strong></div>
                </div>
                <div className="rpg-tags">
                  <span>PYTHON</span><span>NEXT.JS</span><span>FASTAPI</span><span>DATA</span><span>IOT</span>
                </div>
                <button
                  className="rpg-action"
                  type="button"
                  onClick={() => {
                    closePortal();
                    document.getElementById("player")?.scrollIntoView({ behavior: "smooth" });
                  }}
                >▶ VER PERFIL COMPLETO</button>
              </div>
            </div>
            <p className="rpg-help">PRESIONÁ ESC PARA VOLVER AL JUEGO</p>
          </div>
        </div>
      )}

      {activePortal === "skills" && <SkillsModal onClose={closePortal} />}
      {activePortal === "missions" && <MissionsModal onClose={closePortal} />}
    </section>
  );
}
