import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { IoMdClose } from "react-icons/io";

const VolunteeringPopup = ({ onClose, details }) => {

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
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 dark:bg-gray-800 bg-opacity-75 dark:bg-opacity-75 transition-opacity z-50">
            <div className="bg-white dark:bg-dark-main w-full h-2/3 sm:w-1/3 rounded-lg p-4 flex flex-col">
                <div className="flex justify-between items-center mb-5">
                    <h2 className="text-xl font-bold">Volunteering</h2>
                    <button className="text-gray-500" onClick={onClose}>
                        <IoMdClose />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto pr-10 pt-5">
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
                            <label htmlFor="jobrole">Organization name</label>
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
                            <label htmlFor="employeetype">Position</label>
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
                                        className="input !h-44 pt-2"
                                        defaultValue=""
                                        required
                                    />
                                )}
                            />
                            <label htmlFor="companyname">Event name</label>
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

export default VolunteeringPopup;