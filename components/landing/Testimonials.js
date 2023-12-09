import { useCallback, useRef } from "react";
import {
  TestimonialImages,
  TestimonialTexts,
} from "../../constants/Testimonial";
import Slider from "react-slick";
import { FaCaretDown } from "react-icons/fa";
import { FaCaretUp } from "react-icons/fa";

const Testimonials = () => {
  const sliderRef = useRef(null);

  // Function for next button
  const next = () => {
    if (sliderRef.current) {
      sliderRef.current.slickNext();
    }
  };
  // function for previous button
  const previous = () => {
    if (sliderRef.current) {
      sliderRef.current.slickPrev();
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
  };

  const renderProfileImg = useCallback((element) => {
    switch (element) {
      case 0:
        return TestimonialImages.ProfileImg2;
      case 1:
        return TestimonialImages.ProfileImg1;
      case 2:
        return TestimonialImages.ProfileImg3;
      case 3:
        return TestimonialImages.ProfileImg4;
      default:
        return "";
    }
  }, []);
  return (
    <section id="testimonials" className="w-full h-auto flex flex-col items-start justify-center relative lg:px-24 md:px-10 px-6 mt-36 gap-5">
      <main className="w-full grid md:grid-cols-2 lg:gap-0 gap-8 md:gap-5">
        {/* Text and Steps Container  */}
        <div className="w-full flex flex-col gap-6">
          <p className="font-light text-base tracking-widest">
            {TestimonialTexts.firstText}
          </p>
          <h1 className="lg:text-5xl md:text-3xl text-4xl font-medium">
            {TestimonialTexts.secondText}
          </h1>
        </div>
        {/* Testimonial Slides Container  */}
        <div className="w-full h-[280px] lg:h-[210px] flex justify-center gap-4 items-center overflow-hidden">
          <div className="lg:h-[250px] w-[90%]">
            <Slider
              ref={(slider) => (sliderRef.current = slider)}
              {...settings}
            >
              {TestimonialTexts.feedBacks.map((feedBack, index) => (
                <div className="w-full" key={index}>
                  <div className="bg-white dark:bg-dark-card shadow border-[1px] border-secondaryLightGreen/10 relative rounded-xl p-4 lg:h-[200px] h-[260px] mb-6 lg-mt-0 lg:mb-4 w-full flex gap-4 items-center justify-start">
                    <div className="w-20 h-20 rounded-full absolute lg:bottom-4 bottom-3 right-4 overflow-hidden">
                      <img
                        src={renderProfileImg(index)}
                        alt={feedBack.person}
                        className="w-full h-full object-cover object-top"
                      />
                    </div>

                    <div className="flex flex-col justify-center gap-6">
                      <q className="text-[0.84rem] font-light">
                        {feedBack.text}
                      </q>
                      <div className="flex flex-col gap-2">
                        <h4 className="text-base font-medium">
                          {feedBack.person}
                        </h4>
                        <p className="text-sm font-light">
                          {feedBack.location}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
          {/* Controllers  */}
          <div className="absolute md:relative invisible md:visible flex flex-col gap-0 md:gap-4 md:pb-5">
            <button
              type="button"
              onClick={previous}
              id="prev"
              className="cursor-pointer outline-none border-none bg-primary/30 text-secondaryLightGreen hover:bg-color2 p-2 rounded-full"
            >
              <FaCaretUp size={18} color="currentColor" weight="fill" />
            </button>
            <button
              type="button"
              onClick={next}
              id="next"
              className="cursor-pointer outline-none border-none bg-primary/30 text-secondaryLightGreen hover:bg-color2 p-2 rounded-full"
            >
              <FaCaretDown size={18} color="currentColor" weight="fill" />
            </button>
          </div>
        </div>
      </main>
    </section>
  );
};

export default Testimonials;
