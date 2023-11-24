"use client";

import { useForm, Controller } from "react-hook-form";

const EmployerRegisterPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setError,
    clearErrors
  } = useForm();

  const password = watch('password', '');
  const confirmPassword = watch('cpassword', '');

  const onSubmit = (data) => {
    // Handle form submission here
    if (password !== confirmPassword) {
      setError('cpassword', {
        type: 'manual',
        message: 'Passwords do not match'
      });
      return; // Stop form submission
    } else {
      clearErrors('cpassword'); // Clear the error if passwords match
      // Handle form submission here
      console.log(data);
    }
  };

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-6">
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-sm max-w-lg p-8 bg-white rounded shadow-md">

          <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-10">Sign in to your account</h2>

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
                    className={`w-full p-2 border ${errors.firstname ? "border-red-500" : "border-gray-300"
                      } rounded`}
                  />
                )}
                rules={{
                  required: "First Name is required", 
                  pattern: {
                    value: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,
                    message: 'Invalid First Name format',
                  }
                }}
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
                    placeholder="Enter your Last Name"
                    className={`w-full p-2 border ${errors.lastname ? "border-red-500" : "border-gray-300"
                      } rounded`}
                  />
                )}
                rules={{
                  required: "Last Name is required", 
                  pattern: {
                    value: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,
                    message: 'Invalid Last Name format',
                  }
                }}
              />
              {errors.lastname && (
                <span className="text-red-500 text-sm">
                  {errors.lastname.message}
                </span>
              )}
            </div>

            {/* Email Address input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                Work Email Address
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
                      } rounded`}
                  />
                )}
                rules={{
                  required: "Email is required", 
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: 'Please enter a valid email address',
                  }
                }}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Contact Number input */}
            <div className="mb-4">
              <label
                htmlFor="contactno"
                className="block text-gray-700 font-bold mb-2"
              >
                Contact Number
              </label>
              <Controller
                name="contactno"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="contactno"
                    placeholder="Enter your Contact Number"
                    className={`w-full p-2 border ${errors.contactno ? "border-red-500" : "border-gray-300"
                      } rounded`}
                  />
                )}
                rules={{
                  required: "Contact Number is required", pattern: {
                    value: /^\d{10}$/,
                    message: 'Please enter a 10-digit phone number',
                  }
                }}
              />
              {errors.contactno && (
                <span className="text-red-500 text-sm">
                  {errors.contactno.message}
                </span>
              )}
            </div>

            {/* Last Name input */}
            <div className="mb-4">
              <label
                htmlFor="companyname"
                className="block text-gray-700 font-bold mb-2"
              >
                Company Name
              </label>
              <Controller
                name="companyname"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="companyname"
                    placeholder="Enter your Company Name"
                    className={`w-full p-2 border ${errors.companyname ? "border-red-500" : "border-gray-300"
                      } rounded`}
                  />
                )}
                rules={{
                  required: "Company Name is required", 
                  pattern: {
                    value: /^[a-zA-Z0-9\s'-]+$/,
                    message: 'Invalid Company Name format',
                  }
                }}
              />
              {errors.lastname && (
                <span className="text-red-500 text-sm">
                  {errors.lastname.message}
                </span>
              )}
            </div>

            {/* Password input */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-700 font-bold mb-2"
              >
                Password
              </label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    id="password"
                    placeholder="Enter your password"
                    className={`w-full p-2 border ${errors.password ? "border-red-500" : "border-gray-300"
                      } rounded`}
                  />
                )}
                rules={{
                  required: "Password is required", pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: 'Password must contain at least 8 characters, one uppercase letter, and one number',
                  }
                }}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Confirm Password input */}
            <div className="mb-4">
              <label
                htmlFor="cpassword"
                className="block text-gray-700 font-bold mb-2"
              >
                Confirm Password
              </label>
              <Controller
                name="cpassword"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    id="cpassword"
                    placeholder="Enter your password"
                    className={`w-full p-2 border ${errors.cpassword ? "border-red-500" : "border-gray-300"
                      } rounded`}
                  />
                )}
                rules={{
                  required: "Password is required", 
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                    message: 'Password must contain at least 8 characters, one uppercase letter, and one number',
                  }
                }}
              />
              {errors.cpassword && (
                <span className="text-red-500 text-sm">
                  {errors.cpassword.message}
                </span>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="w-full btn-primary-light text-white p-2 rounded"
            >
              Create Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmployerRegisterPage;
