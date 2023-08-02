import HeroCanvas from "../canvas/Hero/HeroCanvas";

//max-w-[1400px]
const Hero = () => {
  return (
    <>
      <section className="mx-auto relative z-0 bg-[#0e1111]">
        <div className="flex justify-center items-center h-screen">
          {/* <div className="flex-[4_4_0%]">
            <div className="mb-8 font-semibold tracking-wider text-7xl text-white bg-transparent">
              Promoting businesses
            </div>
            <div className="text-gray-300 font-semibold">
              <p className=" bg-transparent">
                We can help you reach out, get feedback and build your online
                community through Internet-based marketing and social media.
                Expand your reach. Establish your online presence.
              </p>
            </div>
          </div> */}
          <div className="border h-full w-full">
            <HeroCanvas />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
