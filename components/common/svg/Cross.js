import React from "react";

const Cross = ({ color = "currentColor" }) => {
  return (
    <svg
      className="mx-auto text-gray-400 w-40 h-40 pl-8 pr-0 py-0 my-0"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 20 20"
      class="bi bi-x"
    >
      <path
        d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
        fill={color}
      />
    </svg>
  );
};

export default Cross;
