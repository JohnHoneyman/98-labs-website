import HeroCanvas from "../canvas/Hero/HeroCanvas";
import About from "./About";

//max-w-[1400px]
const Overlay = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full">
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
        <Overlay />
        <div className="fixed h-full w-full -z-10">
          {/* <div className=" h-full w-full -z-10"> */}
          <HeroCanvas />
        </div>
      </section>
    </>
  );
};

export default Hero;
