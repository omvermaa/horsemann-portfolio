import MainScene from "@/components/scenes/MainScene";
import UIOverlay from "@/components/ui/UIOverlay";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main className="main-wrapper">
      {/* 3D Core Experience */}
      <div className="canvas-container">
        <MainScene />
      </div>

      {/* 2D HTML Overlays */}
      <div className="ui-layer">
        <UIOverlay />
      </div>
    </main>
  );
}
