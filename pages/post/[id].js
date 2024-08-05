/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import { FaCamera, FaTimes } from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { IoMdAdd, IoMdRemove } from "react-icons/io";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { useUiContext } from "../../contexts/UiContext";
import ModelPopup from "../../components/common/ModelPopup";
import FullPageLoader from "../../components/common/FullPageLoader";
import { addJob, getJob } from "../../apiCalls/jobApiCalls";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase/firebase";

const PostSingleJob = () => {
  const router = useRouter();
  const { id } = router.query;

  const logoInput = useRef(null);
  const bannerInput = useRef(null);
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [softskills, setSoftSkills] = useState([]);
  const [newSoftSkill, setNewSoftSkill] = useState("");
  const [requirements, setRequirements] = useState([]);

  const [user, setUser] = useState();
  const [change, notChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleSuccess, setIsModalVisibleSuccess] = useState(false);
  const [storeData, setStoreData] = useState({});
  const [job, setJob] = useState([]);
  
  const { loginUser } = useUiContext();

  const weightsOfFields = [
    { key: "education", label: "Education" },
    { key: "experience", label: "Experience" },
    { key: "technicalSkills", label: "Technical Skills" },
    { key: "softSkills", label: "Soft Skills" },
  ];
  const [sumOfWeight, setSumOfWeight] = useState(0);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");

    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      
      if (userData) {
        setUser(userData);
        fetchData(userData.accessToken);
      }
    }
  }, [id]);

  const fetchData = async (token) => {
    setLoading(true);
    try {
      const { data: jobData = [] } = await getJob(id, token);
      console.log(jobData);
      setJob(jobData);
    } catch (error) {
      console.error("Error job fetching:", error);
    } finally {
      setLoading(false);
    }
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    setError,
    clearErrors,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    console.log(banner);
    console.log(logo);

    const responsibilityFields = data.requirements_and_responsibilities.map(
      (item) => item.responsibilityfield
    );
    console.log(responsibilityFields);

    const currentTime = new Date();

    const hours = currentTime.getHours().toString().padStart(2, "0");
    const minutes = currentTime.getMinutes().toString().padStart(2, "0");
    const seconds = currentTime.getSeconds().toString().padStart(2, "0");

    const formattedTime = `${hours}:${minutes}:${seconds}`;

    const actualData = {
      userId: user._id,
      title: data.title,
      company_name: data.company_name,
      company_location: data.company_location,
      skills: data.skills,
      soft_skills: data.softskills,
      experience_level: data.experience_level,
      type_of_employment: data.type_of_employment,
      salary_range: data.salary_range,
      experience: data.experience,
      experience_job_post: data.experience_job_post,
      education: data.education,
      education_job_post: data.education_job_post,
      overview: data.overview,
      description: data.description,
      requirements_and_responsibilities: responsibilityFields,
      time_posted: formattedTime,
      // logo_url: logo,
      // banner_url: banner,
      blogsCheckBox: data.socialProfile.blogs,
      githubCheckBox: data.socialProfile.github,
      linkedinCheckBox: data.socialProfile.linkedin,
      w_education: parseFloat(data.fieldsWeight.education) / 10,
      w_experience: parseFloat(data.fieldsWeight.experience) / 10,
      w_technical_skills: parseFloat(data.fieldsWeight.technicalSkills) / 10,
      w_soft_skills: parseFloat(data.fieldsWeight.softSkills) / 10,
    };
    console.log(actualData);

    setStoreData((prev) => actualData);

    const uploadPromises = [];

    try {
      if (banner) {
        uploadPromises.push(storeImage(banner, "banner_url", actualData));
      }
      if (logo) {
        uploadPromises.push(storeImage(logo, "logo_url", actualData));
      }
    } catch (error) {
      console.error("Error in image upload:", error);
      setLoading(false);
    }

    Promise.all(uploadPromises)
      .then(() => {
        saveData(actualData);
      })
      .catch((error) => {
        console.error("Error in image upload:", error);
        setLoading(false);
      });

    if (!(banner && logo)) {
      saveData(actualData);
    }
  };

  const storeImage = (file, fileNameData, actualData) => {
    return new Promise((resolve, reject) => {
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const prevProgress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

          console.log("Upload is " + prevProgress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Image upload unsuccessful!",
          });
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            actualData[fileNameData] = downloadURL;
            setStoreData((prevData) => ({
              ...prevData,
              [fileNameData]: downloadURL,
            }));
            resolve();
          });
        }
      );
    });
  };

  const saveData = async (actualData) => {
    console.log(storeData);
    console.log(actualData);
    setLoading(true);
    try {
      const {
        data: jobData,
        loading,
        error,
      } = await addJob(actualData, user?.accessToken);
      console.log(jobData);
      setLoading(loading);
      if (!jobData || jobData.length === 0) {
        setIsModalVisible(true);
        reset();
      } else {
        setIsModalVisibleSuccess(true);
        jobData.accessToken = user.accessToken;
      }
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (error) {
      setLoading(false);
      console.error("Error in onSubmit:", error);
    }
  };

  const [educationFields, setEducationFields] = useState(1);
  const [responsibilitiesFields, setResponsibilitiesFields] = useState(1);

  const handleAddResponsibilitiesField = () => {
    setResponsibilitiesFields(
      (prevResponsibilitiesFields) => prevResponsibilitiesFields + 1
    );
  };

  const handleRemoveResponsibilitiesField = (index) => {
    setResponsibilitiesFields(
      (prevResponsibilitiesFields) => prevResponsibilitiesFields - 1
    );
  };

  const handleAddEducationField = () => {
    setEducationFields((prevEducationFields) => prevEducationFields + 1);
  };

  const handleRemoveEducationField = (index) => {
    setEducationFields((prevEducationFields) => prevEducationFields - 1);
  };

  const [experienceFields, setExperienceFields] = useState(1);

  const handleAddExperienceField = () => {
    setExperienceFields((prevExperienceFields) => prevExperienceFields + 1);
  };

  const handleRemoveExperienceField = (index) => {
    setExperienceFields((prevExperienceFields) => prevExperienceFields - 1);
  };

  const addSkill = () => {
    if (newSkill.trim() !== "") {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      setNewSkill("");

      setValue("skills", updatedSkills);
    }
  };

  const removeSkill = (skillToRemove) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(updatedSkills);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  const addSoftSkill = () => {
    if (newSoftSkill.trim() !== "") {
      const updatedSoftSkills = [...softskills, newSoftSkill.trim()];
      setSoftSkills(updatedSoftSkills);
      setNewSoftSkill("");

      setValue("softskills", updatedSoftSkills);
    }
  };

  const removeSoftSkill = (softskillToRemove) => {
    const updatedSoftSkills = softskills.filter(
      (softskill) => softskill !== softskillToRemove
    );
    setSoftSkills(updatedSoftSkills);
  };

  const handleKeyPressforSoftSkill = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSoftSkill();
    }
  };

  const [showTooltip, setShowTooltip] = useState(false);
  const [showExperieneceTooltip, setShowExperieneceTooltip] = useState(false);

  const RadioButton = ({ id, value, checked, onChange, label }) => {
    return (
      <div className="mb-2 flex">
        <input
          type="radio"
          id={id}
          value={value}
          checked={checked}
          onChange={onChange}
          className="checkbox mr-2"
        />
        <label htmlFor={id}>{label}</label>
      </div>
    );
  };

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const toggleModalSuccess = () => {
    setIsModalVisibleSuccess(!isModalVisibleSuccess);
  };

  return !loading ? (
    <>
      <ModelPopup
        isVisible={isModalVisible}
        title={"Job Posting Unsuccessfully!"}
        toggleVisibility={toggleModal}
      />
      <ModelPopup
        isVisible={isModalVisibleSuccess}
        title={"Job Posting Success!"}
        toggleVisibility={toggleModalSuccess}
      />
      <div className="rounded max-w-3xl w-full mx-auto">
        {/*---------------------------------------- Back to home button------------------------------------- */}
        <button className="btn bg-slate-200 hover:bg-slate-300 dark:bg-dark-card dark:hover:bg-hover-color">
          <Link href="/employerDashboard">
            <a className="flex-align-center gap-2">
              <FiChevronLeft />
              <span>back</span>
            </a>
          </Link>
        </button>

        <div className="bg-white dark:bg-dark-card rounded-md shadow-md p-6 md:p-8 mt-5">
          <div className="relative">
            <input
              type="file"
              hidden
              ref={logoInput}
              onChange={(e) => setLogo(e.target.files[0])}
            />
            <img
              src={`${
                banner
                  ? URL.createObjectURL(banner)
                  : job?.banner_url
                  ? job.banner_url
                  : "https://res.cloudinary.com/midefulness/image/upload/v1702402848/SkillGate/image_vdwwzw.png"
              }`}
              alt=""
              className="h-[200px] sm:cursor-pointer object-cover w-full rounded-tl-xl rounded-tr-xl"
              onClick={() => bannerInput.current.click()}
            />
            <input
              type="file"
              hidden
              ref={bannerInput}
              onChange={(e) => setBanner(e.target.files[0])}
            />
            <div
              className="sm:cursor-pointer"
              onClick={() => logoInput.current.click()}
            >
              {logo || job?.logo_url ? (
                <img
                  src={logo ? URL.createObjectURL(logo) : job?.logo_url}
                  alt=""
                  className="w-16 left-10 -bottom-8 absolute rounded-lg"
                />
              ) : (
                <div className="w-20 h-16 rounded-lg grid place-items-center left-10 -bottom-8 absolute border-2 border-dotted border-slate-400 dark:border-hover-color">
                  <FaCamera className="text-3xl opacity-60 dark:text-slate-500" />
                  <span className="opacity-50">Logo</span>
                </div>
              )}
            </div>
          </div>
          <h1 className="text-2xl font-bold mt-10 pt-5">
            Company Profile and Job Post Insights
          </h1>

          {/*----------------------------------------Begin Form------------------------------------- */}

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex-align-center flex-col sm:flex-row gap-4 mt-8">
              <div className="form-input w-full sm:flex-1 relative">
                <Controller
                  name="company_name"
                  control={control}
                  defaultValue={job?.company_name}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      id="company_name"
                      className="input"
                      required
                    />
                  )}
                />
                <label htmlFor="company_name">Company Name</label>
              </div>
              <div className="form-input w-full sm:flex-1 relative">
                <Controller
                  name="title"
                  control={control}
                  defaultValue={job?.title}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      id="title"
                      className="input"
                      required
                    />
                  )}
                />
                <label htmlFor="title">Job Title</label>
              </div>
            </div>

            <div className="form-input w-full sm:flex-1 relative mt-5">
              <Controller
                name="overview"
                control={control}
                defaultValue={job?.overview}
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="overview"
                    className="input !h-28 pt-2"
                    required
                  />
                )}
              />
              <label htmlFor="overview">Overview of the Company</label>
            </div>
            <div className="flex items-start justify-center flex-col sm:flex-row gap-4 mt-5">
              <div className="form-input w-full sm:flex-1 relative">
                <Controller
                  name="company_location"
                  control={control}
                  defaultValue={job?.company_location}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      id="company_location"
                      className="input"
                      required
                    />
                  )}
                />
                <label htmlFor="company_location">Company Location</label>
              </div>
              <div className="form-input w-full sm:flex-1 relative">
                <Controller
                  name="experience_level"
                  control={control}
                  defaultValue={job?.experience_level || ''}
                  render={({ field }) => (
                    <select
                      {...field}
                      id="dropdown"
                      className="block w-full border border-primary rounded-md focus:border-primary bg-gray-100 dark:bg-dark-main p-1.5"
                    >
                      <option value="">Select Experience Level</option>
                      <option value="Student Level">Student Level</option>
                      <option value="Entry Level">Entry level</option>
                      <option value="Mid Level">Mid Level</option>
                      <option value="Senior Level">Senior level</option>
                      <option value="Directors">Directors</option>
                    </select>
                  )}
                />
                {/* <label htmlFor="experience_level">Experience Level</label> */}
              </div>
            </div>
            <div className="form-input w-full sm:flex-1 relative mt-5">
              <Controller
                name="description"
                control={control}
                defaultValue={job?.description}
                render={({ field }) => (
                  <textarea
                    {...field}
                    id="description"
                    className="input !h-28 pt-2"
                    required
                  />
                )}
              />
              <label htmlFor="description">About the Job</label>
            </div>
            <div className="flex items-start justify-center flex-col sm:flex-row gap-4 mt-5">
              <div className="form-input w-full sm:flex-1 relative">
                <Controller
                  name="type_of_employment"
                  control={control}
                  defaultValue={job?.type_of_employment || ''}
                  render={({ field }) => (
                    <select
                      {...field}
                      id="dropdown"
                      className="block w-full border border-primary rounded-md focus:border-primary bg-gray-100 dark:bg-dark-main p-1.5"
                    >
                      <option value="">Select Type of Employment</option>
                      <option value="Full Time">Full Time</option>
                      <option value="Part Time">Part Time</option>
                      <option value="Internship">Internship</option>
                      <option value="Freelance">Freelance</option>
                      <option value="Remote">Remote</option>
                      <option value="Co Founder">Co Founder</option>
                      <option value="Contract">Contract</option>
                    </select>
                  )}
                />
                {/* <label htmlFor="type_of_employment">Company Location</label> */}
              </div>
              <div className="form-input w-full sm:flex-1 relative">
                <Controller
                  name="salary_range"
                  control={control}
                  defaultValue={job?.salary_range || ''}
                  render={({ field }) => (
                    <select
                      {...field}
                      id="dropdown"
                      className="block w-full border border-primary rounded-md focus:border-primary bg-gray-100 dark:bg-dark-main p-1.5"
                    >
                      <option value="">Select Salary Range</option>
                      <option value="less than $40k">Less than $40k</option>
                      <option value="$40k - 55k">$40k - 55k</option>
                      <option value="$55k - 85k">$55k - 85k</option>
                      <option value="$85k - 115k">$85k - 115k</option>
                      <option value="$115k - 145k">$115k - 145k</option>
                      <option value="$145k - 175k">$145k - 175k</option>
                    </select>
                  )}
                />
                {/* <label htmlFor="experience_level">Experience Level</label> */}
              </div>
            </div>
            {Array.from({ length: responsibilitiesFields }, (_, index) => (
              <div
                className="form-input w-full sm:flex-1 relative mt-10 mb-10 flex gap-4 items-center justify-center"
                key={index}
              >
                <div className="flex-auto mb-4 lg:mb-0 items-center flex justify-center gap-4">
                  <div className="form-input w-full sm:flex-1 relative items-center flex justify-center">
                    <Controller
                      name={`requirements_and_responsibilities[${index}].responsibilityfield`}
                      control={control}
                      // defaultValue={job?.requirements_and_responsibilities[index]}
                      render={({ field }) => (
                        <textarea
                          {...field}
                          id="requirements_and_responsibilities"
                          className="input-response"
                          required
                        />
                      )}
                    />
                    <label htmlFor="requirements_and_responsibilities">
                      Resposibilities
                    </label>
                  </div>
                </div>

                <div className="flex flex-row gap-1 items-center justify-center">
                  <button
                    type="button"
                    onClick={handleAddResponsibilitiesField}
                  >
                    <IoMdAdd size={25} className="text-gray-400" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemoveResponsibilitiesField(index)}
                  >
                    <IoMdRemove size={25} className="text-gray-400" />
                  </button>
                </div>
              </div>
              // </div>
            ))}
            <h2 className="text-xl font-bold mb-5">Requirements</h2>

            {/*----------------------------------------Begin education section------------------------------------- */}

            <h3 className="text-lg font-bold mt-5">Education</h3>
            <div>
              {Array.from({ length: educationFields }, (_, index) => (
                <div
                  key={index}
                  className="mt-4 flex flex-col lg:flex-row gap-4 items-center"
                >
                  <div className="flex-auto mb-4 lg:mb-0">
                    <Controller
                      name={`education[${index}].educationtype`}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <select
                          {...field}
                          id="dropdown"
                          className="block w-full mt-1 border border-primary rounded-md focus:border-primary bg-gray-100 dark:bg-dark-main p-2"
                        >
                          <option value="">Select...</option>
                          <option value="None">None</option>
                          <option value="Bachelor s degree">
                            Bachelor s degree
                          </option>
                          <option value="Master s degree">
                            Master s degree
                          </option>
                          <option value="Doctoral degree">
                            Doctoral degree
                          </option>
                        </select>
                      )}
                    />
                  </div>
                  <div className="ml-6 flex-auto mb-4 lg:mb-0">
                    <Controller
                      name={`education[${index}].educationfield`}
                      control={control}
                      defaultValue=""
                      render={({ field: { onChange, value } }) => (
                        <>
                          <RadioButton
                            id="computerscience"
                            value="Computer Science"
                            checked={value === "Computer Science"}
                            onChange={(e) => {
                              onChange(
                                e.target.value === value ? "" : e.target.value
                              );
                            }}
                            label="Computer Science"
                          />
                          <RadioButton
                            id="softwareengineer"
                            value="Software Engineer"
                            checked={value === "Software Engineer"}
                            onChange={(e) => {
                              onChange(
                                e.target.value === value ? "" : e.target.value
                              );
                            }}
                            label="Software Engineer"
                          />
                          <RadioButton
                            id="itRelatedOrEquivalent"
                            value="IT Related Or Equivalent"
                            checked={value === "IT Related Or Equivalent"}
                            onChange={(e) => {
                              onChange(
                                e.target.value === value ? "" : e.target.value
                              );
                            }}
                            label="IT Related Or Equivalent"
                          />
                        </>
                      )}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <button type="button" onClick={handleAddEducationField}>
                      <IoMdAdd size={25} className="text-gray-400" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveEducationField(index)}
                    >
                      <IoMdRemove size={25} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
              <div
                className="form-input w-full sm:flex-1 relative mt-5"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <Controller
                  name="education_job_post"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      id="education_job_post"
                      className="input !h-28 pt-2"
                      required
                    />
                  )}
                />
                <label htmlFor="education_job_post z-50">
                  Summarize the preferred candidates educational requirements
                  using bullet points, please
                  <button className="bg-primary text-white font-semibold text-sm rounded-full w-5 h-5 cursor-pointer ml-2 z-50">
                    i
                  </button>
                  {showTooltip && (
                    <div className="absolute bg-white text-gray-800 border border-primary shadow-lg dark:bg-gray-800 dark:text-white text-sm rounded p-2 absolute z-10 text-center mb-2">
                      We use this input field data to display in job posting
                      <div className="bg-gray-800 absolute bottom-full left-1/2 transform -translate-x-1/2"></div>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/*----------------------------------------End education section------------------------------------- */}

            {/*----------------------------------------Begin experience section------------------------------------- */}

            {/* <h2 className="text-xl font-bold mb-5">Experience</h2> */}

            <h3 className="text-lg font-bold mt-5">Work Experience</h3>
            <div>
              {Array.from({ length: experienceFields }, (_, index) => (
                <div
                  key={index}
                  className="mt-4 flex flex-col lg:flex-row gap-4"
                >
                  <div className="flex-auto mb-4 lg:mb-0">
                    <Controller
                      name={`experience[${index}].experiencedYears`}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <select
                          {...field}
                          id="dropdown"
                          className="block w-full mt-1 border border-primary rounded-md focus:border-primary bg-gray-100 dark:bg-dark-main p-2"
                        >
                          <option value="">Select...</option>
                          <option value="Less than 1 Year">
                            Less than 1 Year
                          </option>
                          <option value="+ 1 Year">+ 1 Year</option>
                          <option value="+ 2 Year">+ 2 Year</option>
                          <option value="+ 3 Year">+ 3 Year</option>
                          <option value="+ 4 Year">+ 4 Year</option>
                          <option value="+ 5 Year">+ 5 Year</option>
                          <option value="More than 5 Year">
                            More than 5 Year
                          </option>
                        </select>
                      )}
                    />
                  </div>
                  <div className="flex-auto mb-4 lg:mb-0">
                    <div className="form-input w-full sm:flex-1 relative">
                      <Controller
                        name={`experience[${index}].experiencedArea`}
                        control={control}
                        render={({ field }) => (
                          <textarea
                            {...field}
                            id="experiencedArea"
                            className="input !h-28 pt-2"
                            required
                          />
                        )}
                      />
                      <label htmlFor="experiencedArea">
                        Experince required area
                      </label>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <button type="button" onClick={handleAddExperienceField}>
                      <IoMdAdd size={25} className="text-gray-400" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleRemoveExperienceField(index)}
                    >
                      <IoMdRemove size={25} className="text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}

              <div
                className="form-input w-full sm:flex-1 relative mt-4"
                onMouseEnter={() => setShowExperieneceTooltip(true)}
                onMouseLeave={() => setShowExperieneceTooltip(false)}
              >
                <Controller
                  name="experience_job_post"
                  control={control}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      id="experience_job_post"
                      className="input !h-28 pt-2"
                      required
                    />
                  )}
                />
                <label htmlFor="experience_job_post">
                  Summarize the preferred candidates experience using bullet
                  points, please
                  <button className="bg-primary text-white font-semibold text-sm rounded-full w-5 h-5 cursor-pointer ml-2 z-50">
                    i
                  </button>
                  {showExperieneceTooltip && (
                    <div className="absolute bg-white text-gray-800 border border-primary shadow-lg dark:bg-gray-800 dark:text-white text-sm rounded p-2 absolute z-10 text-center">
                      We use this input field data to display in job posting
                      <div className="bg-gray-800 absolute bottom-full left-1/2 transform -translate-x-1/2"></div>
                    </div>
                  )}
                </label>
              </div>
            </div>

            {/*----------------------------------------End experience section------------------------------------- */}

            {/*----------------------------------------Begin technical skill section------------------------------------- */}

            <div className="mt-5">
              <div className="flex flex-wrap gap-2">
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
              <div className="mt-4 form-input w-full sm:flex-1 relative">
                <Controller
                  name="skills"
                  control={control}
                  defaultValue={skills}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter technical skills"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="input"
                    />
                  )}
                />
              </div>
            </div>

            {/*----------------------------------------End technical skill section------------------------------------- */}

            {/*----------------------------------------Begin soft skill section------------------------------------- */}

            <div className="mt-5">
              <div className="flex flex-wrap gap-2">
                {softskills.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-purple-400 text-white px-2 py-1 rounded-full flex items-center"
                  >
                    <span>{skill}</span>
                    <button
                      onClick={() => removeSoftSkill(skill)}
                      className="ml-2 focus:outline-none"
                    >
                      &#10005;
                    </button>
                  </div>
                ))}
              </div>
              <div className="mt-4 form-input w-full sm:flex-1 relative">
                <Controller
                  name="softskills"
                  control={control}
                  defaultValue={softskills}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      placeholder="Enter soft skills"
                      value={newSoftSkill}
                      onChange={(e) => setNewSoftSkill(e.target.value)}
                      onKeyPress={handleKeyPressforSoftSkill}
                      className="input"
                    />
                  )}
                />
              </div>
            </div>

            {/*----------------------------------------End soft skill section------------------------------------- */}

            <div className="form-input w-full sm:flex-1 relative mt-5">
              <Controller
                name="email"
                control={control}
                defaultValue={skills}
                render={({ field }) => (
                  <input {...field} type="text" className="input" required />
                )}
              />
              <label htmlFor="email">Email Address</label>
            </div>

            {/*----------------------------------------Begin checkbox section------------------------------------- */}

            <h2 className="text-md text-justify font-bold mt-5 mb-5">
              Please check the boxes if you wish to view visual or other
              analyses of candidates GitHub, LinkedIn, and Blogs.
            </h2>
            <div className="form-input w-full sm:flex-1 relative mb-5">
              <Controller
                name="socialProfile"
                control={control}
                defaultValue={{
                  github: false,
                  linkedin: false,
                  blogs: false,
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <div className="flex flex-col sm:flex-row justify-center gap-10">
                      <div className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id="github"
                          value="github"
                          onChange={(e) => {
                            onChange({
                              ...value,
                              github: e.target.checked,
                            });
                          }}
                          className="checkbox mr-3"
                        />
                        <h2 htmlFor="github">GitHub</h2>
                      </div>
                      <div className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id="linkedin"
                          value="linkedin"
                          onChange={(e) => {
                            onChange({
                              ...value,
                              linkedin: e.target.checked,
                            });
                          }}
                          className="checkbox mr-3"
                        />
                        <h2 htmlFor="linkedin" className="min-w-max">
                          LinkedIn
                        </h2>
                      </div>
                      <div className="flex items-center mb-2">
                        <input
                          type="checkbox"
                          id="blogs"
                          value="blogs"
                          onChange={(e) => {
                            onChange({
                              ...value,
                              blogs: e.target.checked,
                            });
                          }}
                          className="checkbox mr-3"
                        />
                        <h2 htmlFor="blogs" className="min-w-max">
                          Blogs
                        </h2>
                      </div>
                    </div>
                  </>
                )}
              />
            </div>

            <h2 className="text-md text-justify font-bold mt-5 mb-5">
              If you wish to prioritize fields for the shortlisting process,
              consider assigning weights to them to reflect their importance.
            </h2>

            <div className="form-input w-full sm:flex-1 relative mb-5">
              <Controller
                name="fieldsWeight"
                control={control}
                defaultValue={{
                  education: 0,
                  experience: 0,
                  technicalSkills: 0,
                  softSkills: 0,
                }}
                render={({ field: { onChange, value } }) => (
                  <>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                      {weightsOfFields.map((field) => (
                        <div className="flex items-center mb-2" key={field.key}>
                          <h1 htmlFor={field.key} className="mr-2">
                            {field.label}
                          </h1>
                          <select
                            id={field.key}
                            value={value[field.key]}
                            onChange={(e) => {
                              const selectedValue = parseInt(e.target.value);
                              const currentValue = value[field.key];
                              const updatedValue = {
                                ...value,
                                [field.key]: selectedValue,
                              };
                              const newSum =
                                sumOfWeight - currentValue + selectedValue;
                              if (newSum <= 10) {
                                onChange(updatedValue);
                                setSumOfWeight(newSum);
                                console.log(sumOfWeight);
                              }
                            }}
                            className={`select w-11 h-7 mr-1 rounded border ${
                              sumOfWeight > 10
                                ? "border-red-500"
                                : "border-green-500"
                            } bg-white p-1`}
                          >
                            {[...Array(11).keys()].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                        </div>
                      ))}
                      <h1>Total : {sumOfWeight}/10</h1>
                    </div>
                  </>
                )}
              />
            </div>

            {/*----------------------------------------End checkbox section------------------------------------- */}

            <button
              type="submit"
              className={`btn btn-primary w-full mt-4 ${
                sumOfWeight !== 10 ? "disabled" : ""
              }`}
              disabled={sumOfWeight !== 10}
            >
              Update job
            </button>
          </form>

          {/*----------------------------------------End Form------------------------------------- */}
        </div>
      </div>
    </>
  ) : (
    <FullPageLoader />
  );
};

export default PostSingleJob;