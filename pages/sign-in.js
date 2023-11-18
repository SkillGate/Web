// pages/index.js
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";

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

  return (
    <div className="flex flex-row h-screen">
      {/* Left side with image */}
      <div className="basis-1/2">
        <Image
          src="https://res.cloudinary.com/midefulness/image/upload/v1694111830/SkillGate/hero1_zt5y3w.png"
          alt="Login Image"
          height={200}
          width={200}
        //   layout="fill"
        //   objectFit="cover"
        />
      </div>

      {/* Right side with login details */}
      <div className="basis-1/2 flex items-center justify-center bg-gray-200">
        <div className="max-w-md p-8 bg-white rounded shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Login</h2>

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
                    className={`w-full p-2 border ${
                      errors.email ? "border-red-500" : "border-gray-300"
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
              className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-700"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
