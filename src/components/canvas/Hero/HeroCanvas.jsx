import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  OrbitControls,
  PerspectiveCamera,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Noise, Vignette } from "@react-three/postprocessing";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import CameraRig from "./CameraRig";

const Composer = () => {
  return (
    <EffectComposer>
      <Vignette
        offset={0.2}
        darkness={0.8}
        // eskil={false}
        // blendFunction={BlendFunction.SOFT_LIGHT}
      />
      <Noise opacity={0.4} blendFunction={THREE.AdditiveBlending} premultiply />
    </EffectComposer>
  );
};

const Mesh = ({ vec = new THREE.Vector3() }) => {
  const mesh = useRef();

  // TODO: DREI CAMERA CONTROLS
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.y = Math.sin(time * 0.05) + 1;
    mesh.current.rotation.x = Math.cos(time * 0.05) + 1;
  });

  return (
    <group scale={[3, 3, 3]} position-y={-3}>
      <Float speed={0.5} rotationIntensity={2} floatIntensity={2}>
        <mesh ref={mesh} castShadow receiveShadow>
          <torusKnotGeometry args={[1, 0.25, 128, 24, 1, 3]} />
          <meshStandardMaterial color="#ff0000" wireframe />
        </mesh>
      </Float>
      <ContactShadows
        scale={100}
        blur={1}
        opacity={1}
        far={10}
        position-y={-2}
      />
    </group>
  );
};

const Env = () => {
  return (
    <Environment frames={Infinity} background resolution={256} blur={1}>
      <LightFormers />
    </Environment>
  );
};

const LightFormers = () => {
  return (
    <>
      <Lightformer
        color={"#ff0000"}
        intensity={0.75}
        rotation-x={Math.PI / 2}
        position={[5, 7, -9]}
        scale={[10, 10, 1]}
      />
      {/* <Lightformer
        color={"#ff0000"}
        intensity={0.75}
        rotation-x={Math.PI / 2}
        position={[-8, 5, -5]}
        scale={[10, 10, 1]}
      /> */}
    </>
  );
};

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.05} />
      <spotLight intensity={0.2} position={[0, 0, 10]} />;
    </>
  );
};

const Particles = () => {
  return (
    <>
      <group>
        <mesh>
          <icosahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#ffffff" wire />
        </mesh>
      </group>
    </>
  );
};

const Camera = (props) => {
  return <PerspectiveCamera makeDefault {...props} position={[0, -5, -5]} />;
};

const Hero = () => {
  return (
    <>
      <Env />
      <CameraRig>
        {/* <OrbitControls /> */}
        <Composer />
        <Lights />
        <Mesh />
        <Particles />
      </CameraRig>
    </>
  );
};

const HeroCanvas = (props) => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ near: 0.1, far: 200, position: [0, 0, 10], fov: 45 }}
      className="touch-none"
    >
      <Hero />
    </Canvas>
  );
};

export default HeroCanvas;
