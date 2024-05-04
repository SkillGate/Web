import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { imageUrl, skillIconUrl } from "../../constants";
import { getAllSkills } from "../../apiCalls/skillApiCalls";
import { useUiContext } from "../../contexts/UiContext";
import SoftSkillsPopup from "./models/soft-skill-model";

const SoftSkill = ({ details }) => {
  const [isSkillsOpen, setSkillsIsOpen] = useState(false);
  const [user, setUser] = useState(details);
  const [change, notChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const { loginUser } = useUiContext();

  // const softskills = [
  //   "Leadership",
  //   "Team working",
  //   "Hard working",
  //   "Leadership",
  //   "Communication",
  // ];

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    }
  }, [change]);

  const handleSkillsOpen = () => {
    setSkillsIsOpen(true);
  };
  const handleSkillsClose = () => {
    setSkillsIsOpen(false);
  };

  const handleEmptyValueClick = () => {
    setBiographyIsOpen(true);
  };

  const handleUserChangeState = () => {
    notChange(!change);
  };

  return (
    <div className="py-4 border-y dark:border-hover-color">
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold mb-3">Soft Skills</h1>
        <div>
          <button onClick={handleSkillsOpen}>
            <MdEdit size={20} className="text-gray-400" />
          </button>
          {isSkillsOpen && (
            <SoftSkillsPopup
              user={user}
              onClose={handleSkillsClose}
              onChange={handleUserChangeState}
            />
          )}
        </div>
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
  );
};

export default SoftSkill;
