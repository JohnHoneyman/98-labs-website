import * as THREE from "three";
import { useRef, useMemo } from "react";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useFrame } from "@react-three/fiber";

const HeroParticles = () => {
  const mesh = useRef();
  const light = useRef();

  const count = 1000;

  const particles = useMemo(() => {
    const particles = [];
    for (let i = 0; i < count; i++) {
      const time = Math.random() * 101;
      const factor = Math.random() * 101 + 20;
      const speed = Math.random() * 0.005 * 0.1;
      const x = Math.random() * 101 - 50;
      const y = Math.random() * 101 - 50;
      const z = Math.random() * 101 - 50;

      particles.push({ time, factor, speed, x, y, z });
    }
    return particles;
  }, [count]);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(() => {
    // Run through the randomized data to calculate some movement
    particles.forEach((particle, index) => {
      let { factor, speed, x, y, z } = particle;

      // Update the particle time
      const t = (particle.time += speed);

      // Update the particle position based on the time
      // This is mostly random trigonometry functions to oscillate around the (x, y, z) point
      dummy.position.set(
        x + Math.cos((t / 10) * factor) + (Math.sin(t * 1) * factor) / 10,
        y + Math.sin((t / 10) * factor) + (Math.cos(t * 2) * factor) / 10,
        z + Math.cos((t / 10) * factor) + (Math.sin(t * 3) * factor) / 10
      );

      // Derive an oscillating value which will be used
      // for the particle size and rotation
      const s = Math.cos(t);
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();

      // And apply the matrix to the instanced item
      mesh.current.setMatrixAt(index, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      <EffectComposer>
        <Bloom
          // must set tonemapping to false on mesh color value needs to be greater than 1 or emmissive
          mipmapBlur
          intensity={0.1}
          luminanceThreshold={0}
          luminanceSmoothing={0.1}
          height={300}
        />
      </EffectComposer>
      <pointLight ref={light} distance={40} intensity={8} color="lightblue" />
      <instancedMesh ref={mesh} scale={0.5} args={[null, null, count]}>
        <dodecahedronGeometry args={[0.02, 0]} />
        <meshBasicMaterial color={[4, 1, 1]} toneMapped={false} />
      </instancedMesh>
    </>
  );
};

export default HeroParticles;
