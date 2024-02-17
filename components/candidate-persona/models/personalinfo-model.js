import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { useUiContext } from "../../../contexts/UiContext";
import FullPageLoader from "../../common/FullPageLoader";
import PopUpModal from "../../common/PopUpModal";
import { UpdateUser } from "../../../apiCalls/userApiCalls";

const PersonalInfoPopup = ({ onClose, details }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { loginUser } = useUiContext();
//   const { user } = useUiContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);

    setLoading(true);
    try {
      const { data: userData, loading } = await UpdateUser(loginUser?._id, loginUser?.accessToken, data);
      console.log(userData);
      setLoading(loading);
      if (!userData) {
        setIsModalVisible(true);
        reset();
      } else {
        loginUser(userData);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error in onSubmit:", error);
    }
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  return !loading ? (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 dark:bg-gray-800 bg-opacity-30 dark:bg-opacity-30 transition-opacity z-50">
      <PopUpModal
        isVisible={isModalVisible}
        title="Personal Information Save Unsuccess!"
        toggleVisibility={toggleModal}
        confirmButtonColor="text-white bg-green-500 border border-green-500 hover:bg-white hover:text-green-500"
        cancelButtonColor="border border-red-500 bg-white text-red-500 hover:bg-red-500 hover:text-white"
        showConfirmButton={false}
        showCancelButton={false}
        confirmButtonText="Yes, I'm sure"
        cancelButtonText="No, cancel"
      />
      <div className="bg-white dark:bg-dark-main w-full h-2/3 sm:w-1/3 rounded-lg p-4 flex flex-col">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">Personal Information</h2>
          <button className="text-gray-500" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto pr-10 pt-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-input w-full sm:flex-1 relative">
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="firstName"
                    className="input"
                    defaultValue={details?.firstName}
                  />
                )}
              />
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="form-input w-full sm:flex-1 relative">
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="lastName"
                    className="input"
                    defaultValue={details?.lastName}
                  />
                )}
              />
              <label htmlFor="lastName">Last Name</label>
            </div>
            <div className="form-input w-full sm:flex-1 relative">
              <Controller
                name="jobRole"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="jobRole"
                    className="input"
                    defaultValue={details?.role}
                  />
                )}
              />
              <label htmlFor="jobRole">Job Role</label>
            </div>
            <div className="form-input w-full sm:flex-1 relative">
              <Controller
                name="address"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="address"
                    className="input"
                    defaultValue={details?.location}
                  />
                )}
              />
              <label htmlFor="address">Location</label>
            </div>
            <div className="form-input w-full sm:flex-1 relative">
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="email"
                    className="input"
                    defaultValue={details?.email}
                  />
                )}
              />
              <label htmlFor="email">Email Address</label>
            </div>
            <div className="form-input w-full sm:flex-1 relative">
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="phone"
                    className="input"
                    defaultValue={details?.phone}
                  />
                )}
              />
              <label htmlFor="phone">Phone Number</label>
            </div>
            <div className="form-input w-full sm:flex-1 relative">
              <Controller
                name="portfolio"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="portfolio"
                    className="input"
                    defaultValue={details?.portfolio}
                  />
                )}
              />
              <label htmlFor="portfolio">Portfolio</label>
            </div>
            <div className="form-input w-full sm:flex-1 relative">
              <Controller
                name="linkedin"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="linkedin"
                    className="input"
                    defaultValue={details.linkedIn}
                  />
                )}
              />
              <label htmlFor="linkedin">LinkedIn</label>
            </div>
            <div className="form-input w-full sm:flex-1 relative">
              <Controller
                name="github"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="github"
                    className="input"
                    defaultValue={details?.gitHub}
                  />
                )}
              />
              <label htmlFor="github">GitHub</label>
            </div>
            <div className="form-input w-full sm:flex-1 relative">
              <Controller
                name="blog"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="blog"
                    className="input"
                    defaultValue={details?.blog}
                  />
                )}
              />
              <label htmlFor="blog">Blog</label>
            </div>
            <div className="flex justify-end">
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  ) : (
    <FullPageLoader />
  );
};

export default PersonalInfoPopup;
