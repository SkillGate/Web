import { server } from "../config";
import useFetch from "./api/useFetch";
import About from "../components/landing/About";
import Advertisement from "../components/landing/Advertisement";
import Contact from "../components/landing/Contact";
import HeroSection from "../components/landing/HeroSection";
import Services from "../components/landing/Services";
import Testimonials from "../components/landing/Testimonials";
import AboutUsSection from "../components/landing/AboutUsSection";

const Home = () => {
  const { data: jobs, loading } = useFetch(`${server}/api/jobs`);

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
