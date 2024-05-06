import { publicJobRequest } from "../constants/requestMethods";

export const addJob = async (job, token) => {
  let loading = true;
  let error = null;
  let data = [];
  try {
    const res = await publicJobRequest.post(`/job/`, job, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    loading = false;
    data = res.data;
    // return res.data;
    return { data, loading, error };
  } catch (err) {
    console.error(err);
    loading = false;
    error = err.message;
    return { data, loading, error };
    // return null;
  }
};

export const getAllJob = async (token) => {
  let loading = false;
  let error = null;
  let data = [];
  try {
    const res = await publicJobRequest.get(`/job/`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    data = res.data;
    // return res.data;
    return { data, loading, error };
  } catch (err) {
    console.error(err);
    error = err.message;
    return { data, loading, error };
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
    return { data, loading, error };
  } catch (err) {
    console.error(err);
    loading = false;
    error = err.message;
    return { data, loading, error };
  }
};

export const getJobByUser = async (employerId, token) => {
  let loading = true;
  let error = null;
  let data = [];
  console.log("Emoloyee ID " + employerId);
  if (!(employerId && token)) {
    console.log("Token " + token);
    console.log("Emoloyee ID " + employerId);
    error = "Employee Id or token must be provided";
    return { data, loading, error };
  }
  try {
    const res = await publicJobRequest.get(`/job/find/jobs/${employerId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
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

export const applyJob = async (jobId, token, candidateId) => {
  let loading = true;
  let error = null;
  let data = [];
  try {
    const res = await publicJobRequest.put(`/job/apply/${jobId}`, candidateId, {
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
    error = err;
    return { data, loading, error };
  }
};

export const savedJob = async (jobId, token, candidateId) => {
    let loading = true;
    let error = null;
    let data = [];
    try {
      const res = await publicJobRequest.put(`/job/saved/${jobId}`, candidateId, {
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
      error = err;
      return { data, loading, error };
    }
  };

  export const predictBenefits = async (jobId, token,candidateId, candidateData) => {
    let loading = true;
    let error = null;
    let data = [];
    console.log("candidateData: ",candidateData)
    console.log("candidateID: ",candidateId)
    console.log("candidate Token: ",token)
    console.log("job id: ",jobId)
    try {
      const res = await publicJobRequest.post(`/job/getBenefits/${jobId}`, {candidateId,candidateData}, {
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
      error = err;
      return { data, loading, error };
    }
  };


export const getEAIJobComparison = async (jobId, token, candidateData, category) => {
  let loading = true;
  let error = null;
  let data = [];
  if (!(candidateData && token && jobId && category)) {
    console.log("Candidate Ids " + candidateData.length);
    console.log("Token " + token);
    console.log("Category " + category);
    console.log("jobId " + jobId);
    error = "Candidate data or token or jobId or category must be provided";
    return { data, loading, error };
  }
  try {
    const res = await publicJobRequest.put(`/job/explain/${jobId}`, candidateData, {
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
    error = err;
    return { data, loading, error };
  }
};

