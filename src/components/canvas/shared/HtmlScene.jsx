import { useThree } from "@react-three/fiber";
import { Html, useScroll } from "@react-three/drei";

import Hero from "../../individual/Hero";
import About from "../../individual/About";

const HtmlScene = () => {
  const state_ = useThree();
  const scrollData = useScroll();

  return (
    <group>
      <Html fullscreen as="div" portal={{ current: scrollData.fixed }}>
        <Hero />
      </Html>
      <Html fullscreen position-y={-state_.viewport.height * 5}>
        <About />
      </Html>
    </group>
  );
};

export default HtmlScene;
