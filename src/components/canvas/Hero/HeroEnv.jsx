import { Environment, Lightformer } from "@react-three/drei";

const HeroEnv = ({ color = "#ff0000" }) => {
  return (
    <Environment frames={Infinity} background resolution={256} blur={1}>
      <LightFormers color={color} />
    </Environment>
  );
};

const LightFormers = ({ color = "#ff0000" }) => {
  return (
    <>
      <Lightformer
        color={color}
        intensity={0.75}
        rotation-x={Math.PI / 2}
        position={[2, 2, -7]}
        scale={[10, 10, 1]}
      />
    </>
  );
};

export default HeroEnv;
