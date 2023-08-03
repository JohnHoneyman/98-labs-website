import * as THREE from "three";
import { OrbitControls, useHelper } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, Suspense } from "react";

import HeroOverlay from "./HeroOverlay";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
} from "@react-three/postprocessing";
import HeroMesh from "./HeroMesh";
import HeroParticles from "./HeroParticles";
import { useControls } from "leva";
import { Perf } from "r3f-perf";
import HeroLights from "./HeroLights";

const Hero = () => {
  const pointLight = useRef();
  useHelper(pointLight, THREE.PointLightHelper, 1);
  // const { lightX, lightY, lightZ } = useControls({
  //   lightX: {
  //     value: 1.2,
  //     step: 0.1,
  //   },
  //   lightY: {
  //     value: 1,
  //     step: 0.1,
  //   },
  //   lightZ: {
  //     value: 0,
  //     step: 0.1,
  //   },
  // });

  return (
    <>
      <EffectComposer>
        <Bloom
          mipmapBlur
          intensity={0.1}
          luminanceThreshold={0}
          luminanceSmoothing={0.1}
          height={300}
        />
      </EffectComposer>

      <Perf position="top-left" />

      <color args={["#2c1414"]} attach="background" />

      {/* <OrbitControls enableZoom={true} /> */}
      <HeroLights />
      <Suspense>
        <HeroOverlay />
        <HeroMesh />
        <HeroParticles />
      </Suspense>
    </>
  );
};

const HeroCanvas = () => {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
      <Hero />
    </Canvas>
  );
};

export default HeroCanvas;
