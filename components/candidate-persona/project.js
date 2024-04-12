import React, { useEffect, useState } from "react";
import { MdEdit, MdDelete, MdOpenInNew } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import ProjectPopup from "./models/project-model";
import { skillIconUrl } from "../../constants";
import PopUpModal from "../common/PopUpModal";
import Loader from "../common/Loader";
import { useUiContext } from "../../contexts/UiContext";
import ProjectPopupNew from "./models/project-model-new";
import { RemoveUserWithSpecificStatus } from "../../apiCalls/userApiCalls";

const Project = ({ details }) => {
  const [isProjectOpen, setProjectIsOpen] = useState(false);
  const [isProjectNewOpen, setProjectNewIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [change, notChange] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [projectId, setProjectId] = useState(null);
  const [loading, setLoading] = useState(false);
  const { loginUser } = useUiContext();

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
      // loginAndPersistUser(JSON.parse(storedUserData));
    }
  }, [change]);

  const handleProjectOpen = (projects) => {
    setSelectedProject(projects);
    setProjectIsOpen(true);
  };
  const handleProjectClose = () => {
    setProjectIsOpen(false);
  };

  const handleRemoveProject = (id) => {
    console.log(id);
    setProjectId(id);
    setIsModalVisible(true);
  };
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  const confirmFunction = async () => {
    setIsModalVisible(false);
    setLoading(true);
    try {
      const {
        data: userData,
        loading,
        error,
      } = await RemoveUserWithSpecificStatus(
        details?._id,
        details?.accessToken,
        "projects",
        projectId
      );
      console.log(userData);
      setLoading(loading);
      if (!userData || userData.length === 0) {
        // setIsModalVisible(true);
        // reset();
      } else {
        userData.accessToken = details.accessToken;
        loginUser(userData);
        setProjectNewIsOpen(false);
        handleUserChangeState();
      }
    } catch (error) {
      setLoading(false);
      console.error("Error in onSubmit:", error);
    }
  };

  const handleProjectNewOpen = () => {
    setProjectNewIsOpen(true);
  };
  const handleProjectNewClose = () => {
    setProjectNewIsOpen(false);
  };

  const handleUserChangeState = () => {
    notChange(!change);
  };

  const selectMonthByNumber = (monthNumber) => {
    const month = parseInt(monthNumber);
    if (month < 1 || month > 12) {
      throw new Error("Invalid month number (1-12)");
    }

    const date = new Date();
    date.setMonth(month - 1);
    return new Date(date.getFullYear(), month - 1, 1);
  };

  return !loading ? (
    <div className="py-4 border-b dark:border-hover-color">
      <PopUpModal
        isVisible={isModalVisible}
        title="Are you sure?"
        toggleVisibility={toggleModal}
        confirmButtonColor="text-white bg-green-500 border border-green-500 hover:bg-white hover:text-green-500"
        cancelButtonColor="border border-red-500 bg-white text-red-500 hover:text-white hover:bg-red-500"
        showConfirmButton={true}
        showCancelButton={true}
        confirmButtonText="Yes, I'm sure"
        cancelButtonText="No, cancel"
        icon="question"
        confirmFunction={confirmFunction}
      />
      {/* <div className="py-4 border-b dark:border-hover-color"> */}
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold mb-3">Projects</h1>
        <div>
          <button onClick={handleProjectNewOpen}>
            <IoMdAdd size={25} className="text-gray-400" />
          </button>
          {isProjectNewOpen && (
            <ProjectPopupNew
              onClose={handleProjectNewClose}
              details={details}
              onChange={handleUserChangeState}
            />
          )}
        </div>
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
                          ).toLocaleDateString("en-US", { month: "long" }) +
                          " " +
                          project?.endYear}
                    </p>
                    {/* <p className="text-sm">May 2022 - Jan 2023</p> */}
                  </div>
                </div>
                <div>
                  <button onClick={() => handleProjectOpen(project)}>
                    <MdEdit size={20} className="text-gray-400" />
                  </button>
                  <button onClick={() => handleRemoveProject(project._id)}>
                    <MdDelete size={20} className="ml-2 text-gray-400" />
                  </button>
                  {isProjectOpen && (
                    <ProjectPopup
                      onClose={handleProjectClose}
                      details={details}
                      onChange={handleUserChangeState}
                      project={selectedProject}
                    />
                  )}
                </div>
              </div>
              <div className="my-3">
                <p class="text-sm mt-2">
                  {/* A system that provides guidance to high school students on
                    how to enhance their academic and career paths. */}
                  {project?.projectOverview}
                </p>
                <h2 className="text-md font-semibold mt-3 mb-2">Skills</h2>
                <div className="flex-align-center gap-2">
                  <img src={skillIconUrl.htmlIcon} alt="" className="w-6" />
                  <img src={skillIconUrl.cssIcon} alt="" className="w-6" />
                  <img src={skillIconUrl.jsIcon} alt="" className="w-6" />
                  <img src={skillIconUrl.reactIcon} alt="" className="w-6" />
                </div>
                <h2 className="text-md font-semibold mt-3 mb-2">
                  Contribution
                </h2>
                <p className="text-sm">
                  {project?.contribution}
                  {/* Developed scalable web applications using React.js and
                    Node.js, contributing to a 30% increase in overall website
                    performance.Collaborated with cross-functional teams to
                    deliver high-quality software solutions within tight
                    deadlines. */}
                </p>
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
  ) : (
    <Loader />
  );
};

export default Project;
