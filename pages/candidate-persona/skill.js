import React, { useState } from 'react';
import { MdEdit } from "react-icons/md";
import { SkillsPopup } from './model';

const Skill = () => {

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
                    {isSkillsOpen && <SkillsPopup onClose={handleSkillsClose} />}
                </div>
            </div>
            <div className="flex-align-center gap-2">
                <img src="/images/html5.png" alt="" className="w-6" />
                <img src="/images/css3.png" alt="" className="w-6" />
                <img src="/images/sass.png" alt="" className="w-6" />
                <img src="/images/bootstrap.png" alt="" className="w-6" />
                <img src="/images/javascript.png" alt="" className="w-6" />
                <img src="/images/jquery.png" alt="" className="w-6" />
                <img src="/images/react.png" alt="" className="w-6" />
                <img src="/images/firebase.png" alt="" className="w-6" />
                <img src="/images/git.png" alt="" className="w-6" />
            </div>
        </div>
    );
};

export default Skill;