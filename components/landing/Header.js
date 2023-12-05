import Image from "next/image";
import { LuFileSearch } from "react-icons/lu";

const Header = () => {
  return (
    <div className="relative">
      <header className="w-full z-40 bg-primary-light">
        <div className="max-w-[1440px] mx-auto sm:px-16 px-6 py-3 bg-transparent text-white flex flex-row place-content-between">
          <div>
            <LuFileSearch />
            Bitumen and
            <span className="text-secondary font-bold">
              {" "}
              Bituminous products
            </span>
          </div>
          <div className="flex flex-row gap-6 cursor-pointer">
            <div className="flex flex-row">
              <Image
                src="https://res.cloudinary.com/midefulness/image/upload/v1700055737/Pelican%20Holdings/values/phone-call_1_kzxgvb.png"
                alt="menu"
                width={24}
                height={24}
                className="inline-block mx-2"
                // className="inline-block cursor-pointer lg:hidden"
              />
              <a href="tel:+94766269150" className="hover:text-secondary">
                (+94)76 626 9150
              </a>
            </div>
            <div className="flex flex-row">
              <Image
                src="https://res.cloudinary.com/midefulness/image/upload/v1699882936/Pelican%20Holdings/contactUs/mail_wksglz.png"
                alt="menu"
                width={24}
                height={24}
                className="inline-block mx-2"
                // className="inline-block cursor-pointer lg:hidden"
              />
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
