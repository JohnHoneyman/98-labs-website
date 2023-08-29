import {
  ContactShadows,
  Environment,
  Float,
  Html,
  Lightformer,
  Line,
  OrbitControls,
  PerspectiveCamera,
  Point,
  PointMaterial,
  Points,
  Scroll,
  ScrollControls,
  useHelper,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import CameraRig from "../shared/CameraRig";
import { useControls } from "leva";
import { Loader } from "../Loader";
import About from "../../individual/About";
import { BlendFunction } from "postprocessing";
import Mobius from "./Mobius";
import HeroLights from "./HeroLights";
import HeroParticles from "./HeroParticles";
import HeroEnv from "./HeroEnv";
import HeroComposer from "./HeroComposer";

const HeroScene = () => {
  const color = "#ffffff";
  return (
    <>
      <HeroComposer enabled noise2 />
      <HeroEnv color={color} />
      {/* <OrbitControls /> */}
      <HeroLights />
      <Mobius scale={1} />
      <HeroParticles color={"#ff0000"} />
    </>
  );
};

export default HeroScene;
