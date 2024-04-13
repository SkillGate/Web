import React, { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import EducationPopup from "./models/education-model";
import { imageUrl } from "../../constants";
import PopUpModal from "../common/PopUpModal";
import { useUiContext } from "../../contexts/UiContext";
import { RemoveUserWithSpecificStatus } from "../../apiCalls/userApiCalls";
import EducationPopupNew from "./models/education-model-new";
import Loader from "../common/Loader";
import EducationRenderer from "../common/EducationRenderer";

const Education = ({ details }) => {
  const [isEducationOpen, setEducationIsOpen] = useState(false);
  const [isEducationNewOpen, setEducationNewIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [change, notChange] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [educationId, setEducationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { loginUser } = useUiContext();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
      // loginAndPersistUser(JSON.parse(storedUserData));
    }
  }, [change]);

  const handleEducationOpen = (education) => {
    setSelectedExperience(education);
    setEducationIsOpen(true);
  };
  const handleEducationClose = () => {
    setEducationIsOpen(false);
  };
  const handleRemoveEducation = (id) => {
    console.log(id);
    setEducationId(id);
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
        "education",
        educationId
      );
      console.log(userData);
      setLoading(loading);
      if (!userData || userData.length === 0) {
        // setIsModalVisible(true);
        // reset();
      } else {
        userData.accessToken = details.accessToken;
        loginUser(userData);
        setEducationNewIsOpen(false);
        handleUserChangeState();
      }
    } catch (error) {
      setLoading(false);
      console.error("Error in onSubmit:", error);
    }
  };

  const handleEducationNewOpen = () => {
    setEducationNewIsOpen(true);
  };
  const handleEducationNewClose = () => {
    setEducationNewIsOpen(false);
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
        <h1 className="text-lg font-semibold">Education</h1>
        <div>
          <button onClick={handleEducationNewOpen}>
            <IoMdAdd size={25} className="text-gray-400" />
          </button>
          {isEducationNewOpen && (
            <EducationPopupNew
              onClose={handleEducationNewClose}
              details={user}
              onChange={handleUserChangeState}
            />
          )}
        </div>
      </div>
      {user && user.education && user.education.length !== 0 ? (
        <div>
          {user.education.map((education) => (
            <div key={education?._id}>
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
                <div className="flex gap-3 items-center justify-center">
                  <div>
                  <EducationRenderer user={user} companyLogo={education?.universityName} />
                  </div>
                  {/* <img
                    src={imageUrl.ucsclogo}
                    alt=""
                    className="flex-shrink-0 w-10 h-10 object-contain"
                  /> */}
                  <div>
                    <h1 className="text-md font-semiBold capitalize">
                      {education?.degreeName}
                      {/* Bachelor of Science in Computer Science (BSc. in CS) */}
                    </h1>
                    <p className="text-sm">
                      <span>{education?.classOfDegree}</span>
                      {/* <span>Second Class - Upper Division</span> */}
                    </p>
                    <p className="text-sm">
                      <span className="text-sm">
                        {education?.universityName}
                        {/* University of Colombo School of Computing */}
                      </span>
                    </p>
                    <p className="text-sm">
                      {selectMonthByNumber(
                        education?.startMonth
                      ).toLocaleDateString("en-US", { month: "long" }) +
                        " " +
                        education?.startYear}{" "}
                      -{" "}
                      {selectMonthByNumber(
                        education?.endMonth
                      ).toLocaleDateString("en-US", { month: "long" }) +
                        " " +
                        education?.endYear}
                    </p>
                  </div>
                </div>
                <div>
                  <button onClick={() => handleEducationOpen(education)}>
                    <MdEdit size={20} className="text-gray-400" />
                  </button>
                  <button onClick={() => handleRemoveEducation(education._id)}>
                    <MdDelete size={20} className="ml-2 text-gray-400" />
                  </button>
                  {isEducationOpen && (
                    <EducationPopup
                      onClose={handleEducationClose}
                      details={details}
                      onChange={handleUserChangeState}
                      education={selectedExperience}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-3">
            <h1 className="text-md font-semiBold capitalize">
              No available Education.
            </h1>
          </div>
        </div>
      )}
    </div>
  ) : (
    <Loader />
  );
};

export default Education;
