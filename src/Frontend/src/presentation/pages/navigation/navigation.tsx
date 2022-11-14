import React from 'react'
import { Link } from 'react-router-dom'
import './navigation.scss'
import HistoryIcon from '@mui/icons-material/History'
import CategoryIcon from '@mui/icons-material/Category'
import TrackChangesIcon from '@mui/icons-material/TrackChanges'
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote'

const Navigation: React.FC = () => {
  const goTo: Function = (url: string) => {
    window.location.href = url
  }

  return (
    <div id="navigation">
      <div className="container">
        <div className="row topSide">
          <div className="col">
            <p className='text'>Histórico</p>
            <HistoryIcon className="icon" />
          </div>
          <div className="col">
            <p className='text'>Categorias</p>
            <CategoryIcon className="icon" />
          </div>
        </div>
        <div className="row bottomSide">
          <Link to="/location" className="col location">
            <p className='text'>Localização</p>
            {/* <TrackChangesIcon className="icon" /> */}
          </Link>
          <div className="col">
            <p className='text'>Tags</p>
            <SettingsRemoteIcon className="icon" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navigation