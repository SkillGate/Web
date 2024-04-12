import React from "react";
import { useForm, Controller } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { useState } from "react";
import { employmentTypes } from "../../../constants";
import { useUiContext } from "../../../contexts/UiContext";
import { UpdateUserWithStatus } from "../../../apiCalls/userApiCalls";
import Loader from "../../common/Loader";

const defaultValues = {
  startYear: "2024",
  startMonth: "1",
  endYear: "2024",
  endMonth: "1",
  employeeType: employmentTypes.fullTime, // Assuming you want to set a default employee type
};

const ExperiencePopupNew = ({ onClose, details, onChange }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleSuccess, setIsModalVisibleSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { loginUser } = useUiContext();

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [checkboxChecked, setCheckboxChecked] = useState(false);

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
  } = useForm({ defaultValues });

  const onSubmit = async (data) => {
    console.log(data);
    if (
      (data.companyName &&
        data.jobRole &&
        data.employeeType &&
        data.location) !== undefined
    ) {
      setLoading(true);
      const actualData = {
        companyName: data.companyName,
        jobRole: data.jobRole,
        employmentType: data.employeeType,
        location: data.location,
        startYear: data.startYear,
        startMonth: data.startMonth,
        endYear: data.ongoing.checked ? "" : data.endYear,
        endMonth: data.ongoing.checked ? "" : data.endMonth,
        skills: skills,
        workDone: data.workDone,
        currentlyWorking: data.ongoing.checked,
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
          "experience"
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
    } else {
      console.log("Empty biography entry");
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim() !== "") {
      setSkills([...skills, newSkill]);
      setNewSkill("");
    }
  };

  const removeSkill = (skillToRemove) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(updatedSkills);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddSkill();
    }
  };

  return !loading ? (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 transition-opacity z-50">
      <div className="bg-white dark:bg-dark-main w-full h-2/3 sm:w-1/3 rounded-lg p-4 flex flex-col">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold">Add New Experience</h2>
          <button className="text-gray-500" onClick={onClose}>
            <IoMdClose />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto pr-10 pt-5">
          <form onSubmit={handleSubmit(onSubmit)}>
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
                    defaultValue=""
                    required
                  />
                )}
              />
              <label htmlFor="jobRole">Job Role</label>
            </div>
            {/* const employmentTypes = [
                "Full-time",
                "Part-time",
                "Self-employed",
                "Freelance",
                "Contract",
                "Internship",
                "Apprenticeship",
                "Seasonal",
            ]; */}
            <div className="form-input w-full sm:flex-1 relative">
              <Controller
                name="employeeType"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    id="employeeType"
                    className="input"
                    defaultValue={employmentTypes.fullTime}
                  >
                    {/* <option value="" disabled>
                      Select Employment Type
                    </option> */}
                    {Object.entries(employmentTypes).map(([key, value]) => (
                      <option key={key} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                )}
              />
              <label htmlFor="employeeType">Employment Type</label>
            </div>

            <div className="form-input w-full sm:flex-1 relative">
              <Controller
                name="companyName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="companyName"
                    className="input"
                    defaultValue=""
                    required
                  />
                )}
              />
              <label htmlFor="companyName">Company Name</label>
            </div>
            <div className="form-input w-full sm:flex-1 relative">
              <Controller
                name="location"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="location"
                    className="input"
                    defaultValue=""
                    required
                  />
                )}
              />
              <label htmlFor="location">Location</label>
            </div>
            <div className="form-input w-full sm:flex-1 relative mb-5">
              <Controller
                name="ongoing"
                control={control}
                defaultValue={{
                  checked: false,
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <div className="mb-2">
                      <input
                        type="checkbox"
                        id="computerscience"
                        value="computerScience"
                        onChange={(e) => {
                          setCheckboxChecked((prev) => e.target.checked);
                          onChange({
                            ...value,
                            checked: e.target.checked,
                          });
                        }}
                        class="ml-[1rem] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                      />
                      <label htmlFor="computerscince" className="ml-[2rem]">
                        I am currently working in this role
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
                    name="startYear"
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
                    name="startMonth"
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
                    name="endYear"
                    control={control}
                    disabled={checkboxChecked}
                    render={({ field }) => (
                      <select
                        {...field}
                        id="dropdown"
                        className={`block w-full mt-1 border ${
                          checkboxChecked ? "border-gray-300" : "border-primary"
                        } rounded-md focus:border-primary bg-gray-100 dark:bg-dark-main p-2`}
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
                    name="endMonth"
                    control={control}
                    disabled={checkboxChecked}
                    render={({ field }) => (
                      <select
                        {...field}
                        id="dropdown"
                        className={`block w-full mt-1 border ${
                          checkboxChecked ? "border-gray-300" : "border-primary"
                        } rounded-md focus:border-primary bg-gray-100 dark:bg-dark-main p-2`}
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
            <h2 className="mt-4 mb-4">Skills</h2>
            <button type="click" onClick={handleAddSkill}>
              <IoMdAdd size={20} className="text-primary"></IoMdAdd>
            </button>
            <div className="mb-5">
              <input
                type="text"
                name="skills"
                className="outline-none h-8 border border-slate-300  dark:border-hover-color bg-main dark:bg-dark-main rounded-md px-[0.8rem] w-full text-base focus:!border-primary"
                placeholder="Enter a skill (e.g., Java, JavaScript, Python)"
                value={newSkill}
                onChange={(e) => setNewSkill((previous) => e.target.value)}
                onKeyPress={handleKeyPress}
              />
            </div>
            <div className="flex flex-wrap gap-2 mb-10">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-purple-400 text-white px-2 py-1 rounded-full flex items-center"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 focus:outline-none"
                  >
                    &#10005;
                  </button>
                </div>
              ))}
            </div>
            <div className="form-input w-full sm:flex-1 relative">
              <Controller
                name="workDone"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="workDone"
                    className="input !h-44 pt-2"
                    defaultValue=""
                    required
                  />
                )}
              />
              <label htmlFor="workDone">Work Responsibilities</label>
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

export default ExperiencePopupNew;
