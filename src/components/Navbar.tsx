
"use client";

import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const links = [
    { name: "HOME", href: "#home" },
    { name: "PLAYER", href: "#player" },
    { name: "SKILLS", href: "#skills" },
    { name: "MISSIONS", href: "#missions" },
    { name: "CONTACT", href: "#contact" },
  ];

  return (
    <header className="navbar">
      <a href="#home" className="navbar-logo">
        THIAGO<span>.EXE</span>
      </a>

      <button
        type="button"
        className="menu-toggle"
        aria-label="Abrir o cerrar menú"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      <nav className={open ? "nav-links open" : "nav-links"}>
        {links.map((link) => (
          <a
            key={link.name}
            href={link.href}
            onClick={() => setOpen(false)}
          >
            {link.name}
          </a>
        ))}
      </nav>
    </header>
  );
}
