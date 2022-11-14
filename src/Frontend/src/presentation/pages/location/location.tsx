import React, { useState } from 'react'
import { Header, Navbar } from '../../components'
import './location.scss'
  ;
import BatteryCharging20Icon from '@mui/icons-material/BatteryCharging20'
import BatteryCharging50Icon from '@mui/icons-material/BatteryCharging50'
import BatteryCharging80Icon from '@mui/icons-material/BatteryCharging80'
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';


type TagType = {
  id: number;
  macAdress: string;
  name: string;
  battery: any;
  isMoving: boolean
  position: [number, number]
}

const batteryLevel: Function = (level: number) => {
  let type = 0
  let difference = Math.abs(20 - level)

  if (Math.abs(50 - level) < difference) {
    difference = Math.abs(50 - level)
    type = 1
  }
  if (Math.abs(80 - level) < difference) {
    difference = Math.abs(80 - level)
    type = 2
  }
  if (Math.abs(100 - level) < difference) {
    difference = Math.abs(100 - level)
    type = 3
  }

  console.log(type, level, difference)

  switch (type) {
    case 0:
      return <BatteryCharging20Icon className='icon low' />
    case 1:
      return <BatteryCharging50Icon className='icon' />
    case 2:
      return <BatteryCharging80Icon className='icon' />
    case 3:
      return <BatteryChargingFullIcon className='icon' />
  }
}

const Location: React.FC = () => {
  const [active, setActive] = useState(-1)
  const tags: TagType[] = [
    {
      id: 0,
      macAdress: 'abc',
      name: "Objeto 1",
      battery: batteryLevel(28),
      isMoving: true,
      position: [100, 250]
    },
    {
      id: 1,
      macAdress: 'abc',
      name: "Objeto 2",
      battery: batteryLevel(50),
      isMoving: true,
      position: [100, 350]
    },
    {
      id: 2,
      macAdress: 'abc',
      name: "Objeto 3",
      battery: batteryLevel(72),
      isMoving: false,
      position: [50, 450]
    },
    {
      id: 3,
      macAdress: 'abc',
      name: "Objeto 4",
      battery: batteryLevel(89),
      isMoving: true,
      position: [175, 600]
    },
    {
      id: 4,
      macAdress: 'abc',
      name: "Objeto 5",
      battery: batteryLevel(10),
      isMoving: false,
      position: [200, 250]
    },
    {
      id: 5,
      macAdress: 'abc',
      name: "Objeto 6",
      battery: batteryLevel(0),
      isMoving: true,
      position: [120, 520]
    },
    {
      id: 6,
      macAdress: 'abc',
      name: "Objeto 7",
      battery: batteryLevel(100),
      isMoving: true,
      position: [300, 450]
    },
    {
      id: 7,
      macAdress: 'abc',
      name: "Objeto 8",
      battery: batteryLevel(45),
      isMoving: false,
      position: [300, 150]
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

  const showTag: Function = (tag: any, index: number) => {
    if (active !== -1) {
      if (index === active) {
        return (
          <div
            onClick={() => setActive(index)}
            className={`tag ${tag.isMoving ? 'active' : ''}`}
            style={
              {
                top: `${tag.position[0]}px`,
                left: `${tag.position[1]}px`
              }}>
          </div>
        )
      }
      else {
        return (
          <div
            onClick={() => setActive(index)}
            className={`tag outFocus ${tag.isMoving ? 'active' : ''}`}
            style={
              {
                top: `${tag.position[0]}px`,
                left: `${tag.position[1]}px`
              }}>
          </div>
        )
      }
    }
    else {
      return (
        <div
          onClick={() => setActive(index)}
          className={`tag ${tag.isMoving ? 'active' : ''}`}
          style={
            {
              top: `${tag.position[0]}px`,
              left: `${tag.position[1]}px`
            }}>
        </div>
      )
    }
  }

  const showTags: Function = () => {
    let content: any = []

    if (active !== -1) {
      content.push(
        <div
          onClick={() => handleActive(active)}
          className={`item active`}
        >
          {
            tags[active].isMoving ? <DirectionsRunIcon className='runningIcon' /> : ''
          }
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
            {
              tag.isMoving ? <DirectionsRunIcon className='runningIcon' /> : ''
            }
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
      <div className="container">
        <div className="row filter">
          Filtro
        </div>
        <div className="row">
          <div className="col leftSide">
            {
              tags.map((tag, index) => {
                return showTag(tag, index)
              })
            }
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