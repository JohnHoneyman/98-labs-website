import * as THREE from "three";
import {
  AccumulativeShadows,
  Environment,
  Html,
  OrbitControls,
  RandomizedLight,
  useHelper,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, Suspense } from "react";

import HeroOverlay from "./HeroOverlay";
import { useControls } from "leva";
import { Bloom, EffectComposer } from "@react-three/postprocessing";

const HtmlContent = () => {
  return (
    <Html
      fullscreen
      className="max-w-[700px] m-auto pl-10 flex flex-col justify-center"
    >
      <div className="mb-8 font-semibold tracking-wider text-7xl text-white bg-transparent">
        Promoting businesses
      </div>
      <div className="text-gray-300 font-semibold">
        <p className=" bg-transparent">
          We can help you reach out, get feedback and build your online
          community through Internet-based marketing and social media. Expand
          your reach. Establish your online presence.
        </p>
      </div>
    </Html>
  );
};

const Hero = () => {
  const shadows = useRef();
  const position = { x: 3.6, y: -0.6, z: 0 };
  const rotation = { x: -0.9, y: -0.7, z: 0 };
  const meshScale = 4.21;
  // const { posX, posY, posZ, rotX, rotY, rotZ, scale } = useControls("mesh", {
  //   posX: {
  //     value: position.x,
  //     step: 0.1,
  //     min: -10,
  //     max: 10,
  //     joystick: "invertY",
  //   },
  //   posY: {
  //     value: position.y,
  //     step: 0.1,
  //     min: -10,
  //     max: 10,
  //     joystick: "invertY",
  //   },
  //   posZ: {
  //     value: position.z,
  //     step: 0.1,
  //     min: -10,
  //     max: 10,
  //     joystick: "invertY",
  //   },
  //   rotX: {
  //     value: rotation.x,
  //     step: 0.1,
  //     min: -10,
  //     max: 10,
  //     joystick: "invertY",
  //   },
  //   rotY: {
  //     value: rotation.y,
  //     step: 0.1,
  //     min: -10,
  //     max: 10,
  //     joystick: "invertY",
  //   },
  //   rotZ: {
  //     value: rotation.z,
  //     step: 0.1,
  //     min: -10,
  //     max: 10,
  //     joystick: "invertY",
  //   },
  //   scale: {
  //     value: meshScale,
  //     step: 0.01,
  //     min: 0,
  //     max: 5,
  //   },
  // });

  const [meshRadius, meshTube, meshRadialSegments, meshTubularSegments] = [
    0.9, 0.54, 30, 48,
  ];

  // const { radius, tube, radialSegments, tubularSugments } = useControls(
  //   "torusProperties",
  //   {
  //     radius: { value: 0.9, step: 0.1 },
  //     tube: { value: 0.54, step: 0.01, min: 0, max: 1 },
  //     radialSegments: { value: 30, step: 0.1 },
  //     tubularSugments: { value: 48, step: 0.1 },
  //   }
  // );

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

  const meshRef = useRef();
  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(time) * 0.1;
  });

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
      <ambientLight intensity={100} />
      <pointLight intensity={50} position={[2.5, 1.0, 0]} />
      <pointLight intensity={50} position={[-5.5, 6.4, 5.5]} />
      {/* <OrbitControls enableZoom={false} /> */}
      <Suspense>
        <HtmlContent />
        <mesh
          scale={meshScale}
          ref={meshRef}
          position={[position.x, position.y, position.z]}
          rotation={[rotation.x, rotation.y, rotation.z]}
        >
          <torusGeometry
            args={[
              meshRadius,
              meshTube,
              meshRadialSegments,
              meshTubularSegments,
            ]}
          />
          <meshStandardMaterial color="#ff0000" roughness={0} metalness={1} />
        </mesh>
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
