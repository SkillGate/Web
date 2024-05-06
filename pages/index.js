import Advertisement from "../components/landing/Advertisement";
import Contact from "../components/landing/Contact";
import HeroSection from "../components/landing/HeroSection";
import Services from "../components/landing/Services";
import Testimonials from "../components/landing/Testimonials";
import AboutUsSection from "../components/landing/AboutUsSection";
import { useEffect } from "react";

const Home = () => {
  useEffect(() => {
    window.location.href = "/Web";
  });
  return (
    <div className="overflow-hidden">
      <div>
        {/* <Homes /> */}
        {/* <Hero /> */}
        <HeroSection />
        {/* <About /> */}
        <AboutUsSection />
        <Services />
        <Advertisement />
        <Testimonials />
        <Contact />
      </div>
    </div>
  );
};

export default Home;
