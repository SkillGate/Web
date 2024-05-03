/* eslint-disable @next/next/no-img-element */
import { BiBookmark } from "react-icons/bi";
import Link from "next/link";

const RelatedJobs = ({ jobs, user }) => {
  const calculateDate = (date) => {
    const postedDate = new Date(date);

    const currentDate = new Date();
    const timeDifferenceMs = currentDate - postedDate;
    const daysDifference = Math.floor(timeDifferenceMs / (1000 * 60 * 60 * 24));

    console.log("Number of days since posting:", daysDifference);
    return daysDifference;
  };

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

  return jobs?.length > 0 ? (
    <div className="mt-5">
      <h1 className="text-xl font-bold">Related Jobs</h1>
      {jobs?.map((job) => (
        <div className="card p-3 mt-3 group" key={job._id}>
          <div className="flex-align-center gap-x-2">
            <img
              src={
                job?.logo_url ||
                "https://res.cloudinary.com/midefulness/image/upload/v1713019229/SkillGate/NoLogo/no-logo-removebg-preview_r3ipnp.png"
              }
              alt="logo"
              className={`w-10 rounded-lg ${
                !job?.logo_url && "bg-white drop-shadow-md py-2"
              }`}
            />
            <div className="flex-1">
              <Link href="/jobs/[id]" as={`/jobs/${job?._id}`}>
                <a className="group-hover:text-primary transition-a">
                  <h1 className="font-bold text-lg">{job?.title}</h1>
                </a>
              </Link>
              <h1 className="text-sm">
                {job?.company_name}{" "}
                <span className="text-muted">{job?.location}</span>
              </h1>
            </div>
            {user.userType == "Candidate" && (
              <div
                className="icon-box card-shadow dark:shadow-none card-bordered !rounded-md"
                onClick={() => saveJobData(job?._id)}
                disabled={job?.saved_candidate_id_list.includes(user._id)}
              >
                {job?.saved_candidate_id_list.includes(user._id) ? (
                  <FaRegBookmark />
                ) : (
                  <BiBookmark />
                )}
              </div>
            )}
          </div>
          <div className="mt-3 flex-center-between">
            <div className="flex-align-center gap-x-2">
              <span className="px-2 py-[1px] bg-slate-100 dark:bg-hover-color">
                {job?.type_of_employment}
              </span>
              <span className="px-2 py-[1px] bg-slate-100 dark:bg-hover-color">
                {job?.experience_level}
              </span>
            </div>
            <span className="text-sm">
              <span className="text-primary">New</span>{" "}
              <span className="text-muted">
                {calculateDate(job?.createdAt)}d
              </span>
            </span>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <div>
      <h1 className="text-3xl font-bold">No Related Jobs found</h1>
    </div>
  );
};

export default RelatedJobs;
