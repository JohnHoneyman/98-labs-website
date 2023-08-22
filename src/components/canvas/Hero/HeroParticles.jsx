import * as THREE from "three";
import { Point, PointMaterial, Points } from "@react-three/drei";
import { useControls } from "leva";

// const HeroParticles = ({ color = "#ff0000" }) => {
//   const positions = Array.from({ length: 10 }, () => [
//     THREE.MathUtils.randFloatSpread(5),
//     THREE.MathUtils.randFloatSpread(5),
//     THREE.MathUtils.randFloatSpread(5),
//   ]);

//   return (
//     <>
//       <Points limit={positions.length}>
//         <PointMaterial
//           vertexColors
//           size={10}
//           sizeAttenuation={false}
//           depthWrite={false}
//           toneMapped={false}
//         />
//         {positions.map((position, i) => (
//           <Point key={i} index={i} position={position} color={color}></Point>
//         ))}
//       </Points>
//     </>
//   );
// };6

// TODO: Second

// const Geometry = (particlesDistance = 10) => {
//   const particlesGeometry = new THREE.SphereGeometry(1, 32, 32);
//   const count = 20000;

//   const positions = new Float32Array(count * 3);

//   for (let i = 0; i < count * 3; i++) {
//     positions[i] = (Math.random() - 0.5) * particlesDistance;
//   }

//   particlesGeometry.setAttribute(
//     "position",
//     new THREE.BufferAttribute(positions, 3)
//   );

//   return particlesGeometry;
// };

// const HeroParticles = ({ color = "#ff0000" }) => {
//   const particlesMaterial = new THREE.PointsMaterial({
//     color: 0xffffff,
//     size: 0.1,
//     sizeAttenuation: true, // true=big dots, false=small dots
//   });

//   return (
//     <points
//       position-z={-1}
//       geometry={Geometry()}
//       material={particlesMaterial}
//     ></points>
//   );
// };

// z = x^2
// TODO: Third
const ParticleSystem = (count = 20) => {
  return (
    <group>
      {Array.from({ length: count }).map((_, i) => {
        return (
          <mesh
            rotation-z={1.6}
            scale={Math.random() * 0.5}
            position={[0, -1, 0]}
          >
            <circleGeometry args={[1, 5]} />
            <meshStandardMaterial
              side={THREE.DoubleSide}
              opacity={0.2}
              transparent
            />
          </mesh>
        );
      })}
    </group>
  );
};

const HeroParticles = () => {
  return ParticleSystem();
};

export default HeroParticles;
