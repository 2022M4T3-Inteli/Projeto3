import React from 'react'
import './navbar.scss'

import HomeIcon from '@mui/icons-material/Home'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import HistoryIcon from '@mui/icons-material/History'
// import ReorderIcon from '@mui/icons-material/Reorder'
// import SubjectIcon from '@mui/icons-material/Subject'
import SpeakerPhoneIcon from '@mui/icons-material/SpeakerPhone'
// import DockIcon from '@mui/icons-material/Dock'
// import DvrIcon from '@mui/icons-material/Dvr'
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
      icon: <LocationOnIcon />
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
              <div onClick={() => goTo(item.url)} className="item">
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