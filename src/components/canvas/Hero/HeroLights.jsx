const HeroLights = () => {
  return (
    <group>
      <ambientLight intensity={0.1} />
      <spotLight intensity={0.2} position={[0, 0, 10]} />
      <pointLight intensity={0.2} position={[-5, 0, 0]} />
      <pointLight intensity={0.2} position={[-5, 0, 5]} />
      <pointLight intensity={0.2} position={[5, 0, 5]} />
    </group>
  );
};

export default HeroLights;
