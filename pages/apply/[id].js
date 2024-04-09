import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { BiFile, BiLink } from "react-icons/bi";
import { FaLinkedin } from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";
import { userTypes } from "../../constants";
import useFetch from "../api/useFetch";
import { server } from "../../config";
import { useUiContext } from "../../contexts/UiContext";
import FullPageLoader from "../../components/common/FullPageLoader";
import { getJob } from "../../apiCalls/jobApiCalls";

const ApplyJob = ({ candidate }) => {
  const router = useRouter();
  const { id } = router.query;
  // const { user } = useUiContext();
  const [job, setJob] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('userData')) || {});
  const fileInput = useRef(null);
  const [file, setFile] = useState("");

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('userData'));
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
  }, []);

  // const { data: job, loading } = useFetch(`${server}/api/jobs/${id}`);

  

  const {
    title,
    company_name,
    company_location,
    skills,
    experience_level,
    type_of_employment,
    salary_range,
    experience,
    description,
    requirements_and_responsibilities,
    logo_url,
    banner_url,
    userId,
  } = job;

  return !loading ? (
    <>
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
          <div className="py-4 mt-3 border-y dark:border-hover-color">
            <h1 className="font-bold capitalize">submit your application</h1>
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
                  ref={fileInput}
                  onChange={(e) => setFile(e.target.files[0])}
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
          <form className="mt-8">
            <div className="flex-align-center flex-col sm:flex-row gap-4">
              <div className="form-input w-full sm:flex-1 relative">
                <input
                  type="text"
                  name="name"
                  className="input"
                  value={user?.firstName}
                  onChange={() => {}}
                  required
                />
                <label htmlFor="name" className="required-style">
                  First Name
                </label>
              </div>
              <div className="form-input w-full sm:flex-1 relative">
                <input
                  type="text"
                  name="name"
                  className="input"
                  value={user?.lastName}
                  onChange={() => {}}
                  required
                />
                <label htmlFor="name" className="required-style">
                  Last Name
                </label>
              </div>
            </div>
            <div className="flex-align-center flex-col sm:flex-row gap-4 mt-5">
              <div className="form-input w-full sm:flex-1 relative">
                <input
                  type="number"
                  name="phone"
                  className="input"
                  value={user?.phone}
                  required
                />
                <label htmlFor="phone" className="required-style">
                  Phone number
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
                  value={user?.email}
                  onChange={() => {}}
                  required
                />
                <label htmlFor="email" className="required-style">
                  Email Address
                </label>
              </div>
            </div>
            {/* <div className="form-input w-full sm:flex-1 relative mt-5">
              
            </div> */}
            <div className="form-input w-full sm:flex-1 relative mt-5">
              <textarea name="biography" className="input !h-20 pt-2" value={user?.biography}></textarea>
              <label htmlFor="biography">Short Bio</label>
            </div>
            <div className="input-check">
              <input type="checkbox" name="" id="terms" required />
              <label htmlFor="terms" className="required-style">
                I agree to the terms & conditions
              </label>
            </div>
            <button className="btn btn-primary w-full mt-4">
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
