import Mobius from "./Mobius";
import HeroLights from "./HeroLights";
import HeroParticles from "./HeroParticles";
import HeroEnv from "./HeroEnv";
import HeroComposer from "./HeroComposer";
import { Sky } from "@react-three/drei";

// const HeroScene = () => {
//   const color = "#ffffff";
//   return (
//     <>
//       <HeroComposer enabled noise2 />
//       <HeroEnv color={color} />
//       {/* <OrbitControls /> */}
//       <HeroLights />
//       <Mobius scale={1} />
//       <HeroParticles color={"#ff0000"} />
//     </>
//   );
// };

const HeroScene = () => {
  return (
    <>
      <Sky />
      {/* <ambientLight /> */}
      <Mobius />
    </>
  );
};

export default HeroScene;
