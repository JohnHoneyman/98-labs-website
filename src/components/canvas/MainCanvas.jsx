import { Canvas, useFrame, useThree } from "@react-three/fiber";
import HeroScene from "./Hero/HeroScene";
import AboutScene from "./About/AboutScene";
import { Suspense, useEffect, useRef } from "react";
import {
  Html,
  Loader,
  Scroll,
  ScrollControls,
  useScroll,
} from "@react-three/drei";
import Hero from "../individual/Hero";
import About from "../individual/About";

const Scene = () => {
  const state_ = useThree();
  const scrollData = useScroll();

  useFrame(() => {
    // console.log(state_, scrollData);
    // console.log(scrollData.delta * 100);
    // console.log(state_);
  });

  return (
    <group>
      <Html fullscreen as="div" portal={{ current: scrollData.fixed }}>
        <Hero />
      </Html>
      <Html fullscreen position-y={-state_.viewport.height * 3.6}>
        <About />
      </Html>
    </group>
  );
};

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
          {/* <Suspense fallback={<Loader />}> */}
          <ScrollControls pages={3} damping={0.2}>
            <Scene />
            <Scroll>
              <HeroScene />
            </Scroll>
          </ScrollControls>
          {/* </Suspense> */}
        </Canvas>
      </div>
    </>
  );
};

export default MainCanvas;
