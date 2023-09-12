import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useAnimations, useGLTF } from "@react-three/drei";

const Mobius = ({
  innerRotationSpeed = 0.2,
  enableAnimation = true,
  enableRotation = false,
  rotationX = 0.001,
  rotationY = 0.001,
  ...props
}) => {
  const mobius = useRef();
  const mobiusGLTF = useGLTF("./gltf/mobius/mobius.gltf");
  const animations = useAnimations(mobiusGLTF.animations, mobiusGLTF.scene);

  useEffect(() => {
    const action = animations.actions.MobiusAction;
    action.timeScale = innerRotationSpeed;
    enableAnimation && action.play();

    const material = mobiusGLTF.materials[""];
    material.color.set("white");
    material.metalness = 0;
    material.side = THREE.DoubleSide;
    // material.wireframe = true;
  }, [animations]);

  useFrame((_, delta) => {
    if (enableRotation) {
      mobius.current.rotation.x += Math.cos(delta) * rotationX;
      mobius.current.rotation.y += Math.sin(delta) * rotationY;
    } else {
      mobius.current.rotation.x = 0;
      mobius.current.rotation.y = 0;
    }
  });

  return (
    <primitive ref={mobius} object={mobiusGLTF.scene} scale={1} {...props} />
  );
};

export default Mobius;
