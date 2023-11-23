"use client";
// pages/index.js
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { imageUrl } from "../constants";
import { auth } from "../firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect } from "react";

const LoginPage = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    // Handle form submission here
    console.log(data);
  };

  const [user, setUse] = useAuthState(auth)
  const googleAuth = new GoogleAuthProvider();
  const login = async () => {
    // const result = await signInWithPopup(auth, googleAuth);
    const result = await signInWithPopup(auth, googleAuth);
  };
  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <div className="flex flex-col sm:flex-row lg:h-screen">
      {/* Left side with image */}
      <div className="sm:w-1/2 flex relative w-full h-72 sm:h-auto">
        <Image
          src={imageUrl.signInPageImage}
          alt="Login Image"
          layout="fill"
          objectFit="cover"
          className="w-full h-72 sm:h-auto object-cover"
          style={{
            filter: `hue-rotate(45deg)`,
          }}
        />
      </div>

      {/* Right side with login details */}
      <div className="sm:w-1/2 flex items-center justify-center lg:bg-gray-200">
        <div className="max-w-lg p-8 bg-white rounded shadow-md">

          <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-10">Sign in to your account</h2>

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
                rules={{ required: "Email is required", pattern: /^\S+@\S+$/i }}
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
              onClick={login}>
              <img className="h-6 w-auto mr-4" src={imageUrl.google} alt="google" />
              Google
            </button>
          </div>

          <p className="mt-10 text-center text-sm text-gray-500">
            New to SkillGate?
            <button className="text-purple-500 font-bold py-2 px-4 rounded-lg">
              Register
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
