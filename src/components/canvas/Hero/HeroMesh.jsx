import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";

const HeroMesh = () => {
  const meshRef = useRef();
  const position = { x: 3.6, y: -0.6, z: 0 };
  const rotation = { x: -0.9, y: -0.7, z: 0 };
  const meshScale = 4.21;
  const [meshRadius, meshTube, meshRadialSegments, meshTubularSegments] = [
    0.9, 0.54, 30, 48,
  ];

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();
    // meshRef.current.position.y = Math.sin(time) * 0.1;
  });

  //   const { posX, posY, posZ, rotX, rotY, rotZ, scale } = useControls("mesh", {
  //     posX: {
  //       value: position.x,
  //       step: 0.1,
  //       min: -10,
  //       max: 10,
  //       joystick: "invertY",
  //     },
  //     posY: {
  //       value: position.y,
  //       step: 0.1,
  //       min: -10,
  //       max: 10,
  //       joystick: "invertY",
  //     },
  //     posZ: {
  //       value: position.z,
  //       step: 0.1,
  //       min: -10,
  //       max: 10,
  //       joystick: "invertY",
  //     },
  //     rotX: {
  //       value: rotation.x,
  //       step: 0.1,
  //       min: -10,
  //       max: 10,
  //       joystick: "invertY",
  //     },
  //     rotY: {
  //       value: rotation.y,
  //       step: 0.1,
  //       min: -10,
  //       max: 10,
  //       joystick: "invertY",
  //     },
  //     rotZ: {
  //       value: rotation.z,
  //       step: 0.1,
  //       min: -10,
  //       max: 10,
  //       joystick: "invertY",
  //     },
  //     scale: {
  //       value: meshScale,
  //       step: 0.01,
  //       min: 0,
  //       max: 5,
  //     },
  //   });

  //   const { radius, tube, radialSegments, tubularSugments } = useControls(
  //     "torusProperties",
  //     {
  //       radius: { value: 0.9, step: 0.1 },
  //       tube: { value: 0.54, step: 0.01, min: 0, max: 1 },
  //       radialSegments: { value: 30, step: 0.1 },
  //       tubularSugments: { value: 48, step: 0.1 },
  //     }
  //   );

  return (
    <></>
    // <mesh
    //   scale={meshScale}
    //   ref={meshRef}
    //   position={[position.x, position.y, position.z]}
    //   rotation={[rotation.x, rotation.y, rotation.z]}
    // >
    //   <torusGeometry
    //     args={[meshRadius, meshTube, meshRadialSegments, meshTubularSegments]}
    //   />
    //   <meshStandardMaterial color="#ff0000" roughness={0.06} metalness={1} />
    // </mesh>
  );
};

export default HeroMesh;
