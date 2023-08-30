import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, ScrollControls } from "@react-three/drei";
import { Perf } from "r3f-perf";

import PostTransition from "./shared/Transition";
import HtmlScene from "./shared/HtmlScene";

const MainCanvas = () => {
  return (
    <>
      <div className="fixed h-full w-full">
        <Canvas shadows dpr={[1, 2]} className="touch-none">
          {/* <PerspectiveCamera
            position={[0, 0, 8]}
            fov={45}
            near={0.1}
            far={200}
          /> */}
          <Suspense fallback={<></>}>
            {/* <Perf position="bottom-right" /> */}
            <ScrollControls pages={3} damping={0.2}>
              {/* <HtmlScene /> */}
              <PostTransition />
              {/* <Scroll>
                <Scene3D />
              </Scroll> */}
            </ScrollControls>
          </Suspense>
        </Canvas>
      </div>
    </>
  );
};

export default MainCanvas;
