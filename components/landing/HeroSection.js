import Image from "next/image";
import { HeroImages, HeroTexts } from "../../constants/hero";
import { Fade, Slide } from "react-awesome-reveal";
import { FaPlayCircle } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="w-full lg:h-screen md:h-[550px] h-[830px] relative overflow-x-hidden flex justify-end">
      <div className="h-[60%] w-[80%] lg:h-[90vh] md:h-[50vh] lg:w-1/2 md:w-[55%]">
        {/* <Image
          className="w-full h-full"
          src={HeroImages.backgroundImage}
          alt="Hero Background Vector"
          layout="fill"
        //   width="100%"
        //   height="100%"
        /> */}
        <img
          src={HeroImages.backgroundImage}
          alt="Hero Background Vector"
          className="w-full h-full"
        />
      </div>

      <main className="w-full lg:h-full h-auto grid md:grid-cols-2 absolute top-0 left-0 lg:px-24 md:px-8 px-5 pt-24 md:pt-32 lg:pt-0">
        <div className="flex flex-col justify-center md:gap-6 gap-3 md:order-1 order-2">
          <p className="text-color1 uppercase tracking-widest lg:text-base  text-sm font-normal">
            <Fade>{HeroTexts.firstText}</Fade>
          </p>
          <h1 className=" text-color3 lg:text-7xl md:text-5xl text-3xl font-medium">
            <Fade>{HeroTexts.secondText}</Fade>
          </h1>
          <p className="text-color3 md:text-base text-sm text-justify font-light">
            <Fade>{HeroTexts.thirdText}</Fade>
          </p>
          <div className="w-full flex md:justify-start justify-between items-center lg:gap-12 md:gap-6 gap-0">
            <button className="outline-none border-none lg:px-7 px-5 py-3 bg-primary text-white font-extralight rounded-lg">
              {HeroTexts.firstButton}
            </button>
            <div className="flex items-center lg:gap-6 gap-3 cursor-pointer">
              <span className="relative flex h-14 w-14">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-light opacity-75"></span>
                <span className="relative flex justify-center items-center text-white rounded-full h-14 w-14 bg-primary-light">
                  {/* <Play size={20} color="currentColor" weight="fill" /> */}
                  <FaPlayCircle size={20} color="currentColor" weight="fill" />
                </span>
              </span>
              <button className="outline-none border-none">
                {HeroTexts.secondButton}
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-end md:order-2 order-1">
          <Slide direction="right">
            <div className="lg:h-[85%] lg:w-[90%] md:h-[100%] md:w-full w-[90%] h-[50vh]">
              <img
                src={HeroImages.heroImage}
                alt="Hero Image"
                className="w-full h-full"
              />
            </div>
          </Slide>
        </div>
      </main>
    </section>
  );
};

export default HeroSection;
