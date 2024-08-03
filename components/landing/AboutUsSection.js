import React from "react";
import { FaArrowAltCircleRight } from "react-icons/fa";

const AboutUsSection = () => {
  return (
    <section id="about" className="py-16">
      <div className="padding-container mx-auto flex flex-col-reverse md:flex-row items-center justify-center">
        <div className="w-full md:w-1/2 mb-8 md:mb-0 flex justify-center">
          <img
            src="https://res.cloudinary.com/dsqosc2ig/image/upload/v1702403838/SkillGate/5351347-removebg-preview_gmirp9.png"
            alt="Square Image"
            className=""
          />
        </div>

        <div className="w-full md:w-1/2">
          <div className="text-4xl font-bold text-gray-800 mb-8 dark:text-white">
            What we are doing...
          </div>
          <div className="relative max-w-4xl mt-8">
            <div className="flex gap-2 mb-5 items-center">
              <FaArrowAltCircleRight
                style={{ color: "purple", width: "50px" }}
              />
              <p className="text-lg font-semiBold">
                We offer an AI-powered recruitment system connecting HR managers
                and candidates seamlessly.
              </p>
            </div>
            <div className="flex gap-2 mb-5 items-center">
              <FaArrowAltCircleRight
                style={{ color: "purple", width: "50px" }}
              />
              <p className="text-lg font-semiBold">
                Our platform automatically matches candidate personas with
                company job posts and benefits, simplifying the selection
                process.
              </p>
            </div>
            <div className="flex gap-2 mb-5 items-center">
              <FaArrowAltCircleRight
                style={{ color: "purple", width: "50px" }}
              />
              <p className="text-lg font-semiBold">
                Candidates can create detailed CVs and personas, while HR
                managers can craft job posts and company profiles, ensuring
                personalized matches.
              </p>
            </div>
            <div className="flex gap-2 mb-5 items-center">
              <FaArrowAltCircleRight
                style={{ color: "purple", width: "50px" }}
              />
              <p className="text-lg font-semiBold">
                SkillGate automating candidate shortlisting, providing
                transparent reasons for selections, making the recruitment
                process more efficient and fair.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
