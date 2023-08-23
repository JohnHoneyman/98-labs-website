import { useRef } from "react";

const HeroLights = () => {
  const light = useRef();

  return (
    <>
      <ambientLight intensity={0.1} />
      <spotLight intensity={0.2} position={[0, 0, 10]} />;
      <pointLight ref={light} intensity={0.2} position={[-5, 0, 0]} />;
      <pointLight ref={light} intensity={0.2} position={[-5, 0, 5]} />;
      <pointLight ref={light} intensity={0.2} position={[5, 0, 5]} />;
    </>
  );
};

export default HeroLights;
