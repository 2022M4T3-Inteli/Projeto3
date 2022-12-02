import React, { useEffect, useState } from 'react'
import { Select, Tag } from 'antd'
import type { CustomTagProps } from 'rc-select/lib/BaseSelect'
import { Input, Button, Popover } from 'antd'
import { Header, Navbar } from '../../components'
import './location.scss'
  ;
import BatteryCharging20Icon from '@mui/icons-material/BatteryCharging20'
import BatteryCharging50Icon from '@mui/icons-material/BatteryCharging50'
import BatteryCharging80Icon from '@mui/icons-material/BatteryCharging80'
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import { stringify } from 'rc-field-form/es/useWatch'

type BeaconType = {
  id: number;
  macAddress: string;
  name: string;
  position: [number, number];
}

type TagType = {
  id: number;
  macAddress: string;
  name: string;
  category: string;
  battery: any;
  isMoving: boolean;
  lastPosition: [number, number];
}

type CategoryType = {
  id: number;
  name: string;
}

const sendStatus: Function = async (id: number, status: boolean) => {
  console.log(id)
  await fetch(`http://10.254.18.38:8000/api/tags/${id}`, {
    method: "PATCH",
    // mode: 'cors',
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify({ activated: status })
    // credentials: 'same-origin',
    // referrerPolicy: 'unsafe-url'
  }).then((response) => response.json())
    .then((json) => {
      console.log(json)
    })
}

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault()
    event.stopPropagation()
  };
  return (
    <Tag
      color={"lime"}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  )
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


const Location: any = (Parent: any) => {
  const [active, setActive] = useState(-1)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState([''])
  const [tags, setTags] = useState(Parent.props.tags)

  const [categories, setCategories] = useState(Parent.props.categories)

  const beacons: BeaconType[] = [
    {
      id: 0,
      macAddress: 'ada32',
      name: 'Beacon 1',
      position: [5, 5]
    },
    {
      id: 1,
      macAddress: 'ada32',
      name: 'Beacon 2',
      position: [5, 5]
    },
    {
      id: 0,
      macAddress: 'ada32',
      name: 'Beacon 3',
      position: [5, 50]
    },

  ]

  const tagExamples: TagType[] = [
    {
      id: 0,
      macAddress: 'abc',
      name: "Objeto 1",
      battery: batteryLevel(28),
      category: "Furadeiras",
      isMoving: true,
      lastPosition: [100, 250]
    }
  ]

  useEffect(() => {
    setTags(Parent.props.tags)
    setCategories(Parent.props.categories)
    console.log(tags)
  }, [Parent.props.tags, Parent.props.categories])

  useEffect(() => {
    setActive(Parent.props.actualTag)
  }, [Parent.props.actualTag])


  const handleActive: Function = (index: number) => {
    if (index !== active) {
      setTimeout(() => Parent.props.changeTag(index), 80)
      setTimeout(() => document.getElementsByClassName("rightSide")[0].scrollTop = 0, 200)
    }

    else {
      setTimeout(() => Parent.props.changeTag(-1), 80)
      setTimeout(() => document.getElementsByClassName("rightSide")[0].scrollTop = 0, 200)
    }
  }

  const handleSearch: Function = (value: string) => {
    setSearch(value)
    if (active != -1) {
      handleActive(-1)
    }
  }

  const handleFilter: Function = (value: string[]) => {
    if (active != -1) {
      handleActive(-1)
    }
    setFilter(value)
  }

  const showTag: Function = (tag: any, index: number) => {
    if (tag.name.toLowerCase().includes(search.toLowerCase()) && tag.name !== '') {
      if (filter.includes(tag.category) || !filter[0]) {
        if (active !== -1) {
          if (index === active) {
            return (
              // <Popover content={showInfo(index)} title={tag.name} trigger="focus">
              <div
                key={`tag-${tag.name}`}
                onClick={() => handleActive(index)}
                className={`tag ${tag.isMoving ? 'active' : ''}`}
                style={
                  {
                    top: `${tag.lastPosition[0]}%`,
                    left: `${tag.lastPosition[1]}%`
                  }}>
              </div>
              // </Popover>
            )
          }
          else {
            return (
              // <Popover content={showInfo(index)} title={tag.name} trigger="focus">
              <div
                key={`tag-location-${tag.name}`}
                onClick={() => handleActive(index)}
                className={`tag outFocus ${tag.isMoving ? 'active' : ''}`}
                style={
                  {
                    top: `${tag.lastPosition[0]}%`,
                    left: `${tag.lastPosition[1]}%`
                  }}>
              </div>
              // </Popover>
            )
          }
        }
        else {
          return (
            // <Popover content={showInfo(index)} title={tag.name} trigger="focus">
            <div
              key={`tag-location-${tag.name}`}
              onClick={() => handleActive(index)}
              className={`tag ${tag.isMoving ? 'active' : ''}`}
              style={
                {
                  top: `${tag.lastPosition[0]}%`,
                  left: `${tag.lastPosition[1]}%`
                }}>
            </div>
            // </Popover>
          )
        }
      }
    }
  }


  const [buttonActivated, setButtonActivated] = useState(false)

  const handleActivated: Function = (id: number) => {
    sendStatus(id, !buttonActivated)
    setButtonActivated(!buttonActivated)
  }

  const showBeacons: Function = () => {
    let content: any = []

    beacons.map((beacon, index) => {
      switch (index) {
        case 0:
          return (
            content.push(
              <div
                key={`beacon-${beacon.name}`}
                className={`beacon`}
                style={
                  {
                    top: `${beacon.position[0]}%`,
                    left: `${beacon.position[1]}%`
                  }}>
              </div>
            )
          )
        case 1:
          return (
            content.push(
              <div
                key={`beacon-${beacon.name}`}
                className={`beacon`}
                style={
                  {
                    top: `${beacon.position[0]}%`,
                    right: `${beacon.position[1]}%`
                  }}>
              </div>
            )
          )
        case 2:
          return (
            content.push(
              <div
                key={`beacon-${beacon.name}`}
                className={`beacon`}
                style={
                  {
                    bottom: `${beacon.position[0]}%`,
                    left: `${beacon.position[1]}%`
                  }}>
              </div>
            )
          )
      }
    })

    return content
  }

  const showInfo: Function = () => {
    if (active != -1) {
      return (
        <div
          className="info"
          style={
            {
              top: `${tags[active].lastPosition[0]}%`,
              left: `calc(${tags[active].lastPosition[1]}% + 60px)`
            }
          }>
          <div className="name">
            {tags[active].name}
          </div>
          <div onClick={() => handleActivated(tags[active]._id)} className='buttonContainer'>
            <div className={buttonActivated ? 'buttonActivated' : 'buttonDesactived'}>Acionar Tag</div>
          </div>
        </div>
      )
    }
  }

  const showTags: Function = () => {
    let content: any = []

    if (active !== -1 && tags[active].name.toLowerCase().includes(search.toLowerCase()) && tags[active].name !== '') {
      if (filter.includes(tags[active].category) || !filter[0]) {
        content.push(
          <div
            key={`tag-${tags[active].name}`}
            onClick={() => handleActive(active)}
            className={`item active`}
          >
            {
              tags[active].isMoving ? <DirectionsRunIcon className='runningIcon' /> : ''
            }
            <div className="name">
              {tags[active].name}
            </div>
            {/* {
              tags[active].battery
            } */}
          </div>
        )
      }
    }

    tags.map((tag: any, index: number) => {
      if (index != active && tag.name.toLowerCase().includes(search.toLowerCase())) {
        if (filter.includes(tag.category) || !filter[0]) {
          content.push(
            <div
              key={`tag-${tag.name}`}
              onClick={() => handleActive(index)}
              className={index === active ? 'item active' : 'item'}
            >
              {
                tag.isMoving ? <DirectionsRunIcon className='runningIcon' /> : ''
              }
              <div className="name">
                {tag.name}
              </div>
              {/* {
                tag.battery
              } */}
            </div>
          )
        }
      }
    })

    if (content.length === 0) {
      content.push(
        <p key={`text-0`} className='text'>Nenhuma tag encontrada</p>
      )
    }

    return content
  }

  const { Search } = Input

  const options = [
    ...categories.map((category: any) => (
      {
        label: category.name,
        value: category.name
      }
    ))
  ]

  return (
    <div id="location">
      {/* <div className="container"> */}
      <div className="filter">
        <Search className='search' allowClear placeholder="Buscar por Tag" onChange={(e) => handleSearch(e.target.value)} value={search} />
        <Select
          className='select'
          mode="multiple"
          onChange={(value) => handleFilter(value)}
          notFoundContent="Categoria não encontrada"
          placeholder="Categorias"
          autoClearSearchValue
          allowClear
          showArrow
          tagRender={tagRender}
          style={{ width: '100%' }}
          options={options}
        />
      </div>
      <div className="row">
        <div className="col leftSide">
          {
            showBeacons()
          }

          {
            tags.map((tag: any, index: number) => {
              if (tag.name !== '') {
                return showTag(tag, index)
              }
            })
          }

          {
            showInfo()
          }
        </div>
        <div className="col rightSide">
          {
            showTags()
          }
        </div>
      </div>
      {/* </div> */}
    </div>
  )
}

export default Location
