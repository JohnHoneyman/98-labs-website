import * as THREE from "three";
import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Html,
  Loader,
  OrbitControls,
  Scroll,
  ScrollControls,
  useScroll,
} from "@react-three/drei";
import { Perf } from "r3f-perf";

import { Lethargy } from "lethargy";

import Hero from "../individual/Hero";
import About from "../individual/About";

import HeroScene from "./Hero/HeroScene";
import AboutScene from "./About/AboutScene";

import PostTransition from "./shared/Transition";
import CameraRig from "./shared/CameraRig";

const Scene3D = () => {
  const scenes = [<HeroScene />, <AboutScene />];

  return (
    <>
      <PostTransition />
      <CameraRig>{scenes}</CameraRig>
    </>
  );
};

const HtmlScene = () => {
  const state_ = useThree();
  const scrollData = useScroll();

  return (
    <group>
      <Html fullscreen as="div" portal={{ current: scrollData.fixed }}>
        <Hero />
      </Html>
      <Html fullscreen position-y={-state_.viewport.height * 5}>
        {/* <Html fullscreen> */}
        <About />
      </Html>
    </group>
  );
};

const MainCanvas = () => {
  return (
    <>
      <div className="fixed h-full w-full">
        <Canvas
          shadows
          dpr={[1, 2]}
          camera={{ near: 0.1, far: 200, position: [0, 0, 8], fov: 45 }}
          className="touch-none"
        >
          <Suspense
            fallback={
              <Html>
                <div></div>
              </Html>
            }
          >
            <Perf position="bottom-right" />
            <ScrollControls pages={3} damping={0.2}>
              <HtmlScene />
              <Scroll>
                <Scene3D />
              </Scroll>
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>
    </>
  );
};

export default MainCanvas;
