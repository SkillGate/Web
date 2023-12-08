import { motion } from "framer-motion";
import { FiDelete, FiMoon, FiSun } from "react-icons/fi";
import { BiBell, BiChevronDown, BiSearch, BiMenu } from "react-icons/bi";
import { CiLogin } from "react-icons/ci";
import { useUiContext } from "../../contexts/UiContext";
import { actioTypes } from "../../reducers/uiReducer";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { navLinks } from "../../data/links";
import useDarkMode from "../../helpers/useDarkMode";
import { imageUrl } from "../../constants";
import ActiveLink from "./ActiveLink";

const MainNavbar = () => {
  const [mode, toggleMode] = useDarkMode("JobIt-Next-theme-mode");
  const router = useRouter();

  const currentPath = router.pathname;
  console.log(currentPath);

  const { dispatch, isSidebarOpen } = useUiContext();

  const handleDropdown = () => {
    dispatch({ type: actioTypes.toggleDropdown });
  };

  const handleClose = (e) => {
    if (!e.target.classList.contains("dropdown-btn")) {
      dispatch({ type: actioTypes.closeDropdown });
    }
    if (!e.target.classList.contains("notification-btn")) {
      dispatch({ type: actioTypes.closeNotifications });
    }
  };

  const handleCloseSidebar = (e) => {
    if (e.target.classList.contains("mobile-modal"))
      dispatch({ type: actioTypes.closeSidebar });
  };

  const logoUrl = imageUrl.logoDoubleColor;

  return (
    <div className="relative">
      <div
        className="fixed navbar w-full z-10 top-0 left-0 px-[2%]  md:px-[6%] flex-center-between py-[0.5rem] bg-white dark:bg-dark-card border-b dark:border-slate-800"
        onClick={handleClose}
      >
        <Link href="/">
          <a className="hidden md:block flex-shrink-0">
            <div className="image-wrapper">
              <Image
                src={logoUrl}
                alt="logo"
                layout="fill"
                className="!object-contain !h-10 !w-20 !relative bg-white rounded"
              />
            </div>
          </a>
        </Link>
        <Link href="/">
          <a className="md:hidden">
            <Image src={logoUrl} alt="logo" width={32} height={32} />
          </a>
        </Link>

        {/*-------------------------------------- Desktop Menu------------------------------------- */}
        <ul className="hidden md:flex-align-center space-x-3 lg:space-x-6">
          {navLinks.map(({ id, linkText, url }) => (
            <ActiveLink href={url} key={id}>
              {linkText}
            </ActiveLink>
          ))}
        </ul>

        {/*---------------------------------------- Mobile Menu------------------------------------- */}
        <div
          className={`mobile-modal fixed w-screen h-screen top-0 left-0 bg-black/50 z-10 opacity-0 pointer-events-none transition-a ${
            isSidebarOpen && "open"
          }`}
          onClick={handleCloseSidebar}
        >
          <ul
            className={`mobile-dialog absolute flex flex-col space-y-4 p-3 bg-white dark:bg-dark-card h-screen max-w-[300px] w-full -translate-x-[500px] transition-a ${
              isSidebarOpen && "open"
            }`}
          >
            <div className="flex-center-between border-b dark:border-slate-800">
              <p className="uppercase">menu</p>
              <div
                className="icon-box md:hidden"
                onClick={() => dispatch({ type: actioTypes.closeSidebar })}
              >
                <FiDelete />
              </div>
            </div>
            {navLinks.map(({ id, linkText, url }) => (
              <Link key={id} href={url} end>
                <a onClick={() => dispatch({ type: actioTypes.closeSidebar })}>
                  {linkText}
                </a>
              </Link>
            ))}
          </ul>
        </div>

        <div className="flex-align-center space-x-2">
          {/*----------------------------- Dark mode toggle-------------------------------------------------- */}
          <motion.div
            className="icon-box bg-slate-100 dark:bg-[#2b2b35] mr-2"
            onClick={toggleMode}
            whileTap={{ scale: 0.5 }}
          >
            {mode === "dark" ? <FiSun /> : <FiMoon />}
          </motion.div>
          <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-700"></div>

          <div className="pl-2">
            <Link href="/sign-in">
              <a
                className={`btn !p-2 md:!px-4 btn-primary-outline flex-align-center gap-x-2`}
              >
                <span>Sign In</span>
              </a>
            </Link>
          </div>

          <div>
            <Link href="/create-account">
              <a
                className={`btn !p-2 md:!px-4 btn-primary-light flex-align-center gap-x-2`}
              >
                <span>Register</span>
              </a>
            </Link>
          </div>

          {/*---------------------- Notifications toggle------------------------------------------------ */}
          {/* <div
          className={`icon-box !opacity-100 relative notification-btn ${
            showSearchBar && "!hidden"
          }`}
          onClick={handleNotifications}
        >
          <motion.div className="relative" whileTap={{ scale: 0.5 }}>
            <BiBell className="notification-btn text-muted" />
            <div className="absolute w-2 h-2 bg-primary top-0 right-0 rounded-full notification-btn"></div>
          </motion.div>
          <Notifications />
        </div> */}

          {/*----------------------------- search Bar----------------------------------------------------- */}
          {/* <form onSubmit={handleSearch}>
          <div
            className={`flex-align-center relative h-9 w-9 transition-a  border-slate-300 dark:border-hover-color rounded-full ${
              showSearchBar && "!w-[150px] md:!w-[200px] border"
            }`}
          >
            <input
              type="search"
              className={`outline-none border-none h-0 w-0 bg-transparent ${
                showSearchBar && "!w-full !h-full px-4"
              }`}
              placeholder="search by title or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <span
              className="w-9 h-9 grid place-items-center hover:bg-slate-100 sm:cursor-pointer dark:hover:bg-hover-color rounded-full flex-shrink-0"
              onClick={() => setShowSearchBar(!showSearchBar)}
            >
              <BiSearch className="text-muted" />
            </span>
          </div>
        </form> */}

          {/*------------------------------- Profile Dropdown toggle-------------------------------------------- */}
          {/* <div
          className="dropdown-btn flex-align-center space-x-1  md:pl-4 flex-shrink-0 relative"
          onClick={handleDropdown}
        >
          <motion.img
            src="/images/avatar.png"
            alt=""
            className="w-8 h-8 rounded-full sm:cursor-pointer dropdown-btn"
            whileTap={{ scale: 0.5 }}
          />
          <BiChevronDown className="dropdown-btn" />
          <Dropdown />
        </div> */}

          {/*------------------------------- Mobile Menu Toogle------------------------- */}
          <motion.div
            className="icon-box md:hidden"
            onClick={() => dispatch({ type: actioTypes.openSidebar })}
            whileTap={{ scale: 0.5 }}
          >
            <BiMenu />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
