import cn from "classnames";
import classNames from "classnames";
import { tileColorModifier } from "..";

import YellowSvg from "assets/svg/tile-yellow.svg?react";
import BlueSvg from "assets/svg/tile-blue.svg?react";
import PinkSvg from "assets/svg/tile-pink.svg?react";
import PurpleSvg from "assets/svg/tile-purple.svg?react";
import GreenSvg from "assets/svg/tile-green.svg?react";
import BeginSvg from "assets/svg/tile-begin.svg?react";
import { GameTileType } from "../../../game/types";

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
      className={classNames(
        "w-[2.25em] h-[2.25em] flex items-center justify-center rounded-[.3125em] shrink-0",
        isSelected && "shadow-[0_0_0_.1875em_rgba(10,73,133,1)]",
        className
      )}
      {...props}
    />
  );
};

// empty slot for any tile type
export const TileEmptySlot: React.FC<Omit<Props, "type">> = ({
  className,
  ...props
}) => {
  return (
    <Tile
      className={classNames(
        "bg-[#f0f2f8] shadow-[inset_.125em_.125em_0_rgba(0,0,0,0.15),inset_-.125em_-.125em_0_rgba(255,255,255,0.35)]",
        className
      )}
      {...props}
    />
  );
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
      className={classNames(
        "shadow-[.125em_.125em_0_rgba(0,0,0,0.15)]",
        movable && "cursor-pointer hover:scale-[1.08]",
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
      className={classNames(
        "shadow-[inset_.1875em_.1875em_0_rgba(0,0,0,0.1)] scale-[0.8] [&>*]:opacity-20",
        className
      )}
      {...props}
    >
      <TileSvg />
    </Tile>
  );
};
