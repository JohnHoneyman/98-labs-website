import HeroCanvas from "../canvas/Hero/HeroCanvas";

//max-w-[1400px]
const Hero = () => {
  return (
    <>
      {/* <section className="mx-auto relative z-0 bg-[#0e1111]"> */}
      {/* <section className="mx-auto bg-black"> */}
      <section className="mx-auto bg-black">
        <div className="flex justify-center items-center h-screen">
          <div className="h-full w-full">
            <HeroCanvas />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
