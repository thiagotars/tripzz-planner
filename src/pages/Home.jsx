import Hero from "../sections/Hero";
import About from "../sections/About";
import Features from "../sections/Features";
import Plan from "../sections/Plan";
import PopularDestinies from "../components/PopularDestinies";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Features />
      <Plan />
      <PopularDestinies />
    </>
  );
};

export default Home;
