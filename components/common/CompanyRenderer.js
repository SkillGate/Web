import React, { useEffect, useState } from "react";
import { getAllSkills } from "../../apiCalls/skillApiCalls";
import { getCompanyLogo } from "../../apiCalls/companyApiCalls";
import { imageUrl } from "../../constants";

function CompanyRenderer({ user, companyLogo }) {
  const [skills, setSkills] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getAllSkillLogos = async () => {
      console.log(user);
      console.log(companyLogo);
      setLoading(true);
      try {
        const {
          data: userData,
          loading,
          error,
        } = await getCompanyLogo(companyLogo, user?.accessToken);
        console.log(userData);
        setSkills((prev) => {
          return userData;
        });
        setLoading(loading);
      } catch (error) {
        setLoading(false);
        console.error("Error in onSubmit:", error);
      }
    };
    getAllSkillLogos();
  }, [user, companyLogo]);
  return (
    !loading && (
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
    )
  );
}

export default CompanyRenderer;
