import Image from "next/image";
import { fetchMethods, imageUrl, serverUrls } from "../../constants";
import { useForm, Controller } from "react-hook-form";
import { auth } from "../../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
import useFetch from "../../pages/api/useFetch";
import { server } from "../../config";
import { useRouter } from "next/router";
import { Login } from "../../apiCalls/userApiCalls";
import Alerts from "../common/Alerts";
import TermsOfService from "../common/TermsOfService";
import PopUpModal from "../common/PopUpModal";

const RegisterForm = () => {
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
    // Handle form submission here
    console.log(data);

    try {
      const userData = await Login(data);
      console.log(userData);
      if (!userData) {
        setIsModalVisible(true);
        reset(); // Optionally, you can clear the form values
      } else {
        router.push("/candidateDashboard");
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

      <div className="relative flex flex-col md:flex-row items-center justify-center bg-slate-200 h-screen md:gap-8">
        <div className="absolute md:relative block md:basis-1/2 order-1 md:pb-12 md:pt-8 md:py-0 invisible md:visible">
          <div className="flex flex-1 lg:min-h-[900px] text-center justify-center">
            <Image
              src={imageUrl.signInPageImage}
              alt="worker"
              width={700}
              height={700}
              className="feature-phone"
            />
          </div>
        </div>
        <div className="basis-100 md:basis-1/2 order-2 md:max-w-xl">
          <div className="p-8 mx-0 md:mx-10 bg-white rounded shadow-md">
            <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-10">
              Sign in to your account
            </h2>

            <form onSubmit={handleSubmit(onSubmit)}>
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
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      id="email"
                      placeholder="Enter your email"
                      className={`w-full p-2 border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } rounded`}
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
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Password
                </label>
                <Controller
                  name="password"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <input
                      {...field}
                      type="password"
                      id="password"
                      placeholder="Enter your password"
                      className={`w-full p-2 border ${
                        errors.password ? "border-red-500" : "border-gray-300"
                      } rounded`}
                    />
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
                Register
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
