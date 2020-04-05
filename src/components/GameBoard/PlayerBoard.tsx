import React from "react";
import { useBoardContext } from "./BoardContext";
import { tileColorModifier } from ".";
import cn from "classnames";
import times from "lodash/times";

export const PlayerBoard = () => {
  const { State, playerID, selectedTiles, pickTiles } = useBoardContext();

  const playerBoard = State.players[playerID];

  return (
    <div>
      <h4>Player board</h4>
      <div className="PlayerBoard">
        <div className="PlayerBoard__left">
          {playerBoard.leftSlots.map((slot, slotIndex) => {
            return (
              <div
                className="TemporarySlot"
                key={slotIndex}
                onClick={() => {
                  if (selectedTiles) {
                    pickTiles(
                      selectedTiles?.tiles,
                      selectedTiles?.groupId,
                      slotIndex
                    );
                  }
                }}
              >
                {slot
                  .slice()
                  .reverse()
                  .map((tile, index) => {
                    return tile ? (
                      <div
                        key={tile.id}
                        className={`TemporarySlot__tile Tile Tile--${
                          tileColorModifier[tile.type]
                        }`}
                      >
                        {tile.id}
                      </div>
                    ) : (
                      <div
                        key={`fill-${index}`}
                        className="TemporarySlot__tile Tile Tile--skeleton"
                      />
                    );
                  })}
              </div>
            );
          })}
        </div>

        <div className="PlayerBoard__right">
          {playerBoard.rightSlots.map((slotRow, rowIndex) => {
            return (
              <div className="SlotRow" key={rowIndex}>
                {slotRow.map((slot, slotIndex) => {
                  return (
                    <div
                      key={`${rowIndex}-${slotIndex}`}
                      className={cn(
                        "Tile",
                        `Tile--${tileColorModifier[slot.type]}`,
                        "SlotRow__tile",
                        {
                          "SlotRow__tile--filled": !!slot.tile
                        }
                      )}
                    >
                      {slot.tile?.id}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        <div
          className="PlayerBoard__minus-points"
          onClick={() => {
            if (selectedTiles) {
              pickTiles(
                selectedTiles?.tiles,
                selectedTiles?.groupId,
                "minus-points"
              );
            }
          }}
        >
          {times(7, index => {
            const tile = playerBoard.minusPoints[index];

            if (tile === "begin-tile") {
              return (
                <div
                  key="begin-tile"
                  className={cn(
                    "Tile",
                    "TemporarySlot__tile",
                    `Tile--type-begin`
                  )}
                >
                  B
                </div>
              );
            }

            return tile ? (
              <div
                key={tile.id}
                className={`TemporarySlot__tile Tile Tile--${
                  tileColorModifier[tile.type]
                }`}
              >
                {tile.id}
              </div>
            ) : (
              <div
                key={`fill-${index}`}
                className="TemporarySlot__tile Tile Tile--skeleton"
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
