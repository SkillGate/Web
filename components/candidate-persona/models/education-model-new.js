import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { useUiContext } from "../../../contexts/UiContext";
import { UpdateUserWithStatus } from "../../../apiCalls/userApiCalls";
import Loader from "../../common/Loader";

const EducationPopupNew = ({ onClose, details, onChange }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleSuccess, setIsModalVisibleSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { loginUser } = useUiContext();

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
    if (
      (data.universityName && data.degreeName && data.classOfDegree) !==
      undefined
    ) {
      setLoading(true);
      const actualData = {
        universityName: data.universityName,
        degreeName: data.degreeName,
        classOfDegree: data.classOfDegree,
        startYear: data.duration.startYear,
        startMonth: data.duration.startMonth,
        endYear: data.duration.endYear,
        endMonth: data.duration.endMonth,
      };
      try {
        const {
          data: userData,
          loading,
          error,
        } = await UpdateUserWithStatus(
          details?._id,
          details?.accessToken,
          actualData,
          "education"
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
      <div className="bg-white dark:bg-dark-main w-full h-2/3 sm:w-1/3 rounded-lg p-4 flex flex-col">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">Add New Education Experience</h2>
          <button className="text-gray-500" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto pr-10 pt-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form-input w-full sm:flex-1 relative">
              <Controller
                name="universityName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="universityName"
                    className="input"
                    defaultValue=""
                    required
                  />
                )}
              />
              <label htmlFor="universityName">University</label>
            </div>
            <div className="form-input w-full sm:flex-1 relative">
              <Controller
                name="degreeName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="degreeName"
                    className="input"
                    defaultValue=""
                    required
                  />
                )}
              />
              <label htmlFor="degreeName">Degree</label>
            </div>
            <div className="form-input w-full sm:flex-1 relative">
              <Controller
                name="classOfDegree"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="classOfDegree"
                    className="input"
                    defaultValue=""
                    required
                  />
                )}
              />
              <label htmlFor="classOfDegree">Class of Degree</label>
            </div>
            <div className="form-input w-full sm:flex-1 relative mb-5">
              <Controller
                name="duration.ongoing"
                control={control}
                defaultValue={{
                  computerScience: false,
                  softwareEngineer: false,
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <div className="mb-2">
                      <input
                        type="checkbox"
                        id="computerscience"
                        value="computerScience"
                        onChange={(e) => {
                          onChange({
                            ...value,
                            computerScience: e.target.checked,
                          });
                        }}
                        class="ml-[1rem] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                      />
                      <label htmlFor="computerscince" className="ml-[2rem]">
                        I am currently studing in this university
                      </label>
                    </div>
                  </>
                )}
              />
            </div>
            <div className="form-input w-full sm:flex-1 relative">
              <h2>Start Date</h2>
              <div className="mt-3 flex flex-col lg:flex-row gap-4">
                <div className="flex-auto mb-4 lg:mb-0">
                  <Controller
                    name="duration.startYear"
                    control={control}
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

export default EducationPopupNew;
