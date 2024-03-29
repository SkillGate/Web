import React, { useEffect, useState } from "react";
import formattedDate from "../components/common/CurrentDate";
import { useRouter } from "next/router";
import { useUiContext } from "../contexts/UiContext";
import Schedule from "../components/home/Schedule";
import Recommended from "../components/home/Recommended";
import FeaturedCompanies from "../components/home/FeaturedCompanies";
import LatestJobs from "../components/home/LatestJobs";
import Stats from "../components/home/Stats";
import BarChart from "../components/home/BarChart";
import useFetch from "./api/useFetch";
import { FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import { server } from "../config";
import Skeleton from "../components/loading-skeleton/Skeleton";

const EmployerDashboard = () => {
  // const { user } = useUiContext();
  const router = useRouter();

  const { data: jobs, loading } = useFetch(`${server}/api/jobs`);

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUser(prevUser => {
        const userData = JSON.parse(storedUserData);
        // Here you can perform any additional logic before updating the state
        return userData;
      });
      // loginAndPersistUser(JSON.parse(storedUserData));
    }
  }, []);

  // useEffect(() => {
  //   alert("Employer Dashboard");
  //   if (!user?.userType) {
  //     router.push("/");
  //   }
  // }, [user]);
  return (
    <div className="padding-container">
      <h1 className="font-bold text-2xl">
        Welcome, {user?.firstName + " " + user?.lastName}
      </h1>
      <p>{formattedDate}</p>
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        <Stats />
        <BarChart />
      </div>
      <div className="mt-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 mt-4">
          {/*---------------------------------------- Featured & Latest Jobs------------------------------------- */}
          <div className="md:col-span-2 h-fit sm:sticky top-0">
            <div className="flex-center-between mb-4">
              <h1 className="text-xl font-bold">Latest Job Posts</h1>
              <Link href="/search">
                <a className="flex-align-center gap-x-2 text-primary">
                  <span>See All</span>
                  <FiArrowRight />
                </a>
              </Link>
            </div>

            {loading ? (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.apply(null, { length: 4 }).map((_, i) => (
                  <Skeleton key={i} />
                ))}
              </div>
            ) : (
              <LatestJobs jobs={jobs} />
            )}
            <FeaturedCompanies />
          </div>
          {/*---------------------------------------- Recommended & Schedule------------------------------------- */}
          <div className="md:col-span-1 h-fit sm:sticky top-0">
            <div>
              <div className="flex-center-between mb-4">
                <h1 className="text-xl font-bold">Recommended for you</h1>
                <Link href="/search">
                  <a className="flex-align-center gap-x-2 text-primary">
                    <span>See All</span>
                    <FiArrowRight />
                  </a>
                </Link>
              </div>
              <Recommended jobs={jobs} loading={loading} />
              <Schedule />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployerDashboard;
