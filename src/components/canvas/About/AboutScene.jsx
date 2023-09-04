import {
  ContactShadows,
  Environment,
  Float,
  Html,
  Lightformer,
  Line,
  OrbitControls,
  PerspectiveCamera,
  Point,
  PointMaterial,
  Points,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import CameraRig from "../shared/CameraRig";
import { useControls } from "leva";
import { Loader } from "../Loader";

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
      <DepthOfField focusDistance={0.04} focalLength={0.025} bokehScale={5} />
    </EffectComposer>
  );
};

// TODO: Particles and Blur

const Mesh = ({ vec = new THREE.Vector3() }) => {
  const mesh = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.y = Math.sin(time * 0.05) + 1;
    mesh.current.rotation.x = Math.cos(time * 0.05) + 1;
  });

  return (
    <group scale={[3, 3, 3]} position-y={-3}>
      <Float speed={0.5} rotationIntensity={2} floatIntensity={2}>
        <mesh ref={mesh} position={[0, 0.5, 0]} castShadow receiveShadow>
          {/* <torusKnotGeometry args={[1, 0.25, 128, 24, 1, 3]} /> */}
          <sphereGeometry args={[1, 20, 20]} />
          <meshStandardMaterial color="#80ffff" wireframe />
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
        color={"#80ffff"}
        intensity={0.75}
        rotation-x={Math.PI / 2}
        position={[5, 7, -9]}
        scale={[10, 10, 1]}
      />
    </>
  );
};

const Lights = () => {
  return (
    <>
      <ambientLight intensity={0.05} />
      <spotLight intensity={0.2} position={[0, 0, 10]} />
    </>
  );
};

const Particles = () => {
  const positions = Array.from({ length: 10 }, (i) => [
    THREE.MathUtils.randFloatSpread(8),
    THREE.MathUtils.randFloatSpread(8),
    THREE.MathUtils.randFloatSpread(8),
  ]);

  return (
    <>
      <Points limit={positions.length}>
        <PointMaterial
          vertexColors
          size={10}
          sizeAttenuation={false}
          depthWrite={false}
          toneMapped={false}
        />
        {positions.map((position, i) => (
          <Point key={i} index={i} position={position} color="#80ffff"></Point>
        ))}
      </Points>
    </>
  );
};

function PointEvent({ index, ...props }) {
  return <Point {...props} color="#80ffff"></Point>;
}

const AboutScene = () => {
  return (
    <>
      {/* <Composer /> */}
      <Env />
      <Suspense fallback={<Loader />}>
        {/* <OrbitControls /> */}
        <Lights />
        <Mesh />
        <Particles />
      </Suspense>
    </>
  );
};

export default AboutScene;
