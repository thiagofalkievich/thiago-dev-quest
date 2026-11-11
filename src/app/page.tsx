import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PlayerInfo from "@/components/PlayerInfo";
import Inventory from "@/components/Inventory";
import Missions from "@/components/Missions";
import Contact from "@/components/Contact";
import GameScene from "@/game/GameScene";

import "@/components/player-info.css";
import "./responsive.css";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <GameScene />
      <PlayerInfo />
      <Inventory />
      <Missions />
      <Contact />
    </main>
  );
}
