import React from "react";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";

const Back = ({ url }) => {
  return (
    <div>
      <button className="btn bg-slate-200 hover:bg-slate-300 dark:bg-dark-card dark:hover:bg-hover-color">
        <Link href={url}>
          <a className="flex-align-center gap-2">
            <FiChevronLeft />
            <span>Back</span>
          </a>
        </Link>
      </button>
    </div>
  );
};

export default Back;
