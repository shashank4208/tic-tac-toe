import React, { useContext, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from '../components/home/HomePage'
import { GameContext } from '../context/GameContext'

function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
    </Routes>
  )
}

export default AppRoutes