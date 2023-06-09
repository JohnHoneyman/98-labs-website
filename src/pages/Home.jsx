import React from "react";
import Layout from "../components/shared/Layout";
import Hero from "../components/individual/Hero";
import About from "../components/individual/About";
import Offers from "../components/individual/Offers";
import Contact from "../components/individual/Contact";

const Home = () => {
  return (
    <Layout>
      <Hero />
      <About />
      <Offers />
      <Contact />
    </Layout>
  );
};

export default Home;
