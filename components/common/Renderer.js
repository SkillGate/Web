import React, { useEffect, useState } from "react";
import { getAllSkills } from "../../apiCalls/skillApiCalls";

function CompanyRenderer({ user, companyLogos }) {
  const [skills, setSkills] = useState();

  useEffect(() => {
    const getAllSkillLogos = async () => {
      console.log(user);
      console.log(companyLogos);
      try {
        const {
          data: userData,
          loading,
          error,
        } = await getAllSkills(companyLogos, user?.accessToken);
        console.log(userData);
        setSkills((prev) => {
          return userData;
        });
      } catch (error) {
        // setLoading(false);
        console.error("Error in onSubmit:", error);
      }
    };
    getAllSkillLogos();
  }, [user, companyLogos]);
  return (
    <div>
      {user && skills && skills.length !== 0 ? (
        <div className="flex-align-center gap-2">
          {skills.map((skill) =>
            skill.value != "None" ? (
              <img src={skill.value} alt={skill.name} className="w-6" />
            ) : (
              <div className="">{skill.name}</div>
            )
          )}
        </div>
      ) : (
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex gap-3">
            <h1 className="text-md font-semiBold capitalize">
              No skills available.
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default CompanyRenderer;
