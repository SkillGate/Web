import { publicConfigRequest } from "../constants/requestMethods";

export const getAllSkills = async (skills, token) => {
  let loading = true;
  let error = null;
  let data = [];
  try {
    const res = await publicConfigRequest.post(`/config/skills`, skills, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    loading = false;
    data = res.data;
    return { data, loading, error };
  } catch (err) {
    console.error(err);
    loading = false;
    error = err.message;
    return { data, loading, error };
  }
};

export const getSkill = async (skill, token) => {
  let loading = true;
  let error = null;
  let data = [];
  try {
    const res = await publicConfigRequest.get(`/config/skill/${skill}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    loading = false;
    data = res.data;
    return { data, loading, error };
  } catch (err) {
    console.error(err);
    loading = false;
    error = err.message;
    return { data, loading, error };
  }
};
