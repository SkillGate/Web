import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import ModelPopup from "../../common/ModelPopup";
import { useUiContext } from "../../../contexts/UiContext";
import { UpdateUser } from "../../../apiCalls/userApiCalls";
import Loader from "../../common/Loader";

const BiographyPopup = ({ user, onClose, onChange }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const { loginUser } = useUiContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleSuccess, setIsModalVisibleSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleModalSuccess = () => {
    setIsModalVisibleSuccess(!isModalVisibleSuccess);
  };

  const onSubmit = async (data) => {
    console.log(data);

    if (data.biography !== undefined) {
      setLoading(true);
      try {
        const {
          data: userData,
          loading,
          error,
        } = await UpdateUser(user?._id, user?.accessToken, data);
        console.log(userData);
        setLoading(loading);
        if (!userData || userData.length === 0) {
          setIsModalVisible(true);
          reset();
        } else {
          setIsModalVisibleSuccess(true);
          userData.accessToken = user.accessToken;
          loginUser(userData);
          onChange();
        }
      } catch (error) {
        setLoading(false);
        console.error("Error in onSubmit:", error);
      }
    } else {
      console.log("Empty biography entry");
    }
  };

  return !loading ? (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 transition-opacity z-50">
      <ModelPopup
        isVisible={isModalVisible}
        title={"Personal Biography Update Unsuccess!"}
        toggleVisibility={toggleModal}
      />
      <ModelPopup
        isVisible={isModalVisibleSuccess}
        title={"Personal Biography Updated!"}
        toggleVisibility={toggleModalSuccess}
      />
      <div className="bg-white dark:bg-dark-main w-full sm:w-1/2 rounded-lg p-4">
        <button className="float-right text-gray-500" onClick={onClose}>
          <IoMdClose />
        </button>
        <h2 className="text-xl font-bold mb-8">Biography Information</h2>
        <div className="">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-input w-full sm:flex-1 relative">
              <Controller
                name="biography"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="biography"
                    className="input !h-28 pt-2"
                    defaultValue={user?.biography}
                  />
                )}
              />
              <label htmlFor="biography">Biography</label>
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
    <Loader />
  );
};

export default BiographyPopup;
