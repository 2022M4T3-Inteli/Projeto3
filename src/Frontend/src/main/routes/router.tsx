import React, { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, Acess } from '../../presentation/pages'

const Router: React.FC = () => {
  if(!localStorage.getItem("logged")) {
    localStorage.setItem("logged", "false")
  }

  return (
    <BrowserRouter>
      <Routes>
        {
          localStorage.getItem("logged") == 'true' ? <Route path='/*' element={<Home />} /> :
            <Route path='/*' element={<Acess />} />
        }
      </Routes>
    </BrowserRouter>
  )
}

export default Router