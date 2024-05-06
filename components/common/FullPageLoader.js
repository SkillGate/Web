import React, { useState, useEffect } from "react";

const FullPageLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Disable scrolling when loader is displayed
    if (loading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [loading]);

  return (
    loading && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-white bg-opacity-75 z-50">
        <div className="loader" />
      </div>
    )
  );
};

export default FullPageLoader;
