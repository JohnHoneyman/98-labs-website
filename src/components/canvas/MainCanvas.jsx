import { Canvas } from "@react-three/fiber";
import HeroThree from "./Hero/HeroThree";
import { Perf } from "r3f-perf";
import { Scroll, ScrollControls } from "@react-three/drei";

const MainCanvas = () => {
  return (
    <>
      <div className="fixed h-full w-full">
        <Canvas
          shadows
          dpr={[1, 2]}
          // className="touch-none"
          camera={{ position: [0, 0, 8] }}
        >
          {/* <Perf position="bottom-right" /> */}
          <ScrollControls distance={1} damping={0.05}>
            <HeroThree />
          </ScrollControls>
        </Canvas>
      </div>
    </>
  );
};

export default MainCanvas;
