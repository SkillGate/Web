import { useEffect, useState } from "react";
import { publicRequest } from "../constants/requestMethods";

export const Register = (User, token) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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

    fetchData();
  }, [User, token]);

  return { data, loading, error };
};

export const Login = async (User) => {
  try {
    const res = await publicRequest.post(`/auth/login`, User);
    console.log(res);
    return res.data;
  } catch (err) {
    console.error(err);
    throw new Error(err.message);
  }
};
