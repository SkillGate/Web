import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { IoMdClose } from "react-icons/io";
import { useState } from 'react';


export const PersonalInfoPopup = ({ onClose, details }) => {

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 dark:bg-gray-800 bg-opacity-30 dark:bg-opacity-30 transition-opacity z-50">
            <div className="bg-white dark:bg-dark-main w-full sm:w-1/3 rounded-lg p-4">
                <button className="float-right text-gray-500" onClick={onClose}>
                    <IoMdClose />
                </button>
                <h2 className="text-xl font-bold mb-8">Personal Information</h2>
                <div className=''>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-input w-full sm:flex-1 relative">
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        id="name"
                                        className="input"
                                        defaultValue={details.name}
                                        required
                                    />
                                )}
                            />
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="form-input w-full sm:flex-1 relative">
                            <Controller
                                name="jobRole"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        id="jobRole"
                                        className="input"
                                        defaultValue={details.role}
                                        required
                                    />
                                )}
                            />
                            <label htmlFor="jobRole">Job Role</label>
                        </div>
                        <div className="form-input w-full sm:flex-1 relative">
                            <Controller
                                name="address"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        id="address"
                                        className="input"
                                        defaultValue={details.location}
                                        required
                                    />
                                )}
                            />
                            <label htmlFor="address">Location</label>
                        </div>
                        <div className="form-input w-full sm:flex-1 relative">
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        id="email"
                                        className="input"
                                        defaultValue={details.email}
                                        required
                                    />
                                )}
                            />
                            <label htmlFor="email">Email Address</label>
                        </div>
                        <div className="form-input w-full sm:flex-1 relative">
                            <Controller
                                name="phone"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        id="phone"
                                        className="input"
                                        defaultValue={details.phone}
                                        required
                                    />
                                )}
                            />
                            <label htmlFor="phone">Phone Number</label>
                        </div>
                        <div className="form-input w-full sm:flex-1 relative">
                            <Controller
                                name="portifoloio"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        id="portifoloio"
                                        className="input"
                                        defaultValue={details.portifoloio}
                                        required
                                    />
                                )}
                            />
                            <label htmlFor="portifoloio">Portifolio</label>
                        </div>
                        <div className="form-input w-full sm:flex-1 relative">
                            <Controller
                                name="linkedin"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        id="linkedin"
                                        className="input"
                                        defaultValue={details.linkedin}
                                        required
                                    />
                                )}
                            />
                            <label htmlFor="linkedin">LinkedIn</label>
                        </div>
                        <div className="form-input w-full sm:flex-1 relative">
                            <Controller
                                name="github"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        id="github"
                                        className="input"
                                        defaultValue={details.github}
                                        required
                                    />
                                )}
                            />
                            <label htmlFor="github">GitHub</label>
                        </div>
                        <div className="form-input w-full sm:flex-1 relative">
                            <Controller
                                name="blog"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        id="blog"
                                        className="input"
                                        defaultValue={details.portifoloio}
                                        required
                                    />
                                )}
                            />
                            <label htmlFor="blog">Blog</label>
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};


export const BiographyPopup = ({ onClose, details }) => {

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 transition-opacity z-50">
            <div className="bg-white dark:bg-dark-main w-full sm:w-1/2 rounded-lg p-4">
                <button className="float-right text-gray-500" onClick={onClose}>
                    <IoMdClose />
                </button>
                <h2 className="text-xl font-bold mb-8">Biography Information</h2>
                <div className=''>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-input w-full sm:flex-1 relative">
                            <Controller
                                name="biography"
                                control={control}
                                render={({ field }) => (
                                    <textarea
                                        {...field}
                                        id="biography"
                                        className="input !h-28 pt-2"
                                        required
                                    />
                                )}
                            />
                            <label htmlFor="biography">Biography</label>
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};


export const SkillsPopup = ({ onClose }) => {

    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState('');

    const handleAddSkill = () => {
        if (newSkill.trim() !== '') {
            setSkills([...skills, newSkill]);
            setNewSkill('');
        }
    };

    const removeSkill = (skillToRemove) => {
        const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
        setSkills(updatedSkills);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddSkill();
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 transition-opacity z-50">
            <div className="bg-white dark:bg-dark-main w-full sm:w-1/2 rounded-lg p-4">
                <button className="float-right text-gray-500" onClick={onClose}>
                    <IoMdClose />
                </button>
                <h2 className="text-xl font-bold mb-8">Skills</h2>
                <div className="mb-10">
                    <input
                        type="text"
                        className="outline-none h-8 border border-slate-300  dark:border-hover-color bg-main dark:bg-dark-main rounded-md px-[0.8rem] w-full text-base focus:!border-primary"
                        placeholder="Enter a skill (e.g., Java, JavaScript, Python)"
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                </div>
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                        <div
                            key={index}
                            className="bg-purple-400 text-white px-2 py-1 rounded-full flex items-center"
                        >
                            <span>{skill}</span>
                            <button
                                onClick={() => removeSkill(skill)}
                                className="ml-2 focus:outline-none"
                            >
                                &#10005;
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export const ExperiencePopup = ({ onClose, details }) => {

    const years = Array.from({ length: 50 }, (_, index) => `${new Date().getFullYear() - index}`);

    const months = Array.from({ length: 12 }, (_, index) => {
        const month = new Date(0, index).toLocaleString('default', { month: 'long' });
        return { value: index + 1, label: month };
    });

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    const [skills, setSkills] = useState([]);
    const [newSkill, setNewSkill] = useState('');

    const handleAddSkill = () => {
        if (newSkill.trim() !== '') {
            setSkills([...skills, newSkill]);
            setNewSkill('');
        }
    };

    const removeSkill = (skillToRemove) => {
        const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
        setSkills(updatedSkills);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleAddSkill();
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 transition-opacity z-50 overflow">
            <div className="bg-white dark:bg-dark-main w-full sm:w-1/3 rounded-lg p-4">
                <button className="float-right text-gray-500" onClick={onClose}>
                    <IoMdClose />
                </button>
                <h2 className="text-xl font-bold mb-8">Experience</h2>
                <div className=''>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-input w-full sm:flex-1 relative">
                            <Controller
                                name="jobrole"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        id="jobrole"
                                        className="input"
                                        defaultValue=""
                                        required
                                    />
                                )}
                            />
                            <label htmlFor="jobrole">Job Role</label>
                        </div>
                        <div className="form-input w-full sm:flex-1 relative">
                            <Controller
                                name="employeetype"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        id="employeetype"
                                        className="input"
                                        defaultValue=""
                                        required
                                    />
                                )}
                            />
                            <label htmlFor="employeetype">Employeement Type</label>
                        </div>
                        <div className="form-input w-full sm:flex-1 relative">
                            <Controller
                                name="companyname"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        id="companyname"
                                        className="input"
                                        defaultValue=""
                                        required
                                    />
                                )}
                            />
                            <label htmlFor="companyname">Company Name</label>
                        </div>
                        <div className="form-input w-full sm:flex-1 relative">
                            <h2>Start Date</h2>
                            <div className="mt-3 flex flex-col lg:flex-row gap-4">
                                <div className="flex-auto mb-4 lg:mb-0" >
                                    <Controller
                                        name="duration.startYear"
                                        control={control}
                                        render={({ field }) => (
                                            <select
                                                {...field}
                                                id="dropdown"
                                                className="block w-full mt-1 border border-primary rounded-md focus:border-primary bg-gray-100 dark:bg-dark-main p-2">
                                                {years.map((year) => (
                                                    <option key={year} value={year}>
                                                        {year}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    />
                                </div>
                                <div className="flex-auto mb-4 lg:mb-0" >
                                    <Controller
                                        name="duration.startMonth"
                                        control={control}
                                        render={({ field }) => (
                                            <select
                                                {...field}
                                                id="dropdown"
                                                className="block w-full mt-1 border border-primary rounded-md focus:border-primary bg-gray-100 dark:bg-dark-main p-2">
                                                {months.map((month) => (
                                                    <option key={month.value} value={month.value}>
                                                        {month.label}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-input w-full sm:flex-1 relative mt-4">
                            <h2>End Date</h2>
                            <div className="mt-3 flex flex-col lg:flex-row gap-4">
                                <div className="flex-auto mb-4 lg:mb-0" >
                                    <Controller
                                        name="duration.endYear"
                                        control={control}
                                        render={({ field }) => (
                                            <select
                                                {...field}
                                                id="dropdown"
                                                className="block w-full mt-1 border border-primary rounded-md focus:border-primary bg-gray-100 dark:bg-dark-main p-2">
                                                {years.map((year) => (
                                                    <option key={year} value={year}>
                                                        {year}
                                                    </option>
                                                ))}
                                            </select>

                                        )}
                                    />
                                </div>
                                <div className="flex-auto mb-4 lg:mb-0" >
                                    <Controller
                                        name="duration.endMonth"
                                        control={control}
                                        render={({ field }) => (
                                            <select
                                                {...field}
                                                id="dropdown"
                                                className="block w-full mt-1 border border-primary rounded-md focus:border-primary bg-gray-100 dark:bg-dark-main p-2">
                                                {months.map((month) => (
                                                    <option key={month.value} value={month.value}>
                                                        {month.label}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <h2 className='mt-4 mb-4'>Skills</h2>
                        <div className="mb-10">
                            <input
                                type="text"
                                className="outline-none h-8 border border-slate-300  dark:border-hover-color bg-main dark:bg-dark-main rounded-md px-[0.8rem] w-full text-base focus:!border-primary"
                                placeholder="Enter a skill (e.g., Java, JavaScript, Python)"
                                value={newSkill}
                                onChange={(e) => setNewSkill(e.target.value)}
                                onKeyPress={handleKeyPress}
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {skills.map((skill, index) => (
                                <div
                                    key={index}
                                    className="bg-purple-400 text-white px-2 py-1 rounded-full flex items-center"
                                >
                                    <span>{skill}</span>
                                    <button
                                        onClick={() => removeSkill(skill)}
                                        className="ml-2 focus:outline-none"
                                    >
                                        &#10005;
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="form-input w-full sm:flex-1 relative">
                            <Controller
                                name="contribution"
                                control={control}
                                render={({ field }) => (
                                    <textarea
                                        {...field}
                                        id="companyname"
                                        className="input !h-44 pt-2"
                                        defaultValue=""
                                        required
                                    />
                                )}
                            />
                            <label htmlFor="companyname">Contribution</label>
                        </div>
                        <div className="form-input w-full sm:flex-1 relative">
                            <Controller
                                name="githublink"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        id="companyname"
                                        className="input"
                                        defaultValue=""
                                        required
                                    />
                                )}
                            />
                            <label htmlFor="githublink">GitHub Link</label>
                        </div>
                        <div className="flex justify-end mt-10">
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export const EducationPopup = ({ onClose, details }) => {

    const years = Array.from({ length: 50 }, (_, index) => `${new Date().getFullYear() - index}`);

    const months = Array.from({ length: 12 }, (_, index) => {
        const month = new Date(0, index).toLocaleString('default', { month: 'long' });
        return { value: index + 1, label: month };
    });

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 transition-opacity z-50 overflow">
            <div className="bg-white dark:bg-dark-main w-full sm:w-1/3 rounded-lg p-4">
                <button className="float-right text-gray-500" onClick={onClose}>
                    <IoMdClose />
                </button>
                <h2 className="text-xl font-bold mb-8">Education</h2>
                <div className=''>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-input w-full sm:flex-1 relative">
                            <Controller
                                name="jobrole"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        id="jobrole"
                                        className="input"
                                        defaultValue=""
                                        required
                                    />
                                )}
                            />
                            <label htmlFor="jobrole">University</label>
                        </div>
                        <div className="form-input w-full sm:flex-1 relative">
                            <Controller
                                name="employeetype"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        id="employeetype"
                                        className="input"
                                        defaultValue=""
                                        required
                                    />
                                )}
                            />
                            <label htmlFor="employeetype">Degree</label>
                        </div>
                        <div className="form-input w-full sm:flex-1 relative">
                            <Controller
                                name="companyname"
                                control={control}
                                render={({ field }) => (
                                    <input
                                        {...field}
                                        type="text"
                                        id="companyname"
                                        className="input"
                                        defaultValue=""
                                        required
                                    />
                                )}
                            />
                            <label htmlFor="companyname">Class of Degree</label>
                        </div>
                        <div className="form-input w-full sm:flex-1 relative">
                            <h2>Start Date</h2>
                            <div className="mt-3 flex flex-col lg:flex-row gap-4">
                                <div className="flex-auto mb-4 lg:mb-0" >
                                    <Controller
                                        name="duration.startYear"
                                        control={control}
                                        render={({ field }) => (
                                            <select
                                                {...field}
                                                id="dropdown"
                                                className="block w-full mt-1 border border-primary rounded-md focus:border-primary bg-gray-100 dark:bg-dark-main p-2">
                                                {years.map((year) => (
                                                    <option key={year} value={year}>
                                                        {year}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    />
                                </div>
                                <div className="flex-auto mb-4 lg:mb-0" >
                                    <Controller
                                        name="duration.startMonth"
                                        control={control}
                                        render={({ field }) => (
                                            <select
                                                {...field}
                                                id="dropdown"
                                                className="block w-full mt-1 border border-primary rounded-md focus:border-primary bg-gray-100 dark:bg-dark-main p-2">
                                                {months.map((month) => (
                                                    <option key={month.value} value={month.value}>
                                                        {month.label}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="form-input w-full sm:flex-1 relative mt-4">
                            <h2>End Date</h2>
                            <div className="mt-3 flex flex-col lg:flex-row gap-4">
                                <div className="flex-auto mb-4 lg:mb-0" >
                                    <Controller
                                        name="duration.endYear"
                                        control={control}
                                        render={({ field }) => (
                                            <select
                                                {...field}
                                                id="dropdown"
                                                className="block w-full mt-1 border border-primary rounded-md focus:border-primary bg-gray-100 dark:bg-dark-main p-2">
                                                {years.map((year) => (
                                                    <option key={year} value={year}>
                                                        {year}
                                                    </option>
                                                ))}
                                            </select>

                                        )}
                                    />
                                </div>
                                <div className="flex-auto mb-4 lg:mb-0" >
                                    <Controller
                                        name="duration.endMonth"
                                        control={control}
                                        render={({ field }) => (
                                            <select
                                                {...field}
                                                id="dropdown"
                                                className="block w-full mt-1 border border-primary rounded-md focus:border-primary bg-gray-100 dark:bg-dark-main p-2">
                                                {months.map((month) => (
                                                    <option key={month.value} value={month.value}>
                                                        {month.label}
                                                    </option>
                                                ))}
                                            </select>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end mt-10">
                            <button type="submit" className="btn btn-primary">
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};