import { useForm, Controller } from "react-hook-form";
import PopUpModal from "../components/common/PopUpModal";
import { useState } from "react";
import { Register } from "../apiCalls/userApiCalls";
import { useRouter } from "next/router";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { FaAngleDown } from 'react-icons/fa';
import { countryCodes } from "../data/countryCodeData";

const CandidateRegisterPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmedpasswordVisible, setConfirmedPasswordVisible] =
    useState(false);

  const togglePasswordVisibility = (key) => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmedPasswordVisibility = (key) => {
    setConfirmedPasswordVisible(!confirmedpasswordVisible);
  };

  const handlePasswordChange = (e, field) => {
    field.onChange(e.target.value);
  };

  const [selectedCountry, setSelectedCountry] = useState({ "name": "Sri Lanka", "dial_code": "+94", "code": "LK" });
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const handleSelect = (country) => {
    setSelectedCountry(country);
    setDropdownVisible(false);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setError,
    clearErrors,
  } = useForm();

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const router = useRouter();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const goBack = () => {
    router.push("/create-account");
  }

  const onSubmit = async (data) => {
    if (password !== confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    } else {
      clearErrors("confirmPassword");
      console.log(data);
      try {
        const userData = await Register(data);
        console.log(userData);
        if (!userData) {
          setIsModalVisible(true);
          reset();
        } else {
          router.push("/sign-in");
        }
      } catch (error) {
        setIsModalVisible(true);
        console.error("Error in onSubmit:", error);
      }
    }
  };

  return (
    <div>
      <PopUpModal
        isVisible={isModalVisible}
        title="User registration unsuccessful."
        toggleVisibility={toggleModal}
      />
      <div className="flex h-screen flex-col justify-center items-center px-6 py-6 lg:px-6">
        <div className="register-from-container">
          <h2 className="register-from-header">Sign up to your account</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* First Name input */}
            <div className="mb-4">
              <label htmlFor="firstName" className="register-from-label">
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
                    className={`register-from-input ${
                      errors.firstName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                )}
                rules={{
                  required: "First Name is required",
                  pattern: {
                    value: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,
                    message: "Invalid First Name format",
                  },
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
              <label htmlFor="lastName" className="register-from-label">
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
                    className={`register-from-input ${
                      errors.lastName ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                )}
                rules={{
                  required: "Last Name is required",
                  pattern: {
                    value: /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/,
                    message: "Invalid Last Name format",
                  },
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
              <label htmlFor="email" className="register-from-label">
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
                    className={`register-from-input ${
                      errors.email ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                )}
                rules={{
                  required: "Email is required",
                  pattern: {
                    value: /^\S+@\S+\.\S+$/,
                    message: "Please enter a valid email address",
                  },
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
              <label htmlFor="phone" className="register-from-label">
                Contact Number
              </label>
              <div className="mt-4 flex flex-row" >
                <div className="flex mb-4 lg:mb-0" >
                  <div className="relative">
                    <button
                      onClick={() => setDropdownVisible(!dropdownVisible)}
                      className="inline-flex items-center justify-center w-full py-2 text-sm font-medium border border-gray-300 rounded-tl-md rounded-bl-md bg-white focus:outline-none focus:border-primary dark:bg-dark-card dark:border-hover-color"
                    >
                      {selectedCountry ? (
                        <div className="flex items-center">
                          <img src={`https://flagsapi.com/${selectedCountry.code}/flat/64.png`} alt="" className="w-6 h-6 ml-2 mr-2" />
                          <span>({selectedCountry.dial_code})</span>
                        </div>
                      ) : (
                        '+94'
                      )}
                      <FaAngleDown className="ml-2 mr-2"/>
                    </button>

                    {dropdownVisible && (
                      <div className="absolute mt-2 max-w-full max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg z-10 dark:bg-dark-main">
                        {countryCodes.map(({ name, dial_code, code }) => (
                          <button
                            key={dial_code}
                            onClick={() => handleSelect({ name, dial_code, code })}
                            className="flex items-center w-50 px-4 py-2 w-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
                          >
                            {dial_code && (
                              <img
                                src={`https://flagsapi.com/${code}/flat/64.png`}
                                alt=""
                                className="w-6 h-6 mr-2"
                              />
                            )}<span>{dial_code}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex-auto mb-4 lg:mb-0">
                  <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                      <input
                        {...field}
                        type="tele"
                        id="phone"
                        placeholder="Enter your Contact Number"
                        className={`bg-inherit w-full p-2 border dark:border-hover-color rounded-tr-md rounded-br-md ${errors.phone ? "border-red-500" : "border-gray-300"
                          }`}
                      />
                    )}
                  // rules={{
                  //   required: "Contact Number is required",
                  //   pattern: {
                  //     value: /^\d{9}$/,
                  //     message: "Please enter a valid number of digit phone number",
                  //   },
                  // }}
                  />
                </div>
              </div>
              {errors.phone && (
                <span className="text-red-500 text-sm">
                  {errors.phone.message}
                </span>
              )}
            </div>

            {/* Password input */}
            <div className="mb-4">
              <label htmlFor="password" className="register-from-label">
                Password
              </label>
              <Controller
                name="password"
                control={control}
                render={({ field }) => (
                  <>
                    <div style={{ position: "relative" }}>
                      <input
                        {...field}
                        type={passwordVisible ? "text" : "password"}
                        id="password"
                        placeholder="Enter your password"
                        className={`register-from-input ${
                          errors.password ? "border-red-500" : "border-gray-300"
                        }`}
                        onChange={(e) => handlePasswordChange(e, field)}
                        style={{ paddingRight: "40px" }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          top: "50%",
                          right: "10px",
                          transform: "translateY(-50%)",
                        }}
                      >
                        {passwordVisible ? (
                          <FaEye
                            onClick={togglePasswordVisibility}
                            style={{ cursor: "pointer" }}
                          />
                        ) : (
                          <FaEyeSlash
                            onClick={togglePasswordVisibility}
                            style={{ cursor: "pointer" }}
                          />
                        )}
                      </span>
                    </div>
                  </>
                )}
                // rules={{
                //   required: "Password is required",
                //   pattern: {
                //     value:
                //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                //     message:
                //       "Password must contain at least 8 characters, one uppercase letter, and one number",
                //   },
                // }}
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            {/* Confirm Password input */}
            <div className="mb-4">
              <label htmlFor="confirmPassword" className="register-from-label">
                Confirm Password
              </label>
              <Controller
                name="confirmPassword"
                control={control}
                render={({ field }) => (
                  <>
                    <div style={{ position: "relative" }}>
                      <input
                        {...field}
                        type={confirmedpasswordVisible ? "text" : "password"}
                        id="confirmPassword"
                        placeholder="Enter your password again..."
                        className={`register-from-input ${
                          errors.confirmPassword
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        onChange={(e) => handlePasswordChange(e, field)}
                        style={{ paddingRight: "40px" }}
                      />
                      <span
                        style={{
                          position: "absolute",
                          top: "50%",
                          right: "10px",
                          transform: "translateY(-50%)",
                        }}
                      >
                        {confirmedpasswordVisible ? (
                          <FaEye
                            onClick={toggleConfirmedPasswordVisibility}
                            style={{ cursor: "pointer" }}
                          />
                        ) : (
                          <FaEyeSlash
                            onClick={toggleConfirmedPasswordVisibility}
                            style={{ cursor: "pointer" }}
                          />
                        )}
                      </span>
                    </div>
                  </>
                )}
                // rules={{
                //   required: "Password is required",
                //   pattern: {
                //     value:
                //       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                //     message:
                //       "Password must contain at least 8 characters, one uppercase letter, and one number",
                //   },
                // }}
              />
              {errors.confirmPassword && (
                <span className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            {/* Submit button */}
            <div className="flex flex-row items-center justify-center gap-4">
              <div className="basis-1/2">
                <button
                  type="button"
                  className="w-full btn-primary-light text-white p-2 rounded"
                  onClick={goBack}
                >
                  Cancel
                </button>
              </div>
              <div className="basis-1/2">
                <button
                  type="submit"
                  className="w-full btn-primary-light text-white p-2 rounded"
                >
                  Create Profile
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CandidateRegisterPage;
