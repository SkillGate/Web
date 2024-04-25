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
      // loginAndPersistUser(JSON.parse(storedUserData));
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
          {isBiographyOpen && <BiographyPopup user={user} onClose={handleBiographyClose} onChange={handleUserChangeState} />}
        </div>
      </div>
      <p
        className="text-sm mt-3 cursor-pointer"
        onClick={handleEmptyValueClick}
      >
        {user?.biography || "Add your biography"}
      </p>
      {/* <p className="text-sm mt-3">
        I am a highly competent IT professional with a proven track record in
        designing websites, networking and managing databases. I have strong
        technical skills as well as excellent interpersonal skills, enabling me
        to interact with a wide range of clients.
      </p>
      <p className="text-sm mt-3">
        I am eager to be challenged in order to grow and further improve my IT
        skills. My greatest passion is in life is using my technical know-how to
        benefit other people and organizations.
      </p> */}
    </div>
  );
};

export default Biography;
