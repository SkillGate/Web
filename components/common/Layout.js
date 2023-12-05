import { useState, useEffect } from "react";
import { useUiContext } from "../../contexts/UiContext";
import { actioTypes } from "../../reducers/uiReducer";
import Footer from "./Footer";
import Loader from "./Loader";
import Meta from "./Meta";
import Navbar from "./Navbar";
import BackToTopButton from "./BackToTopButton";
import MainNavbar from "./../landing/Navbar";
import { useRouter } from "next/router";
import Header from "../landing/Header";

const Layout = ({ children }) => {
  const { dispatch } = useUiContext();
  const [showButton, setShowButton] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [userType, setUserType] = useState(null);

  const [currentPath, setCurrentPath] = useState("");

  const { user } = useUiContext();

  const handleCloseDropdown = (e) => {
    dispatch({ type: actioTypes.closeDropdown });
    dispatch({ type: actioTypes.closeNotifications });
  };

  const router = useRouter();

  useEffect(() => {
    // Get the current URL path
    const pathName = router.pathname;
    console.log(pathName);
    setCurrentPath(pathName);
    console.log(currentPath);

    console.log(user);
    user?.userType ? setUserType(user?.userType) : setUserType(null);

    // Other logic or side effects
  }, [router.pathname, user]);

  // Loader when page is loading
  if (typeof window !== "undefined") {
    window.addEventListener("load", () => {
      setShowLoader(false);
    });

    // Show/Hide scroll to top button
    window.addEventListener("scroll", () => {
      window.scrollY > 500 ? setShowButton(true) : setShowButton(false);
    });
  }

  return (
    <>
      <Meta />
      {showLoader && <Loader />}
      <BackToTopButton showButton={showButton} />
      {currentPath === "/" && (
        <div className="invisible sm:visible absolute sm:relative z-50">
          <Header />
        </div>
      )}
      {!(
        currentPath == "/sign-in" ||
        currentPath == "/create-account" ||
        currentPath == "/candidate-register" ||
        currentPath == "/employer-register"
      ) && (userType == null ? <MainNavbar /> : <Navbar />)}
      <div
        //  pt-20 px-[2%] md:px-[6%] 2xl:container
        className={`${
          !(
            currentPath === "/sign-in" ||
            currentPath === "/create-account" ||
            currentPath === "/candidate-register" ||
            currentPath === "/employer-register"
          )
            ? "2xl:mx-auto pt-18 min-h-screen"
            : ""
        } `}
        onClick={handleCloseDropdown}
      >
        {children}
      </div>
      {!(
        currentPath == "/sign-in" ||
        currentPath == "/create-account" ||
        currentPath == "/candidate-register" ||
        currentPath == "/employer-register"
      ) && <Footer />}
    </>
  );
};

export default Layout;
