import React from 'react';
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';

export const SkillsPopup = ({ onClose }) => {

    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState('');

    const handleAddSkill = () => {
        if (newSkill.trim() !== '') {
            setSkills([...skills, newSkill]);
            setNewSkill('');
        }
    };

    const removeSkill = (skillToRemove) => {
        const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
        setSkills(updatedSkills);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddSkill();
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 transition-opacity z-50">
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
    );
};

export default SkillsPopup;
