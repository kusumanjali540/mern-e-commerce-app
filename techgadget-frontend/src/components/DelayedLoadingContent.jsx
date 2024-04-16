import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

const DelayLoadingContent = ({ children, className }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100000000000000000); // Simulate 5 seconds loading time
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={className}>
      {isLoading ? <Skeleton height="100%" /> : children}
    </div>
  );
};

export default DelayLoadingContent;
