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

import { useControls } from "leva";
import { v4 as uuidv4 } from "uuid";

import CameraRig from "../shared/CameraRig";

import vertexShader from "../shaders/transition/vertex";
import fragmentShader from "../shaders/transition/fragment";

// const HeroThree = () => {
//   const planeMesh = useRef();
//   const renderTarget = useFBO();

//   const ref = useRef();
//   const { viewport } = useThree();
//   const [texture1, texture2] = useTexture(["/texture/1.png", "/texture/2.png"]);
//   const [hovered, setHovered] = useState(false);

//   useFrame((state) => {
//     // ref.current.dispFactor = THREE.MathUtils.lerp(
//     //   ref.current.dispFactor,
//     //   hovered ? 1 : 0,
//     //   0.075
//     // );

//     const { gl, scene, camera } = state;
//     gl.setRenderTarget(renderTarget);
//     gl.render(scene, camera);

//     planeMesh.current.material.map = renderTarget.texture;
//   });

//   return (
//     <>
//       <mesh
//         ref={planeMesh}
//         onPointerOver={(e) => setHovered(true)}
//         onPointerOut={(e) => setHovered(false)}
//       >
//         <planeGeometry args={[viewport.width, viewport.height]} />
//         {/* <imageFadeMaterial
//           ref={ref}
//           tex={texture1}
//           tex2={texture2}
//           toneMapped={false}
//         /> */}
//         <meshBasicMaterial />
//       </mesh>
//     </>
//   );
// };

const HeroThree = () => {
  // const { progress } = useControls({
  //   progress: {
  //     value: 0,
  //     min: 0,
  //     max: 1,
  //   },
  // });
  let progress = 0.0;
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

    progress = THREE.MathUtils.lerp(progress, hovered ? 1.0 : 0.0, 0.075);

    screenMesh.current.material.uniforms.textureA.value = renderTargetA.texture;
    screenMesh.current.material.uniforms.textureB.value = renderTargetB.texture;
    screenMesh.current.material.uniforms.uProgress.value = progress;
    // screenMesh.current.material.uniforms.uProgress.value = THREE.MathUtils.lerp(
    //   screenMesh.current.material.uniforms.uProgress.value,
    //   hovered ? 1.0 : 0.0,
    //   0.075
    // );

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
            {/* For some reason only the this instance of Sky is rendered at any time 🤷‍♂️ */}
            <Sky ref={sky} />
            <Environment preset="dawn" />
            <directionalLight args={[0, 0, -10]} intensity={1} />
            {/* <ambientLight intensity={1} /> */}
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
        onPointerEnter={(e) => setHovered(true)}
        onPointerOut={(e) => setHovered(false)}
      >
        <planeGeometry args={[viewport.width, viewport.height]} />
        <shaderMaterial
          ref={screenMat}
          key={uuidv4()}
          uniforms={{
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
          }}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
        />
      </mesh>
    </>
  );
};

export default HeroThree;
