import Image from "next/image";
import { imageUrl, userTypes } from "../../constants";
import { useForm, Controller } from "react-hook-form";
import { auth } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Login } from "../../apiCalls/userApiCalls";
import TermsOfService from "../common/TermsOfService";
import PopUpModal from "../common/PopUpModal";
import Link from "next/link";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const RegisterForm = () => {

  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (e, field) => {
    field.onChange(e.target.value);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const router = useRouter();

  const [user, setUse] = useAuthState(auth);
  const googleAuth = new GoogleAuthProvider();
  const login = async () => {
    // const result = await signInWithPopup(auth, googleAuth);
    const result = await signInWithPopup(auth, googleAuth);
  };
  useEffect(() => {
    console.log(user);
  }, [user]);

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const userData = await Login(data);
      console.log(userData);
      if (!userData) {
        setIsModalVisible(true);
        reset();
      } else {
        if (userData.userType === userTypes.candidate) {
          router.push("/candidateDashboard");
        } else {
          router.push("/employerDashboard");
        }
      }
    } catch (error) {
      console.error("Error in onSubmit:", error);
    }
  };

  return (
    <div>
      <PopUpModal
        isVisible={isModalVisible}
        title="Invalid email or password."
        toggleVisibility={toggleModal}
        confirmButtonColor="text-white bg-green-500 border border-green-500 hover:bg-white hover:text-green-500"
        cancelButtonColor="border border-red-500 bg-white text-red-500 hover:bg-red-500 hover:text-white"
        showConfirmButton={false}
        showCancelButton={false}
        confirmButtonText="Yes, I'm sure"
        cancelButtonText="No, cancel"
      />

      <div className="sign-in-container">
        <div className="absolute md:relative block md:basis-1/2 order-1 md:pb-12 md:pt-8 md:py-0 invisible md:visible">
          <div className="flex flex-1 lg:min-h-[900px] text-center justify-center">
            <Image
              src={imageUrl.signInPageImage}
              alt="worker"
              width={700}
              height={700}
              className="feature-phone"
              style={{ filter: 'hue-rotate(45deg)' }}
            />
          </div>
        </div>
        <div className="basis-100 md:basis-1/2 order-2 md:max-w-xl">
          <div className="sign-in-form-container">
            <h2 className="register-from-header">Sign in to your account</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Email input */}
              <div className="mb-4">
                <label htmlFor="email" className="register-from-label">
                  Email
                </label>
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
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
                    pattern: /^\S+@\S+$/i,
                  }}
                />
                {errors.email && (
                  <span className="text-red-500 text-sm">
                    {errors.email.message}
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
                  defaultValue=""
                  render={({ field }) => (
                    <>
                    <div style={{ position: 'relative' }}>
                      <input
                        {...field}
                        type={passwordVisible ? 'text' : 'password'}
                        id="password"
                        placeholder="Enter your password"
                        className={`register-from-input ${errors.password ? "border-red-500" : "border-gray-300"
                          }`}
                        onChange={(e) => handlePasswordChange(e, field)}
                        style={{ paddingRight: '40px' }}
                      />
                      <span style={{ position: 'absolute', top: '50%', right: '10px', transform: 'translateY(-50%)' }}>
                        {passwordVisible ? (
                          <FaEyeSlash onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }} />
                        ) : (
                          <FaEye onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }} />
                        )}
                      </span>
                      </div>
                    </>
                  )}
                  rules={{ required: "Password is required" }}
                />
                {errors.password && (
                  <span className="text-red-500 text-sm">
                    {errors.password.message}
                  </span>
                )}
              </div>

              {/* Submit button */}
              <button
                type="submit"
                className="w-full btn-primary-light text-white p-2 rounded"
              >
                Sign In
              </button>
            </form>
            <div className="mt-7 flex w-full justify-center">
              <p className="centered-text">Or continue with</p>
            </div>
            <div>
              <button
                type="button"
                className="flex w-full justify-center rounded-md bg-gray-800 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800 mt-6"
                onClick={login}
              >
                <img
                  className="h-6 w-auto mr-4"
                  src={imageUrl.google}
                  alt="google"
                />
                Google
              </button>
            </div>

            <p className="mt-8 text-center text-sm text-gray-500">
              New to SkillGate?
              <button className="text-purple-500 font-bold py-2 px-4 rounded-lg">
                <Link href="/create-account">Register</Link>
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
