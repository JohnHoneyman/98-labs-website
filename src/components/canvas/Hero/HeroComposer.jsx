import * as THREE from "three";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Vignette,
} from "@react-three/postprocessing";
import { Noise } from "lamina";
import { BlendFunction } from "postprocessing";

const HeroComposer = ({
  enabled = false,
  vignette = false,
  noise1 = false,
  noise2 = false,
  dof = false,
}) => {
  return (
    enabled && (
      <EffectComposer>
        {vignette && (
          <Vignette
            offset={0.2}
            darkness={0.8}
            // eskil={false}
            // blendFunction={BlendFunction.SOFT_LIGHT}
          />
        )}
        {noise1 && (
          <Noise
            opacity={1}
            blendFunction={THREE.AdditiveBlending}
            premultiply
          />
        )}
        {noise2 && (
          <Noise
            opacity={0.1}
            blendFunction={BlendFunction.MULTIPLY}
            premultiply
          />
        )}
        {dof && (
          <DepthOfField focusDistance={1} focalLength={0.025} bokehScale={3} />
        )}
        <Bloom
          mipmapBlur
          intensity={0.1}
          luminanceThreshold={0}
          luminanceSmoothing={0.1}
          height={100}
        />
      </EffectComposer>
    )
  );
};

export default HeroComposer;
