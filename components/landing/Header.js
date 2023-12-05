import { LuFileSearch } from "react-icons/lu";

const Header = () => {
  return (
    <div className="relative">
      <header className="w-full z-40 bg-primary-light">
        <div className="max-w-[1440px] mx-auto sm:px-16 px-6 py-2 bg-transparent text-white flex flex-row place-content-between">
          <div className="flex flex-row gap-6 cursor-pointer items-center">
            <LuFileSearch color="secondaryLightPurple" />
            <div>
              Bitumen and
              <span className="text-secondary font-bold">
                {" "}
                Bituminous products
              </span>
            </div>
          </div>
          <div className="flex flex-row gap-6 cursor-pointer">
            <div className="flex flex-row items-center gap-2">
              <LuFileSearch />
              <div>
                <a href="tel:+94766269150" className="hover:text-secondary">
                  (+94)76 626 9150
                </a>
              </div>
            </div>
            <div className="flex flex-row items-center gap-2">
              <LuFileSearch />
              <div className="hover:text-secondary">
                holdingspelican@gmail.com
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
