import React, { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import ExperiencePopup from "./models/experience-model";
import { imageUrl, skillIconUrl } from "../../constants";
import { useUiContext } from "../../contexts/UiContext";
import Loader from "../common/Loader";
import PopUpModal from "../common/PopUpModal";
import ExperiencePopupNew from "./models/experience-model-new";
import { RemoveUserWithSpecificStatus } from "../../apiCalls/userApiCalls";

const Experience = ({ details }) => {
  const [isExperienceOpen, setExperienceIsOpen] = useState(false);
  const [isExperienceNewOpen, setExperienceNewIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [change, notChange] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [experienceId, setExperienceId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { loginUser } = useUiContext();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
      // loginAndPersistUser(JSON.parse(storedUserData));
    }
  }, [change]);

  const handleExperienceOpen = (experience) => {
    setSelectedExperience(experience);
    setExperienceIsOpen(true);
  };
  const handleExperienceClose = () => {
    setExperienceIsOpen(false);
  };

  const handleRemoveExperience = (id) => {
    console.log(id);
    setExperienceId(id);
    setIsModalVisible(true);
  };
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const confirmFunction = async () => {
    setIsModalVisible(false);
    setLoading(true);
    try {
      const {
        data: userData,
        loading,
        error,
      } = await RemoveUserWithSpecificStatus(
        details?._id,
        details?.accessToken,
        "experience",
        experienceId
      );
      console.log(userData);
      setLoading(loading);
      if (!userData || userData.length === 0) {
        // setIsModalVisible(true);
        // reset();
      } else {
        userData.accessToken = details.accessToken;
        loginUser(userData);
        setExperienceNewIsOpen(false);
        handleUserChangeState();
      }
    } catch (error) {
      setLoading(false);
      console.error("Error in onSubmit:", error);
    }
  };

  const handleExperienceNewOpen = () => {
    setExperienceNewIsOpen(true);
  };
  const handleExperienceNewClose = () => {
    setExperienceNewIsOpen(false);
  };

  const handleUserChangeState = () => {
    notChange(!change);
  };

  const selectMonthByNumber = (monthNumber) => {
    if (monthNumber < 1 || monthNumber > 12) {
      throw new Error("Invalid month number (1-12)");
    }

    const date = new Date();
    date.setMonth(monthNumber - 1);
    return new Date(date.getFullYear(), monthNumber - 1, 1);
  };

  const calculateDuration = (startYear, startMonth, endYear, endMonth) => {
    const totalStartMonths = parseInt(startYear) * 12 + parseInt(startMonth);
    const totalEndMonths = parseInt(endYear) * 12 + parseInt(endMonth);
    const totalMonths = totalEndMonths - totalStartMonths;

    const years = Math.floor(totalMonths / 12);
    const remainingMonths = totalMonths % 12;

    const output = {
      years: years,
      months: remainingMonths,
    };

    if(output.years === 0){
        return `( ${output.months} mon )`;
    }
    return `( ${output.years} yrs -  ${output.months} mon )`;
  };

  return !loading ? (
    <div className="py-4 border-b dark:border-hover-color">
      <PopUpModal
        isVisible={isModalVisible}
        title="Are you sure?"
        toggleVisibility={toggleModal}
        confirmButtonColor="text-white bg-green-500 border border-green-500 hover:bg-white hover:text-green-500"
        cancelButtonColor="border border-red-500 bg-white text-red-500 hover:text-white hover:bg-red-500"
        showConfirmButton={true}
        showCancelButton={true}
        confirmButtonText="Yes, I'm sure"
        cancelButtonText="No, cancel"
        icon="question"
        confirmFunction={confirmFunction}
      />
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold mb-3">Job Experience</h1>
        <div>
          <button onClick={handleExperienceNewOpen}>
            <IoMdAdd size={25} className="text-gray-400" />
          </button>
          {isExperienceNewOpen && (
            <ExperiencePopupNew
              onClose={handleExperienceNewClose}
              details={details}
              onChange={handleUserChangeState}
            />
          )}
        </div>
      </div>
      {user && user.volunteering && user.volunteering.length !== 0 ? (
        <div>
          {user.experience.map((experience) => (
            <div key={experience._id}>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex gap-3">
                  <div>
                    <img
                      src={imageUrl.gtnlogo}
                      alt=""
                      className="w-10 h-10 object-contain"
                    />
                  </div>
                  <div>
                    <h1 className="text-md font-semiBold capitalize">
                      {experience?.companyName}
                      {/* GTN Technology */}
                    </h1>
                    <p className="text-sm">
                      <span className="text-sm">{experience?.jobRole}</span>{" "}
                      <span> - {experience?.employmentType}</span>
                      {/* <span className="text-sm">Software Engineer</span>{" "}
                      <span> - Internship</span> */}
                    </p>
                    <p className="text-sm">
                      {selectMonthByNumber(
                        experience?.startMonth
                      ).toLocaleDateString("en-US", { month: "long" }) +
                        " " +
                        experience?.startYear}{" "}
                      -{" "}
                      {experience?.currentlyWorking
                        ? "Present"
                        : selectMonthByNumber(
                            experience?.endMonth
                          ).toLocaleDateString("en-US", { month: "long" }) +
                          " " +
                          experience?.endYear}
                      {/* May 2022 - Jan 2023{" "} */}
                      {!(experience?.currentlyWorking) && (
                        <span className="!opacity-100">
                          {" "}
                          {calculateDuration(
                            experience?.startYear,
                            experience?.startMonth,
                            experience?.endYear,
                            experience?.endMonth
                          )}
                        </span>
                      )}
                      {/* <span className="!opacity-100">. 1/2 yrs</span> */}
                    </p>
                  </div>
                </div>
                <div>
                  <button onClick={() => handleExperienceOpen(experience)}>
                    <MdEdit size={20} className="text-gray-400" />
                  </button>
                  <button
                    onClick={() => handleRemoveExperience(experience._id)}
                  >
                    <MdDelete size={20} className="ml-2 text-gray-400" />
                  </button>
                  {isExperienceOpen && (
                    <ExperiencePopup
                      onClose={handleExperienceClose}
                      details={details}
                      onChange={handleUserChangeState}
                      experience={selectedExperience}
                    />
                  )}
                </div>
              </div>
              <div className="my-3">
                <p className="text-sm mt-3">Skills</p>
                <div className="flex-align-center gap-2">
                  <img src={skillIconUrl.htmlIcon} alt="" className="w-6" />
                  <img src={skillIconUrl.cssIcon} alt="" className="w-6" />
                  <img src={skillIconUrl.jsIcon} alt="" className="w-6" />
                  <img src={skillIconUrl.reactIcon} alt="" className="w-6" />
                </div>
                <p className="text-sm mt-2 mb-2">
                  {experience?.workDone}
                  {/* Developed scalable web applications using React.js and
                  Node.js, contributing to a 30% increase in overall website
                  performance.Collaborated with cross-functional teams to
                  deliver high-quality software solutions within tight
                  deadlines. */}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-3">
            <h1 className="text-md font-semiBold capitalize">
              No available Experience.
            </h1>
          </div>
        </div>
      )}
    </div>
  ) : (
    <Loader />
  );
};

export default Experience;
