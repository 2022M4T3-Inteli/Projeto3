import React, { useState, useEffect } from 'react'
import { Route, Routes, useLocation } from "react-router-dom"
import { Header, Navbar } from '../../components'
import './home.scss'

import { Location, CategoriesList, CategoriesAdd, CategoriesEdit, TagsList, TagsAdd, TagsEdit } from '../../../presentation/pages'

const verifyPage: Function = () => {
  let path = String(useLocation().pathname)

  if (path.includes("/categories")) {
    return 1
  }
  else if (path.includes("/tags")) {
    return 2
  }
  else if (path.includes("/configuration")) {
    return 4
  }
  else {
    return 0
  }
}

const Home: React.FC = () => {
  const [actualTag, setActualTag] = useState(-1)
  const [actualPage, setActualPage] = useState(verifyPage())
  const [tags, setTags] = useState([])
  const [newTags, setNewTags] = useState([])
  const [categories, setCategories] = useState([])

  async function getTags() {
    await fetch("http://10.254.18.38:8000/api/tags", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .then((json) => {
        setTags(json.data)
      })
  }

  async function getNewTags() {
    await fetch("http://10.254.18.38:8000/api/tags/?name=&category=", {

      headers: {
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json())
      .then((json) => {
        console.log(json.data)
        setNewTags(json.data)
      })
  }

  async function getCategories() {
    await fetch("http://10.254.18.38:8000/api/category", {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .then((json) => {
        console.log('teste')
        setCategories(json.data)
      })
  }

  const props: any = {
    changeTag: (index: number) => setActualTag(index),
    changePage: (index: number) => setActualPage(index),
    actualTag: actualTag,
    actualPage: actualPage,
    tags: tags,
    getTags: getTags,
    newTags: newTags,
    getNewTags: getNewTags,
    categories: categories,
    getCategories: getCategories
  }

  useEffect(() => {
    if (tags.length <= 1) {
      getTags()
    }
    if (categories.length <= 1) {
      getCategories()
    }
    if (newTags.length <= 1) {
      getNewTags()
    }

    setInterval(() => {
      getTags()
      getCategories()
      getNewTags()
    }, 30000)
  }, [])

  return (
    <div id="home" >
      <Header />
      <Navbar props={props} />

      <div className="container">
        <Routes>
          <Route path='/' element={<Location props={props} />} />
          <Route path='categories' element={<CategoriesList props={props} />} />
          <Route path='categories/add' element={<CategoriesAdd props={props} />} />
          <Route path='categories/edit/:id' element={<CategoriesEdit props={props} />} />
          <Route path='tags' element={<TagsList props={props} />} />
          <Route path='tags/add' element={<TagsAdd props={props} />} />
          <Route path='tags/edit/:id' element={<TagsEdit props={props} />} />
          <Route path='settings' element={<Location props={props} />} />
        </Routes>
      </div>
    </div >
  )
}

export default Home