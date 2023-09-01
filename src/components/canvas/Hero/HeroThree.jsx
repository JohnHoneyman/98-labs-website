import * as THREE from "three";
import { useRef } from "react";
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

const ImageFadeMaterial = shaderMaterial(
  {
    effectFactor: 1.2,
    dispFactor: 0,
    tex: undefined,
    tex2: undefined,
    disp: undefined,
  },
  `varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }`,
  `varying vec2 vUv;
    uniform sampler2D tex;
    uniform sampler2D tex2;
    uniform sampler2D disp;
    uniform float _rot;
    uniform float dispFactor;
    uniform float effectFactor;
    void main() {
      vec4 _texture = texture2D(tex, vUv);
      vec4 _texture2 = texture2D(tex2, vUv);
      float sweep = step(vUv.y, dispFactor);
      vec4 finalTexture = mix(_texture, _texture2, sweep);
      gl_FragColor = finalTexture;
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }`
);

extend({ ImageFadeMaterial });

const HeroThree = () => {
  const { viewport } = useThree();

  const { progress } = useControls({
    progress: {
      value: 0,
      min: 0,
      max: 1,
    },
  });
  const sphere = useRef();
  const sphere2 = useRef();
  const screenMesh = useRef();
  const scene1 = new THREE.Scene();
  const scene2 = new THREE.Scene();
  const sky = useRef();
  const screenCamera = useRef();

  const renderTargetA = useFBO();
  const renderTargetB = useFBO();

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
    screenMesh.current.material.uniforms.uProgress.value = progress;
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
      <PerspectiveCamera ref={screenCamera} position={[0, 0, 8]} />
      <mesh ref={screenMesh} frustumCulled={false}>
        <planeGeometry args={[viewport.width, viewport.height]} />
        <shaderMaterial
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
