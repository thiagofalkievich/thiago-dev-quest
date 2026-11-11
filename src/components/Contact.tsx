"use client";

import { useState } from "react";
import "./contact.css";

type Command = "help" | "github" | "linkedin" | "email" | "about";

const destinations = {
  github: "https://github.com/thiagofalkievich",
  linkedin: "https://www.linkedin.com/in/thiago-miranda-undefined-411834382/",
  email: "mailto:thiago.miranda.work@gmail.com",
};

const commandDetails: Record<Command, string> = {
  help: "Comandos disponibles: github, linkedin, email y about.",
  github: "Repositorio y proyectos de software en GitHub.",
  linkedin: "Perfil profesional y experiencia en LinkedIn.",
  email: "Escribime a thiago.miranda.work@gmail.com.",
  about: "Thiago Miranda • Software Developer • Frontend, Backend, Data e IoT.",
};

export default function Contact() {
  const [selected, setSelected] = useState<Command>("help");
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("thiago.miranda.work@gmail.com");
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section id="contact" className="contact-section" aria-labelledby="contact-title">
      <div className="contact-container">
        <div className="contact-intro">
          <span className="contact-eyebrow">★ FINAL LEVEL / CONTACT</span>
          <h2 id="contact-title">LET&apos;S CONNECT</h2>
          <p>¿Tenés una idea, un proyecto o una oportunidad para colaborar? Elegí una opción y hablemos.</p>
        </div>

        <div className="contact-terminal">
          <div className="contact-terminal-header">
            <span className="contact-terminal-lights" aria-hidden="true"><i /><i /><i /></span>
            <span>THIAGO.EXE / CONTACT_TERMINAL</span>
            <span className="contact-online">● ONLINE</span>
          </div>

          <div className="contact-terminal-body">
            <div className="contact-console">
              <p className="contact-line-green">SYSTEM READY_</p>
              <p>Bienvenido a mi terminal de contacto.</p>
              <p>Seleccioná un comando para continuar.</p>
              <div className="contact-command-list" aria-label="Comandos de contacto">
                {(["github", "linkedin", "email", "about"] as Command[]).map((command) => (
                  <button
                    key={command}
                    type="button"
                    className={selected === command ? "contact-command selected" : "contact-command"}
                    onClick={() => {
                      setSelected(command);
                      setCopied(false);
                    }}
                    aria-pressed={selected === command}
                  >
                    <span aria-hidden="true">{selected === command ? "▶" : ">"}</span> {command}
                  </button>
                ))}
              </div>
              <p className="contact-prompt"><span>thiago@devquest</span>:~$ {selected}<span className="contact-cursor" aria-hidden="true">▌</span></p>
            </div>

            <div className="contact-result" aria-live="polite">
              <span className="contact-result-label">COMMAND OUTPUT</span>
              <h3>{selected === "help" ? "CONNECTION AVAILABLE" : selected.toUpperCase()}</h3>
              <p>{commandDetails[selected]}</p>

              {selected === "github" && (
                <a className="contact-main-action" href={destinations.github} target="_blank" rel="noopener noreferrer">↗ ABRIR GITHUB</a>
              )}
              {selected === "linkedin" && (
                <a className="contact-main-action" href={destinations.linkedin} target="_blank" rel="noopener noreferrer">↗ ABRIR LINKEDIN</a>
              )}
              {selected === "email" && (
                <div className="contact-email-actions">
                  <a className="contact-main-action" href={destinations.email}>✉ ENVIAR CORREO</a>
                  <button className="contact-copy" type="button" onClick={copyEmail}>{copied ? "✓ COPIADO" : "COPIAR EMAIL"}</button>
                </div>
              )}
              {selected === "about" && <a className="contact-main-action" href="#player">▶ VER PLAYER INFO</a>}
              {selected === "help" && <p className="contact-hint">TIP: probá seleccionar <strong>github</strong> o <strong>email</strong>.</p>}
            </div>
          </div>
        </div>

        <div className="contact-quick-links">
          <a href={destinations.github} target="_blank" rel="noopener noreferrer">GITHUB ↗</a>
          <a href={destinations.linkedin} target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a>
          <a href={destinations.email}>EMAIL ✉</a>
        </div>
        <p className="contact-footer">© {new Date().getFullYear()} THIAGO MIRANDA · BUILT WITH CODE & PIXELS</p>
      </div>
    </section>
  );
}
