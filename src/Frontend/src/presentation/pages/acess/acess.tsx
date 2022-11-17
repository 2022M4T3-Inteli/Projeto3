import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Login, Signup, Aproval } from '../../../presentation/pages'

import './acess.scss'
import Logo from '/src/assets/logo.png'

const Acess: React.FC = () => {
  const location = useLocation()
  return (
    <div id="acess">
      {
        location.pathname != '/aproval' ?
          <div className="banner">
            <img src={Logo} alt="" />
          </div> : ''
      }
      {/* <div className="right"> */}
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/aproval' element={<Aproval />} />
      </Routes>
      {/* </div> */}
    </div>
  )
}

export default Acess