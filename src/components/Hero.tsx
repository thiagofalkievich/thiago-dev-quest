
import Image from "next/image";
import PixelButton from "./PixelButton";

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-stars" aria-hidden="true" />

      <div className="hero-content">
        <div className="game-status">
          <span className="status-dot" />
          PLAYER ONE READY
        </div>

        <h1 className="hero-title">
          THIAGO
          <span>DEV QUEST</span>
        </h1>

        <p className="hero-subtitle">
          &lt; SOFTWARE DEVELOPER /&gt;
        </p>

        <p className="hero-description">
          Explorando el mundo del desarrollo de software.
          Construyendo soluciones con código, creatividad
          y tecnología.
        </p>

        <div className="hero-buttons">
          <PixelButton href="#missions">
            ▶ START GAME
          </PixelButton>

          <PixelButton href="#player" variant="secondary">
            PLAYER INFO
          </PixelButton>
        </div>

        <div className="hero-technologies">
          <span>PYTHON</span>
          <span>NEXT.JS</span>
          <span>FASTAPI</span>
          <span>DATA</span>
        </div>
      </div>

      <div className="hero-character">
        <div className="character-frame">
          <div className="character-level">
            LVL 01 • DEVELOPER
          </div>

          <Image
            src="/images/characters/thiago-avatar.png"
            alt="Avatar pixel art de Thiago Miranda"
            width={480}
            height={480}
            priority
            className="character-image"
          />
        </div>

        <div className="character-name">
          <span>★ THIAGO MIRANDA</span>
          <small>CLASS: SOFTWARE DEVELOPER</small>
        </div>
      </div>

      <div className="hero-bottom">
        ▼ SCROLL TO EXPLORE
      </div>
    </section>
  );
}
