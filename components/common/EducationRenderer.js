import React, { useEffect, useState } from "react";
import { getAllSkills } from "../../apiCalls/skillApiCalls";
import { getCompanyLogo } from "../../apiCalls/companyApiCalls";
import { imageUrl } from "../../constants";
import { getEducationLogo } from "../../apiCalls/educationApiCalls";

function EducationRenderer({ user, companyLogo }) {
  const [skills, setSkills] = useState();

  useEffect(() => {
    const getAllSkillLogos = async () => {
      console.log(user);
      console.log(companyLogo);
      try {
        const {
          data: userData,
          loading,
          error,
        } = await getEducationLogo(companyLogo, user?.accessToken);
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
  }, [user, companyLogo]);
  return (
    <div className="flex items-center justify-center h-20 w-20">
      {user && skills ? (
        <img src={skills.value} alt={skills.name} className="w-full h-auto" />
      ) : (
        <img
          src={imageUrl.noLogo}
          alt="No company logo"
          className="w-full h-auto"
        />
      )}
    </div>
  );
}

export default EducationRenderer;
