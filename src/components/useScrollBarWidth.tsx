import { useEffect, useState } from "react";

const setCSSVariable = (name: string, value: string) => {
  document.documentElement.style.setProperty(name, value);
};

const getScrollBarWidth = (): number => {
  const outer = document.createElement("div");
  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";

  const inner = document.createElement("div");

  outer.appendChild(inner);
  document.body.appendChild(outer);

  const scrollbarWidth = outer.offsetWidth - inner.offsetWidth;
  document.body.removeChild(outer);

  return scrollbarWidth;
};

const useScrollBarWidth = (): number => {
  const [scrollbarWidth, setScrollbarWidth] = useState<number>(0);

  useEffect(() => {
    const width = getScrollBarWidth();
    setScrollbarWidth(width);
    setCSSVariable("--scrollbar-width", `${width}px`);
  }, []);

  return scrollbarWidth;
};

export default useScrollBarWidth;
