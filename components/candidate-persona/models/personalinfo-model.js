import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { IoMdClose } from "react-icons/io";

const PersonalInfoPopup = ({ onClose, details }) => {

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
            <div className="bg-white dark:bg-dark-main w-full h-2/3 sm:w-1/3 rounded-lg p-4 flex flex-col">
            <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl font-bold">Personal Information</h2>
                    <button className="text-gray-500" onClick={onClose}>
                        <IoMdClose />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto pr-10 pt-5">
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
                                        defaultValue=""
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

export default PersonalInfoPopup;
