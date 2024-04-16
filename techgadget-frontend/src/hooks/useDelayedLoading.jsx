import { useEffect, useState } from "react";

const useDelayedLoading = (delay) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return [isLoading];
};

export default useDelayedLoading;
