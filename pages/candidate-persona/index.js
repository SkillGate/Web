import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { BiFile, BiLink } from "react-icons/bi";
import { MdOpenInNew } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaCamera, FaTimes } from "react-icons/fa";
import PersonalInfoPopup from "../../components/candidate-persona/models/personalinfo-model";
import Biography from "../../components/candidate-persona/biography";
import Project from "../../components/candidate-persona/project";
import Award from "../../components/candidate-persona/award";
import Skill from "../../components/candidate-persona/skill";
import Experience from "../../components/candidate-persona/experience";
import Education from "../../components/candidate-persona/education";
import Volunteering from "../../components/candidate-persona/volunteer";
import SoftSkill from "../../components/candidate-persona/softskills";
import Swal from "sweetalert2";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../../firebase/firebase";
import { UpdateUser } from "../../apiCalls/userApiCalls";
import { useUiContext } from "../../contexts/UiContext";

const CandidatePersona = () => {
  const logoInput = useRef(null);
  const bannerInput = useRef(null);
  const [isPersonalInfoOpen, setPersonalInfoIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [change, notChange] = useState(false);
  const fileInput = useRef(null);
  const [file, setFile] = useState("");
  const [logo, setLogo] = useState(null);
  const [banner, setBanner] = useState(null);
  const [loading, setLoading] = useState(false);
  const [changeImage, setChangeImage] = useState(false);
  const { loginUser } = useUiContext();

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

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUser((prevUser) => {
        const userData = JSON.parse(storedUserData);
        setLogo(userData?.logo_url);
        setBanner(userData?.bannar_url);
        return userData;
      });
    }
  }, [change, changeImage]);

  const router = useRouter();

  const storeImage = (file, type) => {
    const fileName = new Date().getTime() + file.name;
    const storage = getStorage(app);
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prevProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        console.log("Upload is " + prevProgress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
          default:
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Image added unsuccess!",
        });
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
          saveData(downloadURL, type);
        });
      }
    );
  };

  const saveData = async (image, type) => {
    let userImageData = {};
    if (type == "logo") {
      userImageData["logo_url"] = image;
    } else if (type == "bannar") {
      userImageData["banner_url"] = image;
    }
    setLoading(true);
    try {
      const {
        data: userData,
        loading,
        error,
      } = await UpdateUser(user._id, user?.accessToken, userImageData);
      console.log(userData);
      setLoading(loading);
      if (!userData || userData.length === 0) {
        reset();
      } else {
        userData.accessToken = user.accessToken;
        loginUser(userData);
      }
      setChangeImage(!changeImage);
    } catch (error) {
      setLoading(false);
      console.error("Error in onSubmit:", error);
    }
  };

  return (
    <div className="padding-container max-w-5xl w-full mx-auto">
      <div className="h-fit md:sticky top-0">
        <div className="card overflow-hidden">
          <div className="relative">
            <input
              type="file"
              hidden
              ref={bannerInput}
              onChange={(e) => {
                setBanner(e.target.files[0]);
                storeImage(e.target.files[0], "bannar");
              }}
            />
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
              onClick={() => {
                bannerInput.current.click();
              }}
            />
            <input
              type="file"
              hidden
              ref={logoInput}
              onChange={(e) => {
                setLogo(e.target.files[0]);
                storeImage(e.target.files[0], "logo");
              }}
            />
            <div
              className="sm:cursor-pointer"
              onClick={() => logoInput.current.click()}
            >
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
                    <span>Upload Resume/CV</span>
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
            <SoftSkill details={user} />
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
