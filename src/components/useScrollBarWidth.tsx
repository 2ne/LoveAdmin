import { useEffect, useState } from "react";

const getScrollBarWidth = (): number => {
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";
  document.body.appendChild(outer);

  const inner = document.createElement("div");
  outer.appendChild(inner);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;

  if (outer.parentNode) {
    outer.parentNode.removeChild(outer);
  }

  return scrollbarWidth;
};

const useScrollBarWidth = (): number => {
  const [scrollbarWidth, setScrollbarWidth] = useState(0);

  useEffect(() => {
    const width = getScrollBarWidth();
    setScrollbarWidth(width);
  }, []);

  return scrollbarWidth;
};

export default useScrollBarWidth;
