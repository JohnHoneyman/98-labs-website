import { useRef } from "react";
import { easing } from "maath";
import { useFrame } from "@react-three/fiber";
import { useScroll } from "@react-three/drei";

const CameraRig = ({ children }) => {
  const scroll = useScroll();
  const group = useRef();

  useFrame((state, delta) => {
    // console.log(state.camera.position);
    const targetPosition = [0, 0, 8];

    easing.damp3(state.camera.position, targetPosition, 0.25, delta);

    easing.dampE(
      group.current.rotation,
      // [-state.pointer.y / 10, state.pointer.x / 5, 0],
      [-state.pointer.y / 10, state.pointer.x / 5, 0],
      0.25,
      delta
    );
  });

  return <group ref={group}>{children}</group>;
};

export default CameraRig;
