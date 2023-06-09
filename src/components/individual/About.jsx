import { SectionWrapper } from "../hoc";

const About = () => {
  return <div className="flex items-center justify-center h-screen">About</div>;
};

const AboutPage = SectionWrapper(About, "about");

export default AboutPage;
