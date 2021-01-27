import { useEffect, useState } from "react";

function useWidth() {
  const getWidth = () => {
    const { innerWidth } = window;
    return innerWidth;
  };

  const [width, setWidth] = useState(getWidth());
  useEffect(() => {
    const resizeHandler = () => {
      setWidth(getWidth());
    };
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return width;
}

export default useWidth;
