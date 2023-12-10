import React, { useState } from 'react';
import { MdEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import ProjectPopup from './models/project-model';

const Project = ({details}) => {

    const [isProjectOpen, setProjectIsOpen] = useState(false);
    const handleProjectOpen = () => {
        setProjectIsOpen(true);
    };
    const handleProjectClose = () => {
        setProjectIsOpen(false);
    };

    return (
        <div className="py-4 border-b dark:border-hover-color">
            <div className="flex justify-between">
                <h1 className="text-lg font-semibold mb-3">Projects</h1>
                <div>
                    <button onClick={handleProjectOpen}><IoMdAdd size={25} className="text-gray-400" /></button>
                    {isProjectOpen && <ProjectPopup onClose={handleProjectClose} details={details} />}
                </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex gap-3">
                    <div>
                        <h1 className="text-md font-semiBold capitalize">
                            Employee WorkFlow Management System
                        </h1>
                        <p className="text-sm">HR Domain</p>
                        <p className="text-sm">
                            May 2022 - Jan 2023
                        </p>
                    </div>
                </div>
                <div>
                    <button onClick={handleProjectOpen}><MdEdit size={20} className="text-gray-400" /></button>
                    {isProjectOpen && <ProjectPopup onClose={handleProjectClose} details={details} />}
                </div>
            </div>
            <div className="my-3">
                <p class="text-sm mt-2">
                    A system that provides guidance to high school students on how to enhance their academic and career paths.
                </p>
                <h2 className="text-md font-semibold mt-3 mb-2">Skills</h2>
                <div className="flex-align-center gap-2">
                    <img src="/images/html5.png" alt="" className="w-6" />
                    <img src="/images/css3.png" alt="" className="w-6" />
                    <img src="/images/javascript.png" alt="" className="w-6" />
                    <img src="/images/react.png" alt="" className="w-6" />
                </div>
                <h2 className="text-md font-semibold mt-3 mb-2">Contribution</h2>
                <p className="text-sm">Developed scalable web applications using React.js and Node.js, contributing to a 30% increase in overall website performance.Collaborated with cross-functional teams to deliver high-quality software solutions within tight deadlines.</p>
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" class="flex items-center space-x-2 text-sm text-primary-light hover:text-primary mt-1">projectGitHubURL</a>
            </div>
        </div>
    );
};

export default Project;