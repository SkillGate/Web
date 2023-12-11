import React, { useState } from 'react';
import { MdEdit } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import VolunteeringPopup from './models/volunteering-model';

const Volunteering = ({ details }) => {

    const [isVolunteeringOpen, setVolunteeringIsOpen] = useState(false);
    const handleVolunteeringOpen = () => {
        setVolunteeringIsOpen(true);
    };
    const handleVolunteeringClose = () => {
        setVolunteeringIsOpen(false);
    };

    return (
        <div className="py-4 border-b dark:border-hover-color">
            <div className="flex justify-between">
                <h1 className="text-lg font-semibold mb-3">Volunteering</h1>
                <div>
                    <button onClick={handleVolunteeringOpen}><IoMdAdd size={25} className="text-gray-400" /></button>
                    {isVolunteeringOpen && <VolunteeringPopup onClose={handleVolunteeringClose} details={details} />}
                </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-4">
                <div className="flex gap-3">
                    <div>
                        <h1 className="text-md font-semiBold capitalize">
                            IEEE Computer Society Student Branch Chapter of UCSC
                        </h1>
                        <p className="text-sm">
                            Member
                        </p>
                        <p className="text-sm">
                            May 2022 - Jan 2023
                        </p>
                    </div>
                </div>
                <div>
                    <button onClick={handleVolunteeringOpen}><MdEdit size={20} className="text-gray-400" /></button>
                    {isVolunteeringOpen && <VolunteeringPopup onClose={handleVolunteeringClose} details={details} />}
                </div>
            </div>
            <div className="my-3">
                <p className="text-sm">
                Events: 
                Intellihack 2.0 | 2021 - Program team member 
                </p>
            </div>
        </div>
    );
};

export default Volunteering;