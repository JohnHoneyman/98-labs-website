import { Html } from "@react-three/drei";

const Loader = () => {
  return (
    <Html
      as="div"
      center
      className="flex flex-col justify-center items-center "
    >
      <span className="canvas-loader"></span>
      <p
        style={{
          fontSize: 14,
          color: "#f1f1f1",
          fontWeight: 800,
          marginTop: 40,
        }}
      >
        HELLO
      </p>
    </Html>
  );
};

export default Loader;
