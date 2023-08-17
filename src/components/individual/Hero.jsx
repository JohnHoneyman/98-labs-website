import HeroScene from "../canvas/Hero/HeroScene";
import MainCanvas from "../canvas/MainCanvas";
import About from "./About";

//max-w-[1400px]
export const Overlay = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
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
      <About />
    </div>
  );
};

const Hero = () => {
  return (
    <>
      <section className="mx-auto w-screen h-screen">
        <div className="fixed h-full w-full">
          {/* <div className="relative h-full w-full"> */}
          <MainCanvas />
        </div>
        <Overlay />
      </section>
    </>
  );
};

export default Hero;
