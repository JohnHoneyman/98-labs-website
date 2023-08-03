const HeroLights = () => {
  return (
    <>
      {/* <ambientLight intensity={0.3} /> */}
      <pointLight intensity={50} position={[2.5, 1.0, 0]} />
      <pointLight intensity={50} position={[-5.5, 6.4, 5.5]} />
    </>
  );
};

export default HeroLights;
