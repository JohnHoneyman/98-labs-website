import Mobius from "./Mobius";
import HeroLights from "./HeroLights";
import HeroParticles from "./HeroParticles";
import HeroEnv from "./HeroEnv";

const HeroScene = () => {
  return (
    <>
      <HeroEnv color={0xffffff} />
      <HeroLights />
      {/* <Mobius /> */}
      <HeroParticles />
    </>
  );
};

export default HeroScene;
