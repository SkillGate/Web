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

const Layout = ({ children }) => {
  const { dispatch } = useUiContext();
  const [showButton, setShowButton] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [userType, setUserType] = useState(null);

  const [currentPath, setCurrentPath] = useState("");

  const { loginUser } = useUiContext();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUserData = localStorage.getItem('userData');
    if (storedUserData) {
      setUser(prevUser => {
        const userData = JSON.parse(storedUserData);
        // Here you can perform any additional logic before updating the state
        return userData;
      });
      // loginAndPersistUser(JSON.parse(storedUserData));
    }
  }, [loginUser]);

  const handleCloseDropdown = (e) => {
    dispatch({ type: actioTypes.closeDropdown });
    dispatch({ type: actioTypes.closeNotifications });
  };

  const router = useRouter();

  useEffect(() => {
    // Get the current URL path
    const pathName = router.pathname;
    // console.log(pathName);
    setCurrentPath(pathName);
    // console.log(currentPath);

    // console.log(user);
    user?.userType ? setUserType(user?.userType) : setUserType(null);

    // Other logic or side effects
  }, [currentPath, router.pathname, user]);

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
      <div className="relative">
        {!(
          currentPath === "/sign-in" ||
          currentPath === "/create-account" ||
          currentPath === "/candidate-register" ||
          currentPath === "/employer-register"
        ) && (userType == null ? <MainNavbar /> : <Navbar />)}
      </div>

      <div
        //  pt-20 px-[2%] md:px-[6%] 2xl:container
        className={`${
          !(
            currentPath === "/sign-in" ||
            currentPath === "/create-account" ||
            currentPath === "/candidate-register" ||
            currentPath === "/employer-register" ||
            currentPath === "/"
          )
            ? "px-[2%] md:px-[6%] 2xl:container 2xl:mx-auto pt-20 min-h-screen"
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
