/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import JobSkillTags from "../../components/common/JobSkillTags";
import { ImProfile } from "react-icons/im";
import { BiBookmark, BiCircle, BiShareAlt } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa6";
import RelatedJobs from "../../components/singleJob/RelatedJobs";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  closeJob,
  getAllJob,
  getJob,
  savedJob,
} from "../../apiCalls/jobApiCalls";
import Back from "../../components/common/Back";
import { imageUrl, userTypes } from "../../constants";
import FullPageLoader from "../../components/common/FullPageLoader";
import Swal from "sweetalert2";

const SingleJob = () => {
  const router = useRouter();
  const { id } = router.query;
  // const { user } = useUiContext();
  const [job, setJob] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [change, setChange] = useState(true);
  // const [user, setUser] = useState(JSON.parse(localStorage.getItem('userData')) || {});
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    console.log(storedUserData);
    setUser(storedUserData);
    const fetchData = async () => {
      try {
        const { data: jobData = [], loading } = await getJob(
          id,
          storedUserData?.accessToken
        );
        console.log(jobData);
        setJob(jobData);
        setLoading(loading);
      } catch (error) {
        console.error("Error job fetching:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id, change]);

  const calculateDate = (date) => {
    const postedDate = new Date(date);

    const currentDate = new Date();
    const timeDifferenceMs = currentDate - postedDate;
    const daysDifference = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));

    console.log("Number of days since posting:", daysDifference);
    return daysDifference;
  };

  const {
    userId,
    title,
    company_name,
    company_location,
    createdAt,
    skills,
    soft_skills,
    experience_level,
    type_of_employment,
    salary_range,
    experience,
    experience_job_post,
    education,
    education_job_post,
    overview,
    description,
    requirements_and_responsibilities,
    time_posted,
    logo_url,
    banner_url,
    job_status,
    candidate_id_list,
    githubCheckBox,
    linkedinCheckBox,
    blogsCheckBox,
    saved_candidate_id_list,
    persona_matching_score,
    w_soft_skills,
    w_technical_skills,
    w_education,
    w_experience,
    _id,
  } = job;

  // const { data: jobs } = useFetch(`${server}/api/jobs`);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: jobData = [] } = await getAllJob(user?.accessToken);
        console.log(jobData);
        setJobs(jobData);
      } catch (error) {
        console.error("Error job fetching:", error);
      }
    };
    fetchData();
  }, [user]);

  const relatedJobs = jobs.filter(
    (job) =>
      Number(job._id) !== Number(_id) &&
      (job.title === title || job.company_name === company_name)
  );

  const saveJobData = async (jobId) => {
    console.log(jobId);
    if (user?._id && jobId) {
      await saveHistoryJob(jobId, user?.accessToken, user?._id);
    } else {
      console.log(user?._id);
      console.log(jobId);
      console.log("User ID or job ID cant null");
    }
  };

  const saveHistoryJob = async (jobId, token, candidateId) => {
    // setLoading(true);
    const candidateIdData = {
      candidateId: candidateId,
    };
    try {
      const {
        data: jobData,
        loading,
        error,
      } = await savedJob(jobId, token, candidateIdData);
      console.log(jobData);
      // setLoading(loading);
      if (!jobData || jobData.length === 0) {
        // setIsModalVisible(true);
        // reset();
        console.log("Saved Job");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Job save Failed',
          text: 'An unexpected error occurred. Please try again.',
        });
      }
      // setLoading(false);
    } catch (error) {
      // setLoading(false);
      console.error("Error in onSubmit:", error);
    }
  };

  const closeJobVacancy = async (jobId) => {
    setLoading(true);
    console.log(jobId);
    try {
      const { data: jobData, loading, error } = await closeJob(jobId, user?.accessToken);
      console.log(jobData);
      // setLoading(loading);
      if (!jobData || jobData.isRemove === true) {
        // setIsModalVisible(true);
        // reset();
        console.log("Close Job");
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Job Close Failed',
          text: 'An unexpected error occurred. Please try again.',
        });
      }
      setLoading(loading);
    } catch (error) {
      setLoading(false);
      console.error("Error in close job:", error);
    }
  };

  const shareJob = () => {
    const urlToCopy = window.location.href;

    const tempInput = document.createElement("input");
    tempInput.value = urlToCopy;
    document.body.appendChild(tempInput);

    tempInput.select();
    tempInput.setSelectionRange(0, 99999); // For mobile devices
    document.execCommand("copy");

    document.body.removeChild(tempInput);
    const copySuccessMessage = document.getElementById("copySuccessMessage");
    copySuccessMessage.classList.remove("hidden");

    // Hide the success message after 3 seconds
    setTimeout(() => {
      copySuccessMessage.classList.add("hidden");
    }, 1000);
  };

  return !loading ? (
    <div>
      <div className="padding-container mb-5">
        {user?.userType == userTypes.candidate ? (
          <Back url={"/candidateDashboard"} />
        ) : (
          <Back url={"/employerDashboard"} />
        )}
      </div>

      <div className="padding-container grid md:grid-cols-3 gap-x-14">
        <div className="md:col-span-2 h-fit md:sticky top-0">
          <div className="card overflow-hidden">
            <div className="relative">
              <img
                src={banner_url || imageUrl.logoDoubleColor}
                alt="job-header-image"
                className={`h-full sm:h-[200px] object-cover w-full ${
                  !banner_url && "p-10"
                }`}
              />
              <img
                src={
                  logo_url ||
                  "https://res.cloudinary.com/midefulness/image/upload/v1713019229/SkillGate/NoLogo/no-logo-removebg-preview_r3ipnp.png"
                }
                alt="company-logo"
                className={`w-16 left-10 -bottom-8 absolute rounded-xl ${
                  !logo_url && "bg-white h-10"
                }`}
              />
            </div>
            <div className="pt-10 px-6 pb-6">
              <div className="flex-center-between">
                <h1 className="text-xl font-semibold">{title}</h1>
                <div className="flex-align-center gap-x-2">
                  {user.userType == "Candidate" && (
                    <div
                      className="icon-box card-shadow dark:shadow-none card-bordered !rounded-md"
                      onClick={() => saveJobData(_id)}
                      disabled={saved_candidate_id_list.includes(user._id)}
                    >
                      {saved_candidate_id_list.includes(user._id) ? (
                        <FaRegBookmark />
                      ) : (
                        <BiBookmark />
                      )}
                    </div>
                  )}
                  <div
                    className="icon-box card-shadow dark:shadow-none card-bordered !rounded-md"
                    onClick={shareJob}
                  >
                    <BiShareAlt />
                  </div>
                  <div
                    id="copySuccessMessage"
                    className="hidden bg-green-500 text-white text-sm py-1 px-2 rounded mt-2"
                  >
                    URL copied successfully!
                  </div>
                </div>
              </div>
              <div className="flex-center-between gap-x-2 mt-4">
                <p className="text-sm">
                  <span className="text-primary">{company_name}</span>{" "}
                  <span>{company_location}</span>
                </p>

                <span className="text-sm flex flex-col items-end">
                  <span className="text-muted">
                    Posted {calculateDate(createdAt)} days ago
                  </span>{" "}
                  <span>{candidate_id_list?.length} Applicants</span>
                </span>
              </div>

              {/*---------------------------------------- Skills------------------------------------- */}
              <div className="flex justify-items-center items-center place-content-between">
                <div className="mt-4">
                  <JobSkillTags skills={skills} />
                </div>
                {userTypes.employer === user?.userType && (
                  <Link href="/shortlist/[id]" as={`/shortlist/${job?._id}`}>
                    <button
                      className="my-4 bg-purple-haze px-3 py-1 rounded-md flex-align-center gap-x-2 flex-shrink-0 text-muted hover:bg-primary hover:text-white dark:bg-hover-color dark:hover:bg-[#252532]"
                      // onClick={() =>
                      //   viewApplicants("shortlist/1")
                      // }
                    >
                      <span>View Applicants</span>
                      <ImProfile />
                    </button>
                  </Link>
                )}
              </div>
              {/*---------------------------------------- About ------------------------------------ */}
              <div className="mt-5">
                <div className="card">
                  <div className="flex flex-col sm:flex-row sm:flex-center-between">
                    {user?.userType == userTypes.candidate ? (
                      <div className="p-2 ml-2">
                        <span className="text-sm capitalize text-muted">
                          Type of Employment
                        </span>
                        <h1 className="capitalize">{type_of_employment}</h1>
                      </div>
                    ) : (
                      <div className="p-2 ml-2">
                        <span className="text-sm capitalize text-muted">
                          Job Status
                        </span>
                        <h1 className="capitalize">{job_status}</h1>
                      </div>
                    )}

                    <div className="w-full h-[1px] sm:h-16 sm:w-[1px] bg-slate-200 dark:bg-hover-color"></div>
                    <div className="p-2">
                      <span className="text-sm capitalize text-muted">
                        work level
                      </span>
                      <h1 className="capitalize">{experience_level}</h1>
                    </div>
                    <div className="w-full h-[1px] sm:h-16 sm:w-[1px] bg-slate-200 dark:bg-hover-color"></div>
                    <div className="p-2">
                      <span className="text-sm capitalize text-muted">
                        employee type
                      </span>
                      <h1 className="capitalize">{type_of_employment}</h1>
                    </div>
                    <div className="w-full h-[1px] sm:h-16 sm:w-[1px] bg-slate-200 dark:bg-hover-color"></div>
                    <div className="p-2 mr-2">
                      <span className="text-sm capitalize text-muted">
                        offer salary
                      </span>
                      <h1 className="capitalize">
                        {salary_range}
                        <span className="text-sm text-muted"></span>
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              {/*---------------------------------------- Job Overview--------------------------------------------- */}
              <div className="mt-4">
                <h1 className="text-lg font-semibold">Overview</h1>
                <p className="leading-7">{overview}</p>
              </div>

              {/*---------------------------------------- Job Overview--------------------------------------------- */}
              <div className="mt-4">
                <h1 className="text-lg font-semibold">Role Profile</h1>
                <p className="leading-7">{description}</p>
              </div>

              {/*---------------------------------------- Job Responsibilities & Requirements------------------------------------- */}
              <div className="mt-4">
                <h1 className="text-lg font-semibold">
                  Responsibilities & Requirements
                </h1>
                <div className="mt-3">
                  {requirements_and_responsibilities?.map((res, i) => (
                    <div className="flex-align-center gap-x-2 mt-3" key={i}>
                      <BiCircle className="text-xs text-primary flex-shrink-0" />
                      <p className="leading-7">{res}</p>
                    </div>
                  ))}
                </div>

                {/*---------------------------------------- Job Experience------------------------------------- */}
                <div className="mt-4">
                  <h1 className="text-lg font-semibold">
                    What You&apos;ll Bring
                  </h1>
                  <div>
                    <div className="flex-align-center gap-x-2 mt-3">
                      <BiCircle className="text-xs text-primary flex-shrink-0" />
                      {/* <p className="text-sm">{res}</p> */}
                      <p className="leading-7">{education_job_post}</p>
                    </div>
                    <div className="flex-align-center gap-x-2 mt-3">
                      <BiCircle className="text-xs text-primary flex-shrink-0" />
                      <p className="leading-7">{experience_job_post}</p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end mt-3">
                  {/* <Link
                  href="/jobs/apply"
                  className="btn btn-primary flex-shrink-0"
                >
                  apply now
                </Link> */}
                  {user?.userType == userTypes.candidate && (
                    <Link href={`/apply/${job?._id}`}>
                      <a className="btn btn-primary-outline flex-shrink-0">
                        apply now
                      </a>
                    </Link>
                  )}
                  {user?.userType === userTypes.employer && (
                    <div
                      className={`btn flex-shrink-0 ${
                        job.isRemoved ? "btn-disable-outline" : "btn-error-outline"
                      } ${job.isRemoved ? "cursor-not-allowed" : ""}`}
                      onClick={() => !job.isRemoved && closeJobVacancy(_id)}
                      style={{ pointerEvents: job.isRemoved ? "none" : "auto" }}
                    >
                      {job.isRemoved ? "Job Closed" : "Close Job"}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-1 h-fit md:sticky top-0">
          <RelatedJobs jobs={relatedJobs} user={user} />
        </div>
      </div>
    </div>
  ) : (
    <FullPageLoader />
  );
};

export default SingleJob;
