import Image from "next/image";

const PageNotFound = () => {
  useEffect(() => {
    const currentPathname = window.location.pathname;
    if (currentPathname == "/") {
      window.location.href = "/Web";
    }
  });
  return (
    <div className="flex-col min-h-screen text-center flex-center-center">
      <div className="-mt-20 image-wrapper">
        <Image
          src="https://res.cloudinary.com/midefulness/image/upload/v1702402732/SkillGate/404_nbvih3.png"
          alt="404 image"
          layout="fill"
          className="mx-auto !relative !object-contain !h-[350px] !w-[350px]"
        />
      </div>
      <h1 className="text-6xl font-bold opacity-50">Page Not Found!!</h1>
    </div>
  );
};

export default PageNotFound;
