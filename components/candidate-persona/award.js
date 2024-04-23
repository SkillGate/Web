import React, { useEffect, useState } from "react";
import { MdEdit, MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import AwardPopup from "./models/award-model";
import { useUiContext } from "../../contexts/UiContext";
import AwardNewPopup from "./models/award-model-new";
import PopUpModal from "../common/PopUpModal";
import { RemoveUserWithSpecificStatus } from "../../apiCalls/userApiCalls";
import Loader from "../common/Loader";

const Award = ({ details }) => {
  const [isAwardOpen, setAwardIsOpen] = useState(false);
  const [isAwardNewOpen, setAwardNewIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [change, notChange] = useState(false);
  const [selectedAward, setSelectedAward] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [awardId, setAwardId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { loginUser } = useUiContext();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
      // loginAndPersistUser(JSON.parse(storedUserData));
    }
  }, [change]);

  const handleRemoveAward = (id) => {
    console.log(id);
    setAwardId(id);
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
        "awards",
        awardId
      );
      console.log(userData);
      setLoading(loading);
      if (!userData || userData.length === 0) {
        // setIsModalVisible(true);
        // reset();
      } else {
        userData.accessToken = details.accessToken;
        loginUser(userData);
        setAwardNewIsOpen(false);
        handleUserChangeState();
      }
    } catch (error) {
      setLoading(false);
      console.error("Error in onSubmit:", error);
    }
  };

  const handleAwardOpen = (awards) => {
    setSelectedAward(awards);
    setAwardIsOpen(true);
  };
  const handleAwardClose = () => {
    setAwardIsOpen(false);
  };

  const handleVolunteeringNewOpen = () => {
    setAwardNewIsOpen(true);
  };
  const handleVolunteeringNewClose = () => {
    setAwardNewIsOpen(false);
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
        <h1 className="text-lg font-semibold mb-3">Awards</h1>
        <div>
          <button onClick={handleVolunteeringNewOpen}>
            <IoMdAdd size={25} className="text-gray-400" />
          </button>
          {isAwardNewOpen && (
            <AwardNewPopup
              onClose={handleVolunteeringNewClose}
              details={details}
              onChange={handleUserChangeState}
            />
          )}
        </div>
      </div>

      {user && user.awards && user.awards.length !== 0 ? (
        <div>
          {user.awards.map((awards) => (
            <div key={awards._id}>
              <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex gap-3">
                  <div>
                    <h1 className="text-md font-semiBold capitalize">
                      {/* Mora Extream */}
                      {awards?.awardName}
                    </h1>
                    <p className="text-sm">{awards?.organizationName}</p>
                    {/* <p className="text-sm">IEEE - University of Moratuwa</p> */}
                    <p className="text-sm">
                      {selectMonthByNumber(awards?.month).toLocaleDateString(
                        "en-US",
                        { month: "long" }
                      ) +
                        " " +
                        awards?.year}
                    </p>
                    {/* <p className="text-sm">May 2022 - Jan 2023</p> */}
                  </div>
                </div>
                <div>
                  <button onClick={() => handleAwardOpen(awards)}>
                    <MdEdit size={20} className="text-gray-400" />
                  </button>
                  <button onClick={() => handleRemoveAward(awards._id)}>
                    <MdDelete size={20} className="ml-2 text-gray-400" />
                  </button>
                  {isAwardOpen && (
                    <AwardPopup
                      onClose={handleAwardClose}
                      details={details}
                      onChange={handleUserChangeState}
                      award={selectedAward}
                    />
                  )}
                </div>
              </div>
              <div className="my-3">
                <p className="text-sm">
                  {/* Ranked within the top 50 in All Island Algorithmic Programming
                  Competition. */}
                  {awards?.placeDescription}
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

export default Award;
