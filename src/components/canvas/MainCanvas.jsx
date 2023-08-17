import { Canvas } from "@react-three/fiber";
import HeroScene from "./Hero/HeroScene";
import AboutScene from "./About/AboutScene";
import { Suspense } from "react";
import { Loader, Scroll, ScrollControls } from "@react-three/drei";
import Hero from "../individual/Hero";
import About from "../individual/About";

const MainCanvas = ({ scene }) => {
  return (
    <>
      <div className="fixed h-full w-full">
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ near: 0.1, far: 200, position: [0, 0, 4], fov: 45 }}
          className="touch-none"
        >
          <Suspense fallback={<Loader />}>
            <ScrollControls pages={4} damping={0.2}>
              <Scroll>
                <HeroScene />
              </Scroll>
              <Scroll html>
                <Hero />
                <About />
              </Scroll>
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>
    </>
  );
};

export default MainCanvas;
