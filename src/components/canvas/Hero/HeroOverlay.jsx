import { Html } from "@react-three/drei";

const HeroOverlay = () => {
  return (
    <Html
      fullscreen
      className="max-w-[700px] m-auto pl-10 flex flex-col justify-center"
    >
      <div className="mb-8 font-semibold tracking-wider text-7xl text-white bg-transparent">
        Promoting businesses
      </div>
      <div className="text-gray-300 w-[600px]">
        <p className=" bg-transparent">
          We can help you reach out, get feedback and build your online
          community through Internet-based marketing and social media. Expand
          your reach. Establish your online presence.
        </p>
      </div>
    </Html>
  );
};

export default HeroOverlay;
