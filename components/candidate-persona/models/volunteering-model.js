import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import {
  UpdateUser,
  UpdateUserWithSpecificStatus,
} from "../../../apiCalls/userApiCalls";
import { useUiContext } from "../../../contexts/UiContext";
import Loader from "../../common/Loader";

const VolunteeringPopup = ({ user, onClose, onChange, volunteer }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleSuccess, setIsModalVisibleSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { loginUser } = useUiContext();
  const [organizationName, setOrganizationName] = useState(
    volunteer?.organizationName
  );
  const [position, setPosition] = useState(volunteer?.position);
  const [eventName, setEventName] = useState(volunteer?.eventName);
  const [endMonth, setEndMonth] = useState(volunteer?.endMonth);
  const [endYear, setEndYear] = useState(volunteer?.endYear);
  const [startMonth, setStartMonth] = useState(volunteer?.startMonth);
  const [startYear, setStartYear] = useState(volunteer?.startYear);

  useEffect(() => {
    const changeProperties = () => {
      setOrganizationName((previous) => volunteer?.organizationName);
      setPosition((previous) => volunteer?.position);
      setEventName((previous) => volunteer?.eventName);
      setEndMonth((previous) => volunteer?.endMonth);
      setEndYear((previous) => volunteer?.endYear);
      setStartMonth((previous) => volunteer?.startMonth);
      setStartYear((previous) => volunteer?.startYear);
    };
    changeProperties();
  }, [volunteer]);

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

  const onSubmit = async (data) => {
    console.log(data);

    setLoading(true);
    const actualData = {
      organizationName: data.organizationName
        ? data.organizationName
        : organizationName,
      position: data.position ? data.position : position,
      eventName: data.eventName ? data.eventName : eventName,
      startYear: data.duration.startYear ? data.duration.startYear : startYear,
      startMonth: data.duration.startMonth ? data.duration.startMonth : startMonth,
      endYear: data.duration.endYear ? data.duration.endYear : endYear,
      endMonth: data.duration.endMonth ? data.duration.endMonth : endMonth,
      "_id": volunteer._id,
    };
    console.log(actualData);
    try {
      const {
        data: userData,
        loading,
        error,
      } = await UpdateUserWithSpecificStatus(
        user?._id,
        user?.accessToken,
        actualData,
        "volunteering"
      );
      console.log(userData);
      setLoading(loading);
      if (!userData || userData.length === 0) {
        setIsModalVisible(true);
        // reset();
      } else {
        setIsModalVisibleSuccess(true);
        userData.accessToken = user.accessToken;
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
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 transition-opacity z-40">
      <div className="bg-white dark:bg-dark-main w-full h-2/3 sm:w-1/3 rounded-lg p-4 flex flex-col">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">Volunteering test</h2>
          <button className="text-gray-500" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto pr-10 pt-5">
          <form onSubmit={handleSubmit(onSubmit)}>
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
                name="position"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="position"
                    className="input"
                    defaultValue={position}
                    required
                  />
                )}
              />
              <label htmlFor="position">Position</label>
            </div>
            <div className="form-input w-full sm:flex-1 relative">
              <Controller
                name="eventName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="eventName"
                    className="input !h-44 pt-2"
                    defaultValue={eventName}
                    required
                  />
                )}
              />
              <label htmlFor="eventName">Event name</label>
            </div>
            <div className="form-input w-full sm:flex-1 relative">
              <h2>Start Date</h2>
              <div className="mt-3 flex flex-col lg:flex-row gap-4">
                <div className="flex-auto mb-4 lg:mb-0">
                  <Controller
                    name="duration.startYear"
                    control={control}
                    defaultValue={startYear}
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
                    name="duration.startMonth"
                    control={control}
                    defaultValue={startMonth}
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
            <div className="form-input w-full sm:flex-1 relative mt-4">
              <h2>End Date</h2>
              <div className="mt-3 flex flex-col lg:flex-row gap-4">
                <div className="flex-auto mb-4 lg:mb-0">
                  <Controller
                    name="duration.endYear"
                    control={control}
                    defaultValue={endYear}
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
                    name="duration.endMonth"
                    control={control}
                    defaultValue={endMonth}
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

export default VolunteeringPopup;
