import { Canvas } from "@react-three/fiber";
import HeroScene from "./Hero/HeroScene";
import AboutScene from "./About/AboutScene";

const MainCanvas = ({ scene }) => {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ near: 0.1, far: 200, position: [0, 0, 4], fov: 45 }}
      className="touch-none"
    >
      <HeroScene />
      {/* <AboutScene /> */}
    </Canvas>
  );
};

export default MainCanvas;
