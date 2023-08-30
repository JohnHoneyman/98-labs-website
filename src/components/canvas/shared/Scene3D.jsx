import { useScroll } from "@react-three/drei";

import HeroScene from "../Hero/HeroScene";
import CameraRig from "./CameraRig";

const Scene3D = () => {
  return (
    <>
      <CameraRig>
        <HeroScene />
      </CameraRig>
    </>
  );
};

export default Scene3D;
