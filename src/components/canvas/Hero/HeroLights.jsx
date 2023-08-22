import { useRef } from "react";
import * as THREE from "three";
import { useHelper } from "@react-three/drei";

const HeroLights = () => {
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

export default HeroLights;
