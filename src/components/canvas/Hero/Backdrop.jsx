import React from "react";

const LightFormers = ({ positions = [2, 0, 2, 0, 2, 0, 2, 0] }) => {
  // const group = useRef();
  // useFrame(
  //   (state, delta) =>
  //     (group.current.position.z += delta * 10) > 20 &&
  //     (group.current.position.z = -60)
  // );
  return (
    <>
      {/* Ceiling - white light above*/}
      {/* <Lightformer
        color={"#ff0000"}
        intensity={0.75}
        rotation-x={Math.PI / 2}
        position={[5, 7, -9]}
        scale={[10, 10, 1]}
      /> */}
      {/* <group rotation={[0, 0.5, 0]}>
        <group ref={group}>
          {positions.map((x, i) => (
            <Lightformer
              key={i}
              form="circle"
              intensity={2}
              rotation={[Math.PI / 2, 0, 0]}
              position={[x, 4, i * 4]}
              scale={[3, 1, 1]}
            />
          ))}
        </group>
      </group> */}
      {/* Sides - white lights on the side*/}
      {/* <Lightformer
        color="#ff0000"
        intensity={4}
        rotation-y={Math.PI / 2}
        position={[-5, 1, -1]}
        scale={[20, 0.1, 1]}
      />
      <Lightformer
        color="#ff0000"
        rotation-y={Math.PI / 2}
        position={[-5, -1, -1]}
        scale={[20, 0.5, 1]}
      />
      <Lightformer
        color="#ff0000"
        rotation-y={-Math.PI / 2}
        position={[10, 1, 0]}
        scale={[20, 1, 1]}
      /> */}
      {/* Accent (red) - This one behind object on left left*/}
      {/* <Float speed={5} floatIntensity={2} rotationIntensity={2}>
        <Lightformer
          form="ring"
          color="red"
          intensity={1}
          scale={10}
          position={[-15, 4, -18]}
          target={[0, 0, 0]}
        />
      </Float> */}
      {/* Background - This one underneath*/}
      {/* <mesh scale={100}>
        <sphereGeometry args={[1, 64, 64]} />
        <LayerMaterial color={"#444"} alpha={1} side={THREE.BackSide}>
          <Depth
            colorA="blue"
            colorB="black"
            alpha={0.5}
            mode="normal"
            near={0}
            far={300}
            origin={[100, 100, 100]}
          />
        </LayerMaterial>
      </mesh> */}
    </>
  );
};

const Backdrop = () => {
  const light = useRef();
  const light2 = useRef();
  const target = new THREE.Object3D();
  const target2 = new THREE.Object3D();

  const { length, width, position, color } = useControls("wall", {
    length: { value: 58, step: 0.1, min: 0, max: 60 },
    width: { value: 125, step: 0.1, min: 0, max: 150 },
    position: { value: { x: 0, y: 0, z: -42 }, step: 0.1 },
    color: "#272727",
  });

  const { lightPos, plColor, plIntensity, lightAngle } = useControls(
    "spotlight",
    {
      lightPos: {
        value: { x: -55.3, y: -26.9, z: -25.9 },
        step: 0.1,
      },
      plColor: {
        value: "#ee4747",
      },
      plIntensity: {
        value: 10,
        step: 0.1,
        min: 0,
        max: 15,
      },
      lightAngle: {
        value: 0.43,
        step: 0.01,
        min: 0,
        max: 1,
      },
    }
  );
  const { lightPos2, plColor2, plIntensity2, lightAngle2 } = useControls(
    "spotlight2",
    {
      lightPos2: {
        value: { x: 56.6, y: -26.9, z: -25.9 },
        step: 0.1,
      },
      plColor2: {
        value: "#c92222",
      },
      plIntensity2: {
        value: 3.1,
        step: 0.1,
        min: 0,
        max: 15,
      },
      lightAngle2: {
        value: 0.37,
        step: 0.01,
        min: 0,
        max: 1,
      },
    }
  );

  const { tPosX, tPosY, tPosZ } = useControls("targetPos", {
    tPosX: {
      value: 81.4,
      step: 0.1,
    },
    tPosY: {
      value: 41.5,
      step: 0.1,
    },
    tPosZ: {
      value: -49.1,
      step: 0.1,
    },
  });
  const { tPosX2, tPosY2, tPosZ2 } = useControls("targetPos2", {
    tPosX2: {
      value: -90.6,
      step: 0.1,
    },
    tPosY2: {
      value: 57.7,
      step: 0.1,
    },
    tPosZ2: {
      value: -47.1,
      step: 0.1,
    },
  });

  // useHelper(light, THREE.SpotLightHelper);
  useHelper(light2, THREE.SpotLightHelper);

  useFrame(() => {
    light.current.position.x = lightPos.x;
    light.current.position.y = lightPos.y;
    light.current.position.z = lightPos.z;
    target.position.x = tPosX;
    target.position.y = tPosY;
    target.position.z = tPosZ;

    light2.current.position.x = lightPos2.x;
    light2.current.position.y = lightPos2.y;
    light2.current.position.z = lightPos2.z;
    target2.position.x = tPosX2;
    target2.position.y = tPosY2;
    target2.position.z = tPosZ2;
  });

  return (
    <>
      <spotLight
        ref={light}
        intensity={plIntensity}
        color={plColor}
        penumbra={1}
        decay={2}
        target={target}
        castShadow={false}
        angle={lightAngle}
      />
      <spotLight
        ref={light2}
        intensity={plIntensity2}
        color={plColor2}
        penumbra={1}
        decay={2}
        target={target2}
        castShadow={false}
        angle={lightAngle2}
      />

      <mesh
        position={[position.x, position.y, position.z]}
        receiveShadow={false}
      >
        <planeGeometry args={[width, length, 50, 50]} />
        <meshStandardMaterial color={color} />
        {/* <meshStandardMaterial color={"black"} /> */}
      </mesh>
      <primitive object={target} />
    </>
  );
};

export default Backdrop;
