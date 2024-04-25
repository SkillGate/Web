import React, { useEffect, useRef, useState } from "react";
import { useUiContext } from "../../contexts/UiContext";
import { useRouter } from "next/router";
import { BiFile, BiLink } from "react-icons/bi";
import { MdOpenInNew } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import PersonalInfoPopup from "../../components/candidate-persona/models/personalinfo-model";
import Biography from "../../components/candidate-persona/biography";
import Project from "../../components/candidate-persona/project";
import Award from "../../components/candidate-persona/award";
import Skill from "../../components/candidate-persona/skill";
import Experience from "../../components/candidate-persona/experience";
import Education from "../../components/candidate-persona/education";
import Volunteering from "../../components/candidate-persona/volunteer";

const CandidatePersona = () => {
  const [isPersonalInfoOpen, setPersonalInfoIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [change, notChange] = useState(false);
  const fileInput = useRef(null);
  const [file, setFile] = useState("");

  const handlePersonalInfoOpen = () => {
    setPersonalInfoIsOpen(true);
  };
  const handlePersonalInfoClose = () => {
    setPersonalInfoIsOpen(false);
  };

  const handleUserChangeState = () => {
    notChange(!change);
  };

  const handleEmptyValueClick = () => {
    setPersonalInfoIsOpen(true);
  };

  // const { user } = useUiContext();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUser((prevUser) => {
        const userData = JSON.parse(storedUserData);
        // Here you can perform any additional logic before updating the state
        return userData;
      });
      // loginAndPersistUser(JSON.parse(storedUserData));
    }
  }, [change]);

  const router = useRouter();
  // const { id } = router.query;
  // const { data: user, loading } = useFetch(`${server}/api/users/${id}`);

  return (
    <div className="padding-container max-w-5xl w-full mx-auto">
      <div className="h-fit md:sticky top-0">
        <div className="card overflow-hidden">
          <div className="relative">
            <img
              src="https://res.cloudinary.com/midefulness/image/upload/v1700258375/SkillGate/33003_cvtlei.jpg"
              alt=""
              className="h-full sm:h-[200px] object-cover w-full"
            />
            <img
              src={user?.avatar || "/images/talent.jpg"}
              alt=""
              className="w-16 left-10 -bottom-8 absolute rounded-lg"
            />
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
                    <span>Upload Resume/CV</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="mt-4">
                <p className="text-primary dark:text-slate-300 dark:font-semibold">{user?.role}</p>
                <div className="flex-align-center gap-2">
                  <span className="text-sm text-muted">{user?.address}</span>
                  <span className="text-xl text-muted">.</span>
                  <span className="text-sm text-muted">
                    {user?.num_of_connections} Connections
                  </span>
                </div>
              </div>
              <div className="mt-4">
                <button onClick={handlePersonalInfoOpen}>
                  <MdEdit size={20} className="text-gray-400" />
                </button>
                {isPersonalInfoOpen && (
                  <PersonalInfoPopup
                    onClose={handlePersonalInfoClose}
                    details={user}
                    onChange={handleUserChangeState}
                  />
                )}
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
                      <span
                        className="personal-information-input-empty"
                        onClick={handleEmptyValueClick}
                      >
                        Add Your Portfolio URL
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
                      <span
                        className="personal-information-input-empty"
                        onClick={handleEmptyValueClick}
                      >
                        Add Your LinkedIn Profile
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
                      <span
                        className="personal-information-input-empty"
                        onClick={handleEmptyValueClick}
                      >
                        Add Your GitHub Account
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
                      <span
                        className="personal-information-input-empty"
                        onClick={handleEmptyValueClick}
                      >
                        Add Your Blog Account
                      </span>
                    )}
                  </div>
                  <div className="w-full h-[1px] sm:h-16 sm:w-[1px] bg-slate-200 dark:bg-hover-color"></div>
                </div>
              </div>
            </div>
            <Biography />
            <Skill details={user} />
            <Experience details={user} />
            <Education details={user} />
            <Project details={user} />
            <Award details={user} />
            <Volunteering details={user} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatePersona;
