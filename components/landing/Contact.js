import React from 'react'
import { useForm, Controller } from "react-hook-form"

const Contact = () => {

    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm();


    const onSubmit = (data) => {
        alert(JSON.stringify(data));
    };

    return (
        <section id='contact' className='overflow-hidden'>
            <div className="relative isolate overflow-hidden py-24 sm:py-28">
                <div className="mx-auto max-w-6xl px-6 lg:px-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-12">
                        <div className="p-4">
                        <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                        <p className="pt-8">Need to get in touch with us? Either fill out the form with your inquiry or find the SkillGate email you would like to contact below.</p>
                        </div>
                        <div className="p-4">
                            <form onSubmit={handleSubmit(onSubmit)}>
                                {/* First Name input */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="firstname"
                                        className="block text-gray-700 font-bold mb-2"
                                    >
                                        First Name
                                    </label>
                                    <Controller
                                        name="firstname"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type="text"
                                                id="firstname"
                                                placeholder="Enter your First Name"
                                                className={`w-full p-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                                                    } rounded focus:border-purple-400 outline-none`}
                                            />
                                        )}
                                        rules={{ required: "First Name is required", pattern: /^[A-Za-z]+$/i }}
                                    />
                                    {errors.firstname && (
                                        <span className="text-red-500 text-sm">
                                            {errors.firstname.message}
                                        </span>
                                    )}
                                </div>

                                {/* Last Name input */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="lastname"
                                        className="block text-gray-700 font-bold mb-2"
                                    >
                                        Last Name
                                    </label>
                                    <Controller
                                        name="lastname"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type="text"
                                                id="lastname"
                                                placeholder="Enter your email"
                                                className={`w-full p-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                                                    } rounded focus:border-purple-400 outline-none`}
                                            />
                                        )}
                                        rules={{ required: "Last Name is required", pattern: /^[A-Za-z]+$/i }}
                                    />
                                    {errors.lastname && (
                                        <span className="text-red-500 text-sm">
                                            {errors.lastname.message}
                                        </span>
                                    )}
                                </div>

                                {/* Email input */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="email"
                                        className="block text-gray-700 font-bold mb-2"
                                    >
                                        Email
                                    </label>
                                    <Controller
                                        name="email"
                                        control={control}
                                        render={({ field }) => (
                                            <input
                                                {...field}
                                                type="text"
                                                id="email"
                                                placeholder="Enter your email"
                                                className={`w-full p-2 border ${errors.email ? "border-red-500" : "border-gray-300"
                                                    } rounded focus:border-purple-400 outline-none`}
                                            />
                                        )}
                                        rules={{ required: "Email is required", pattern: /^\S+@\S+$/i }}
                                    />
                                    {errors.email && (
                                        <span className="text-red-500 text-sm">
                                            {errors.email.message}
                                        </span>
                                    )}
                                </div>

                                {/* Description input */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="description"
                                        className="block text-gray-700 font-bold mb-2"
                                    >
                                        What can we help you with?
                                    </label>
                                    <Controller
                                        name="description"
                                        control={control}
                                        render={({ field }) => (
                                            <textarea
                                                {...field}
                                                id="description"
                                                rows="4"
                                                cols="50"
                                                placeholder="Enter your problem description"
                                                className={`w-full p-2 border ${errors.description ? "border-red-500" : "border-gray-300"
                                                    } rounded focus:border-purple-400 outline-none`}
                                            />
                                        )}
                                        rules={{ required: "Description is required" }}
                                    />
                                    {errors.description && (
                                        <span className="text-red-500 text-sm">
                                            {errors.description.message}
                                        </span>
                                    )}
                                </div>

                                {/* Submit button */}
                                <button
                                    type="submit"
                                    className="w-full btn-primary-light text-white p-2 rounded "
                                >
                                    Sign In
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact