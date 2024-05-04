import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { BiFile, BiLink } from "react-icons/bi";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";
import { userTypes } from "../../constants";
import FullPageLoader from "../../components/common/FullPageLoader";
import { applyJob, getJob } from "../../apiCalls/jobApiCalls";
import { useForm } from "react-hook-form";
import ModelPopup from "../../components/common/ModelPopup";
import { FaLinkedin } from "react-icons/fa";
import { FaRegThumbsUp } from "react-icons/fa6";

const ApplyJob = ({ candidate }) => {
  const router = useRouter();
  const { id } = router.query;
  // const { user } = useUiContext();
  const [job, setJob] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem('userData')) || {});
  const [user, setUser] = useState({});
  const fileInput = useRef(null);
  const [file, setFile] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleSuccess, setIsModalVisibleSuccess] = useState(false);
  const [candidateIdExist, setCandidateIdExist] = useState(false);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    setUser(storedUserData);
    const fetchData = async () => {
      try {
        const { data: jobData = [], loading } = await getJob(
          id,
          storedUserData?.accessToken
        );
        jobData.candidate_id_list.includes(storedUserData._id) &&
          setCandidateIdExist((prev) => true);
        console.log(jobData);
        setJob(jobData);
        setLoading(loading);
      } catch (error) {
        console.error("Error job fetching:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const [formData, setFormData] = useState({
    firstName: user?.firstName,
    lastName: user?.lastName,
    phone: user?.phone,
    email: user?.email,
    biography: user?.biography,
    acceptTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Here you can access the form data in the formData object
    console.log(formData);
    console.log(user);
    console.log(job);
    console.log(job?._id);
    // You can then perform any further actions, such as submitting the data to a server

    const candidateProfile = {
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      phone: user?.phone,
      address: user?.address,
      dateOfBirth: user?.dateOfBirth,
      role: user?.role,
      portfolio: user?.portfolio,
      linkedIn: user?.linkedIn,
      gitHub: user?.gitHub,
      blog: user?.blog,
      biography: user?.biography,
      skills: user?.skills,
      soft_skills: user?.soft_skills,
      volunteering: user?.volunteering,
      experience: user?.experience,
      education: user?.education,
      projects: user?.projects,
      awards: user?.awards,
      createdAt: user?.createdAt,
      updatedAt: user?.updatedAt,
    };

    if (user?._id && job?._id) {
      const candidateData = {
        candidateId: user._id,
        candidate_persona: candidateProfile
      };

      setLoading(true);

      try {
        const {
          data: jobData,
          loading,
          error,
        } = await applyJob(job._id, user?.accessToken, candidateData);
        console.log(jobData);
        setLoading(loading);

        if (!error) {
          console.log(error);
          if (!jobData || jobData.length === 0) {
            setIsModalVisible(true);
            reset();
          } else {
            setIsModalVisibleSuccess(true);
            // jobData.accessToken = user.accessToken;
            // loginUser(jobData);
          }
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      } catch (error) {
        setLoading(false);
        console.error("Error in onSubmit:", error);
      }
    } else {
      console.log("Job ID is null");
    }
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
        title={"Apply Job Unsuccessfully!"}
        toggleVisibility={toggleModal}
      />
      <ModelPopup
        isVisible={isModalVisibleSuccess}
        title={"Apply Job Success!"}
        toggleVisibility={toggleModalSuccess}
      />
      <div className="rounded max-w-3xl w-full mx-auto">
        {/*---------------------------------------- Back to home button------------------------------------- */}
        <button className="btn bg-slate-200 hover:bg-slate-300 dark:bg-dark-card dark:hover:bg-hover-color">
          <Link
            href={
              userTypes.candidate == user?.userType
                ? "/candidateDashboard"
                : "/employerDashboard"
            }
          >
            <a className="flex-align-center gap-2">
              <FiChevronLeft />
              <span>back</span>
            </a>
          </Link>
        </button>

        <div className="bg-white dark:bg-dark-card rounded-md shadow-md p-6 md:p-8 mt-5">
          <div className="relative mt-5">
            <img
              src={job?.banner_url}
              alt="Background Image"
              className="h-[200px] object-cover w-full rounded-tl-xl rounded-tr-xl"
            />
            <img
              src={job?.logo_url}
              alt="Logo"
              className="w-16 left-10 -bottom-8 absolute"
            />
          </div>

          <div className="mt-10">
            <h1 className="text-xl font-semibold">{job?.title}</h1>
            <p className="text-sm">
              <span className="text-primary">{job?.company_name}</span>
              <span className="px-2">{job?.company_location}</span>
              <span>3 days ago</span>
            </p>
          </div>
          <div className="py-4 mt-3 border-y dark:border-hover-color flex gap-4 items-center">
            <h1 className="font-bold capitalize">submit your application</h1>
            {candidateIdExist && (
              <button className="btn bg-red-500 hover:bg-red-600 focus:bg-red-600 text-white">
                <a href="#" disabled={true} className="flex-align-center gap-2">
                  <FaRegThumbsUp />
                  <span>Already Applied</span>
                </a>
              </button>
            )}
          </div>
          <div className="py-4 border-b dark:border-hover-color">
            <div className="flex-align-center gap-5">
              {/* <div>
                <p>LinkedIn Profile</p>
                <button className="btn bg-[#1275B1] hover:bg-[#0f6397] text-white">
                  <a
                    href="www/linkedin.com"
                    className="flex-align-center gap-2"
                  >
                    <FaLinkedin />
                    <span>Apply with LinkedIn</span>
                  </a>
                </button>
              </div> */}

              {/*---------------------------------------- File upload------------------------------------- */}
              <div>
                <input
                  type="file"
                  hidden
                  // ref={fileInput}
                  // onChange={(e) => setFile(e.target.files[0])}
                  disabled={true}
                />
                <p className="required-style">Attach Candidate Profile</p>
                <button
                  className="btn disabled flex-align-center text-slate-300 gap-2 bg-dark-card hover:bg-hover-color"
                  // onClick={() => fileInput.current.click()}
                >
                  <BiLink />
                  <span>Auto-link Your Candidate Profile</span>
                </button>
              </div>
            </div>
            {file && (
              <div className="flex-align-center gap-2 mt-3 text-primary">
                <BiFile />{" "}
                <p>
                  {file.name.length > 20
                    ? file.name.split(".")[0].slice(0, 20) +
                      "..." +
                      file.name.split(".")[1]
                    : file.name}
                </p>
              </div>
            )}
          </div>

          {/*---------------------------------------- Form------------------------------------- */}
          <form className="mt-8" onSubmit={handleFormSubmit}>
            <div className="flex-align-center flex-col sm:flex-row gap-4">
              <div className="form-input w-full sm:flex-1 relative">
                <input
                  type="text"
                  name="name"
                  className="input"
                  defaultValue={user?.firstName}
                  // value={formData.firstName}
                  disabled={candidateIdExist}
                  onChange={handleChange}
                  required
                />
                <label
                  htmlFor="name"
                  className={candidateIdExist ? "" : "required-style"}
                >
                  {candidateIdExist ? "" : "First Name"}
                </label>
              </div>
              <div className="form-input w-full sm:flex-1 relative">
                <input
                  type="text"
                  name="name"
                  className="input"
                  defaultValue={user?.lastName}
                  // value={formData.lastName}
                  disabled={candidateIdExist}
                  onChange={handleChange}
                  required
                />
                <label
                  htmlFor="name"
                  className={candidateIdExist ? "" : "required-style"}
                >
                  {candidateIdExist ? "" : "Last Name"}
                </label>
              </div>
            </div>
            <div className="flex-align-center flex-col sm:flex-row gap-4 mt-5">
              <div className="form-input w-full sm:flex-1 relative">
                <input
                  type="number"
                  name="phone"
                  className="input"
                  defaultValue={user?.phone}
                  // value={formData.phone}
                  disabled={candidateIdExist}
                  onChange={handleChange}
                  required
                />
                <label
                  htmlFor="phone"
                  className={candidateIdExist ? "" : "required-style"}
                >
                  {candidateIdExist ? "" : "Phone number"}
                </label>
              </div>
              {/* <div className="form-input w-full sm:flex-1 relative">
                <select className="input" required>
                  <option value="uganda">Uganda</option>
                  <option value="uganda">Kenya</option>
                  <option value="uganda">Tanzania</option>
                  <option value="uganda">Burundi</option>
                  <option value="uganda">Nigeria</option>
                </select>
                <label htmlFor="name">Country</label>
              </div> */}
              <div className="form-input w-full sm:flex-1 relative">
                <input
                  type="text"
                  name="email"
                  className="input"
                  defaultValue={user?.email}
                  // value={formData.email}
                  disabled={candidateIdExist}
                  onChange={handleChange}
                  required
                />
                <label
                  htmlFor="email"
                  className={candidateIdExist ? "" : "required-style"}
                >
                  {candidateIdExist ? "" : "Email Address"}
                </label>
              </div>
            </div>
            {/* <div className="form-input w-full sm:flex-1 relative mt-5">
              
            </div> */}
            <div className="form-input w-full sm:flex-1 relative mt-5">
              <textarea
                name="biography"
                className="input !h-20 pt-2"
                defaultValue={user?.biography}
                // value={formData.biography}
                disabled={candidateIdExist}
                onChange={handleChange}
              ></textarea>
              <label htmlFor="biography">
                {candidateIdExist ? "" : "Short Bio"}
              </label>
            </div>
            <div className="input-check">
              <input
                type="checkbox"
                name="accept-terms"
                id="terms"
                // className="disabled:border-gray"
                // value={formData.acceptTerms}
                disabled={candidateIdExist}
                onChange={handleChange}
                required
              />
              <label htmlFor="terms" className="required-style">
                I agree to the terms & conditions
              </label>
            </div>
            <button
              className={
                "btn btn-primary w-full mt-4 disabled:opacity-75 disabled:bg-gray-300 disabled:text-gray-600 disabled:cursor-not-allowed"
              }
              type="submit"
              disabled={candidateIdExist}
            >
              submit application
            </button>
          </form>
        </div>
      </div>
    </>
  ) : (
    <FullPageLoader />
  );
};

export default ApplyJob;
