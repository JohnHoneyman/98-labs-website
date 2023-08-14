import {
  ContactShadows,
  Environment,
  Float,
  Html,
  Lightformer,
  OrbitControls,
} from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { EffectComposer, Noise } from "@react-three/postprocessing";

import { useRef } from "react";
import * as THREE from "three";

const HtmlContent = () => {
  return (
    <Html
      fullscreen
      className="max-w-screen-2xl flex items-center justify-center"
    >
      <div className="flex flex-col items-center justify-center text-white select-none">
        <div className="text-8xl font-bold uppercase">Promoting businesses</div>
        <div className="text-center text-gray-100 translate-y-10">
          Expand your reach. Establish your presence online.
        </div>
        {/* <div className="text-center text-gray-300 translate-y-10">
          We can help you reach out, get feedback and build your online
          community through Internet-based marketing and social media. Expand
          your reach. Establish your online presence.
        </div> */}
      </div>
    </Html>
  );
};

const Composer = () => {
  return (
    <EffectComposer>
      {/* <Vignette
        offset={0.2}
        darkness={0.8}
        // eskil={false}
        // blendFunction={BlendFunction.SOFT_LIGHT}
      /> */}
      <Noise opacity={0.4} blendFunction={THREE.AdditiveBlending} premultiply />
    </EffectComposer>
  );
};

const Mesh = () => {
  const mesh = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    mesh.current.rotation.y = Math.sin(time * 0.2) + 1;
    mesh.current.rotation.x = Math.cos(time * 0.2) + 1;
  });

  return (
    <group scale={[3, 3, 3]} position-y={-3}>
      <Float speed={2} rotationIntensity={2} floatIntensity={2}>
        <mesh ref={mesh} castShadow receiveShadow>
          <torusKnotGeometry args={[1, 0.25, 256, 24, 1, 3]} />
          <meshStandardMaterial color="#f00" />
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

const Hero = () => {
  return (
    <>
      {/* <Perf position="bottom-left" /> */}
      <OrbitControls />
      <Composer />
      <HtmlContent />
      <Lights />
      <Mesh />
      <Env />
    </>
  );
};

const HeroCanvas = () => {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ near: 0.1, far: 200, position: [0, 0, 10], fov: 45 }}
    >
      <Hero />
    </Canvas>
  );
};

export default HeroCanvas;
