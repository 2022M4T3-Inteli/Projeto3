import React from 'react'
import './navbar.scss'

import HomeIcon from '@mui/icons-material/Home'
// import LocationOnIcon from '@mui/icons-material/LocationOn'
import TrackChangesIcon from '@mui/icons-material/TrackChanges'
import HistoryIcon from '@mui/icons-material/History'
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote'
import SettingsIcon from '@mui/icons-material/Settings'
import { Link } from 'react-router-dom'

const Navbar: React.FC = () => {
  const goTo: Function = (url: string) => {
    window.location.href = url
  }

  const items = [
    {
      name: 'Home',
      url: '/',
      icon: <HomeIcon />
    },
    {
      name: 'Location',
      url: '/location',
      icon: <TrackChangesIcon />
    },
    {
      name: 'History',
      url: '/history',
      icon: <HistoryIcon />
    },
    {
      name: 'Tags',
      url: '/tags',
      icon: <SettingsRemoteIcon />
    }
  ]
  return (
    <div id="navbar">
      <div className="itemsContainer">
        {
          items.map((item, index) => {
            return (
              <Link key={`item-${index}`} to={item.url}>
                <div className="item">
                  {item.icon}
                </div>
              </Link>
            )
          })
        }
      </div>
      <div className="settingsContainer">
        <Link to="/settings">
          <div className="item">
            <SettingsIcon />
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar