const getScrollBarWidth = (): void => {
  const outer = document.createElement("div");
  const inner = document.createElement("div");

  outer.style.visibility = "hidden";
  outer.style.overflow = "scroll";

  document.body.appendChild(outer).appendChild(inner);

  const width = outer.offsetWidth - inner.offsetWidth;
  document.body.removeChild(outer);

  document.documentElement.style.setProperty("--scrollbar-width", `${width}px`);

  if (width === 0) {
    document.documentElement.classList.add("scroll-overlay");
  }
};

export default getScrollBarWidth;
