import React, { useState } from 'react';
import { useUiContext } from '../../contexts/UiContext';
import { useRouter } from 'next/router';
import useFetch from '../api/useFetch';
import { MdEdit } from "react-icons/md";
import PersonalInfoPopup from '../../components/candidate-persona/models/personalinfo-model';
import Biography from '../../components/candidate-persona/biography';
import Project from '../../components/candidate-persona/project';
import Award from '../../components/candidate-persona/award';
import Skill from '../../components/candidate-persona/skill';
import Experience from '../../components/candidate-persona/experience';
import Education from '../../components/candidate-persona/education';
import { server } from '../../config';
import Volunteering from '../../components/candidate-persona/volunteer';

const CandidatePersona = () => {

    const [isPersonalInfoOpen, setPersonalInfoIsOpen] = useState(false);
    const handlePersonalInfoOpen = () => {
        setPersonalInfoIsOpen(true);
    };
    const handlePersonalInfoClose = () => {
        setPersonalInfoIsOpen(false);
    };

    const { user } = useUiContext();

    const router = useRouter();
    // const { id } = router.query;
    // const { data: user, loading } = useFetch(`${server}/api/users/${id}`);

    return (
        <div className="padding-container max-w-5xl w-full mx-auto">
            <div className="h-fit md:sticky top-0">
                <div className="card overflow-hidden">
                    <div className="relative">
                        <img
                            src="/images/talent.jpg"
                            alt=""
                            className="h-full sm:h-[200px] object-cover w-full"
                        />
                        <img
                            src={user?.avatar || "/images/talent.jpg"}
                            alt=""
                            className="w-16 left-10 -bottom-8 absolute rounded-lg"
                        />
                    </div>
                    <div className="pt-14 px-6 pb-6">
                        <div className="flex-center-between">
                            <h1 className="text-xl font-semibold">
                                {user?.firstName + " " + user?.lastName} (${user?.hourly_rate}/hr)
                            </h1>
                            <div className="flex-align-center gap-x-2">
                                <button className="btn btn-primary flex-shrink-0">
                                    connect
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-between">
                            <div className="mt-4">
                                <p className="text-primary">{user?.role}</p>
                                <div className="flex-align-center gap-2">
                                    <span className="text-sm text-muted">{user?.location}</span>
                                    <span className="text-xl text-muted">.</span>
                                    <span className="text-sm text-muted">
                                        {user?.num_of_connections} Conections
                                    </span>
                                </div>
                            </div>
                            <div className="mt-4">
                                <button onClick={handlePersonalInfoOpen}><MdEdit size={20} className="text-gray-400" /></button>
                                {isPersonalInfoOpen && <PersonalInfoPopup onClose={handlePersonalInfoClose} details={user} />}
                            </div>
                        </div>
                        <div className="mt-5">
                            <div className="card">
                                <div className="flex flex-wrap sm:flex-row sm:flex-center-between">
                                    <div className="p-2 w-1/3">
                                        <span className="text-sm capitalize text-muted">
                                            Email Address
                                        </span>
                                        <h1 className="capitalize">{user?.email}</h1>
                                    </div>
                                    <div className="w-full h-[1px] sm:h-16 sm:w-[1px] bg-slate-200 dark:bg-hover-color"></div>
                                    <div className="p-2 w-1/3">
                                        <span className="text-sm capitalize text-muted">Phone</span>
                                        <h1 className="capitalize">{user?.phone}</h1>
                                    </div>
                                    <div className="w-full h-[1px] sm:h-16 sm:w-[1px] bg-slate-200 dark:bg-hover-color"></div>
                                    <div className="p-2 w-1/3">
                                        <p className="text-sm capitalize">Portifolio</p>
                                        <a href="#" className="text-primary">
                                            {user?.portfolio}
                                        </a>
                                    </div>
                                    <div className="w-full h-[1px] sm:h-16 sm:w-[1px] bg-slate-200 dark:bg-hover-color"></div>
                                    <div className="p-2 w-1/3">
                                        <p className="text-sm capitalize">LinkedIn</p>
                                        <a href="#" className="text-primary">
                                            {user?.portfolio}
                                        </a>
                                    </div>
                                    <div className="w-full h-[1px] sm:h-16 sm:w-[1px] bg-slate-200 dark:bg-hover-color"></div>
                                    <div className="p-2 w-1/3">
                                        <p className="text-sm capitalize">GitHub</p>
                                        <a href="#" className="text-primary">
                                            {user?.portfolio}
                                        </a>
                                    </div>
                                    <div className="w-full h-[1px] sm:h-16 sm:w-[1px] bg-slate-200 dark:bg-hover-color"></div>
                                    <div className="p-2 w-1/3">
                                        <p className="text-sm capitalize">Blog</p>
                                        <a href="#" className="text-primary">
                                            {user?.portfolio}
                                        </a>
                                    </div>
                                    <div className="w-full h-[1px] sm:h-16 sm:w-[1px] bg-slate-200 dark:bg-hover-color"></div>
                                </div>
                            </div>
                        </div>
                        <Biography details={user} />
                        <Skill details={user} />
                        <Experience details={user} />
                        <Education details={user} />
                        <Project details={user} />
                        <Award details={user} />
                        <Volunteering details={user} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidatePersona;
