import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import { imageUrl, skillIconUrl } from "../../constants";
import { getAllSkills } from "../../apiCalls/skillApiCalls";
import { useUiContext } from "../../contexts/UiContext";
import SkillRenderer from "../common/SkillRenderer";
import SoftSkillsPopup from "./models/soft-skill-model";

const SoftSkill = ({ details }) => {
  const [isSkillsOpen, setSkillsIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [change, notChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const { loginUser } = useUiContext();
  
  const softskills = ["Leadership", "Team working", "Hard working", "Leadership", "Communication"];

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
              user={softskills}
              onClose={handleSkillsClose}
              onChange={handleUserChangeState}
            />
          )}
        </div>
      </div>
      <div>
        {softskills.map((skill, index) => (
            <p className="text-sm" key={index}>{skill}</p>
        ))}
      </div>
    </div>
  );
};

export default SoftSkill;
