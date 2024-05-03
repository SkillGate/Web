import React from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";
import { stats } from "../../data/stats";

const Stats = ({ noOfJobOpenings, noOfPostedJob, noOfJobApplications, noOfJobClose }) => {
  return (
    <div className="grid sm:grid-cols-2 gap-4 dark:text-slate-700">
      {stats.map(
        ({ id, icon, number, title, increment, percentage, cardBg }) => (
          <div
            className="p-2 rounded-md card-shadow dark:shadow-none"
            key={id}
            style={{ backgroundColor: cardBg }}
          >
            <div className="icon-box bg-dark-card hover:bg-dark-main text-white text-muted transition-a">
              {icon}
            </div>
            <div className="mt-2 flex-center-between">
              <div className="flex-1">
                {id == 1 ? (
                  <h1 className="text-2xl">{noOfJobOpenings}</h1>
                ) : id == 2 ? (
                  <h1 className="text-2xl">{noOfJobApplications}</h1>
                ) : id == 3 ? (
                  <h1 className="text-2xl">{noOfPostedJob}</h1>
                ) : (
                  <h1 className="text-2xl">{noOfJobClose}</h1>
                )}

                <p>{title}</p>
              </div>
              <div className="flex-1">
                <div className="flex-align-center space-x-2">
                  {increment ? (
                    <>
                      <p> +{percentage}</p>
                      <FiTrendingUp />
                    </>
                  ) : (
                    <>
                      <p> +{percentage}</p>
                      <FiTrendingDown />
                    </>
                  )}
                </div>
                <div className="w-full h-2 bg-white mt-2 rounded-lg">
                  <div
                    className={`h-full w-1/2 rounded-lg ${
                      increment ? "bg-green-600" : "bg-secondaryRed"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
};

export default Stats;
