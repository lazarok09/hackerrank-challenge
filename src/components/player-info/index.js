import React from "react";
import players1 from "../../players.json";
import { getNameSeparetedWithDashs } from "../team-selection";
export default function PlayerDetail({ close, i, addPlayer, selectedPlayers }) {
  const [players] = React.useState([...players1]);
  const player = players[i];

  const { battingSkill, bowlingSkill, fieldingSkill, name, type } = player;
  return (
    //Style fixed to center
    <div
      className="card outlined mt-0"
      style={{
        position: "fixed",
        left: "50%",
        transform: "translateX(-50%)",
        padding: "20px",
        width: "500px",
        top: "30%",
      }}
      data-testid={`player-${getNameSeparetedWithDashs(name)}-details`}
    >
      <h1 className="card-title" style={{ textAlign: "center" }}>
        Player Detail
      </h1>
      <p>
        <strong>Name:</strong>{" "}
        <span
          data-testid={`player-detail-${getNameSeparetedWithDashs(name)}-name`}
        >
          {name}
        </span>
      </p>
      <p>
        <strong>Type:</strong>{" "}
        <span
          data-testid={`player-detail-${getNameSeparetedWithDashs(name)}-type`}
        >
          {type}
        </span>
      </p>
      <p>
        <strong>Batting:</strong>{" "}
        <span
          data-testid={`player-detail-${getNameSeparetedWithDashs(
            name
          )}-batting`}
        >
          {battingSkill}
        </span>
      </p>
      <p>
        <strong>Bowling:</strong>{" "}
        <span
          data-testid={`player-detail-${getNameSeparetedWithDashs(
            name
          )}-bowling`}
        >
          {bowlingSkill}
        </span>
      </p>
      <button
        disabled={selectedPlayers.find((player) => player.name === name)}
        onClick={() => addPlayer(i)}
        data-testid={`player-detail-${getNameSeparetedWithDashs(name)}-add`}
      >
        Select
      </button>
      <button
        onClick={close}
        className="danger"
        data-testid={`player-detail-${getNameSeparetedWithDashs(name)}-close`}
      >
        Close
      </button>
    </div>
  );
}
