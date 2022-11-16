import React, { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from "react-router-dom"
import { Header, Navbar } from '../../components'
import './home.scss'

import { Location, CategoriesList, CategoriesAdd, CategoriesEdit, TagsList, TagsAdd, TagsEdit } from '../../../presentation/pages'

const verifyPage: Function = () => {
  let path = String(useLocation().pathname)
  
  if (path.includes("/history")) {
    return 1
  }
  else if (path.includes("/categories")) {
    return 2
  }
  else if (path.includes("/tags")) {
    return 3
  }
  else if (path.includes("/configuration")) {
    return 5
  }
  else {
    return 0
  }
}

const Home: React.FC = () => {
  const [actualTag, setActualTag] = useState(-1)
  const [actualPage, setActualPage] = useState(verifyPage())

  const props: any = {
    changeTag: (index: number) => setActualTag(index),
    changePage: (index: number) => setActualPage(index),
    actualTag: actualTag,
    actualPage: actualPage
  }


  return (
    <div id="home" >
      <Header />
      <Navbar props={props} />

      <div className="container">
        <Routes>
          <Route path='/' element={<Location props={props} />} />
          <Route path='history' element={<Location props={props} />} />
          <Route path='categories' element={<CategoriesList />} />
          <Route path='categories/add' element={<CategoriesAdd />} />
          <Route path='categories/edit' element={<CategoriesEdit />} />
          <Route path='tags' element={<TagsList props={props} />} />
          <Route path='tags/add' element={<TagsAdd />} />
          <Route path='tags/edit' element={<TagsEdit />} />
          <Route path='settings' element={<Location props={props} />} />
        </Routes>
      </div>
    </div >
  )
}

export default Home