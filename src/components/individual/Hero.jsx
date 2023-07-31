import HeroCanvas from "../canvas/HeroCanvas";
const Hero = () => {
  return (
    <>
      <section className="max-w-[1400px] mx-auto relative z-0">
        <div className="flex justify-center items-center h-screen">
          <div className="flex-[4_4_0%] relative">
            <div className="mb-8 font-semibold tracking-wider text-7xl text-white">
              Promoting businesses
            </div>
            <div className="text-gray-300 font-semibold">
              <p>
                We can help you reach out, get feedback and build your online
                community through Internet-based marketing and social media.
                Expand your reach. Establish your online presence.
              </p>
            </div>
          </div>
          <div className="flex-[2_2_0%] border h-full">
            <HeroCanvas />
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
