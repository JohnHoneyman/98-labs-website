import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";

const HeroCanvas = ({ className }) => {
  return (
    <Canvas className={className}>
      <OrbitControls enableZoom={false} />
      <Suspense>
        <mesh>
          <boxGeometry />
          <meshStandardMaterial />
        </mesh>
      </Suspense>
    </Canvas>
  );
};

export default HeroCanvas;
