"use client";

import Link from "next/link";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from 'next/router';
import Select from "react-select";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EducationModel = () => {

  const router = useRouter();
  const { university, degree, grade, startdate, enddate } = router.query;
  console.log(grade);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="flex min-h-full flex-col justify-center px-6 py-6 lg:px-6">
        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-xl max-w-xl p-8 bg-white rounded shadow-md">

          <h2 className="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900 mb-10">Create Education</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            {/* University Name input */}
            <div className="mb-4">
              <label
                htmlFor="universityname"
                className="block text-gray-700 font-bold mb-2"
              >
                University/ Higher Education Institute Name
              </label>
              <Controller
                name="universitytname"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="firstname"
                    placeholder="Enter your University Name"
                    className={`w-full p-2 border ${errors.firstname ? "border-red-500" : "border-gray-300"
                      } rounded`}
                    defaultValue={university}
                  />
                )}
              />
            </div>

            {/* Degree Name input */}
            <div className="mb-4">
              <label
                htmlFor="degreename"
                className="block text-gray-700 font-bold mb-2"
              >
                Degree Name
              </label>
              <Controller
                name="degreename"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="degreename"
                    placeholder="Enter your Degree Name"
                    className={`w-full p-2 border rounded`}
                    defaultValue={degree}
                  />
                )}
              />
            </div>

            {/* class of degree input */}
            <div className="mb-4">
              <label
                htmlFor="classofdegree"
                className="block text-gray-700 font-bold mb-2"
              >
                Class of Degree:
              </label>
              <Controller
                name="classofdegree"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    defaultInputValue={grade}
                    options={[
                      { value: "First Class", label: "First Class" },
                      { value: "Second Class - Upper Division", label: "Second Class - Upper Division" },
                      { value: "Second Class - Lower DIvision", label: "Second Class - Lower DIvision" },
                      { value: "General", label: "General" }
                    ]}
                  />
                )}
              />
            </div>

            <div className="flex justify-between gap-4">
              <div className="mb-4">
                <label
                  htmlFor="startdate"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Start Date
                </label>
                <Controller
                  name="startdate"
                  control={control}
                  defaultValue={startdate}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value ? new Date(field.value) : null}
                      onChange={(date) => {
                        field.onChange(date);
                      }}
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                      placeholderText="Select Date"
                    />
                  )}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="enddate"
                  className="block text-gray-700 font-bold mb-2"
                >
                  End Date
                </label>
                <Controller
                  name="enddate"
                  control={control}
                  defaultValue={enddate}
                  render={({ field }) => (
                    <DatePicker
                      selected={field.value ? new Date(field.value) : null}
                      onChange={(date) => {
                        field.onChange(date);
                      }}
                      dateFormat="MM/yyyy"
                      showMonthYearPicker
                      placeholderText="Select Date"
                    />
                  )}
                />
              </div>
            </div>

            <div className="flex justify-between gap-4">
              {/* Cancel button */}
              <Link href="/candidate-persona">
                <button className="w-full btn-primary-light text-white p-2 rounded">Cancel</button>
              </Link>
              {/* Submit button */}
              <button
                type="submit"
                className="w-full btn-primary-light text-white p-2 rounded"
              >
                Create Profile
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default EducationModel;
