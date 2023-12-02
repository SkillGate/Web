import { publicAuthRequest } from "../constants/requestMethods";

export const Register = async (User) => {
  try {
    const res = await publicAuthRequest.post(`/auth/register`, User);
    console.log(res);
    return res.data;
  } catch (err) {
    console.error(err);
    return null;
  }
};

export const Login = async (User) => {
  try {
    const res = await publicAuthRequest.post(`/auth/login`, User);
    console.log(res);
    return res.data;
  } catch (err) {
    console.error(err);
    // throw new Error(err.message);
    return null;
  }
};
