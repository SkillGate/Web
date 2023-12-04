/* eslint-disable @next/next/no-img-element */
import { useRef, useState } from "react";
import { BiTag } from "react-icons/bi";
import { FaCamera, FaTimes } from "react-icons/fa";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";
import Select from "react-select";
import { useForm, Controller } from "react-hook-form";
import { IoMdAdd } from "react-icons/io";

const PostJob = () => {
  const logoInput = useRef(null);
  const bannerInput = useRef(null);
  const [logo, setLogo] = useState("");
  const [banner, setBanner] = useState("");

  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    watch,
    setError,
    clearErrors
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  const [educationFields, setEducationFields] = useState(1);

  const handleAddEducationField = () => {
    setEducationFields((prevEducationFields) => prevEducationFields + 1);
  };

  const [experienceFields, setExperienceFields] = useState(1);

  const handleAddExperienceField = () => {
    setExperienceFields((prevExperienceFields) => prevExperienceFields + 1);
  };

  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim() !== '') {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      setNewSkill('');

      setValue('skills', updatedSkills);
    }
  };

  const removeSkill = (skillToRemove) => {
    const updatedSkills = skills.filter((skill) => skill !== skillToRemove);
    setSkills(updatedSkills);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addSkill();
    }
  };

  const [showTooltip, setShowTooltip] = useState(false);

  // const tooltipButton = document.getElementById('tooltipbutton');
  // const tooltip = document.getElementById('tooltip');

  // function showTooltip() {
  //   tooltip.classList.remove('hidden');
  // }

  // function hideTooltip() {
  //   tooltip.classList.add('hidden');
  // }

  // tooltipButton.addEventListener('mouseenter', showTooltip);
  // tooltipButton.addEventListener('mouseleave', hideTooltip);


  return (
    <>
      <div className="rounded max-w-3xl w-full mx-auto">
        {/*---------------------------------------- Back to home button------------------------------------- */}
        <button className="btn bg-slate-200 hover:bg-slate-300 dark:bg-dark-card dark:hover:bg-hover-color">
          <Link href="/employerDashboard">
            <a className="flex-align-center gap-2">
              <FiChevronLeft />
              <span>back</span>
            </a>
          </Link>
        </button>

        <div className="relative mt-5">
          <input
            type="file"
            hidden
            ref={logoInput}
            onChange={(e) => setLogo(e.target.files[0])}
          />
          <img
            src={`${banner ? URL.createObjectURL(banner) : "/images/placeholder.png"
              }`}
            alt=""
            className="h-[200px] sm:cursor-pointer object-cover w-full rounded-tl-xl rounded-tr-xl"
            onClick={() => bannerInput.current.click()}
          />
          <input
            type="file"
            hidden
            ref={bannerInput}
            onChange={(e) => setBanner(e.target.files[0])}
          />
          <div
            className="sm:cursor-pointer"
            onClick={() => logoInput.current.click()}
          >
            {logo ? (
              <img
                src={URL.createObjectURL(logo)}
                alt=""
                className="w-16 left-10 -bottom-8 absolute rounded-lg"
              />
            ) : (
              <div className="w-20 h-16 rounded-lg grid place-items-center left-10 -bottom-8 absolute border-2 border-dotted border-slate-400 dark:border-hover-color">
                <FaCamera className="text-3xl opacity-60 dark:text-slate-500" />
                <span className="opacity-50">Logo</span>
              </div>
            )}
          </div>
        </div>
        <h1 className="text-lg mt-10">Provide company persona and job post details</h1>

        {/*----------------------------------------Begin Form------------------------------------- */}

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex-align-center flex-col sm:flex-row gap-4 mt-8">
            <div className="form-input w-full sm:flex-1 relative">
              <Controller
                name="companyname"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="companyname"
                    className="input"
                    required
                  />
                )}
              />
              <label htmlFor="firstname">Company Name</label>
            </div>
            <div className="form-input w-full sm:flex-1 relative">
              <Controller
                name="jobtitle"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    id="jobtitle"
                    className="input"
                    required
                  />
                )}
              />
              <label htmlFor="jobtitle">Job Title</label>
            </div>
          </div>
          <div className="form-input w-full sm:flex-1 relative mt-5">
            <Controller
              name="abouthtejob"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="textarea"
                  id="aboutthejob"
                  className="input !h-28 pt-2"
                  required
                />
              )}
            />
            <label htmlFor="aboutthejob">About the Job</label>
          </div>
          <div className="form-input w-full sm:flex-1 relative mt-5">
            <Controller
              name="resposibilities"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="textarea"
                  id="resposibilities"
                  className="input !h-28 pt-2"
                  required
                />
              )}
            />
            <label htmlFor="resposibilities">Resposibilities</label>
          </div>
          <h3>Requirements</h3>

          {/*----------------------------------------Begin education section------------------------------------- */}

          <h6 className="mt-2">Education</h6>
          <div>
            {Array.from({ length: educationFields }, (_, index) => (
              <div key={index} className="mt-4 flex flex-col lg:flex-row gap-4">
                <div className="flex-auto mb-4 lg:mb-0" >
                  <Controller
                    name={`education[${index}].educationtype`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <select
                        {...field}
                        id="dropdown"
                        className="block w-full mt-1 border border-primary rounded-md focus:border-primary bg-gray-100 p-2">
                        <option value="">Select...</option>
                        <option value="Bachelor s degree">Bachelor s degree</option>
                        <option value="Master s degree">Master s degree</option>
                        <option value="Doctoral degree">Doctoral degree</option>
                      </select>
                    )}
                  />
                </div>
                <div className="ml-6 flex-auto mb-4 lg:mb-0">
                  <Controller
                    name={`education[${index}].educationfield`}
                    control={control}
                    defaultValue={{ computerScience: false, softwareEngineer: false }}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <div className="mb-2">
                          <input
                            type="checkbox"
                            id="computerscience"
                            value="computerScience"
                            onChange={(e) => {
                              onChange({
                                ...value,
                                computerScience: e.target.checked,
                              });
                            }}
                            class="float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                          />
                          <label htmlFor="computerscince">Computer Science</label>
                        </div>
                        <div className="mb-2">
                          <input
                            type="checkbox"
                            id="softwareengineer"
                            value="softwareEngineer"
                            onChange={(e) => {
                              onChange({
                                ...value,
                                softwareEngineering: e.target.checked,
                              });
                            }}
                            class="float-left -ml-[1.5rem] mr-[6px] mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:-mt-px checked:after:ml-[0.25rem] checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:transition-[border-color_0.2s] focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-[0.875rem] focus:after:w-[0.875rem] focus:after:rounded-[0.125rem] focus:after:content-[''] checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:after:-mt-px checked:focus:after:ml-[0.25rem] checked:focus:after:h-[0.8125rem] checked:focus:after:w-[0.375rem] checked:focus:after:rotate-45 checked:focus:after:rounded-none checked:focus:after:border-[0.125rem] checked:focus:after:border-l-0 checked:focus:after:border-t-0 checked:focus:after:border-solid checked:focus:after:border-white checked:focus:after:bg-transparent dark:border-neutral-600 dark:checked:border-primary dark:checked:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                          />
                          <label className="mt-5" htmlFor="softwareengineering">Software Engineer</label>
                        </div>
                      </>
                    )}
                  />
                </div>
              </div>
            ))}
            <div>
              <button onClick={handleAddEducationField}><IoMdAdd size={25} className="text-gray-400" /></button>
            </div>
            <div className="form-input w-full sm:flex-1 relative mt-5">
              <Controller
                name="education job post"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="textarea"
                    id="education job post"
                    className="input !h-28 pt-2"
                    required
                  />
                )}
              />
              <label htmlFor="education job post">Describe candidate education</label>
              <button
                className="bg-primary text-white font-semibold text-sm rounded-full w-5 h-5 cursor-pointer"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                i
              </button>
              {showTooltip && (
                <div className="absolute bg-white text-gray-800 border border-primary shadow-lg dark:bg-gray-800 dark:text-white text-sm rounded p-2 absolute z-10 text-center mb-2">
                  We use this input field data to display in job posting
                  <div className="bg-gray-800 absolute bottom-full left-1/2 transform -translate-x-1/2"></div>
                </div>
              )}
            </div>
          </div>

          {/*----------------------------------------End education section------------------------------------- */}

          {/*----------------------------------------Begin experience section------------------------------------- */}

          <h6 className="mt-2">Experience</h6>
          <div>
            {Array.from({ length: experienceFields }, (_, index) => (
              <div key={index} className="mt-4 flex flex-col lg:flex-row gap-4">
                <div className="flex-auto mb-4 lg:mb-0" >
                  <Controller
                    name={`experience[${index}].experiencedYears`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <select
                        {...field}
                        id="dropdown"
                        className="block w-full mt-1 border border-primary rounded-md focus:border-primary bg-gray-100 p-2">
                        <option value="">Select...</option>
                        <option value="Less than 1 Year">Less than 1 Year</option>
                        <option value="+ 1 Year">+ 1 Year</option>
                        <option value="+ 2 Year">+ 2 Year</option>
                        <option value="+ 3 Year">+ 3 Year</option>
                        <option value="+ 4 Year">+ 4 Year</option>
                        <option value="+ 5 Year">+ 5 Year</option>
                        <option value="More than 5 Year">More than 5 Year</option>
                      </select>
                    )}
                  />
                </div>
                <div className="flex-auto mb-4 lg:mb-0">
                  <div className="form-input w-full sm:flex-1 relative">
                    <Controller
                      name={`experience[${index}].experiencedArea`}
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="textarea"
                          id="experiencedArea"
                          className="input !h-28 pt-2"
                          required
                        />
                      )}
                    />
                    <label htmlFor="experiencedArea">Experince required area</label>
                  </div>
                </div>
              </div>
            ))}
            <div>
              <button onClick={handleAddExperienceField}><IoMdAdd size={25} className="text-gray-400" /></button>
            </div>
            <div className="form-input w-full sm:flex-1 relative mt-5">
              <Controller
                name="experience job post"
                control={control}
                render={({ field }) => (
                  <input
                    {...field}
                    type="textarea"
                    id="experience job post"
                    className="input !h-28 pt-2"
                    required
                  />
                )}
              />
              <label htmlFor="experience job post">Describe candidate experience</label>
              <button
                className="bg-primary text-white font-semibold text-sm rounded-full w-5 h-5 cursor-pointer"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                i
              </button>
              {showTooltip && (
                <div className="absolute bg-white text-gray-800 border border-primary shadow-lg dark:bg-gray-800 dark:text-white text-sm rounded p-2 absolute z-10 text-center mb-2">
                  We use this input field data to display in job posting
                  <div className="bg-gray-800 absolute bottom-full left-1/2 transform -translate-x-1/2"></div>
                </div>
              )}
            </div>
          </div>

          {/*----------------------------------------End experience section------------------------------------- */}

          {/*----------------------------------------Begin skill section------------------------------------- */}

          <div className="mt-10">
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <div
                  key={index}
                  className="bg-purple-400 text-white px-2 py-1 rounded-full flex items-center"
                >
                  <span>{skill}</span>
                  <button
                    onClick={() => removeSkill(skill)}
                    className="ml-2 focus:outline-none"
                  >
                    &#10005;
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 form-input w-full sm:flex-1 relative">
              <Controller
                name="skills"
                control={control}
                defaultValue={skills}
                render={({ field }) => (
                  <input
                    {...field}
                    type="text"
                    placeholder="Enter skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="input"
                  />
                )}
              />
            </div>
          </div>

          {/*----------------------------------------End skill section------------------------------------- */}

          <div className="form-input w-full sm:flex-1 relative mt-10">
            <Controller
              name="email"
              control={control}
              defaultValue={skills}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  className="input"
                  required
                />
              )}
            />
            <label htmlFor="email">Email Address</label>
          </div>

          <button className="btn btn-primary w-full mt-4">post job</button>

        </form>

        {/*----------------------------------------End Form------------------------------------- */}

      </div>
    </>
  );
};

export default PostJob;
//
