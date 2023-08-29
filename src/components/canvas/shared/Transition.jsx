import * as THREE from "three";

import { useRef } from "react";
import { useThree } from "@react-three/fiber";

import vertex from "../shaders/transition/vertex";
import fragment from "../shaders/transition/fragment";
import { useControls } from "leva";

const PostTransition = () => {
  const state = useThree();
  const plane = useRef();
  const geometry = new THREE.PlaneGeometry(
    state.viewport.width,
    state.viewport.height,
    32,
    32
  );

  const count = geometry.attributes.position.count;
  const randoms = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    randoms[i] = Math.random();
  }

  geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));

  const progress = 0;
  const [uFreqX, uFreqY] = [10, 5];
  const { uFrequencyX, uFrequencyY, uProgress } = useControls("uFrequency", {
    uFrequencyX: {
      value: uFreqX,
      min: 0,
      max: 10,
      step: 0.1,
    },
    uFrequencyY: {
      value: uFreqY,
      min: 0,
      max: 10,
      step: 0.1,
    },
    uProgress: {
      value: progress,
      min: 0,
      max: 1,
      step: 0.01,
    },
  });
  const material = new THREE.ShaderMaterial({
    side: THREE.DoubleSide,
    vertexShader: vertex,
    fragmentShader: fragment,
    transparent: true,
    uniforms: {
      uFrequency: { value: new THREE.Vector2(uFrequencyX, uFrequencyY) },
      uProgress: { value: uProgress },
    },
  });

  return <mesh ref={plane} geometry={geometry} material={material}></mesh>;
};

export default PostTransition;
