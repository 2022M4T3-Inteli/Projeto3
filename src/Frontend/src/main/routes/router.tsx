import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, Login} from '../../presentation/pages'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/location' element={<Home />}/>
        <Route path='/history' element={<Home />}/>
        <Route path='/tags' element={<Home />}/>
        <Route path='/settings' element={<Home />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Router