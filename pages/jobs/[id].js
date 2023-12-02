/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import JobSkillTags from "../../components/common/JobSkillTags";
import { BiBookmark, BiCircle, BiShareAlt } from "react-icons/bi";
import RelatedJobs from "../../components/singleJob/RelatedJobs";
import { useRouter } from "next/router";
import useFetch from "../api/useFetch";
import { server } from "../../config";
import { useEffect, useState } from "react";
import { getAllJob, getJob } from "../../apiCalls/jobApiCalls";
import { useUiContext } from "../../contexts/UiContext";
import Back from "../../components/common/Back";
import { userTypes } from "../../constants";
import FullPageLoader from "../../components/common/FullPageLoader";

const SingleJob = () => {
  const router = useRouter();
  const { id } = router.query;
  const { user } = useUiContext();
  const [job, setJob] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  // const { data: job, loading } = useFetch(`${server}/api/jobs/${id}`);

  useEffect(() => {
    if (!user?.userType) {
      router.push("/sign-in");
    }
    const fetchData = async () => {
      try {
        const { data: jobData = [], loading } = await getJob(
          id,
          user?.accessToken
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
  }, [user]);

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
      Number(job._id) !== Number(id) &&
      (job.title === title || job.company_name === company_name)
  );

  return !loading ? (
    <div>
      <div className="padding-container mb-5">
      {user?.userType === userTypes.candidate ? (
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
                src="https://res.cloudinary.com/midefulness/image/upload/v1700256405/SkillGate/3119_i6gvni.jpg"
                alt="job-header-image"
                className="h-full sm:h-[200px] object-cover w-full"
              />
              <img
                src={logo_url || "/images/photo-3.jpg"}
                alt=""
                className="w-16 left-10 -bottom-8 absolute rounded-xl"
              />
            </div>
            <div className="pt-10 px-6 pb-6">
              <div className="flex-center-between">
                <h1 className="text-xl font-semibold">{title}</h1>
                <div className="flex-align-center gap-x-2">
                  <div className="icon-box card-shadow dark:shadow-none card-bordered !rounded-md">
                    <BiBookmark />
                  </div>
                  <div className="icon-box card-shadow dark:shadow-none card-bordered !rounded-md">
                    <BiShareAlt />
                  </div>
                </div>
              </div>
              <div className="flex-center-between gap-x-2 mt-4">
                <p className="text-sm">
                  <span className="text-primary">{company_name}</span>{" "}
                  <span>{company_location}</span>
                </p>

                <span className="text-sm">
                  <span className="text-muted">Posted 8 days ago</span> 98
                  Applicants
                </span>
              </div>

              {/*---------------------------------------- Skills------------------------------------- */}
              <div className="mt-4">
                <JobSkillTags skills={skills} />
              </div>

              {/*---------------------------------------- About ------------------------------------ */}
              <div className="mt-5">
                <div className="card">
                  <div className="flex flex-col sm:flex-row sm:flex-center-between">
                    <div className="p-2">
                      <span className="text-sm capitalize text-muted">
                        Experience
                      </span>
                      <h1 className="capitalize">{experience}</h1>
                    </div>
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
                    <div className="p-2">
                      <span className="text-sm capitalize text-muted">
                        offer salary
                      </span>
                      <h1 className="capitalize">
                        {salary_range}/
                        <span className="text-sm text-muted"></span>
                      </h1>
                    </div>
                  </div>
                </div>
              </div>

              {/*---------------------------------------- Job Overview--------------------------------------------- */}
              <div className="mt-4">
                <h1 className="text-lg font-semibold">Overview</h1>
                <p className="leading-7">{description}</p>
              </div>

              {/*---------------------------------------- Job Description------------------------------------- */}
              <div className="mt-4">
                <h1 className="text-lg font-semibold">
                  Responsibilities & Requirements
                </h1>
                <div className="mt-3">
                  {requirements_and_responsibilities?.map((res, i) => (
                    <div className="flex-align-center gap-x-2 mt-3" key={i}>
                      <BiCircle className="text-xs text-primary flex-shrink-0" />
                      <p className="text-sm">{res}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-end mt-3">
                  {/* <Link
                  href="/jobs/apply"
                  className="btn btn-primary flex-shrink-0"
                >
                  apply now
                </Link> */}
                  <Link href={`/apply/${job?.id}`}>
                    <a className="btn btn-primary-outline flex-shrink-0">
                      apply now
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="md:col-span-1 h-fit md:sticky top-0">
          <RelatedJobs jobs={relatedJobs} />
        </div>
      </div>
    </div>
  ) : (
    <FullPageLoader />
  );
};

export default SingleJob;
