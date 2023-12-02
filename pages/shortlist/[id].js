import React from "react";
import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { BiFile, BiLink } from "react-icons/bi";
import { FaLinkedin } from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";
import { userTypes } from "../../constants";
import useFetch from "../api/useFetch";
import { server } from "../../config";

const ApplyJob = ({ candidate }) => {
    const router = useRouter();
    const { id } = router.query;

    const { data: job, loading } = useFetch(`${server}/api/jobs/${id}`);

    const [userType, setUserType] = useState("Candidate");

    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    const rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;
    const displayData = () => {
        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        return rows.slice(start, end).map((row) => (
            <tr key={row}>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">John Brown</td>
                <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                    <button type="button" class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-1.5 text-center me-2 mb-1">View</button>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                    <button type="button" class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-4 py-1.5 text-center me-2 mb-1">View</button>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                    <button type="button" class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-4 py-1.5 text-center me-2 mb-1">View</button>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium">
                    <button type="button" class="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-4 py-1.5 text-center me-2 mb-1">View</button>
                </td>
            </tr>
        ));
    };

    const pageCount = Math.ceil(rows.length / itemsPerPage);

    const changePage = (page) => {
        setCurrentPage(page);
    };

    const pagination = () => {
        const pageButtons = [];
        for (let i = 1; i <= pageCount; i++) {
            pageButtons.push(
                <button
                    key={i}
                    className={`px-3 py-1 mx-1 ${currentPage === i ? 'bg-primary text-white' : 'bg-gray-200 text-gray-800'
                        }`}
                    onClick={() => changePage(i)}
                >
                    {i}
                </button>
            );
        }
        return pageButtons;
    };

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
                        className={`tab-button ${activeTab === 1 ? 'hs-tab-active font-semibold text-primary border-primary' : ''}`}
                        onClick={() => handleTabClick(1)}
                        aria-controls="tabs-with-icons-1"
                        role="tab"
                    >
                        All Aplications
                    </button>
                    <button
                        className={`tab-button ${activeTab === 2 ? 'hs-tab-active font-semibold text-primary border-primary' : ''}`}
                        onClick={() => handleTabClick(2)}
                        aria-controls="tabs-with-icons-2"
                        role="tab"
                    >
                        Shortlisted Applications
                    </button>
                </nav>

                <div className="mt-3">
                    <div id="tabs-with-icons-1" className={`tab-content ${activeTab !== 1 ? 'hidden' : ''}`}>
                        <div class="flex flex-col">
                            <div class="-m-1.5 overflow-x-auto">
                                <div class="p-1.5 min-w-full inline-block align-middle">
                                    <div class="overflow-hidden">
                                        <table class="min-w-full">
                                            <thead>
                                                <tr>
                                                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-white uppercase bg-primary border border-gray-300 dark:border-gray-500">Applicant Name</th>
                                                    <th scope="col" class="px-6 py-3 w-40 text-end text-xs font-medium text-white uppercase bg-primary border border-gray-300 dark:border-gray-500">View CV</th>
                                                    <th scope="col" class="px-6 py-3 w-40 text-end text-xs font-medium text-white uppercase bg-primary border border-gray-300 dark:border-gray-500">View contributions in GitHub</th>
                                                    <th scope="col" class="px-6 py-3 w-40 text-end text-xs font-medium text-white uppercase bg-primary border border-gray-300 dark:border-gray-500">View skills endrosements</th>
                                                    <th scope="col" class="px-6 py-3 w-40 text-end text-xs font-medium text-white uppercase bg-primary border border-gray-300 dark:border-gray-500">View blog articles</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                                {displayData()}
                                            </tbody>
                                        </table>
                                        <div className="flex justify-center mt-2">{pagination()}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="tabs-with-icons-2" className={`tab-content ${activeTab !== 2 ? 'hidden' : ''}`}>
                        <div class="flex flex-col">
                            <div class="-m-1.5 overflow-x-auto">
                                <div class="p-1.5 min-w-full inline-block align-middle">
                                    <div class="overflow-hidden">
                                        <table class="min-w-full">
                                            <thead>
                                                <tr>
                                                    <th scope="col" class="px-6 py-3 text-start text-xs font-medium text-white uppercase bg-primary border border-gray-300">Applicant Name</th>
                                                    <th scope="col" class="px-6 py-3 w-40 text-end text-xs font-medium text-white uppercase bg-primary border border-gray-300">View CV</th>
                                                    <th scope="col" class="px-6 py-3 w-40 text-end text-xs font-medium text-white uppercase bg-primary border border-gray-300">View contributions in GitHub</th>
                                                    <th scope="col" class="px-6 py-3 w-40 text-end text-xs font-medium text-white uppercase bg-primary border border-gray-300">View skills endrosements</th>
                                                    <th scope="col" class="px-6 py-3 w-40 text-end text-xs font-medium text-white uppercase bg-primary border border-gray-300">View blog articles</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                                {displayData()}
                                            </tbody>
                                        </table>
                                        <div className="flex justify-center mt-2">{pagination()}</div>
                                    </div>
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
