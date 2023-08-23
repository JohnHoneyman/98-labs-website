import * as THREE from "three";
import { Float, Point, PointMaterial, Points } from "@react-three/drei";
import { useControls } from "leva";

const ParticleSystem = (count = 50) => {
  const radius = 2;
  const spread = 3;
  const xOffset = -1;
  const yOffset = -3;

  return (
    <group>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;

        const randomScale = Math.random() * 0.2;

        const randomOffset = Math.random() * spread;
        const randomRadius = radius + randomOffset;
        const x = randomRadius * Math.cos(angle) + xOffset;
        const y = randomRadius * Math.sin(angle * 1) + yOffset;
        const z =
          -randomRadius * (randomRadius < 0.1 ? 1 : -1) * Math.cos(angle) +
          yOffset * 0.5;

        return (
          <Float key={i} speed={0.8} rotationIntensity={1} floatIntensity={0.9}>
            <mesh
              rotation-z={1.6}
              scale={randomScale}
              position={[x, y, z]}
              receiveShadow={false}
              castShadow={false}
            >
              <circleGeometry args={[1, 5]} />

              <meshStandardMaterial
                toneMapped={false}
                color={[3, 3, 3]}
                emissive="white"
                emissiveIntensity={0.05}
                transparent
                opacity={0.1}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
};

const SmallParticleSystem = (count = 25) => {
  const radius = 1;
  const spread = 1;
  const xOffset = 2;
  const yOffset = -2;
  const zOffset = 2;

  return (
    <group>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;

        const randomScale = Math.random() * 0.05;

        const randomOffset = Math.random() * spread;
        const randomRadius = radius + randomOffset;
        const x = randomRadius * Math.cos(angle) + xOffset;
        const y = randomRadius * Math.sin(angle * 1) + yOffset;
        const z =
          -randomRadius * (randomRadius < 0.1 ? 1 : -1) * Math.cos(angle) +
          +zOffset;

        return (
          <Float key={i} speed={0.8} rotationIntensity={1} floatIntensity={0.9}>
            <mesh
              rotation-z={1.6}
              scale={randomScale}
              position={[x, y, z]}
              receiveShadow={false}
              castShadow={false}
            >
              <circleGeometry args={[1, 5]} />

              <meshStandardMaterial
                toneMapped={false}
                color={[25, 3, 3]}
                emissive="red"
                emissiveIntensity={0.02}
                transparent
                opacity={0.05}
              />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
};

const HeroParticles = () => {
  return (
    <group>
      {ParticleSystem()}
      {SmallParticleSystem()}
    </group>
  );
};

export default HeroParticles;
