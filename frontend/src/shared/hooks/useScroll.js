import { useEffect, useState } from "react";
import { throttle } from "lodash";

const useScrollEvent = (domElement) => {
  const [element, setElement] = useState(null);
  useEffect(() => {
    setElement(document.getElementById(domElement));
    return () => {
      setElement(null);
    };
  }, [domElement]);
  const trackScrolling = () => {
    if (isBottom(element)) {
      console.log("SCROLL DOWn");
      document.removeEventListener("scroll", throttledFunction);
    }
  };
  const throttledFunction = throttle(trackScrolling, 100);
  useEffect(() => {
    document.addEventListener("scroll", throttledFunction, { passive: true });
    return () => {
      document.removeEventListener("scroll", throttledFunction);
    };
  }, [element, throttledFunction]);

  const isBottom = (el) => {
    if (el) {
      return el.getBoundingClientRect().bottom <= window.innerHeight + 100;
    }
  };
};

export default useScrollEvent;
