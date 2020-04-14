import React from "react";
import cn from "classnames";
import "./style.scss";
import { tileColorModifier } from "..";
import { GameTileType } from "game";

interface Props {
  type: GameTileType;
  className?: string;
  onClick?(): void;
  isSelected?: boolean;
}

export const Tile: React.FC<Omit<Props, "type">> = ({
  className,
  isSelected,
  ...props
}) => {
  return (
    <div
      className={cn("Tile", isSelected && "Tile--selected", className)}
      {...props}
    />
  );
};

// empty slot for any tile type
export const TileEmptySlot: React.FC<Omit<Props, "type">> = ({
  className,
  ...props
}) => {
  return <Tile className={cn("Tile--empty-slot", className)} {...props} />;
};

// actual tile
export const TileFull: React.FC<Props> = ({ type, className, ...props }) => {
  return (
    <Tile
      className={cn(
        "Tile--full",
        `Tile--${tileColorModifier[type]}`,
        className
      )}
      {...props}
    />
  );
};

// empty slot for specific tile type
export const TileTypeSlot: React.FC<Props> = ({
  type,
  className,
  ...props
}) => {
  return (
    <Tile
      className={cn(
        "Tile--slot",
        `Tile--${tileColorModifier[type]}`,
        className
      )}
      {...props}
    />
  );
};
