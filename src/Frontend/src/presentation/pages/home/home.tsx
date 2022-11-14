import React, { useState } from 'react'
import { Route, Routes } from "react-router-dom"
import { Header, Navbar } from '../../components'
import './home.scss'

import { Location, CategoriesList, CategoriesAdd, CategoriesEdit, TagsList, TagsAdd, TagsEdit } from '../../../presentation/pages'

const Home: React.FC = () => {

  return (
    <div id="home">
      <Header />
      <Navbar />

      <div className="container">
        <Routes>
          <Route path='/' element={<Location />} />
          <Route path='history' element={<Location />} />
          <Route path='categories' element={<CategoriesList />} />
          <Route path='categories/add' element={<CategoriesAdd />} />
          <Route path='categories/edit' element={<CategoriesEdit />} />
          <Route path='tags' element={<TagsList />} />
          <Route path='settings' element={<Location />} />
        </Routes>
      </div>
    </div>
  )
}

export default Home