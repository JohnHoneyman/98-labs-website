import {
  DepthOfField,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing";
import { Noise } from "lamina";

const HeroComposer = ({
  enabled = false,
  enableVignette = false,
  enableNoise1 = false,
  enableNoise2 = false,
  enableDOF = false,
}) => {
  return (
    enabled && (
      <EffectComposer>
        {enableVignette && (
          <Vignette
            offset={0.2}
            darkness={0.8}
            // eskil={false}
            // blendFunction={BlendFunction.SOFT_LIGHT}
          />
        )}
        {enableNoise1 && (
          <Noise
            opacity={0.01}
            blendFunction={THREE.AdditiveBlending}
            premultiply
          />
        )}
        {enableNoise2 && (
          <Noise
            opacity={0.1}
            blendFunction={BlendFunction.SCREEN}
            premultiply
          />
        )}
        {enableDOF && (
          <DepthOfField
            focusDistance={0.04}
            focalLength={0.025}
            bokehScale={5}
          />
        )}
      </EffectComposer>
    )
  );
};

export default HeroComposer;
