import React, { useState } from 'react';
import { MdEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { EducationPopup } from './model';

const Education = () => {

    const [isEducationOpen, setEducationIsOpen] = useState(false);
    const handleEducationOpen = () => {
        setEducationIsOpen(true);
    };
    const handleEducationClose = () => {
        setEducationIsOpen(false);
    };

    return (
        <div className="py-4 border-b dark:border-hover-color">
            <div className="flex justify-between">
                <h1 className="text-lg font-semibold">Education</h1>
                <div>
                    <button onClick={handleEducationOpen}><IoMdAdd size={25} className="text-gray-400" /></button>
                    {isEducationOpen && <EducationPopup onClose={handleEducationClose} details={user} />}
                </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex gap-3">
                    <img
                        src="/images/Mak-Logo.png"
                        alt=""
                        className="flex-shrink-0 w-10 h-10 object-contain"
                    />
                    <div>
                        <h1 className="text-md font-semiBold capitalize">
                            Bachelor of Science in Computer Science (BSc. in CS)
                        </h1>
                        <p className="text-sm">
                            <span>Second Class - Upper Division</span>
                        </p>
                        <p className="text-sm">
                            <span className="text-sm">University of Colombo School of Computing</span>
                        </p>
                        <p className="text-sm">
                            <span>Jan 2019 - Apr 2024</span>
                        </p>
                    </div>
                </div>
                <div>
                    <button onClick={handleEducationOpen}><MdEdit size={20} className="text-gray-400" /></button>
                    {isEducationOpen && <EducationPopup onClose={handleEducationClose} details={user} />}
                </div>
            </div>
        </div>
    );
};

export default Education;