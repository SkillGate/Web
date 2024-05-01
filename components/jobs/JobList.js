/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import JobSkillTags from "../common/JobSkillTags";
import { FaBookmark } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import { motion } from "framer-motion";
import Skeleton from "../loading-skeleton/Skeleton";
import { useState } from "react";
import { userTypes } from "../../constants";
import { savedJob } from "../../apiCalls/jobApiCalls";

const JobList = ({ jobs, loading, userType, user, change }) => {
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
        change();
      }
      // setTimeout(() => {
      //   window.location.reload();
      // }, 2000);
    } catch (error) {
      // setLoading(false);
      console.error("Error in onSubmit:", error);
    }
  };

  const calculateDate = (date) => {
    const postedDate = new Date(date);

    const currentDate = new Date();
    const timeDifferenceMs = currentDate - postedDate;
    const daysDifference = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));

    console.log("Number of days since posting:", daysDifference);
    return daysDifference;
  };

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
                  <img
                    src={
                      job?.logo_url ||
                      "https://res.cloudinary.com/midefulness/image/upload/v1700257571/SkillGate/photo_abisc5.png"
                    }
                    alt="logo"
                    className="w-14 rounded-lg"
                  />
                  <div>
                    <Link href="/jobs/[id]" as={`/jobs/${job?._id}`}>
                      <a className="group-hover:text-primary transition-a">
                        <h1 className="text-xl font-semibold">{job?.title}</h1>
                      </a>
                    </Link>
                    <p className="text-sm">
                      {job?.company_name}{" "}
                      <span className="text-xl mx-2">.</span>
                      <span>
                        {calculateDate(job?.createdAt) + " " + "Days"}
                      </span>
                    </p>
                  </div>
                </div>

                <div>
                  {userTypes.candidate === userType ? (
                    <button
                      className="bg-slate-100 px-3 py-1 rounded-md flex-align-center gap-x-2 flex-shrink-0 text-muted hover:bg-slate-200 dark:bg-hover-color dark:hover:bg-[#252532] disabled:bg-secondaryLightPurple dark:disabled:bg-secondaryLightPurple dark:disabled:text-black"
                      onClick={() => saveJobData(job?._id)}
                      disabled={job.saved_candidate_id_list.includes(user._id)}
                    >
                      {job.saved_candidate_id_list.includes(user._id) ? (
                        <>
                          <span>Already Saved</span>
                          <FaBookmark />
                        </>
                      ) : (
                        <>
                          <span>Save Job</span>
                          <FaRegBookmark />
                        </>
                      )}
                    </button>
                  ) : (
                    <Link href="/shortlist/[id]" as={`/shortlist/${job?._id}`}>
                      <button
                        className="bg-slate-100 px-3 py-1 rounded-md flex-align-center gap-x-2 flex-shrink-0 text-muted hover:bg-slate-200 dark:bg-hover-color dark:hover:bg-[#252532]"
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
