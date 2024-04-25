import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { useUiContext } from "../../../contexts/UiContext";
import { UpdateUserWithSpecificStatus } from "../../../apiCalls/userApiCalls";
import Loader from "../../common/Loader";

const AwardPopup = ({ onClose, details, onChange, award }) => {
  const years = Array.from(
    { length: 50 },
    (_, index) => `${new Date().getFullYear() - index}`
  );

  const months = Array.from({ length: 12 }, (_, index) => {
    const month = new Date(0, index).toLocaleString("default", {
      month: "long",
    });
    return { value: index + 1, label: month };
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleSuccess, setIsModalVisibleSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { loginUser } = useUiContext();
  const [organizationName, setOrganizationName] = useState(
    award?.organizationName
  );
  const [awardName, setAwardName] = useState(award?.awardName);
  const [placeDescription, setPlaceDescription] = useState(
    award?.placeDescription
  );
  const [year, setYear] = useState(award?.year);
  const [month, setMonth] = useState(award?.month);

  useEffect(() => {
    const changeProperties = () => {
      setAwardName((previous) => award?.awardName);
      setOrganizationName((previous) => award?.organizationName);
      setPlaceDescription((previous) => award?.placeDescription);
      setYear((previous) => award?.year);
      setMonth((previous) => award?.month);
    };
    changeProperties();
  }, [award]);

  const onSubmit = async (data) => {
    console.log(data);

    setLoading(true);
    const actualData = {
      awardName: data.awardName ? data.awardName : awardName,
      organizationName: data.organizationName
        ? data.organizationName
        : organizationName,
      placeDescription: data.placeDescription
        ? data.placeDescription
        : placeDescription,
      year: data.duration.year ? data.duration.year : year,
      month: data.duration.month ? data.duration.month : month,
      _id: award._id,
    };
    console.log(actualData);
    try {
      const {
        data: userData,
        loading,
        error,
      } = await UpdateUserWithSpecificStatus(
        details?._id,
        details?.accessToken,
        actualData,
        "awards"
      );
      console.log(userData);
      setLoading(loading);
      if (!userData || userData.length === 0) {
        setIsModalVisible(true);
        // reset();
      } else {
        setIsModalVisibleSuccess(true);
        userData.accessToken = details.accessToken;
        loginUser(userData);
        onChange();
        onClose();
      }
    } catch (error) {
      setLoading(false);
      console.error("Error in onSubmit:", error);
    }
  };

  return !loading ? (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 transition-opacity z-50 overflow">
      <div className="bg-white dark:bg-dark-main w-full h-2/3 sm:w-1/3 rounded-lg p-4 flex flex-col">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">Awards</h2>
          <button className="text-gray-500" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto pr-10 pt-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-input w-full sm:flex-1 relative">
              <Controller
                name="awardName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="awardName"
                    className="input"
                    defaultValue={awardName}
                    required
                  />
                )}
              />
              <label htmlFor="awardName">Award name</label>
            </div>
            <div className="form-input w-full sm:flex-1 relative">
              <Controller
                name="organizationName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="organizationName"
                    className="input"
                    defaultValue={organizationName}
                    required
                  />
                )}
              />
              <label htmlFor="organizationName">Organization name</label>
            </div>
            <div className="form-input w-full sm:flex-1 relative">
              <Controller
                name="placeDescription"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="placeDescription"
                    className="input !h-44 pt-2"
                    defaultValue={placeDescription}
                    required
                  />
                )}
              />
              <label htmlFor="placeDescription">Decsription of achievement</label>
            </div>
            <div className="form-input w-full sm:flex-1 relative">
              <h2>Date</h2>
              <div className="mt-3 flex flex-col lg:flex-row gap-4">
                <div className="flex-auto mb-4 lg:mb-0">
                  <Controller
                    name="duration.year"
                    control={control}
                    defaultValue={year}
                    render={({ field }) => (
                      <select
                        {...field}
                        id="dropdown"
                        className="block w-full mt-1 border border-primary rounded-md focus:border-primary bg-gray-100 dark:bg-dark-main p-2"
                      >
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>
                <div className="flex-auto mb-4 lg:mb-0">
                  <Controller
                    name="duration.month"
                    control={control}
                    defaultValue={month}
                    render={({ field }) => (
                      <select
                        {...field}
                        id="dropdown"
                        className="block w-full mt-1 border border-primary rounded-md focus:border-primary bg-gray-100 dark:bg-dark-main p-2"
                      >
                        {months.map((month) => (
                          <option key={month.value} value={month.value}>
                            {month.label}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-10">
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

export default AwardPopup;
