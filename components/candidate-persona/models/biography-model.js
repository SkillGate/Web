import React from 'react';
import { useForm, Controller } from "react-hook-form";
import { IoMdClose } from "react-icons/io";

const BiographyPopup = ({ onClose}) => {

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

export default BiographyPopup;
