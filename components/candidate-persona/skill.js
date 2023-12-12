import React, { useState } from 'react';
import { MdEdit } from "react-icons/md";
import SkillsPopup from './models/skills-model';
import { imageUrl, skillIconUrl } from '../../constants';

const Skill = ({details}) => {

    const [isSkillsOpen, setSkillsIsOpen] = useState(false);
    const handleSkillsOpen = () => {
        setSkillsIsOpen(true);
    };
    const handleSkillsClose = () => {
        setSkillsIsOpen(false);
    };

    return (
        <div className="py-4 border-y dark:border-hover-color">
            <div className="flex justify-between">
                <h1 className="text-lg font-semibold mb-3">Skills</h1>
                <div>
                    <button onClick={handleSkillsOpen}><MdEdit size={20} className="text-gray-400" /></button>
                    {isSkillsOpen && <SkillsPopup onClose={handleSkillsClose} details={details} />}
                </div>
            </div>
            <div className="flex-align-center gap-2">
                <img src={skillIconUrl.htmlIcon} alt="" className="w-6" />
                <img src={skillIconUrl.cssIcon} alt="" className="w-6" />
                <img src={skillIconUrl.sassIcon} alt="" className="w-6" />
                <img src={skillIconUrl.bootstrapIcon} alt="" className="w-6" />
                <img src={skillIconUrl.jsIcon} alt="" className="w-6" />
                <img src={skillIconUrl.jqueryIcon} alt="" className="w-6" />
                <img src={skillIconUrl.reactIcon} alt="" className="w-6" />
                <img src={skillIconUrl.firebaseIcon} alt="" className="w-6" />
                <img src={skillIconUrl.gitIcon} alt="" className="w-6" />
            </div>
        </div>
    );
};

export default Skill;