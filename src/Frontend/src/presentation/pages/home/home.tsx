import React, { useState } from 'react'
import { Route, Routes } from "react-router-dom"
import { Header, Navbar } from '../../components'
import './home.scss'

import { Login, Signup, Aproval, Location, Navigation } from '../../../presentation/pages'

const Home: React.FC = () => {

  return (
    <div id="home">
      <Header />
      <Navbar />

      <Routes>
        <Route path='/' element={<Navigation />} />
        <Route path='location' element={<Location />} />
        <Route path='history' element={<Navigation />} />
        <Route path='tags' element={<Navigation />} />
        <Route path='settings' element={<Navigation />} />
      </Routes>
    </div>
  )
}

export default Home