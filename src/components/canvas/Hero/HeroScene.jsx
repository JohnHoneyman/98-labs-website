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
  Scroll,
  ScrollControls,
  useHelper,
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
import About from "../../individual/About";
import { BlendFunction } from "postprocessing";
import Mobius from "./Mobius";

const Composer = () => {
  return (
    <EffectComposer>
      {/* <Vignette
        offset={0.2}
        darkness={0.8}
        // eskil={false}
        // blendFunction={BlendFunction.SOFT_LIGHT}
      /> */}
      {/* <Noise
        opacity={0.01}
        blendFunction={THREE.AdditiveBlending}
        premultiply
      /> */}
      {/* <Noise opacity={0.1} blendFunction={BlendFunction.SCREEN} premultiply /> */}

      <DepthOfField focusDistance={0.04} focalLength={0.025} bokehScale={5} />
    </EffectComposer>
  );
};

// const Mesh = ({ vec = new THREE.Vector3(), color = "#ff0000" }) => {
//   const mesh = useRef();

//   useFrame((state) => {
//     const time = state.clock.getElapsedTime();
//     mesh.current.rotation.y = Math.sin(time * 0.05) + 1;
//     mesh.current.rotation.x = Math.cos(time * 0.05) + 1;
//   });

//   return (
//     <group scale={[3, 3, 3]} position-y={-3}>
//       <Float speed={0.5} rotationIntensity={2} floatIntensity={2}>
//         <mesh ref={mesh} castShadow receiveShadow>
//           <torusKnotGeometry args={[1, 0.25, 128, 24, 1, 3]} />
//           <meshStandardMaterial color={color} wireframe />
//         </mesh>
//       </Float>
//     </group>
//   );
// };

// const Mesh = () => {
//   const count = 256;
//   const radius = 1.1;
//   const strip = useRef();

//   useFrame((state) => {
//     const time = state.clock.getElapsedTime();
//     strip.current.rotation.y = time * 0.1; // Rotate the strip over time
//   });

//   const aStep = (Math.PI / count) * 2;

//   return (
//     <group ref={strip}>
//       {Array.from({ length: count }).map((_, i) => {
//         const a = aStep * i;
//         const position = [Math.cos(a), Math.sin(a * 5) / 30, Math.sin(a)].map(
//           (coord) => coord * radius
//         );
//         const color = `hsl(${(a * 360) / Math.PI}, 55%, 55%)`;
//         // const color = `#ffffff`;

//         return (
//           <group key={i} position={position}>
//             <mesh castShadow>
//               <boxGeometry />
//               <meshPhongMaterial color={color} />
//             </mesh>
//           </group>
//         );
//       })}
//     </group>
//   );
// };

const Mesh = () => {
  return (
    <Mobius
      color="#fff"
      scale={[3.5, 3.5, 3.5]}
      stripLengthY={1}
      rotation-x={4}
      rotationSpeedX={0.001}
      castShadow
      receiveShadow
    />
  );

  // return <Mobius />;
};

const Env = ({ color = "#ff0000" }) => {
  return (
    <Environment frames={Infinity} background resolution={256} blur={1}>
      <LightFormers color={color} />
    </Environment>
  );
};

const LightFormers = ({ color = "#ff0000" }) => {
  const { x, y, z } = useControls("bg-light", {
    x: {
      value: 2,
      step: 1,
    },
    y: {
      value: 2,
      step: 1,
    },
    // y: {
    //   value: 5,
    //   step: 1,
    // },
    z: {
      value: -9,
      step: 1,
    },
  });
  return (
    <>
      <Lightformer
        color={color}
        intensity={0.75}
        rotation-x={Math.PI / 2}
        position={[x, y, z]}
        scale={[10, 10, 1]}
      />
    </>
  );
};

const Lights = () => {
  const light = useRef();

  useHelper(light, THREE.PointLightHelper);
  return (
    <>
      <ambientLight intensity={0.05} />
      <spotLight intensity={0.2} position={[0, 0, 10]} />;
      <pointLight ref={light} intensity={0.2} position={[-5, 0, 0]} />;
      <pointLight ref={light} intensity={0.2} position={[-5, 0, 5]} />;
      <pointLight ref={light} intensity={0.2} position={[5, 0, 5]} />;
    </>
  );
};

const Particles = ({ color = "#ff0000" }) => {
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
          <Point key={i} index={i} position={position} color={color}></Point>
        ))}
      </Points>
    </>
  );
};

function PointEvent({ index, color = "#ff0000", ...props }) {
  return <Point {...props} color={color}></Point>;
}

const HeroScene = () => {
  const color = "#ffffff";
  return (
    <>
      {/* <Composer /> */}
      <Env color={color} />
      <CameraRig>
        {/* <OrbitControls /> */}
        <Lights />
        <Mesh />
        {/* <Mesh color={color} /> */}
        {/* <Particles color={color} /> */}
        <Particles color={"#ff0000"} />
      </CameraRig>
    </>
  );
};

export default HeroScene;
