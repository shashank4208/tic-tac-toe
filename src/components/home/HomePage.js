// HomePage.js

import React, { useContext, useState } from "react";
import { GameContext } from "../../context/GameContext";
import LoginPage from "../playerDetails/PlayerDetailsPage";
import "./HomePage.css";
import { checkWinner, checkDraw, handlePlayerMove } from "../TicTacToe";

function HomePage() {
  const { gameData, showModal, setShowModal, setGameData } =
    useContext(GameContext);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState("X");
  const [gameStatus, setGameStatus] = useState("");

  const handleMove = (position) => {
    if (!gameData[0].playerName || !gameData[1].playerName) {
      alert("Enter player details first!");
      return;
    }

    if (checkWinner(board) || checkDraw(board)) {
      return;
    }

    const newBoard = handlePlayerMove(board, position, currentPlayer);

    if (newBoard !== board) {
      setBoard(newBoard);
      const winner = checkWinner(newBoard);
      if (winner) {
        setGameStatus(handleWin(winner));
      } else if (checkDraw(newBoard)) {
        handleDraw();
      } else {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
    }
  };

  const handleWin = (winner) => {
    const updatedGameData = [...gameData];
    updatedGameData[winner === "X" ? 0 : 1].wonGames++;
    setGameData(updatedGameData);
    localStorage.setItem("gameData", JSON.stringify(updatedGameData));
    return `Player ${updatedGameData[winner === "X" ? 0 : 1].playerName} is the winner!`;
  };

  const handleDraw = () => {
    const updatedGameData = [...gameData];
    updatedGameData[2].drawGames++;
    setGameData(updatedGameData);
    setGameStatus("It's a draw!");
  };
  

  const handleResetBoard = () => {
    localStorage.removeItem("ticTacToeBoard");
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setGameStatus("")
  };

  const handleResetGame = () => {
    localStorage.removeItem("ticTacToeBoard");
    localStorage.removeItem("gameData");
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    setGameStatus("")
    window.location.reload();
  };

  return (
    <div className="home-page">
      <div className="game-board">
        {gameStatus && (
          <div className="winner-message">
            <p>{gameStatus}</p>
            <p>Please Clear board to continue the game or start new game</p>
          </div>
        )}
        {gameData.length > 0 && (
          <div className="score-board">
            <p className="score-card card1">
              {gameData[0].playerName} : {gameData[0].wonGames}
            </p>
            <p className="score-card card2">Draw : {gameData[2].drawGames}</p>
            <p className="score-card card3">
              {gameData[1].playerName} : {gameData[1].wonGames}
            </p>
          </div>
        )}
        <div className="board">
          {board.map((cell, index) => (
            <div key={index} className="cell" onClick={() => handleMove(index)}>
              {cell}
            </div>
          ))}
        </div>
        <div className="buttons">
          <button onClick={handleResetBoard} className="resetBoard">
            Clear Board
          </button>
          <button onClick={handleResetGame} className="resetGame">
            Start New Game
          </button>
        </div>
      </div>
      {showModal && <LoginPage onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default HomePage;
