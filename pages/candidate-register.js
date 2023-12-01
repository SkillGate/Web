"use client";

import { useForm, Controller } from "react-hook-form";

const CandidateRegisterPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setError,
    clearErrors
  } = useForm();

  const password = watch('password', '');
  const confirmPassword = watch('confirmPassword', '');

  const onSubmit = (data) => {
    // Handle form submission here
    if (password !== confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match'
      });
      return; // Stop form submission
    } else {
      clearErrors('confirmPassword'); // Clear the error if passwords match
      // Handle form submission here
      console.log(data);
    }
  };

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-6">
        <div className="register-from-container">

          <h2 className="register-from-header">Sign in to your account</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* First Name input */}
            <div className="mb-4">
              <label
                htmlFor="firstName"
                className="register-from-label"
              >
                First Name
              </label>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="firstName"
                    placeholder="Enter your First Name"
                    className={`register-from-input ${errors.firstName ? "border-red-500" : "border-gray-300"
                      }`}
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
              {errors.firstName && (
                <span className="text-red-500 text-sm">
                  {errors.firstName.message}
                </span>
              )}
            </div>

            {/* Last Name input */}
            <div className="mb-4">
              <label
                htmlFor="lastName"
                className="register-from-label"
              >
                Last Name
              </label>
              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="lastName"
                    placeholder="Enter your Last Name"
                    className={`register-from-input ${errors.lastName ? "border-red-500" : "border-gray-300"
                      }`}
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
              {errors.lastName && (
                <span className="text-red-500 text-sm">
                  {errors.lastName.message}
                </span>
              )}
            </div>

            {/* Email Address input */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="register-from-label"
              >
                Email Address
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
                    className={`register-from-input ${errors.email ? "border-red-500" : "border-gray-300"
                      }`}
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
                htmlFor="phone"
                className="register-from-label"
              >
                Contact Number
              </label>
              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="phone"
                    placeholder="Enter your Contact Number"
                    className={`register-from-input ${errors.phone ? "border-red-500" : "border-gray-300"
                      }`}
                  />
                )}
                rules={{
                  required: "Contact Number is required", pattern: {
                    value: /^\d{10}$/,
                    message: 'Please enter a 10-digit phone number',
                  }
                }}
              />
              {errors.phone && (
                <span className="text-red-500 text-sm">
                  {errors.phone.message}
                </span>
              )}
            </div>

            {/* Password input */}
            <div className="mb-4">
              <label
                htmlFor="password"
                className="register-from-label"
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
                    className={`register-from-input ${errors.password ? "border-red-500" : "border-gray-300"
                      }`}
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
                htmlFor="confirmPassword"
                className="register-from-label"
              >
                Confirm Password
              </label>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="password"
                    id="confirmPassword"
                    placeholder="Enter your password again..."
                    className={`register-from-input ${errors.confirmPassword ? "border-red-500" : "border-gray-300"
                      }`}
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
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
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

export default CandidateRegisterPage;
