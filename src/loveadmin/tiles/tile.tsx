import { Button, Tooltip } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useFavourites } from "../../components/favourites-context";

export type TileProps = {
  title: string;
  link: string;
  colour?: "primary" | "secondary" | "neutral";
  icon?: React.ReactNode;
  tileIconClassName?: string;
  parentLabel?: string;
  showParentLabel?: boolean;
  stack?: boolean;
};

const Tile: React.FC<TileProps> = (props) => {
  let colourClassName = "";
  switch (props.colour) {
    case "primary":
      colourClassName =
        "bg-primary-500 shadow-md shadow-primary-700/10 ring-1 ring-inset ring-primary-900/5 text-white";
      break;
    case "secondary":
      colourClassName =
        "bg-brand-secondary shadow-md shadow-orange-700/10 ring-1 ring-inset ring-orange-900/5 text-white";
      break;
    case "neutral":
      colourClassName =
        "bg-neutral-200/50 shadow-md shadow-neutral-400/5 ring-1 ring-inset ring-neutral-600/5 text-neutral-900";
      break;
  }

  const { favouritedTiles, addFavourite, removeFavourite } = useFavourites();
  const isFavourited = favouritedTiles.some(
    (favTile) => favTile.title === props.title
  );

  const [tooltipVisible, setTooltipVisible] = useState(true);

  useEffect(() => {
    if (!tooltipVisible) {
      const timeoutId = setTimeout(() => {
        setTooltipVisible(true);
      }, 1000);
      return () => clearTimeout(timeoutId);
    }
  }, [tooltipVisible]);

  const handleFavouriteClick = () => {
    setTooltipVisible(false);
    if (isFavourited) {
      removeFavourite(props.title);
    } else {
      addFavourite(props);
    }
  };
  return (
    <div className="relative text-white rounded-xl group">
      <Link
        to={props.link ? props.link : "#"}
        className={`relative aspect-[4/3] h-full py-5 px-4 rounded-xl text-lg sm:text-xl font-medium flex flex-col justify-center items-center group no-underline ${
          props.stack ? "ring-4 ring-inset" : ""
        } ${
          props.stack && props.colour === "primary" ? "ring-primary-600/50" : ""
        } ${
          props.stack && props.colour === "secondary"
            ? "ring-orange-600/50"
            : ""
        } ${colourClassName}`}
      >
        {props.icon && (
          <div
            className={`[&>svg]:w-16 [&>svg]:h-16 mb-1 -mt-2 transition-all duration-300 group-hover:opacity-100 [&:not(.opacity-100)]:opacity-80 group-hover:scale-110 ${props.tileIconClassName}`}
          >
            {props.icon}
          </div>
        )}
        <div className="relative block text-center font-display w-fit">
          <span
            className={`${
              props.colour === "neutral"
                ? "from-black/90 to-black/90"
                : "from-white/90 to-white/90"
            } bg-gradient-to-r bg-[length:0%_2px] duration-300 transition-all group-hover:bg-[length:100%_2px] bg-no-repeat bg-left-bottom pb-1`}
          >
            {props.title}
          </span>
        </div>
        {props.parentLabel && props.showParentLabel && (
          <div className="absolute top-0 left-0 text-xs text-white rounded-tl-xl rounded-br-md px-2.5 py-1.5 bg-black/[0.08]">
            {props.parentLabel}
          </div>
        )}
      </Link>
      <Tooltip
        title={isFavourited ? "Remove from favourites" : "Add to favourites"}
        overlayClassName={tooltipVisible ? "" : "opacity-0 pointer-events-none"}
      >
        <Button
          onClick={handleFavouriteClick}
          type="text"
          className={`absolute rounded-lg top-1.5 right-1.5 hover:bg-transparent 
          ${props.colour === "neutral" ? "text-title" : "text-white"}
          ${
            isFavourited
              ? "opacity-100 hover:opacity-80"
              : "opacity-0 group-hover:opacity-80 group-hover:hover:opacity-100"
          }`}
          icon={
            <svg
              width="24"
              height="24"
              fill={
                isFavourited
                  ? props.colour === "neutral"
                    ? "black"
                    : "white"
                  : "none"
              }
              viewBox="0 0 24 24"
              className="w-7 h-7"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.75"
                d="M12 4.75l1.75 5.5h5.5l-4.5 3.5 1.5 5.5-4.25-3.5-4.25 3.5 1.5-5.5-4.5-3.5h5.5L12 4.75z"
              ></path>
            </svg>
          }
        ></Button>
      </Tooltip>
    </div>
  );
};

export default Tile;
