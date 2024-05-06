import React, { useEffect, useState } from "react";
import { getAllSkills } from "../../apiCalls/skillApiCalls";

function SkillRenderer({ user, requiredSkills, change }) {
  const [skills, setSkills] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllSkillLogos = async () => {
      console.log(user);
      console.log(requiredSkills);
      setLoading(true);
      try {
        const {
          data: userData,
          loading,
          error,
        } = await getAllSkills(requiredSkills, user?.accessToken);
        console.log(userData);
        setLoading(loading);
        setSkills((prev) => {
          return userData;
        });
      } catch (error) {
        setLoading(false);
        console.error("Error in onSubmit:", error);
      }
    };
    getAllSkillLogos();
  }, [user, requiredSkills, change]);
  return !loading && (
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

export default SkillRenderer;
