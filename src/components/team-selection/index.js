import React from "react";

import PlayerDetail from "../player-info";
import playersList from "../../players.json";
export const getNameSeparetedWithDashs = (name) => {
  return name.split(" ").join("-");
};

const PlayerTR = ({
  name,
  role,
  action,
  index,
  showplayerDetailsCard,
  handleActionClick,
  selectedPlayers,
}) => {
  return (
    <tr data-testid={`available-${getNameSeparetedWithDashs(name)}-row`}>
      <td
        data-testid={`available-${getNameSeparetedWithDashs(name)}-name`}
        onClick={() => showplayerDetailsCard(index)}
      >
        {name}
      </td>
      <td onClick={() => showplayerDetailsCard(index)}>{role}</td>
      <td>
        <button
          data-testid={`available-${getNameSeparetedWithDashs(name)}-select`}
          onClick={() => handleActionClick(index)}
          disabled={selectedPlayers.find((player) => player.name === name)}
          className="btn btn-primary text"
        >
          {action}
        </button>
      </td>
    </tr>
  );
};

export default function TeamSelection() {
  const [players] = React.useState([...playersList]);
  const [selectedPlayers, setSelectedPlayers] = React.useState([]);
  const [showPlayerDetail, setShowPlayerDetail] = React.useState(false);
  const [idx, setIdx] = React.useState(null);
  const [welcome, setWelcome] = React.useState(true);

  const addPlayer = (i) => {
    if (selectedPlayers.length >= 11) {
      return alert("Only 11 players are allowed in a team");
    }

    if (
      players[i].type === "Bowler" &&
      selectedPlayers.filter((player) => player.type === "Bowler").length >= 6
    ) {
      return alert("Bowlers can not be more than 6");
    }
    if (
      players[i].type === "Batsman" &&
      selectedPlayers.filter((player) => player.type === "Batsman").length >= 6
    ) {
      return alert("Batsmen can not be more than 6");
    }
    if (
      players[i].type === "AllRounder" &&
      selectedPlayers.filter((player) => player.type === "AllRounder").length >=
        4
    ) {
      return alert("All Rounders can not be more than 4");
    }

    setSelectedPlayers((previousSelectedPlayers) => [
      ...previousSelectedPlayers,
      players[i],
    ]);

    return;
  };

  const removePlayer = (index) => {
    setSelectedPlayers((previous) => previous.filter((name, i) => i !== index));
    return;
  };

  const showplayerDetailsCard = (i) => {
    setShowPlayerDetail(i);
    setIdx(i);
    return;
  };
  const handleActionClick = (i) => {
    setIdx(i);
    addPlayer(i);
    return;
  };

  const closeCard = () => {
    setShowPlayerDetail(false);
    return;
  };

  return (
    <div className="mt-50 layout-column justify-content-center align-items-center">
      <div style={{ display: "flex", width: "80%" }}>
        {Boolean(players[showPlayerDetail]) && (
          <PlayerDetail
            selectedPlayers={selectedPlayers}
            i={idx}
            close={() => closeCard()}
            index={1}
            addPlayer={(i) => addPlayer(i)}
          />
        )}
        <div
          className="card outlined mt-0"
          style={{
            width: "50%",
            marginRight: "10px",
            overflow: "scroll",
            height: "80vh",
          }}
        >
          <div className="card-text">
            <h4 style={{ textAlign: "center" }}>Available Players</h4>
            <table>
              <thead>
                <tr>
                  <th data-testid="available-players-name">Name</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody data-testid="available-players-table-body">
                {welcome && (
                  <tr>
                    <td
                      data-testid="selection-rules"
                      colSpan="3"
                      className="card pb-20"
                    >
                      <p
                        data-testid="close-welcome"
                        style={{ textAlign: "right" }}
                        onClick={() => setWelcome(false)}
                      >
                        X
                      </p>
                      <h3 style={{ textAlign: "center" }}>
                        <strong>Welcome to Team Selection</strong>
                      </h3>
                      11 players are required in a team <br />
                      3-6 batsmen and bowlers are allowed in a team
                      <br />
                      Only 1 Wicket Keeper required in a team
                      <br />
                      1-4 All Rounders are allowed in a team
                    </td>
                  </tr>
                )}

                {players.map((player, index) => {
                  return (
                    <PlayerTR
                      action={"Select"}
                      index={index}
                      name={player.name}
                      role={player.type}
                      showplayerDetailsCard={() => showplayerDetailsCard(index)}
                      handleActionClick={() => handleActionClick(index)} // TODO: what this does ?
                      selectedPlayers={selectedPlayers}
                      key={index}
                    />
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div
          className="card outlined mt-0"
          style={{
            width: "50%",
            marginRight: "10px",
            overflow: "scroll",
            height: "80vh",
          }}
        >
          <div className="card-text">
            <h4 style={{ textAlign: "center" }}>Selected Players</h4>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody data-testid="selected-players-table-body">
                {selectedPlayers.map((player, index) => {
                  return (
                    <tr
                      data-testid={`selected-${player.name
                        .split(" ")
                        .join("-")}-row`}
                      key={index}
                    >
                      <td>{player.name}</td>
                      <td>{player.type}</td>
                      <td>
                        <button
                          data-testid={`selected-${player.name
                            .split(" ")
                            .join("-")}-remove`}
                          onClick={() => removePlayer(index)}
                          className="btn danger text"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
