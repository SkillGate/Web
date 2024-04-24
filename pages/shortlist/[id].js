import React from "react";
import { useRouter } from "next/router";
import { useState } from "react";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";
import { userTypes } from "../../constants";
import useFetch from "../api/useFetch";
import { server } from "../../config";
import Table from "../../components/table/Table";

const ApplyJob = ({ candidate }) => {
    const router = useRouter();
    const { id } = router.query;

    const { data: job, loading } = useFetch(`${server}/api/jobs/${id}`);

    const [userType, setUserType] = useState("Candidate");

    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    const allApplicantsRows = [
        { id: 1, name: 'Ashani Liyanagamage', phone:"+94767619989", email:"test@gmail.com" },
        { id: 2, name: 'Yohan Nayanajith', phone:"+94767619989", email:"test@gmail.com" },
        { id: 3, name: 'Roshan Senevirathne', phone:"+94767619989", email:"test@gmail.com" },
        { id: 4, name: 'Sathya Karunankalage', phone:"+94767619989", email:"test@gmail.com" },
        { id: 5, name: 'Haitha Jayaweera', phone:"+94767619989", email:"test@gmail.com" },
        { id: 6, name: 'Roneki Manamperi', phone:"+94767619989", email:"test@gmail.com" },
        { id: 7, name: 'Madhuni Tharukshi', phone:"+94767619989", email:"test@gmail.com" },
        { id: 8, name: 'Ashani Liyanagamage', phone:"+94767619989", email:"test@gmail.com" },
        { id: 9, name: 'Yohan Nayanajith', phone:"+94767619989", email:"test@gmail.com" },
        { id: 10, name: 'Roshan Senevirathne', phone:"+94767619989", email:"test@gmail.com" },
    ];

    const shortlistApplicantsRows = [
        { id: 1, name: 'Ashani Liyanagamage', phone:"+94767619989", email:"test@gmail.com",score:"90.00%"},
        { id: 2, name: 'Yohan Nayanajith', phone:"+94767619989", email:"test@gmail.com",score:"90.00%"},
        { id: 3, name: 'Roshan Senevirathne', phone:"+94767619989", email:"test@gmail.com",score:"90.00%"},
        { id: 4, name: 'Sathya Karunankalage', phone:"+94767619989", email:"test@gmail.com",score:"90.00%"},
        { id: 5, name: 'Haitha Jayaweera', phone:"+94767619989", email:"test@gmail.com",score:"90.00%"},
        { id: 6, name: 'Roneki Manamperi', phone:"+94767619989", email:"test@gmail.com",score:"90.00%"},
        { id: 7, name: 'Madhuni Tharukshi', phone:"+94767619989", email:"test@gmail.com",score:"90.00%"},
        { id: 8, name: 'Ashani Liyanagamage', phone:"+94767619989", email:"test@gmail.com",score:"90.00%"},
        { id: 9, name: 'Yohan Nayanajith', phone:"+94767619989", email:"test@gmail.com",score:"90.00%"},
        { id: 10, name: 'Roshan Senevirathne', phone:"+94767619989", email:"test@gmail.com",score:"90.00%"},
    ];

    const allApplicantsHeads = [{ name: "Applicant Name", col: 1 }, { name: "Contact Number", col: 1 }, { name: "Email", col: 1 }, { name: "Actions", col: 4 },];
    const shortlistApplicantsHeads = [{ name: "Applicant Name", col: 1 },{ name: "Contact Number", col: 1 }, { name: "Email", col: 1 },{ name: "Score", col: 1 }, { name: "Actions", col: 5 },];
    const actions = [{ name: "CV", title: "View CV", icon: "IoDocumentTextOutline", color:"yellow" }, { name: "GitHub", title: "Access contributions made to projects via their respective GitHub URLs", icon: "IoLogoGithub", color:"green" }, { name: "LinkedIn", title: "Review endorsed skills on LinkedIn", icon: "BsLinkedin", color:"blue" }, { name: "Articles", title: "Access analysis of blog articles", icon: "MdOutlineArticle", color:"orange" },];
    const shrtlistactions = [{ name: "Reason", title: "View reason for shortlisting", icon: "BsBookmarkCheck", color:"pink" },{ name: "CV", title: "View CV", icon: "IoDocumentTextOutline", color:"yellow" }, { name: "GitHub", title: "Access contributions made to projects via their respective GitHub URLs", icon: "IoLogoGithub", color:"green" }, { name: "LinkedIn", title: "Review endorsed skills on LinkedIn", icon: "BsLinkedin", color:"blue" }, { name: "Articles", title: "Access analysis of blog articles", icon: "MdOutlineArticle", color:"orange" },];

    return (
        <div>
            <div className="rounded max-w-3xl w-full mt-10">
                <button className="btn bg-slate-200 hover:bg-slate-300 dark:bg-dark-card dark:hover:bg-hover-color">
                    <Link
                        href={
                            userTypes.candidate == userType
                                ? "/candidateDashboard"
                                : "employerDashboard"
                        }
                    >
                        <a className="flex-align-center">
                            <FiChevronLeft />
                            <span>back</span>
                        </a>
                    </Link>
                </button>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-dark-card rounded-lg p-8 mt-5">
                <nav className="flex space-x-10 mb-8" aria-label="Tabs" role="tablist">
                    <button
                        className={`tab-button border border-primary rounded p-2 ${activeTab === 1 ? 'hs-tab-active btn-primary-light text-white p-2 rounded' : ''}`}
                        onClick={() => handleTabClick(1)}
                        aria-controls="tabs-with-icons-1"
                        role="tab"
                    >
                        All Aplications
                    </button>
                    <button
                        className={`tab-button border border-primary rounded p-2 ${activeTab === 2 ? 'hs-tab-active btn-primary-light text-white p-2 rounded' : ''}`}
                        onClick={() => handleTabClick(2)}
                        aria-controls="tabs-with-icons-2"
                        role="tab"
                    >
                        Shortlisted Applications
                    </button>
                </nav>

                <div className="mt-3">
                    <div id="tabs-with-icons-1" className={`tab-content ${activeTab !== 1 ? 'hidden' : ''}`}>
                        <div className="flex flex-col">
                            <div className="-m-1.5 overflow-x-auto">
                                <div className="p-1.5 min-w-full inline-block align-middle">
                                    <Table rows={allApplicantsRows} heads={allApplicantsHeads} actions={actions} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="tabs-with-icons-2" className={`tab-content ${activeTab !== 2 ? 'hidden' : ''}`}>
                        <div className="flex flex-col">
                            <div className="-m-1.5 overflow-x-auto">
                                <div className="p-1.5 min-w-full inline-block align-middle">
                                    <Table rows={shortlistApplicantsRows} heads={shortlistApplicantsHeads} actions={shrtlistactions} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    );
};

export default ApplyJob;
