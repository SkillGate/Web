import React, { useEffect } from "react";
import formattedDate from "../components/common/CurrentDate";
import { useRouter } from "next/router";
import { useUiContext } from "../contexts/UiContext";

const EmployerDashboard = () => {
  const { user } = useUiContext();
  const router = useRouter();

  useEffect(() => {
    if (!user?.userType) {
      router.push("/");
    }
  }, [user]);
  return (
    <div className="padding-container">
      <h1 className="font-bold text-2xl">
        Welcome, {user?.firstName + " " + user?.lastName}
      </h1>
      <p>{formattedDate}</p>
    </div>
  );
};

export default EmployerDashboard;
