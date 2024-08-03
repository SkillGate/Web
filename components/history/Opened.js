/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useState } from "react";

import Link from "next/link";
import { ImProfile } from "react-icons/im";
import { getJobByUser } from "../../apiCalls/jobApiCalls";
import FullPageLoader from "../common/FullPageLoader";
const Opened = () => {
  const [loading, setLoading] = useState(true);
  const [jobs, setJobs] = useState([]);
  const [user, setUser] = useState(null);
  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUser((prevUser) => {
        const userData = JSON.parse(storedUserData);
        fetchData(userData._id, userData.accessToken);
        return userData;
      });
    }
  }, []);
  const fetchData = async (employeeId, accessToken) => {
    try {
      const { data: jobData = [], loading } = await getJobByUser(
        employeeId,
        accessToken
      );
      console.log(jobData);
      setJobs(jobData);
      setLoading(loading);
    } catch (error) {
      console.error("Error job fetching:", error);
      setLoading(false);
    }
  };
  return !loading ? (
    <>
      <div className="card p-2">
        <div className="card py-1 w-full text-center">
          <h1>
            Opened <span className="text-sm text-muted">({jobs.length})</span>
          </h1>
        </div>
        <div className="mt-3">
          {Array.apply(null, { length: jobs.length })
            .filter((_, index) => jobs[index].job_status === "Opening")
            .map((_, i) => (
              <div
                className="flex justify-between shadow-light group dark:bg-[#21212B] rounded-lg p-3 mt-3"
                key={i}
              >
                <div className="flex-align-center gap-2">
                  <img
                    src={jobs[i].logo_url}
                    alt=""
                    className="w-8 rounded-full"
                  />
                  <div>
                    <Link href="/history">
                      <a className="group-hover:text-primary">
                        <h1 className="text-lg font-bold capitalize">
                          {jobs[i].company_name}
                        </h1>
                      </a>
                    </Link>
                    <p className="text-sm">{jobs[i].company_location}</p>
                  </div>
                </div>
                <div className="flex align-center">
                  <Link href="/jobs/[id]" as={`/jobs/${jobs[i]?._id}`}>
                    <a className="group-hover:text-primary transition-a">
                      <button
                        className="bg-slate-100 px-3 py-1 rounded-md flex-align-center gap-x-2 flex-shrink-0 text-muted hover:bg-slate-200 dark:bg-hover-color dark:hover:bg-[#252532]"
                        // onClick={() =>
                        //   viewApplicants("shortlist/1")
                        // }
                      >
                        <span>View job post</span>
                        <ImProfile />
                      </button>
                    </a>
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  ) : (
    <FullPageLoader />
  );
};

export default Opened;
