import React from "react";
import Warning from "./svg/Warning";
import Question from "./svg/Question";
import Cross from "./svg/Cross";

const PopUpModal = ({
  isVisible,
  title,
  toggleVisibility,
  confirmButtonColor = "",
  cancelButtonColor = "",
  showConfirmButton = false,
  showCancelButton = false,
  confirmButtonText = "Confirm",
  cancelButtonText = "Cancel",
  icon = "warning",
  confirmFunction = () => {}
}) => {
  return (
    <div>
      <div
        id="modal-overlay"
        style={{ display: isVisible ? "block" : "none" }}
        className="fixed inset-0 bg-black opacity-50 z-40"
      ></div>
      <div
        id="popup-modal"
        style={{ display: isVisible ? "flex" : "none" }}
        tabIndex="-1"
        className="fixed inset-0 z-50 flex justify-center items-center"
      >
        <div className="relative bg-white rounded-lg shadow w-full max-w-md p-4">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 inline-flex justify-center items-center"
            data-modal-hide="popup-modal"
            onClick={toggleVisibility}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <div className="p-4 md:p-5 text-center">
            {icon === "warning" && <Warning color={"#967BB6"} />}
            {icon === "question" && <Question />}
            {icon === "cross" && <Cross />}

            <h3 className="mb-5 text-lg font-normal text-gray-500">{title}</h3>
            <div className="gap-4">
              {showConfirmButton && (
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className={`${confirmButtonColor} focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2`}
                  onClick={confirmFunction}
                >
                  {confirmButtonText}
                </button>
              )}
              {showCancelButton && (
                <button
                  data-modal-hide="popup-modal"
                  type="button"
                  className={`${cancelButtonColor} focus:ring-4 focus:outline-none rounded-lg border text-sm font-medium px-5 py-2.5 focus:z-10`}
                  onClick={toggleVisibility}
                >
                  {cancelButtonText}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopUpModal;
