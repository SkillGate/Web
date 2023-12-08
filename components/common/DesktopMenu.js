import React from "react";
import ActiveLink from "./ActiveLink";

const DesktopMenu = ({links}) => {
  return (
    <div>
      <ul className="hidden md:flex-align-center space-x-3 lg:space-x-6">
        {links.map(({ id, linkText, url }) => (
          <ActiveLink href={url} key={id}>
            {linkText}
          </ActiveLink>
        ))}
      </ul>
    </div>
  );
};

export default DesktopMenu;
