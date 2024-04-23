import React, { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import VolunteeringPopup from "./models/volunteering-model";
import VolunteeringNewPopup from "./models/volunteering-model-new";
import PopUpModal from "../common/PopUpModal";
import { RemoveUserWithSpecificStatus } from "../../apiCalls/userApiCalls";
import { useUiContext } from "../../contexts/UiContext";
import Loader from "../common/Loader";

const Volunteering = ({ details }) => {
  const [isVolunteeringOpen, setVolunteeringIsOpen] = useState(false);
  const [isVolunteeringNewOpen, setVolunteeringNewIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [change, notChange] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [volunteerId, setVolunteerId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { loginUser } = useUiContext();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
      // loginAndPersistUser(JSON.parse(storedUserData));
    }
  }, [change]);

  const handleVolunteeringOpen = (experience) => {
    setSelectedExperience(experience);
    setVolunteeringIsOpen(true);
  };
  const handleVolunteeringClose = () => {
    setVolunteeringIsOpen(false);
  };
  const handleRemoveVolunteering = (id) => {
    console.log(id);
    setVolunteerId(id);
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
        "volunteering",
        volunteerId
      );
      console.log(userData);
      setLoading(loading);
      if (!userData || userData.length === 0) {
        // setIsModalVisible(true);
        // reset();
      } else {
        userData.accessToken = details.accessToken;
        loginUser(userData);
        setVolunteeringNewIsOpen(false);
        handleUserChangeState();
      }
    } catch (error) {
      setLoading(false);
      console.error("Error in onSubmit:", error);
    }
  };

  const handleVolunteeringNewOpen = () => {
    setVolunteeringNewIsOpen(true);
  };
  const handleVolunteeringNewClose = () => {
    setVolunteeringNewIsOpen(false);
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
        <h1 className="text-lg font-semibold mb-3">Volunteering</h1>
        <div>
          <button onClick={handleVolunteeringNewOpen}>
            <IoMdAdd size={25} className="text-gray-400" />
          </button>
          {isVolunteeringNewOpen && (
            <VolunteeringNewPopup
              user={details}
              onClose={handleVolunteeringNewClose}
              onChange={handleUserChangeState}
            />
          )}
        </div>
      </div>
      {user && user.volunteering && user.volunteering.length !== 0 ? (
        <div>
          {user.volunteering.map((experience) => (
            <div key={experience._id}>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex gap-3">
                  <div>
                    <h1 className="text-md font-semiBold capitalize">
                      {/* IEEE Computer Society Student Branch Chapter of UCSC */}
                      {experience?.organizationName}
                    </h1>
                    {/* <p className="text-sm">Member</p> */}
                    <p className="text-sm">{experience?.position}</p>
                    {/* <p className="text-sm">May 2022 - Jan 2023</p> */}
                    <p className="text-sm">
                      {selectMonthByNumber(
                        experience?.startMonth
                      ).toLocaleDateString("en-US", { month: "long" }) +
                        " " +
                        experience?.startYear}{" "}
                      -{" "}
                      {selectMonthByNumber(
                        experience?.endMonth
                      ).toLocaleDateString("en-US", { month: "long" }) +
                        " " +
                        experience?.endYear}
                    </p>
                  </div>
                </div>
                <div>
                  <button onClick={() => handleVolunteeringOpen(experience)}>
                    <MdEdit size={20} className="text-gray-400" />
                  </button>
                  <button
                    onClick={() => handleRemoveVolunteering(experience._id)}
                  >
                    <MdDelete size={20} className="ml-2 text-gray-400" />
                  </button>
                  {isVolunteeringOpen && (
                    <VolunteeringPopup
                      user={details}
                      onClose={handleVolunteeringClose}
                      onChange={handleUserChangeState}
                      volunteer={selectedExperience}
                    />
                  )}
                </div>
              </div>
              <div className="my-3">
                <p className="text-sm">
                  {/* Events: Intellihack 2.0 | 2021 - Program team member */}
                  {experience?.eventName}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-3">
            <h1 className="text-md font-semiBold capitalize">
              No available volunteering work.
            </h1>
          </div>
        </div>
      )}
    </div>
  ) : (
    <Loader />
  );
};

export default Volunteering;
