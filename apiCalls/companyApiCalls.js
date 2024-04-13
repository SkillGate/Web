import { publicConfigRequest } from "../constants/requestMethods";

export const getAllCompanyLogos = async (companies, token) => {
  let loading = true;
  let error = null;
  let data = [];

  if (!(companies && token)) {
    console.log("skills " + companies);
    console.log("Token " + token);
    error = "Companies or token or User must be provided";
    return { data, loading, error };
  }
  try {
    const res = await publicConfigRequest.post(`/config/company`, companies, {
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

export const getCompanyLogo = async (company, token) => {
  let loading = true;
  let error = null;
  let data = [];
  if (!(company && token)) {
    console.log("skills " + company);
    console.log("Token " + token);
    error = "Company or token or User must be provided";
    return { data, loading, error };
  }

  try {
    const res = await publicConfigRequest.get(`/config/company/${company}`, {
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
