import React from "react";
import PopUpModal from "./PopUpModal";

const ModelPopup = ({ isVisible, title, toggleVisibility }) => {
  return (
    <PopUpModal
      isVisible={isVisible}
      title={title}
      toggleVisibility={toggleVisibility}
      confirmButtonColor="text-white bg-green-500 border border-green-500 hover:bg-white hover:text-green-500"
      cancelButtonColor="border border-red-500 bg-white text-red-500 hover:bg-red-500 hover:text-white"
      showConfirmButton={false}
      showCancelButton={false}
      confirmButtonText="Yes, I'm sure"
      cancelButtonText="No, cancel"
      icon = "warning"
    />
  );
};

export default ModelPopup;
