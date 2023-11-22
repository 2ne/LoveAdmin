import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
} from "react";
import { TileProps } from "../loveadmin/tiles/tile";

interface FavouritesContextProps {
  favouritedTiles: TileProps[];
  addFavourite: (tile: TileProps) => void;
  removeFavourite: (title: string) => void;
}

const defaultFavouritesContext = {
  favouritedTiles: [],
  addFavourite: (tile: TileProps) => {
    throw new Error("addFavourite was called without being overridden");
  },
  removeFavourite: (title: string) => {
    throw new Error("removeFavourite was called without being overridden");
  },
};

const FavouritesContext = createContext<FavouritesContextProps>(
  defaultFavouritesContext
);

export const useFavourites = () => {
  const context = useContext(FavouritesContext);
  if (!context) {
    throw new Error("useFavourites must be used within a FavouritesProvider");
  }
  return context;
};

const FavouritesProvider: React.FC<{ children: ReactNode }> = React.memo(
  ({ children }) => {
    const [favouritedTiles, setFavouritedTiles] = useState<TileProps[]>([]);

    const addFavourite = useCallback((tile: TileProps) => {
      setFavouritedTiles((prev) => {
        if (!prev.some((t) => t.title === tile.title)) {
          return [...prev, tile];
        }
        return prev;
      });
    }, []);

    const removeFavourite = useCallback((title: string) => {
      setFavouritedTiles((prev) => prev.filter((t) => t.title !== title));
    }, []);

    const providerValue = useMemo(
      () => ({
        favouritedTiles,
        addFavourite,
        removeFavourite,
      }),
      [favouritedTiles, addFavourite, removeFavourite]
    );

    return (
      <FavouritesContext.Provider value={providerValue}>
        {children}
      </FavouritesContext.Provider>
    );
  }
);

export { FavouritesProvider };
