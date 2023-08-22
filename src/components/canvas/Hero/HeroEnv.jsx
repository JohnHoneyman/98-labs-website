import { Environment, Lightformer } from "@react-three/drei";
import { useControls } from "leva";

const HeroEnv = ({ color = "#ff0000" }) => {
  return (
    <Environment frames={Infinity} background resolution={256} blur={1}>
      <LightFormers color={color} />
    </Environment>
  );
};

const LightFormers = ({ color = "#ff0000" }) => {
  // const { x, y, z } = useControls("bg-light", {
  //   x: {
  //     value: 2,
  //     step: 1,
  //   },
  //   y: {
  //     value: 2,
  //     step: 1,
  //   },
  //   // y: {
  //   //   value: 5,
  //   //   step: 1,
  //   // },
  //   z: {
  //     value: -9,
  //     step: 1,
  //   },
  // });
  return (
    <>
      <Lightformer
        color={color}
        intensity={0.75}
        rotation-x={Math.PI / 2}
        position={[2, 2, -9]}
        // position={[x, y, z]}
        scale={[10, 10, 1]}
      />
    </>
  );
};

export default HeroEnv;
