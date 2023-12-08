"use client";

import { HiOutlineMail } from "react-icons/hi";
import { IoLocationOutline } from "react-icons/io5";
import { FiPhone } from "react-icons/fi";
import { GrLinkedinOption } from "react-icons/gr";
import { AiFillGithub } from "react-icons/ai";
import { IoMdAdd } from "react-icons/io";
import { MdEdit } from "react-icons/md";
import Link from "next/link";
import { useRouter } from 'next/router';

const CandidatePersonaPage = () => {

    const router = useRouter();

    const educationHandleClick = () => {
        const university = document.getElementById('education1').textContent.trim();
        const degree = document.getElementById('education2').textContent.trim();
        const grade = document.getElementById('education3').textContent.trim();
        const startdate = "2019-1-04";
        const enddate = "2024-4-04";

        const queryString = `?university=${encodeURIComponent(university)}&degree=${encodeURIComponent(degree)}&grade=${encodeURIComponent(grade)}&startdate=${encodeURIComponent(startdate)}&enddate=${encodeURIComponent(enddate)}`;
        
        router.push('/candidate-education-model' + queryString);
    };

    return (
        <div>
            <div class="container mx-auto py-8">
                <div class="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
                    <div class="col-span-4 sm:col-span-5">
                        <div class="bg-white dark:bg-black shadow rounded-lg p-8">
                            <div class="flex flex-col items-center">
                                <img src="https://randomuser.me/api/portraits/men/94.jpg" class="w-36 h-36 bg-gray-300 rounded-full mb-4 shrink-0"></img>
                                <h1 class="text-xl font-bold">John Doe</h1>
                                <p class="text-gray-600 dark:text-slate-50">Software Developer</p>
                                <div class="mt-6 flex flex-wrap gap-4 justify-center">
                                    <a href="#" class="btn-primary-light text-white py-2 px-4 rounded">Upload Your CV</a>
                                </div>
                            </div>
                            <div class="flex flex-col pl-10 pt-10">
                                <div className="pl-5">
                                    <ul>
                                        <li className="flex items-center mb-2"><HiOutlineMail /><span className="ml-2">ashaniimalsha26@gmail.com</span></li>
                                        <li className="flex items-center mb-2"><IoLocationOutline /><span className="ml-2">2nd Lane, Budugedara Watta, Pitigala</span></li>
                                        <li className="flex items-center mb-2"><FiPhone /><span className="ml-2">0767619989</span></li>
                                        <li className="flex items-center mb-2"><GrLinkedinOption /><span className="ml-2">ashnaiLinkedIn</span></li>
                                        <li className="flex items-center mb-2"><AiFillGithub /><span className="ml-2">ashaniGitHub</span></li>
                                    </ul>
                                </div>
                            </div>
                            <div class="flex flex-col pl-10 pt-6">
                                <span class="text-gray-600 uppercase font-bold tracking-wider mt-3 mb-2 dark:text-slate-50">My Profile</span>
                                <div className="pt-5">
                                    <p>
                                        I am a highly competent IT professional with a proven track record in designing websites, networking and managing databases. I have strong technical skills as well as excellent interpersonal skills, enabling me to interact with a wide range of clients. I am eager to be challenged in order to grow and further improve my IT skills. My greatest passion is in life is using my technical know-how to benefit other people and organisations.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-span-4 sm:col-span-7">
                        <div>
                            <div class="bg-white dark:bg-black shadow rounded-lg p-6 mb-5">
                                <div className="flex justify-between mb-2">
                                    <h2 className="text-xl font-bold mb-4">Education</h2>
                                    <Link href="/candidate-education-model"><button><IoMdAdd size={25} className="text-gray-400" /></button></Link>
                                </div>
                                <p id="education1" class="text-gray-700 dark:text-slate-50">University of Colombo School of Computing</p>
                                <p id="education2" class="text-gray-700 dark:text-slate-50">Bachelor of Science in Computer Science (BSc. in CS)</p>
                                <p id="education3" class="text-gray-700 dark:text-slate-50">Second Class - Upper Division</p>
                                <p id="education4" class="text-gray-700 dark:text-slate-50">
                                    {(new Date("2019-1-04")).toLocaleString('default', { year: 'numeric', month: 'short' })} - {(new Date("2024-4-04")).toLocaleString('default', { year: 'numeric', month: 'short' })}
                                </p>
                                <div className="flex flex-row-reverse">
                                    <button onClick={educationHandleClick}><MdEdit size={20} className="text-gray-400" /></button>
                                </div>
                                <hr class="border-t-2 border-gray-200 my-4 dark:border-gray-600" />
                            </div>

                            <div class="bg-white dark:bg-black shadow rounded-lg p-6 mb-5">
                                <div className="flex justify-between mb-2">
                                    <h2 className="text-xl font-bold">Work Experience</h2>
                                    <IoMdAdd size={25} className="text-gray-400" />
                                </div>
                                <div className="mb-6">
                                    <span className="text-gray-400 dark:text-gray-600">Years as a professional developer, employment at software company
                                    </span>
                                </div>

                                <div class="mb-6">
                                    <div className="mr-10">
                                        <div class="flex justify-between">
                                            <span class="text-gray-600 font-bold">Software Engineer Intern</span>
                                            <p>
                                                <span class="text-gray-600 mr-2">X-Venture</span>
                                                <span class="text-gray-600">2022 Nov - 2023 Apr</span>
                                            </p>
                                        </div>
                                        <p className="mt-2">Skills : Java, MongoDB, AWS</p>
                                        <p class="mt-2">
                                            Developed scalable web applications using React.js and Node.js, contributing to a 30% increase in overall website performance.Collaborated with cross-functional teams to deliver high-quality software solutions within tight deadlines.
                                        </p>
                                    </div>
                                    <div className="flex flex-row-reverse">
                                        <MdEdit size={20} className="text-gray-400" />
                                    </div>
                                    <hr class="border-t-2 border-gray-200 my-4 dark:border-gray-600" />
                                </div>
                            </div>

                            <div class="bg-white dark:bg-black shadow rounded-lg p-6 mb-5">
                                <div className="flex justify-between mb-2">
                                    <h2 className="text-xl font-bold">Projects</h2>
                                    <Link href="/candidate-education-model"><button><IoMdAdd size={25} className="text-gray-400" /></button></Link>
                                </div>
                                <div class="mb-6">
                                    <div className="mr-10">
                                        <div class="flex justify-between">
                                            <span class="text-gray-600 font-bold">Employee WorkFlow Management System</span>
                                            <p>
                                                <span class="text-gray-600 mr-2">HR Domain</span>
                                                <span class="text-gray-600">2021 Jan - 2022 Jan</span>
                                            </p>
                                        </div>
                                        <p className="mt-2">A system that provides guidance to high school students on how to enhance their academic and career paths.</p>
                                        <p className="mt-2">Skills : Java, React JS, MySQL</p>
                                        <p class="mt-2">
                                            Contribution : Developed scalable web applications using React.js and Node.js, contributing to a 30% increase in overall website performance.Collaborated with cross-functional teams to deliver high-quality software solutions within tight deadlines.
                                        </p>
                                        <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" class="flex items-center space-x-2 text-gray-400 hover:text-blue-500">projectGitHub</a>

                                    </div>
                                    <div className="flex flex-row-reverse">
                                        <MdEdit size={20} className="text-gray-400" />
                                    </div>
                                    <hr class="border-t-2 border-gray-200 my-4 dark:border-gray-600" />
                                </div>
                            </div>

                            <div class="bg-white dark:bg-black shadow rounded-lg p-6 mb-5">
                                <div className="flex justify-between mb-2">
                                    <h2 className="text-xl font-bold">Awards</h2>
                                    <IoMdAdd size={25} className="text-gray-400" />
                                </div>
                                <div class="mb-6">
                                    <div className="mr-10">
                                        <div class="flex justify-between">
                                            <span class="text-gray-600 font-bold">Mora Extream</span>
                                            <p>
                                                <span class="text-gray-600">2021</span>
                                            </p>
                                        </div>
                                        <p className="mt-2">Ranked within the top 50 in All Island Algorithmic Programming Competition</p></div>
                                    <div className="flex flex-row-reverse">
                                        <MdEdit size={20} className="text-gray-400" />
                                    </div>
                                </div>
                                <hr class="border-t-2 border-gray-200 my-4 dark:border-gray-600" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CandidatePersonaPage;
