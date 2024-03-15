// LoginPageModal.js
import React, { useContext, useState } from "react";
import { GameContext } from "../../context/GameContext";
import "./PlayerDetailsPage.css";

function LoginPage({ onClose }) {
  const { setGameData } = useContext(GameContext);
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const handleLogin = () => {
    if (player1 !== "" && player2 !== "" && player1 !== player2) {
      const defaultGameData = [
        {
          playerName: player1,
          wonGames: 0,
        },
        {
          playerName: player2,
          wonGames: 0,
        },
        {
          drawGames: 0,
        },
      ];
      localStorage.setItem("gameData", JSON.stringify(defaultGameData));
      setGameData(defaultGameData);
      onClose();
    } else {
      if(player1===player2){
        alert("Enter different player names");
      }
      else{
        alert("Enter Player Details");
      }
    }
  };

  return (
    <div className="loginPage">
      <div className="login-container">
        <p>Enter player details</p>
        <input
          className="userName"
          value={player1}
          placeholder="Enter player 1 name"
          onChange={(e) => setPlayer1(e.target.value)}
        />
        <input
          className="userName"
          value={player2}
          placeholder="Enter player 2 name"
          onChange={(e) => setPlayer2(e.target.value)}
        />
        <button type="submit" className="submit-btn" onClick={handleLogin}>Game Begins!</button>
      </div>
    </div>
  );
}

export default LoginPage;
