import React from "react";
import cn from "classnames";
import "./style.scss";
import { tileColorModifier } from "..";
import { GameTileType } from "game";

import { ReactComponent as YellowSvg } from "assets/svg/tile-yellow.svg";
import { ReactComponent as BlueSvg } from "assets/svg/tile-blue.svg";
import { ReactComponent as PinkSvg } from "assets/svg/tile-pink.svg";
import { ReactComponent as PurpleSvg } from "assets/svg/tile-purple.svg";
import { ReactComponent as GreenSvg } from "assets/svg/tile-green.svg";
import { ReactComponent as BeginSvg } from "assets/svg/tile-begin.svg";

interface Props {
  type: GameTileType;
  className?: string;
  onClick?(): void;
  isSelected?: boolean;
}

const tileMap = {
  [GameTileType.A]: YellowSvg,
  [GameTileType.B]: BlueSvg,
  [GameTileType.C]: PurpleSvg,
  [GameTileType.D]: PinkSvg,
  [GameTileType.E]: GreenSvg,
  [GameTileType.BEGIN]: BeginSvg,
};

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
export const TileFull: React.FC<Props & { movable?: boolean }> = ({
  type,
  className,
  movable = false,
  ...props
}) => {
  const TileSvg = tileMap[type];

  return (
    <Tile
      className={cn(
        "Tile--full",
        `Tile--${tileColorModifier[type]}`,
        movable && "Tile--movable",
        className
      )}
      {...props}
    >
      <TileSvg />
    </Tile>
  );
};

// empty slot for specific tile type
export const TileTypeSlot: React.FC<Props> = ({
  type,
  className,
  ...props
}) => {
  const TileSvg = tileMap[type];
  return (
    <Tile
      className={cn(
        "Tile--slot",
        `Tile--${tileColorModifier[type]}`,
        className
      )}
      {...props}
    >
      <TileSvg />
    </Tile>
  );
};
