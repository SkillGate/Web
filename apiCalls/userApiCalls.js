import { publicAuthRequest } from "../constants/requestMethods";

export const Register = async (User) => {
  let loading = true;
  let error = null;
  let data = [];
  try {
    const res = await publicAuthRequest.post(`/auth/register`, User);
    loading = false;
    data = res.data;
    return res.data;
    // return { data, loading, error }
  } catch (err) {
    console.error(err);
    loading = false;
    error = err.message;
    // return { data, loading, error }
    return null;
  }
};

export const Login = async (User) => {
  let loading = true;
  let error = null;
  let data = [];
  try {
    const res = await publicAuthRequest.post(`/auth/login`, User);
    console.log(res);
    loading = false;
    data = res.data;
    // return res.data;
    return { data, loading, error };
  } catch (err) {
    console.error(err);
    // throw new Error(err.message);
    loading = false;
    error = err.message;
    data = null;
    return { data, loading, error };
  }
};

export const UpdateUser = async (userId, token, User) => {
  let loading = false;
  let error = null;
  let data = [];
  if (!(userId && token && User)) {
    console.log("User ID " + userId);
    console.log("Token " + token);
    console.log("User " + User);
    error = "User Id or token or User must be provided";
    return { data, loading, error };
  }
  try {
    const res = await publicAuthRequest.put(`/user/${userId}`, User, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    data = res.data;
    // return res.data;
    return { data, loading, error };
  } catch (err) {
    console.error(err);
    // throw new Error(err.message);
    error = err.message;
    data = null;
    return { data, loading, error };
  }
};

export const UpdateUserWithStatus = async (userId, token, StatusData, Status) => {
  let loading = false;
  let error = null;
  let data = [];
  if (!(userId && token && StatusData && Status)) {
    console.log("User ID " + userId);
    console.log("Token " + token);
    console.log("Status Data " + StatusData);
    console.log("Status " + Status);
    error = "User Id or token or User or Status must be provided";
    return { data, loading, error };
  }
  try {
    const res = await publicAuthRequest.put(`/user/newly/${userId}?${Status}=true`, StatusData, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    console.log(res);
    data = res.data;
    // return res.data;
    return { data, loading, error };
  } catch (err) {
    console.error(err);
    // throw new Error(err.message);
    error = err.message;
    data = null;
    return { data, loading, error };
  }
};
