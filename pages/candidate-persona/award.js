import React, { useState } from 'react';
import { MdEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { ProjectPopup } from './project-model';

const Award = () => {

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
                <h1 className="text-lg font-semibold mb-3">Awards</h1>
                <div>
                    <button onClick={handleProjectOpen}><IoMdAdd size={25} className="text-gray-400" /></button>
                    {isProjectOpen && <ProjectPopup onClose={handleProjectClose} details={user} />}
                </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex gap-3">
                    <div>
                        <h1 className="text-md font-semiBold capitalize">
                            Mora Extream
                        </h1>
                        <p className="text-sm">
                            IEEE - University of Moratuwa
                        </p>
                        <p className="text-sm">
                            May 2022 - Jan 2023
                        </p>
                    </div>
                </div>
                <div>
                    <button onClick={handleProjectOpen}><MdEdit size={20} className="text-gray-400" /></button>
                    {isProjectOpen && <ProjectPopup onClose={handleProjectClose} details={user} />}
                </div>
            </div>
            <div className="my-3">
                <p className="text-sm">
                    Ranked within the top 50 in All Island Algorithmic Programming Competition.
                </p>
            </div>
        </div>
    );
};

export default Award;