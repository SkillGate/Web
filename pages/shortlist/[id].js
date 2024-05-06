import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";
import Table from "../../components/table/Table";
import { getJob } from "../../apiCalls/jobApiCalls";
import { GetCandidateData } from "../../apiCalls/userApiCalls";
import FullPageLoader from "../../components/common/FullPageLoader";

const Shortlist = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const [activeTab, setActiveTab] = useState(1);

  const [job, setJob] = useState([]);
  const [candidateList, setCandidateList] = useState([]);
  const [candidateQualificationList, setCandidateQualificationList] = useState([]);
  const [candidateShortlistedList, setCandidateShortlistedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});
  const [applyJob, setApplyJob] = useState(false);

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem("userData"));
    console.log(storedUserData);
    setUser((prev)=> storedUserData);
    const fetchData = async () => {
      try {
        const { data: jobData = [], loading } = await getJob(
          id,
          storedUserData?.accessToken
        );
        console.log(jobData);
        setJob((prev) => jobData);
        await getCandidateData(
          jobData?.candidate_id_list,
          storedUserData?.accessToken
        );
        setLoading(loading);
      } catch (error) {
        console.error("Error job fetching:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const getCandidateData = async (candidate_id_list, token) => {
    console.log(candidate_id_list);
    if (candidate_id_list?.length != 0) {
      setApplyJob(true);
      const canadidateData = {
        candidateIds: candidate_id_list,
      };
      try {
        const { data: candidateData = [], loading } = await GetCandidateData(
          canadidateData,
          token
        );
        console.log(candidateData);
        setCandidateList((prev) => {
          let applyCandidates = [];
          candidateData?.map((candidate) => {
            applyCandidates.push({
              id: candidate?._id,
              name: candidate?.firstName + " " + candidate?.lastName,
              phone: candidate?.phone,
              email: candidate?.email,
            });
          });
          return applyCandidates;
        });

        setCandidateShortlistedList((prev) => {
          let applyCandidates = [];
          candidateData?.forEach((candidate) => {
            let score = candidate?.persona_matching_score
              ? candidate?.persona_matching_score?.overall_score
              : 0;
            applyCandidates.push({
              id: candidate?._id,
              name: candidate?.firstName + " " + candidate?.lastName,
              phone: candidate?.phone,
              email: candidate?.email,
              score: score,
            });
          });

          // Sort the applyCandidates array based on the overall_score in descending order
          applyCandidates.sort((a, b) => b.score - a.score);

          return applyCandidates;
        });

        setCandidateQualificationList((prev) => {
          let applyCandidates = [];
          candidateData?.map((candidate) => {
            applyCandidates.push({
              id: candidate?._id,
              skills: candidate?.skills,
              experience: candidate?.experience,
              education: candidate?.education,
            });
          });
          return applyCandidates;
        });
        
      } catch (error) {
        console.error("Error job fetching:", error);
      }
    } else {
      setApplyJob(false);
      console.log("No one apply for this job!");
    }
  };

  const allApplicantsHeads = [
    { name: "Applicant Name", col: 1 },
    { name: "Contact Number", col: 1 },
    { name: "Email", col: 1 },
    { name: "Actions", col: 4 },
  ];
  const shortlistApplicantsHeads = [
    { name: "Applicant Name", col: 1 },
    { name: "Contact Number", col: 1 },
    { name: "Email", col: 1 },
    { name: "Score", col: 1 },
    { name: "Actions", col: 6 },
  ];
  const actions = [
    {
      name: "CV",
      title: "View CV",
      icon: "IoDocumentTextOutline",
      color: "yellow",
      url: `/candidate-persona`,
    },
    {
      name: "GitHub",
      title:
        "Access contributions made to projects via their respective GitHub URLs",
      icon: "IoLogoGithub",
      color: "green",
      url: "/github",
    },
    {
      name: "LinkedIn",
      title: "Review endorsed skills on LinkedIn",
      icon: "BsLinkedin",
      color: "blue",
      url: "/linkedin",
    },
    {
      name: "Articles",
      title: "Access analysis of blog articles",
      icon: "MdOutlineArticle",
      color: "orange",
      url: "/blogs",
    },
  ];
  const shrtlistactions = [
    {
      name: "Reason",
      title: "View reason for shortlisting",
      icon: "BsBookmarkCheck",
      color: "pink",
      url: `/reasoning/${id}`,
    },
    {
      name: "CV",
      title: "View CV",
      icon: "IoDocumentTextOutline",
      color: "yellow",
      url: `/candidate-persona`,
    },
    {
      name: "Benefits",
      title: "Predicted Compensation & Benefits",
      icon: "IoDocumentTextOutline",
      color: "yellow",
      popUp: "Benefits",
    },
    {
      name: "GitHub",
      title:
        "Access contributions made to projects via their respective GitHub URLs",
      icon: "IoLogoGithub",
      color: "green",
      url: "github",
    },
    {
      name: "LinkedIn",
      title: "Review endorsed skills on LinkedIn",
      icon: "BsLinkedin",
      color: "blue",
      url: "/linkedin",
    },
    {
      name: "Articles",
      title: "Access analysis of blog articles",
      icon: "MdOutlineArticle",
      color: "orange",
      url: "/blogs",
    },
  ];

  return !loading ? (
    <div>
      <div className="rounded max-w-3xl w-full mt-10">
        <button className="btn bg-slate-200 hover:bg-slate-300 dark:bg-dark-card dark:hover:bg-hover-color">
          <Link href={"/employer/search"}>
            <a className="flex-align-center">
              <FiChevronLeft />
              <span>back</span>
            </a>
          </Link>
        </button>
      </div>
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-card rounded-lg p-8 mt-5">
        <nav className="flex space-x-10 mb-8" aria-label="Tabs" role="tablist">
          <button
            className={`tab-button border border-primary rounded p-2 ${
              activeTab === 1
                ? "hs-tab-active btn-primary-light text-white p-2 rounded"
                : ""
            }`}
            onClick={() => handleTabClick(1)}
            aria-controls="tabs-with-icons-1"
            role="tab"
          >
            All Aplications
          </button>
          <button
            className={`tab-button border border-primary rounded p-2 ${
              activeTab === 2
                ? "hs-tab-active btn-primary-light text-white p-2 rounded"
                : ""
            }`}
            onClick={() => handleTabClick(2)}
            aria-controls="tabs-with-icons-2"
            role="tab"
          >
            Shortlisted Applications
          </button>
        </nav>

        <div className="mt-3">
          <div
            id="tabs-with-icons-1"
            className={`tab-content ${activeTab !== 1 ? "hidden" : ""}`}
          >
            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <Table
                    rows={candidateList}
                    heads={allApplicantsHeads}
                    actions={actions}
                    user={user}
                    candidateDetails={candidateQualificationList}
                    job={job}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            id="tabs-with-icons-2"
            className={`tab-content ${activeTab !== 2 ? "hidden" : ""}`}
          >
            <div className="flex flex-col">
              <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                  <Table
                    rows={candidateShortlistedList}
                    heads={shortlistApplicantsHeads}
                    actions={shrtlistactions}
                    user={user}
                    candidateDetails={candidateQualificationList}
                    job={job}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <FullPageLoader />
  );
};

export default Shortlist;
