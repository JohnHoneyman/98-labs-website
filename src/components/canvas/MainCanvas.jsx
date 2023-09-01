import { Canvas } from "@react-three/fiber";
import HeroThree from "./Hero/HeroThree";

const MainCanvas = () => {
  return (
    <>
      <div className="fixed h-full w-full">
        <Canvas shadows dpr={[1, 2]} className="touch-none">
          <HeroThree />
        </Canvas>
      </div>
    </>
  );
};

export default MainCanvas;
