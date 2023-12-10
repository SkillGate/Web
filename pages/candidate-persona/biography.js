import React, { useState } from 'react';
import { MdEdit } from "react-icons/md";
import { BiographyPopup } from './model';

const Biography = () => {

    const [isBiographyOpen, setBiographyIsOpen] = useState(false);
    const handleBiographyOpen = () => {
        setBiographyIsOpen(true);
    };
    const handleBiographyClose = () => {
        setBiographyIsOpen(false);
    };

    return (
        <div className="py-4">
            <div className="flex justify-between">
                <h1 className="text-lg font-semibold">Biography</h1>
                <div>
                    <button onClick={handleBiographyOpen}><MdEdit size={20} className="text-gray-400" /></button>
                    {isBiographyOpen && <BiographyPopup onClose={handleBiographyClose} details={user} />}
                </div>
            </div>
            <p className="text-sm mt-3">
                I am a highly competent IT professional with a proven track record in designing websites, networking and managing databases.
                I have strong technical skills as well as excellent interpersonal skills, enabling me to interact with a wide range of clients.
            </p>
            <p className="text-sm mt-3">
                I am eager to be challenged in order to grow and further improve my IT skills.
                My greatest passion is in life is using my technical know-how to benefit other people and organisations.
            </p>
        </div>
    );
};

export default Biography;