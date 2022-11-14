import React, { useState } from 'react'
import { Route, Routes } from "react-router-dom"
import { Header, Navbar } from '../../components'
import './home.scss'

import { Location, CategoriesList, CategoriesAdd, CategoriesEdit } from '../../../presentation/pages'

const Home: React.FC = () => {

  return (
    <div id="home">
      <Header />
      <Navbar />

      <Routes>
        <Route path='/' element={<Location />} />
        <Route path='history' element={<Location />} />
        <Route path='categories' element={<CategoriesList />} />
        <Route path='categories/add' element={<CategoriesAdd />} />
        <Route path='categories/edit' element={<CategoriesEdit />} />
        <Route path='tags' element={<Location />} />
        <Route path='settings' element={<Location />} />
      </Routes>
    </div>
  )
}

export default Home