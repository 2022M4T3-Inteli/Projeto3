import React from 'react'
import './navbar.scss'

import HomeIcon from '@mui/icons-material/Home'
// import LocationOnIcon from '@mui/icons-material/LocationOn'
import TrackChangesIcon from '@mui/icons-material/TrackChanges'
import HistoryIcon from '@mui/icons-material/History'
import SettingsRemoteIcon from '@mui/icons-material/SettingsRemote'
import SettingsIcon from '@mui/icons-material/Settings'

const Navbar: React.FC = () => {
  const goTo: Function = (url: string) => {
    window.location.href = url
  }

  const items = [
    {
      name: 'Home',
      url: '/home',
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
              <div key={`item-${index}`} onClick={() => goTo(item.url)} className="item">
                {item.icon}
              </div>
            )
          })
        }
      </div>
      <div className="settingsContainer">
        <div onClick={() => goTo('/settings')} className="item">
          <SettingsIcon />
        </div>
      </div>
    </div>
  )
}

export default Navbar