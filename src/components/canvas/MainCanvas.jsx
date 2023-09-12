import { Canvas } from "@react-three/fiber";
import MainScene from "./shared/MainScene";
import { Perf } from "r3f-perf";

const MainCanvas = () => {
  return (
    <>
      <div className="fixed h-full w-full">
        <Canvas
          dpr={[1, 2]}
          // className="touch-none"
          camera={{ position: [0, 0, 8], near: 0.5, far: 100 }}
        >
          <Perf position="bottom-right" />
          {/* <ScrollControls damping={0.05}> */}
          <MainScene />
          {/* </ScrollControls> */}
        </Canvas>
      </div>
    </>
  );
};

export default MainCanvas;
