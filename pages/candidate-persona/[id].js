import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { BiFile, BiLink } from "react-icons/bi";
import { MdOpenInNew } from "react-icons/md";
import { FaCamera, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";
import { GetUserData, UpdateUser } from "../../apiCalls/userApiCalls";
import FullPageLoader from "../../components/common/FullPageLoader";
import SkillRenderer from "../../components/common/SkillRenderer";
import CompanyRenderer from "../../components/common/CompanyRenderer";
import EducationRenderer from "../../components/common/EducationRenderer";

const CandidatePersonaSingle = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const [currentUser, setCurrentUser] = useState(null);
  const [user, setUser] = useState(null);
  const [change, notChange] = useState(false);
  const fileInput = useRef(null);
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    const userJson = JSON.parse(storedUserData);
    setCurrentUser((prev) => userJson);
    setLoading(true);
    const fetchUserData = async () => {
      try {
        const {
          data: userData,
          loading,
          error,
        } = await GetUserData(id, userJson?.accessToken);

        console.log(userData);
        if (!userData || userData.length === 0) {
          // setIsModalVisible(true);
          // reset();
          console.log("UserData null");
        }

        setUser((prev) => {
          let userDataNew = userData;
          userDataNew["accessToken"] = userJson?.accessToken;
          return userData;
        });
        setLoading(loading);
      } catch (error) {
        console.error("Error job fetching:", error);
        setLoading(false);
      }
    };
    fetchUserData();
  }, [id]);

  const selectMonthByNumber = (monthNumber) => {
    if (monthNumber < 1 || monthNumber > 12) {
      throw new Error("Invalid month number (1-12)");
    }

    const date = new Date();
    date.setMonth(monthNumber - 1);
    return new Date(date.getFullYear(), monthNumber - 1, 1);
  };

  const calculateDuration = (startYear, startMonth, endYear, endMonth) => {
    const totalStartMonths = parseInt(startYear) * 12 + parseInt(startMonth);
    const totalEndMonths = parseInt(endYear) * 12 + parseInt(endMonth);
    const totalMonths = totalEndMonths - totalStartMonths;

    const years = Math.floor(totalMonths / 12);
    const remainingMonths = totalMonths % 12;

    const output = {
      years: years,
      months: remainingMonths,
    };

    if (output.years === 0) {
      return `( ${output.months} mon )`;
    }
    return `( ${output.years} yrs -  ${output.months} mon )`;
  };

  return !loading ? (
    <div className="padding-container max-w-5xl w-full mx-auto">
      <div className="h-fit md:sticky top-0">
        <div className="card overflow-hidden">
          <div className="relative">
            <img
              src={
                user?.banner_url ||
                "https://res.cloudinary.com/midefulness/image/upload/v1702402848/SkillGate/image_vdwwzw.png"
              }
              // src={`${
              //   banner
              //     ? URL.createObjectURL(banner)
              //     : "https://res.cloudinary.com/midefulness/image/upload/v1702402848/SkillGate/image_vdwwzw.png"
              // }`}
              alt=""
              className="h-[200px] sm:cursor-pointer object-cover w-full rounded-tl-xl rounded-tr-xl"
            />
            <div className="sm:cursor-pointer">
              {user?.logo_url ? (
                <img
                  src={user?.logo_url || ""}
                  alt=""
                  className="w-16 left-10 -bottom-8 absolute rounded-lg"
                />
              ) : (
                <div className="w-20 h-16 rounded-lg grid place-items-center left-10 -bottom-8 absolute border-2 border-dotted border-slate-400 dark:border-hover-color">
                  <FaCamera className="text-3xl opacity-60 dark:text-slate-500" />
                  <span className="opacity-50">Logo</span>
                </div>
              )}
            </div>
          </div>
          <div className="pt-14 px-6 pb-6">
            <div className="flex-center-between">
              <h1 className="text-xl font-semibold">
                {/* {user?.firstName + " " + user?.lastName} ({user?.role || "Add Your Role"}) */}
                {user?.firstName + " " + user?.lastName}
              </h1>
              <div className="flex-align-center gap-x-2">
                <div>
                  <input
                    type="file"
                    hidden
                    ref={fileInput}
                    onChange={(e) => setFile(e.target.files[0])}
                  />
                  {/* <p className="required-style">Attach Candidate Profile</p> */}
                  <button
                    className="upload-resume-button"
                    onClick={() => fileInput.current.click()}
                  >
                    <BiLink />
                    <span>Download Resume/CV</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="mt-4">
                <p className="text-primary dark:text-slate-300 dark:font-semibold">
                  {user?.role}
                </p>
                <div className="flex-align-center gap-2">
                  <span className="text-sm text-muted">{user?.address}</span>
                  <span className="text-xl text-muted">.</span>
                  <span className="text-sm text-muted">
                    {user?.num_of_connections} Connections
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-5">
              <div className="card">
                <div className="flex flex-wrap sm:flex-row sm:flex-center-between">
                  <div className="p-2 w-1/3">
                    <span className="text-sm capitalize text-muted">
                      Email Address
                    </span>
                    <h1 className="capitalize">{user?.email}</h1>
                  </div>
                  <div className="w-full h-[1px] sm:h-16 sm:w-[1px] bg-slate-200 dark:bg-hover-color"></div>
                  <div className="p-2 w-1/3">
                    <span className="text-sm capitalize text-muted">Phone</span>
                    <h1 className="capitalize">{user?.phone}</h1>
                  </div>
                  <div className="w-full h-[1px] sm:h-16 sm:w-[1px] bg-slate-200 dark:bg-hover-color"></div>
                  <div className="p-2 w-1/3">
                    <p className="text-sm capitalize">Portfolio</p>
                    {user?.portfolio ? (
                      <a
                        href={user?.portfolio}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="personal-information-input"
                      >
                        <div>{user.portfolio} </div>
                        <div>
                          <MdOpenInNew
                            style={{
                              fontSize: "0.8em",
                              verticalAlign: "middle",
                            }}
                          />
                        </div>
                      </a>
                    ) : (
                      <span className="personal-information-input-empty">
                        The Portfolio URL is not available
                      </span>
                    )}
                  </div>
                  <div className="w-full h-[1px] sm:h-16 sm:w-[1px] bg-slate-200 dark:bg-hover-color"></div>
                  <div className="p-2 w-1/3">
                    <p className="text-sm capitalize">LinkedIn</p>
                    {user?.linkedIn ? (
                      <a
                        href={user?.linkedIn}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="personal-information-input"
                      >
                        <div>{user?.linkedIn} </div>
                        <div>
                          <MdOpenInNew
                            style={{
                              fontSize: "0.8em",
                              verticalAlign: "middle",
                            }}
                          />
                        </div>
                      </a>
                    ) : (
                      <span className="personal-information-input-empty">
                        The LinkedIn Profile is not available
                      </span>
                    )}
                  </div>
                  <div className="w-full h-[1px] sm:h-16 sm:w-[1px] bg-slate-200 dark:bg-hover-color"></div>
                  <div className="p-2 w-1/3">
                    <p className="text-sm capitalize">GitHub</p>
                    {user?.gitHub ? (
                      <a
                        href={user?.gitHub}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="personal-information-input"
                      >
                        <div>{user.gitHub} </div>
                        <div>
                          <MdOpenInNew
                            style={{
                              fontSize: "0.8em",
                              verticalAlign: "middle",
                            }}
                          />
                        </div>
                      </a>
                    ) : (
                      <span className="personal-information-input-empty">
                        The GitHub Account is not available
                      </span>
                    )}
                  </div>
                  <div className="w-full h-[1px] sm:h-16 sm:w-[1px] bg-slate-200 dark:bg-hover-color"></div>
                  <div className="p-2 w-1/3">
                    <p className="text-sm capitalize">Blog</p>
                    {user?.blog ? (
                      <a
                        href={user?.blog}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="personal-information-input"
                      >
                        <div>{user.blog} </div>
                        <div>
                          <MdOpenInNew
                            style={{
                              fontSize: "0.8em",
                              verticalAlign: "middle",
                            }}
                          />
                        </div>
                      </a>
                    ) : (
                      <span className="personal-information-input-empty">
                        The Blog Account is not available
                      </span>
                    )}
                  </div>
                  <div className="w-full h-[1px] sm:h-16 sm:w-[1px] bg-slate-200 dark:bg-hover-color"></div>
                </div>
              </div>
            </div>
            {/* Biography Section */}
            <div className="py-4">
              <div className="flex justify-between">
                <h1 className="text-lg font-semibold">Biography</h1>
              </div>
              <div className="flex flex-col sm:flex-row justify-between gap-4 mt-3">
                <div className="flex gap-3">
                  <h1
                    className={`text-md font-semiBold ${
                      !user?.biography && "capitalize"
                    }`}
                  >
                    {user?.biography || "The Biography is not available"}
                  </h1>
                </div>
              </div>
            </div>

            {/* Skillls */}

            <div className="py-4 border-y dark:border-hover-color">
              <div className="flex justify-between">
                <h1 className="text-lg font-semibold mb-3">Skills</h1>
              </div>
              <div>
                <SkillRenderer
                  user={user}
                  requiredSkills={user?.skills}
                  change={true}
                />
              </div>
            </div>

            {/* Soft Skills */}
            <div className="py-4 border-y dark:border-hover-color">
              <div className="flex justify-between">
                <h1 className="text-lg font-semibold mb-3">Soft Skills</h1>
              </div>
              <div>
                {user?.soft_skills ? (
                  user?.soft_skills.map((skill, index) => (
                    <p className="text-sm" key={index}>
                      {skill}
                    </p>
                  ))
                ) : (
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex gap-3">
                      <h1 className="text-md font-semiBold capitalize">
                        No soft skills available.
                      </h1>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Experience */}
            <div className="py-4 border-b dark:border-hover-color">
              <div className="flex justify-between">
                <h1 className="text-lg font-semibold mb-3">Job Experience</h1>
              </div>
              {user && user?.experience && user?.experience?.length !== 0 ? (
                <div>
                  {user.experience.map((experience) => (
                    <div key={experience._id}>
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex gap-3 items-center justify-center">
                          <div>
                            <CompanyRenderer
                              user={user}
                              companyLogo={experience?.companyName}
                            />
                          </div>
                          <div>
                            <h1 className="text-md font-semiBold capitalize">
                              {experience?.companyName}
                            </h1>
                            <p className="text-sm">
                              <span className="text-sm">
                                {experience?.jobRole}
                              </span>{" "}
                              <span> - {experience?.employmentType}</span>
                            </p>
                            <p className="text-sm">
                              {selectMonthByNumber(
                                experience?.startMonth
                              ).toLocaleDateString("en-US", { month: "long" }) +
                                " " +
                                experience?.startYear}{" "}
                              -{" "}
                              {experience?.currentlyWorking
                                ? "Present"
                                : selectMonthByNumber(
                                    experience?.endMonth
                                  ).toLocaleDateString("en-US", {
                                    month: "long",
                                  }) +
                                  " " +
                                  experience?.endYear}
                              {/* May 2022 - Jan 2023{" "} */}
                              {!experience?.currentlyWorking && (
                                <span className="!opacity-100">
                                  {" "}
                                  {calculateDuration(
                                    experience?.startYear,
                                    experience?.startMonth,
                                    experience?.endYear,
                                    experience?.endMonth
                                  )}
                                </span>
                              )}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="my-3">
                        <p className="text-sm mt-3 font-semibold">Skills</p>
                        <div className="flex-align-center gap-2 my-2">
                          <SkillRenderer
                            user={user}
                            requiredSkills={experience.skills}
                          />
                        </div>
                        <p className="text-sm mt-2 mb-2">
                          {experience?.workDone}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex gap-3">
                    <h1 className="text-md font-semiBold capitalize">
                      No available Experience.
                    </h1>
                  </div>
                </div>
              )}
            </div>

            {/* Education */}

            <div className="py-4 border-b dark:border-hover-color">
              <div className="flex justify-between">
                <h1 className="text-lg font-semibold mb-3">Education</h1>
              </div>
              {user && user.education && user.education.length !== 0 ? (
                <div>
                  {user.education.map((education) => (
                    <div key={education?._id}>
                      <div className="flex flex-col sm:flex-row justify-between gap-4 mt-4">
                        <div className="flex gap-3 items-center justify-center">
                          <div>
                            <EducationRenderer
                              user={user}
                              companyLogo={education?.universityName}
                            />
                          </div>
                          <div>
                            <h1 className="text-md font-semiBold capitalize">
                              {education?.degreeName}
                            </h1>
                            <p className="text-sm">
                              <span>{education?.classOfDegree}</span>
                            </p>
                            <p className="text-sm">
                              <span className="text-sm">
                                {education?.universityName}
                              </span>
                            </p>
                            <p className="text-sm">
                              {selectMonthByNumber(
                                education?.startMonth
                              ).toLocaleDateString("en-US", { month: "long" }) +
                                " " +
                                education?.startYear}{" "}
                              -{" "}
                              {selectMonthByNumber(
                                education?.endMonth
                              ).toLocaleDateString("en-US", { month: "long" }) +
                                " " +
                                education?.endYear}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex gap-3">
                    <h1 className="text-md font-semiBold capitalize">
                      No available Education.
                    </h1>
                  </div>
                </div>
              )}
            </div>

            {/* Project */}
            <div className="py-4 border-b dark:border-hover-color">
              <div className="flex justify-between">
                <h1 className="text-lg font-semibold mb-3">Projects</h1>
              </div>
              {user && user.projects && user.projects.length !== 0 ? (
                <div>
                  {user.projects.map((project, index) => (
                    <div key={project._id}>
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex gap-3">
                          <div>
                            <h1 className="text-md font-semibold capitalize">
                              {index + 1 + "."} {project?.projectName}
                              {/* Employee WorkFlow Management System */}
                            </h1>
                            <p className="text-sm">{project?.projectDomain}</p>
                            {/* <p className="text-sm">HR Domain</p> */}
                            <p className="text-sm">
                              {selectMonthByNumber(
                                project?.startMonth
                              ).toLocaleDateString("en-US", { month: "long" }) +
                                " " +
                                project?.startYear}{" "}
                              -{" "}
                              {project?.currentlyWorking
                                ? "Present"
                                : selectMonthByNumber(
                                    project?.endMonth
                                  ).toLocaleDateString("en-US", {
                                    month: "long",
                                  }) +
                                  " " +
                                  project?.endYear}
                            </p>
                            {/* <p className="text-sm">May 2022 - Jan 2023</p> */}
                          </div>
                        </div>
                      </div>
                      <div className="my-3">
                        <p className="text-sm mt-2">
                          {/* A system that provides guidance to high school students on
                    how to enhance their academic and career paths. */}
                          {project?.projectOverview}
                        </p>
                        <h2 className="text-md font-semibold mt-3 mb-2">
                          Skills
                        </h2>
                        <div className="flex-align-center gap-2">
                          <SkillRenderer
                            user={user}
                            requiredSkills={project?.skills}
                            change={change}
                          />
                        </div>
                        <h2 className="text-md font-semibold mt-3 mb-2">
                          Contribution
                        </h2>
                        <p className="text-sm">{project?.contribution}</p>
                        <a
                          href={project?.gitHubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-2 text-sm text-primary-light hover:text-primary dark:text-white dark:font-semibold mt-1"
                        >
                          <div className="flex items-center justify-center">
                            {project?.gitHubLink}
                            <MdOpenInNew
                              style={{
                                marginLeft: "5px",
                                fontSize: "1em",
                                verticalAlign: "middle",
                              }}
                            />
                          </div>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex gap-3">
                    <h1 className="text-md font-semiBold capitalize">
                      No available Projects.
                    </h1>
                  </div>
                </div>
              )}
            </div>

            {/* Award */}
            <div className="py-4 border-b dark:border-hover-color">
              <div className="flex justify-between">
                <h1 className="text-lg font-semibold mb-3">Awards</h1>
              </div>

              {user && user.awards && user.awards.length !== 0 ? (
                <div>
                  {user.awards.map((awards) => (
                    <div key={awards._id}>
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex gap-3">
                          <div>
                            <h1 className="text-md font-semiBold capitalize">
                              {awards?.awardName}
                            </h1>
                            <p className="text-sm">
                              {awards?.organizationName}
                            </p>
                            <p className="text-sm">
                              {selectMonthByNumber(
                                awards?.month
                              ).toLocaleDateString("en-US", { month: "long" }) +
                                " " +
                                awards?.year}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="my-3">
                        <p className="text-sm">{awards?.placeDescription}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex gap-3">
                    <h1 className="text-md font-semiBold capitalize">
                      No available volunteering work.
                    </h1>
                  </div>
                </div>
              )}
            </div>

            {/* Volunteering */}
            <div className="py-4 border-b dark:border-hover-color">
              <div className="flex justify-between">
                <h1 className="text-lg font-semibold mb-3">Volunteering</h1>
              </div>
              {user && user.volunteering && user.volunteering.length !== 0 ? (
                <div>
                  {user.volunteering.map((experience) => (
                    <div key={experience._id}>
                      <div className="flex flex-col sm:flex-row justify-between gap-4">
                        <div className="flex gap-3">
                          <div>
                            <h1 className="text-md font-semiBold capitalize">
                              {/* IEEE Computer Society Student Branch Chapter of UCSC */}
                              {experience?.organizationName}
                            </h1>
                            {/* <p className="text-sm">Member</p> */}
                            <p className="text-sm">{experience?.position}</p>
                            {/* <p className="text-sm">May 2022 - Jan 2023</p> */}
                            <p className="text-sm">
                              {selectMonthByNumber(
                                experience?.startMonth
                              ).toLocaleDateString("en-US", { month: "long" }) +
                                " " +
                                experience?.startYear}{" "}
                              -{" "}
                              {selectMonthByNumber(
                                experience?.endMonth
                              ).toLocaleDateString("en-US", { month: "long" }) +
                                " " +
                                experience?.endYear}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="my-3">
                        <p className="text-sm">
                          {/* Events: Intellihack 2.0 | 2021 - Program team member */}
                          {experience?.eventName}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row justify-between gap-4">
                  <div className="flex gap-3">
                    <h1 className="text-md font-semiBold capitalize">
                      No available volunteering work.
                    </h1>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <FullPageLoader />
    </div>
  );
};

export default CandidatePersonaSingle;
