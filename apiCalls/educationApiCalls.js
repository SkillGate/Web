import { publicConfigRequest } from "../constants/requestMethods";

export const getAllEducationLogos = async (educations, token) => {
  let loading = true;
  let error = null;
  let data = [];

  if (!(educations && token)) {
    console.log("skills " + educations);
    console.log("Token " + token);
    error = "Educations or token or User must be provided";
    return { data, loading, error };
  }

  try {
    const res = await publicConfigRequest.post(
      `/config/educations`,
      educations,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
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

export const getEducationLogo = async (education, token) => {
  let loading = true;
  let error = null;
  let data = [];

  if (!(education && token)) {
    console.log("skills " + education);
    console.log("Token " + token);
    error = "Education or token or User must be provided";
    return { data, loading, error };
  }
  try {
    const res = await publicConfigRequest.get(
      `/config/education/${education}`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
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
