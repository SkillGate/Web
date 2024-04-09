import React from "react";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { useUiContext } from "../../../contexts/UiContext";
import { UpdateUser } from "../../../apiCalls/userApiCalls";
import ModelPopup from "../../common/ModelPopup";
import Loader from "../../common/Loader";
import { getSkill } from "../../../apiCalls/skillApiCalls";

export const SkillsPopup = ({ user, onClose, onChange }) => {
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [skillUrls, setSkillsUrls] = useState([]);
  const { loginUser } = useUiContext();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleSuccess, setIsModalVisibleSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [skillLoading, setSkillLoading] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  // There is no submit form
  const onSubmit = async (data) => {
    console.log(data);

    if (data.skills !== undefined) {
      setLoading(true);
      try {
        const {
          data: userData,
          loading,
          error,
        } = await UpdateUser(user?._id, user?.accessToken, data);
        console.log(userData);
        setLoading(loading);
        if (!userData || userData.length === 0) {
          setIsModalVisible(true);
          reset();
        } else {
          setIsModalVisibleSuccess(true);
          userData.accessToken = user.accessToken;
          loginUser(userData);
          onChange();
        }
      } catch (error) {
        setLoading(false);
        console.error("Error in onSubmit:", error);
      }
    } else {
      console.log("Empty skill entry");
    }
  };

  const toggleModalSuccess = () => {
    setIsModalVisibleSuccess(!isModalVisibleSuccess);
  };

  const handleAddSkill = async () => {
    console.log(newSkill);
    if (newSkill.trim() !== "") {
      try {
        const {
          data: skillData,
          loading,
          error,
        } = await getSkill(newSkill, user?.accessToken);
        console.log(skillData);
        setSkillLoading(loading);
        if (!skillData || skillData.length === 0) {
          setIsModalVisible(true);
        } else {
          // setIsModalVisibleSuccess(true);
          skillData.accessToken = user.accessToken;
          setSkillsUrls((prevSkillsUrls) => [...prevSkillsUrls, skillData]);
        }
      } catch (error) {
        setSkillLoading(false);
        console.error("Error in onSubmit:", error);
      }
      setSkills((prevSkills) => [...prevSkills, newSkill]);
      setNewSkill("");
    }
    console.log(skills);
    console.log(skillUrls);
  };

  const removeSkill = (skillToRemove) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(updatedSkills);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddSkill();
    }
  };

  return !loading ? (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 transition-opacity z-50">
      <ModelPopup
        isVisible={isModalVisible}
        title={"Personal Skills Update Unsuccess!"}
        toggleVisibility={toggleModal}
      />
      <ModelPopup
        isVisible={isModalVisibleSuccess}
        title={"Personal Skills Updated!"}
        toggleVisibility={toggleModalSuccess}
      />
      <div className="bg-white dark:bg-dark-main w-full sm:w-1/2 rounded-lg p-4">
        <button className="float-right text-gray-500" onClick={onClose}>
          <IoMdClose />
        </button>
        <h2 className="text-xl font-bold mb-8">Skills</h2>
        <div className="mb-10">
          <input
            type="text"
            className="outline-none h-8 border border-slate-300  dark:border-hover-color bg-main dark:bg-dark-main rounded-md px-[0.8rem] w-full text-base focus:!border-primary"
            placeholder="Enter a skill (e.g., Java, JavaScript, Python)"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <div
              key={index}
              className="bg-purple-400 text-white px-2 py-1 rounded-full flex items-center"
            >
              <span>{skill}</span>
              <button
                onClick={() => removeSkill(skill)}
                className="ml-2 focus:outline-none"
              >
                &#10005;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <Loader />
  );
};

export default SkillsPopup;
