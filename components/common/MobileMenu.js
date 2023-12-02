import React from "react";
import { actioTypes } from "../../reducers/uiReducer";
import Link from "next/link";

const MobileMenu = ({ links }) => {
  return (
    <div>
      <ul className="padding-container flex-align-left flex-col">
        {links.map(({ id, linkText, url }) => (
          <Link key={id} href={url} end>
            <a onClick={() => dispatch({ type: actioTypes.closeSidebar })}>
              {linkText} <br />
            </a>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default MobileMenu;
