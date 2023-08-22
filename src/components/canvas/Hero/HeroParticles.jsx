import * as THREE from "three";
import { Point, PointMaterial, Points } from "@react-three/drei";

const HeroParticles = ({ color = "#ff0000" }) => {
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

export default HeroParticles;
