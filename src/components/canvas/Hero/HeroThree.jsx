import * as THREE from "three";
import { useRef, useState } from "react";
import { createPortal, extend, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  PerspectiveCamera,
  Scroll,
  ScrollControls,
  Sky,
  shaderMaterial,
  useFBO,
  useScroll,
} from "@react-three/drei";

import CameraRig from "../shared/CameraRig";

import { useGesture } from "@use-gesture/react";

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

  const renderTargetA = useFBO();
  const renderTargetB = useFBO();

  const { viewport } = useThree();
  const [hovered, setHovered] = useState(false);

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
  let previousState = 0;

  useFrame((state) => {
    /**
     * Scroll
     */
    if (previousState < currentState) currentState += scroll.delta;
    if (previousState > currentState) currentState -= scroll.delta;
    previousState = currentState;
    currentState = (currentState + 3000) % 3;

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
