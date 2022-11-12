import React, { useState } from 'react'
import { Header, Navbar } from '../../components'
import './location.scss'
;
import BatteryCharging20Icon from '@mui/icons-material/BatteryCharging20'
import BatteryCharging50Icon from '@mui/icons-material/BatteryCharging50'
import BatteryCharging80Icon from '@mui/icons-material/BatteryCharging80'
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';


type TagType = {
  name: string;
  battery: any
}

const Location: React.FC = () => {
  const [active, setActive] = useState(-1)
  const tags: TagType[] = [
    {
      name: "Tag 1",
      battery: <BatteryCharging50Icon className='icon' />
    },
    {
      name: "Tag 2",
      battery: <BatteryChargingFullIcon className='icon' />

    },
    {
      name: "Tag 3",
      battery: <BatteryCharging20Icon className='icon' />
    },
    {
      name: "Tag 4",
      battery: <BatteryCharging80Icon className='icon' />
    },
    {
      name: "Tag 5",
      battery: <BatteryCharging80Icon className='icon' />
    },
    {
      name: "Tag 3",
      battery: <BatteryCharging20Icon className='icon' />
    },
    {
      name: "Tag 4",
      battery: <BatteryCharging80Icon className='icon' />
    },
    {
      name: "Tag 5",
      battery: <BatteryCharging80Icon className='icon' />
    }
  ]

  const handleActive: Function = (index: number) => {
    if (index !== active) {
      setTimeout(() => setActive(index), 80)
      setTimeout(() => document.getElementsByClassName("rightSide")[0].scrollTop = 0, 200)
    }

    else {
      setTimeout(() => setActive(-1), 80)
      setTimeout(() => document.getElementsByClassName("rightSide")[0].scrollTop = 0, 200)
    }
  }

  const showTags: Function = () => {
    let content: any = []

    if (active !== -1) {
      content.push(
        <div
          onClick={() => handleActive(active)}
          className={'item active'}
        >
          <div className="name">
            {tags[active].name}
          </div>
          {
            tags[active].battery
          }
        </div>
      )
    }

    tags.map((tag: TagType, index) => {
      if (index != active) {
        content.push(
          <div
            onClick={() => handleActive(index)}
            className={index === active ? 'item active' : 'item'}
          >
            <div className="name">
              {tag.name}
            </div>
            {
              tag.battery
            }
          </div>
        )
      }
    })

    return content
  }

  return (
    <div id="location">
      <Header />
      <Navbar />

      <div className="container">
        <div className="row filter">
          Filtro
        </div>
        <div className="row">
          <div className="col leftSide">
            Visualização
          </div>
          <div className="col rightSide">

            {
              showTags()
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Location