import * as THREE from "three";

import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal, useFrame, useThree } from "@react-three/fiber";

import { gsap } from "gsap";
import { useControls } from "leva";

import HeroScene from "../Hero/HeroScene";

import vertex from "../shaders/transition/vertex";
import fragment from "../shaders/transition/fragment";

import texture1 from "../../../assets/texture/1.png";
import texture2 from "../../../assets/texture/2.png";
import { PerspectiveCamera, Plane } from "@react-three/drei";

const PostTransition = () => {
  const scenes = [<HeroScene />];
  const state = useThree();
  const plane = useRef();
  const geometry = new THREE.PlaneGeometry(
    state.viewport.width,
    state.viewport.height,
    32,
    32
  );

  const [progress, setProgress] = useState(0);
  const [uFreqX, uFreqY] = [10, 5];
  const { uProgress, startProgress } = useControls("uFrequency", {
    uProgress: {
      value: progress,
      min: 0,
      max: 1,
      step: 0.01,
    },
    startProgress: false,
  });

  const material = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    uniforms: {
      uTexture1: { value: new THREE.TextureLoader().load(texture1) },
      uTexture2: { value: new THREE.TextureLoader().load(texture2) },
      uColor: { value: new THREE.Color(0xff0000) },
      uProgress: { value: uProgress },
    },
  });

  // useFrame((_, delta) => {
  //   if (startProgress) setProgress(progress < 1 ? progress + delta : 1);
  //   else setProgress(progress > 0 ? progress - delta : 0);
  // }, []);

  return (
    <>
      <mesh ref={plane} geometry={geometry} material={material}></mesh>
    </>
  );
};

export default PostTransition;
