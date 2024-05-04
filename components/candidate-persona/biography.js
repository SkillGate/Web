import React, { useEffect, useState } from "react";
import { MdEdit } from "react-icons/md";
import BiographyPopup from "./models/biography-model";

const Biography = () => {
  const [isBiographyOpen, setBiographyIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [change, notChange] = useState(false);

  useEffect(() => {
    const storedUserData = localStorage.getItem("userData");
    if (storedUserData) {
      setUser(JSON.parse(storedUserData));
    }
  }, [change]);

  const handleBiographyOpen = () => {
    setBiographyIsOpen(true);
  };
  const handleBiographyClose = () => {
    setBiographyIsOpen(false);
  };

  const handleEmptyValueClick = () => {
    setBiographyIsOpen(true);
  };

  const handleUserChangeState = () => {
    notChange(!change);
  };

  return (
    <div className="py-4">
      <div className="flex justify-between">
        <h1 className="text-lg font-semibold">Biography</h1>
        <div>
          <button onClick={handleBiographyOpen}>
            <MdEdit size={20} className="text-gray-400" />
          </button>
          {isBiographyOpen && (
            <BiographyPopup
              user={user}
              onClose={handleBiographyClose}
              onChange={handleUserChangeState}
            />
          )}
        </div>
      </div>
      <div
        className="flex flex-col sm:flex-row justify-between gap-4 mt-3"
        onClick={handleEmptyValueClick}
      >
        <div className="flex gap-3">
          <h1
            className={`text-md font-semiBold ${
              !user?.biography && "capitalize"
            }`}
          >
            {user?.biography || "Add your biography"}
          </h1>
        </div>
      </div>
      {/* <p
        className="text-sm mt-3 cursor-pointer"
        onClick={handleEmptyValueClick}
      >
        {user?.biography || "Add your biography"}
      </p> */}
    </div>
  );
};

export default Biography;
