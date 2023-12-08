import { publicJobRequest } from "../constants/requestMethods";

export const addJob = async (job, token) => {
  try {
    const res = await publicJobRequest.post(`/job/`, job, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const getAllJob = async (token) => {
  let loading = true;
  let error = null;
  let data = [];
  try {
    const res = await publicJobRequest.get(`/job/`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    loading = false;
    data = res.data;
    // return res.data;
    return { data, loading, error }
  } catch (err) {
    console.error(err);
    loading = false;
    error = err.message;
    return { data, loading, error }
  }
};

export const getJob = async (jobId, token) => {
  let loading = true;
  let error = null;
  let data = [];
  try {
    const res = await publicJobRequest.get(`/job/find/${jobId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    loading = false;
    data = res.data;
    return { data, loading, error }
  } catch (err) {
    console.error(err);
    loading = false;
    error = err.message;
    return { data, loading, error }
  }
};

export const getJobByUser = async (employerId, token) => {
  try {
    const res = await publicJobRequest.get(`/job/find/jobs/${employerId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const updateJob = async (job, token) => {
  try {
    const res = await publicJobRequest.put(`/job/`, job, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const deleteJob = async (job, token) => {
  try {
    const res = await publicJobRequest.delete(`/job/`, job, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};
