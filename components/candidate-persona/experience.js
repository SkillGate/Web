import React, { useState } from 'react';
import { MdEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import ExperiencePopup from './models/experience-model';
import { imageUrl } from '../../constants';

const Experience = ({details}) => {

    const [isExperienceOpen, setExperienceIsOpen] = useState(false);
    const handleExperienceOpen = () => {
        setExperienceIsOpen(true);
    };
    const handleExperienceClose = () => {
        setExperienceIsOpen(false);
    };

    return (
        <div className="py-4 border-b dark:border-hover-color">
            <div className="flex justify-between">
                <h1 className="text-lg font-semibold mb-3">Job Experience</h1>
                <div>
                    <button onClick={handleExperienceOpen}><IoMdAdd size={25} className="text-gray-400" /></button>
                    {isExperienceOpen && <ExperiencePopup onClose={handleExperienceClose} details={details} />}
                </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex gap-3">
                    <div>
                        <img src={imageUrl.gtnlogo} alt="" className="w-10 h-10 object-contain" />
                    </div>
                    <div>
                        <h1 className="text-md font-semiBold capitalize">
                            X-Venture Global Solutions
                        </h1>
                        <p className="text-sm">
                            <span className="text-sm">Software Engineer</span>{" "}
                            <span> - Internship</span>
                        </p>
                        <p className="text-sm">
                            May 2022 - Jan 2023{" "}
                            <span className="!opacity-100">. 1/2 yrs</span>
                        </p>
                    </div>
                </div>
                <div>
                    <button onClick={handleExperienceOpen}><MdEdit size={20} className="text-gray-400" /></button>
                    {isExperienceOpen && <ExperiencePopup onClose={handleExperienceClose} details={details} />}
                </div>
            </div>
            <div className="my-3">
                <p className="text-sm mt-3">Skills</p>
                <div className="flex-align-center gap-2">
                    <img src="/images/html5.png" alt="" className="w-6" />
                    <img src="/images/css3.png" alt="" className="w-6" />
                    <img src="/images/javascript.png" alt="" className="w-6" />
                    <img src="/images/react.png" alt="" className="w-6" />
                </div>
                <p class="text-sm mt-2">
                    Developed scalable web applications using React.js and Node.js, contributing to a 30% increase in overall website performance.Collaborated with cross-functional teams to deliver high-quality software solutions within tight deadlines.
                </p>
            </div>
        </div>
    );
};

export default Experience;