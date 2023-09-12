import * as THREE from "three";

import vertexShader from "../shaders/hero/vertex";
import fragmentShader from "../shaders/hero/fragment";
import circleImg from "../../../assets/circle.png";
import { useFrame, useLoader } from "@react-three/fiber";
import { useCallback, useMemo, useRef } from "react";
import { OrbitControls } from "@react-three/drei";

const Points = () => {
  const imgTex = useLoader(THREE.TextureLoader, circleImg);

  const bufferRef = useRef();

  let t = 0;
  let f = 0.0002;
  let a = 3; // Amplitude
  // const graph = useCallback(
  //   (x, z) => {
  //     return Math.sin(f * (x ** 2 + z ** 2 + t)) * a;
  //   },
  //   [t, f, a]
  // );
  const graph = useCallback(
    (x, z) => {
      return 2 ** Math.sin(f * (x ** 2 + z ** 2 + t)) * a;
    },
    [t, f, a]
  );

  const count = 200;
  const sep = 3;
  let positions = useMemo(() => {
    let positions = [];

    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        let x = sep * (xi - count / 2);
        let z = sep * (zi - count / 2) + 50;
        // let y = graph(x, z);
        let y = -20;
        positions.push(x, y, z);
      }
    }
    return new Float32Array(positions);
  }, [count, sep, graph]);

  useFrame((_, delta) => {
    t += delta * 500;
    const positions = bufferRef.current.array;

    let i = 0;
    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        let x = sep * (xi - count / 2);
        let z = sep * (zi - count / 2) + 50;

        positions[i + 1] = graph(x, z) - 20;
        i += 3;
      }
    }

    bufferRef.current.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          ref={bufferRef}
          attach={"attributes-position"}
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        map={imgTex}
        color={0xffffff}
        size={1}
        sizeAttenuation
        transparent={true}
        alphaTest={0.1}
        opacity={0.5}
      />
    </points>
  );
};

const HeroParticles = () => {
  return (
    <>
      <Points />
    </>
  );
};

export default HeroParticles;
