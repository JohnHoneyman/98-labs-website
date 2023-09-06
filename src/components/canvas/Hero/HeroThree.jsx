import * as THREE from "three";
import { useRef, useState } from "react";
import { createPortal, extend, useFrame, useThree } from "@react-three/fiber";
import {
  PerspectiveCamera,
  Scroll,
  shaderMaterial,
  useFBO,
  useScroll,
} from "@react-three/drei";

import vertexShader from "../shaders/transition/vertex";
import fragmentShader from "../shaders/transition/fragment";
import HeroScene from "./HeroScene";
import AboutScene from "../About/AboutScene";

const uniforms = {
  textureA: {
    value: null,
  },
  textureB: {
    value: null,
  },
  uTime: {
    value: 0.0,
  },
  uProgress: {
    progress: 0.0,
  },
};

const SwipeShaderMaterial = shaderMaterial(
  uniforms,
  vertexShader,
  fragmentShader
);

extend({ SwipeShaderMaterial });

const HeroThree = () => {
  const screenMesh = useRef();
  const screenMat = useRef();
  const screenCamera = useRef();

  const { viewport } = useThree();

  const scenes = [
    <HeroScene />,
    <AboutScene />,
    <>
      <ambientLight />
      <mesh scale={5}>
        <boxGeometry />
        <meshBasicMaterial />
      </mesh>
    </>,
  ];
  const scene = scenes.map(() => new THREE.Scene());
  const renderTarget = scenes.map(() => useFBO());

  const scroll = useScroll();
  let currentScene = 0;
  let nextScene = 0;
  let progress = 0;
  let currentState = 0;

  useFrame((state) => {
    /**
     * Scroll
     */
    if (currentState % 1 > 0.25) {
      currentState = THREE.MathUtils.lerp(
        currentState,
        Math.floor(currentState) + 1,
        0.05
      );
    } else {
      currentState = THREE.MathUtils.lerp(
        currentState,
        Math.floor(currentState),
        0.05
      );
    }
    currentState += scroll.delta;
    currentState = (currentState + scenes.length) % scenes.length;

    /**
     * Swipe Transition
     */
    const { gl, camera } = state;
    currentScene = Math.floor(currentState);
    nextScene = Math.floor((currentState + 1) % scenes.length);

    progress = currentState % 1;

    // console.log(currentScene, nextScene, progress, currentState);

    gl.setRenderTarget(renderTarget[currentScene]);
    gl.render(scene[currentScene], camera);

    gl.setRenderTarget(renderTarget[nextScene]);
    gl.render(scene[nextScene], camera);

    screenMesh.current.material.uniforms.textureA.value =
      renderTarget[currentScene].texture;
    screenMesh.current.material.uniforms.textureB.value =
      renderTarget[nextScene].texture;

    screenMat.current.uProgress = progress;

    gl.setRenderTarget(null);
  });

  return (
    <>
      {scenes.map((s, i) =>
        createPortal(<Scroll key={i}>{s}</Scroll>, scene[i])
      )}
      <PerspectiveCamera
        ref={screenCamera}
        position={[0, 0, 8]}
        fov={45}
        near={0.1}
        far={200}
      />
      <mesh
        ref={screenMesh}
        frustumCulled={false}
        // onPointerEnter={() => setHovered(true)}
        // onPointerLeave={() => setHovered(false)}
      >
        <planeGeometry args={[viewport.width, viewport.height]} />
        <swipeShaderMaterial ref={screenMat} />
      </mesh>
    </>
  );
};

export default HeroThree;
