import { useScroll } from "@react-three/drei";
import HeroScene from "../canvas/Hero/HeroScene";
import MainCanvas from "../canvas/MainCanvas";
import About from "./About";

//max-w-[1400px]

const Hero = () => {
  return (
    <>
      <section className="w-screen h-screen ">
        <div className="w-full h-full pointer-events-none">
          <div className="flex flex-col justify-center items-center h-full select-none">
            <div className="text-8xl text-white tracking-wide font-semibold uppercase">
              Promoting businesses
            </div>
            <div className="text-center text-gray-200 tracking-wide translate-y-10">
              Expand your reach. Establish your presence online.
            </div>
            {/* <div className="text-center text-gray-300 translate-y-10">
          We can help you reach out, get feedback and build your online
          community through Internet-based marketing and social media. Expand
          your reach. Establish your online presence.
        </div> */}
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
