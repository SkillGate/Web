import { Fade } from "react-awesome-reveal";
import { useCallback } from "react";
import { ServiceImages, ServiceTexts } from "../../constants/service";

const Services = () => {
  const renderServiceIcon = useCallback((element) => {
    switch (element) {
      case 0:
        return ServiceImages.icon1;
      case 1:
        return ServiceImages.icon2;
      case 2:
        return ServiceImages.icon3;
      case 3:
        return ServiceImages.icon4;
      default:
        return "";
    }
  }, []);
  return (
    <section id="services" className="w-full h-auto flex flex-col items-center justify-center relative lg:px-24 md:px-20 px-6">
      <div className="absolute top-0 right-4 lg:h-36 h-24">
        <img
          src={ServiceImages.groupOfPlus}
          alt="Vector"
          className="w-full h-full"
        />
      </div>
      <main className="w-full pt-32 flex flex-col gap-3 items-center justify-center">
        <p className="font-light text-base tracking-widest">
          <Fade>{ServiceTexts.firstText}</Fade>
        </p>
        <h2 className="md:text-4xl text-2xl font-medium capitalize">
          <Fade>{ServiceTexts.secondText}</Fade>
        </h2>

        <div className="w-full h-auto grid lg:grid-cols-4 md:grid-cols-2 lg:gap-7 md:gap-10 gap-7 my-12 z-20 px-8 md:px-0">
          {ServiceTexts.cards.map((card, index) => (
            <div
              className="w-full bg-white dark:bg-dark-card flex flex-col items-center justify-center py-6 cursor-pointer transition duration-300 hover:shadow-xl px-5 rounded-xl cardPseudo after:bg-primary"
              key={index}
            >
              <div className="w-16 h-16 mb-8 relative z-10 before:content-[''] before:absolute before:top-3 before:right-3 before:w-16 before:h-16 before:bg-secondaryLightGreen/30 dark:before:bg-dark-main/90 before:-z-10 before:rounded-tl-3xl before:rounded-br-3xl">
                <img
                  src={renderServiceIcon(index)}
                  alt={card.firstText}
                  className="w-full h-full object-cover z-30"
                />
              </div>
              <div className="w-full flex flex-col items-center gap-2">
                <h4 className="text-base rounded font-bold">
                  {card.firstText}
                </h4>
                <p className="text-sm font-light text-center">
                  {card.secondText}
                </p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </section>
  );
};

export default Services;
