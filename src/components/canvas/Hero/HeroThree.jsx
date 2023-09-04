import * as THREE from "three";
import { useRef, useState } from "react";
import { createPortal, extend, useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  PerspectiveCamera,
  Sky,
  shaderMaterial,
  useFBO,
} from "@react-three/drei";

import { v4 as uuidv4 } from "uuid";

import CameraRig from "../shared/CameraRig";

import vertexShader from "../shaders/transition/vertex";
import fragmentShader from "../shaders/transition/fragment";

const uniforms = {
  textureA: {
    value: null,
  },
  textureB: {
    value: null,
  },
  uTime: {
    value: 0.0,
  },
  uProgress: {
    progress: 0.0,
  },
};

const SwipeShaderMaterial = shaderMaterial(
  uniforms,
  vertexShader,
  fragmentShader
);

extend({ SwipeShaderMaterial });

const HeroThree = () => {
  const sphere = useRef();
  const sphere2 = useRef();
  const screenMesh = useRef();
  const screenMat = useRef();
  const scene1 = new THREE.Scene();
  const scene2 = new THREE.Scene();
  const sky = useRef();
  const screenCamera = useRef();

  const renderTargetA = useFBO();
  const renderTargetB = useFBO();

  const { viewport } = useThree();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const { gl, scene, camera, clock } = state;

    sky.current.material.uniforms.sunPosition.value = new THREE.Vector3(
      10,
      10,
      0
    );

    gl.setRenderTarget(renderTargetA);
    gl.render(scene1, camera);

    sky.current.material.uniforms.sunPosition.value = new THREE.Vector3(
      0,
      -0.3,
      -10
    );

    gl.setRenderTarget(renderTargetB);
    gl.render(scene2, camera);

    screenMesh.current.material.uniforms.textureA.value = renderTargetA.texture;
    screenMesh.current.material.uniforms.textureB.value = renderTargetB.texture;

    screenMat.current.uProgress = THREE.MathUtils.lerp(
      screenMat.current.uProgress,
      hovered ? 1 : 0,
      0.075
    );

    gl.setRenderTarget(null);
  });

  return (
    <>
      <CameraRig>
        {createPortal(
          <>
            <Sky />
            <Environment preset="dawn" />
            <directionalLight args={[10, 10, 0]} intensity={1} />
            <ambientLight intensity={1} />
            <mesh ref={sphere} position={[2, 0, 0]}>
              <dodecahedronGeometry args={[1]} />
              <meshPhysicalMaterial
                roughness={0}
                clearcoat={1}
                clearcoatRoughness={0}
                color="#73B9ED"
              />
            </mesh>
            <mesh ref={sphere2} position={[-2, 0, 0]}>
              <dodecahedronGeometry args={[1]} />
              <meshPhysicalMaterial
                roughness={0}
                clearcoat={1}
                clearcoatRoughness={0}
                color="#73B9ED"
              />
            </mesh>
          </>,
          scene1
        )}
        {createPortal(
          <>
            <Sky ref={sky} />
            <Environment preset="dawn" />
            <directionalLight args={[0, 0, -10]} intensity={1} />
            <mesh ref={sphere} position={[2, 0, 0]}>
              <torusKnotGeometry args={[0.75, 0.3, 100, 16]} />
              <meshPhysicalMaterial
                roughness={0}
                clearcoat={1}
                clearcoatRoughness={0}
                color="#73B9ED"
              />
            </mesh>
            <mesh ref={sphere2} position={[-2, 0, 0]}>
              <torusKnotGeometry args={[0.75, 0.3, 100, 16]} />
              <meshPhysicalMaterial
                roughness={0}
                clearcoat={1}
                clearcoatRoughness={0}
                color="#73B9ED"
              />
            </mesh>
          </>,
          scene2
        )}
      </CameraRig>
      <PerspectiveCamera
        ref={screenCamera}
        position={[0, 0, 8]}
        fov={45}
        near={0.1}
        far={200}
      />
      <mesh
        ref={screenMesh}
        frustumCulled={false}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <planeGeometry args={[viewport.width, viewport.height]} />
        <swipeShaderMaterial ref={screenMat} key={uuidv4()} />
      </mesh>
    </>
  );
};

export default HeroThree;
