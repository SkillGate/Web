import { publicRequest } from "../constants/requestMethods";

export const Register = async (User, token) => {
  try {
    const res = await publicRequest.post(`/auth/register`, User, {
      headers: {
        token: `Bearer ${token}`,
      },
    });
    console.log(res);
    setData(res);
    setLoading(false);
  } catch (err) {
    console.error(err);
    setError(err);
    setLoading(false);
  }
};
