/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import JobSkillTags from "../common/JobSkillTags";
import { FaBookmark } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { motion } from "framer-motion";
import Skeleton from "../loading-skeleton/Skeleton";
import { useEffect, useState } from "react";
import { userTypes } from "../../constants";
const JobList = ({ jobs, loading, userType }) => {
  // const [userType, setUserType] = useState("Candidate");
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (!loading && jobs.length > 0) {
      jobs.forEach((job) => {
        if (job?.logo_url instanceof Blob) {
          // Check if logo_url is a Blob
          const blob = job.logo_url;
          const reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = () => {
            const imageUrl = reader.result;
            setImageUrl((prevImages) => ({
              ...prevImages,
              [job._id]: imageUrl,
            }));
          };
        }
      });
    }
  }, [jobs, loading]);

  function viewApplicants(url) {
    window.location.href = url;
  }

  return !loading ? (
    <>
      {jobs.length > 0 ? (
        <>
          {jobs?.map((job) => (
            <motion.div
              className="card p-4 mt-3 group"
              key={job?._id}
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.6, opacity: 0 }}
            >
              <div className="flex flex-col sm:flex-row gap-3 justify-between">
                <div className="flex-align-center gap-3">
                  {imageUrl && imageUrl[job._id] ? (
                    <img
                      src={imageUrl[job._id]}
                      alt="logo"
                      className="w-14 rounded-lg"
                    />
                  ) : (
                    <img
                      src="https://res.cloudinary.com/midefulness/image/upload/v1700257571/SkillGate/photo_abisc5.png"
                      alt="logo"
                      className="w-14 rounded-lg"
                    />
                  )}
                  <div>
                    <Link href="/jobs/[id]" as={`/jobs/${job?._id}`}>
                      <a className="group-hover:text-primary transition-a">
                        <h1 className="text-xl font-semibold">{job?.title}</h1>
                      </a>
                    </Link>
                    <p className="text-sm">
                      {job?.company_name}{" "}
                      <span className="text-xl mx-2">.</span>3 days ago
                    </p>
                  </div>
                </div>

                <div>
                  {userTypes.candidate === userType ? (
                    <button className="bg-slate-100 px-3 py-1 rounded-md flex-align-center gap-x-2 flex-shrink-0 text-muted hover:bg-slate-200 dark:bg-hover-color dark:hover:bg-[#252532]">
                      <span>Save Job</span>
                      <FaBookmark />
                    </button>
                  ) : (
                    <button
                      className="bg-slate-100 px-3 py-1 rounded-md flex-align-center gap-x-2 flex-shrink-0 text-muted hover:bg-slate-200 dark:bg-hover-color dark:hover:bg-[#252532]"
                      onClick={() =>
                        viewApplicants("http://localhost:3000/shortlist/1")
                      }
                    >
                      <span>View Applicants</span>
                      <ImProfile />
                    </button>
                  )}
                </div>
              </div>
              <div className="flex-align-center gap-2 mt-2 flex-wrap">
                <span className="text-muted bg-slate-200 rounded-sm px-2 py-[1px] dark:bg-hover-color sm:text-sm ">
                  {job?.type_of_employment}
                </span>
                <span className="text-muted bg-slate-200 rounded-sm px-2 py-[1px] dark:bg-hover-color sm:text-sm ">
                  {/* {job?.experience} */} {"Experience"}
                </span>
                <span className="text-muted bg-slate-200 rounded-sm px-2 py-[1px] dark:bg-hover-color sm:text-sm ">
                  {job?.experience_level}
                </span>
              </div>

              <div className="my-3">
                <p className="text-sm">{job?.description.slice(0, 350)}...</p>
              </div>
              <JobSkillTags />
              <div className="flex flex-wrap sm:flex-nowrap md:flex-center-between mt-4">
                <div className="flex-align-center gap-4">
                  <h1>
                    {job?.salary_range}/{" "}
                    <span className="text-sm text-muted">month</span>
                  </h1>
                  <h1>
                    54{" "}
                    <span className="text-sm text-muted">People Applied</span>
                  </h1>
                </div>
                <div className="flex-align-center gap-x-4 mt-4 sm:mt-0">
                  {/* <button className="btn flex-shrink-0 bg-slate-100 hover:bg-slate-200 text-muted dark:bg-hover-color dark:hover:bg-[#252532]">
                    message
                  </button> */}
                  {userType === userTypes.candidate && (
                    <Link href={`/apply/${job?._id}`}>
                      <a className="btn btn-primary flex-shrink-0">apply now</a>
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </>
      ) : (
        <div className="flex-center-center mt-5">
          <div className="image-wrapper">
            <img
              src="/404.png"
              alt="404"
              className="mx-auto  object-contain h-[350px] w-[350px]"
            />
            <h1 className="text-center mt-5 text-5xl opacity-60">
              Oops! No jobs found
            </h1>
          </div>
        </div>
      )}
    </>
  ) : (
    <>
      {Array.apply(null, { length: 4 }).map((_, i) => (
        <Skeleton key={i} />
      ))}
    </>
  );
};

export default JobList;
