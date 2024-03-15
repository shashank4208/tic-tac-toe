import React, { createContext, useEffect, useState } from "react";

const GameContext = createContext();

function GameProvider({ children }) {
  const [gameData, setGameData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("gameData"));
    if (data) {
      setGameData(JSON.parse(localStorage.getItem("gameData")));
      setShowModal(false)
    }
    else{
      setShowModal(true)
    }
  }, []);

  const loadData=()=>{
    console.log(JSON.parse(localStorage.getItem("gameData")))
    setGameData(JSON.parse(localStorage.getItem("gameData")))
  }

  return (
    <GameContext.Provider
      value={{
        gameData,
        setGameData,
        showModal,
        setShowModal,
        loadData
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export { GameContext, GameProvider };
