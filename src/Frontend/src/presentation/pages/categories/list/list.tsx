import React from 'react'
import { Space, Table, Button } from 'antd'
import type { ColumnsType } from 'antd/es/table'
import { Link } from 'react-router-dom'

import './list.scss'

import BatteryCharging20Icon from '@mui/icons-material/BatteryCharging20'
import BatteryCharging50Icon from '@mui/icons-material/BatteryCharging50'
import BatteryCharging80Icon from '@mui/icons-material/BatteryCharging80'
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull'
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import VisibilityIcon from '@mui/icons-material/Visibility'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'

type CategoryType = {
  id: number;
  name: string;
  nTags: number;
}

const columns: ColumnsType<CategoryType> = [
  {
    title: 'Categoria',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Número de Tags',
    dataIndex: 'nTags',
    key: 'nTags',
  },
  // {
  //   title: 'Categoria',
  //   dataIndex: 'category',
  //   key: 'category',
  // },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <Link to={"/"}>
          <VisibilityIcon className='actionIcon' />
        </Link>
        <Link to={"/categories/edit"}>
          <EditIcon className='actionIcon' />
        </Link>
        <Link to={"/categories"}>
          <DeleteIcon className='actionIcon' />
        </Link>
      </Space>
    )
  }
]

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

const data: CategoryType[] = [
  {
    id: 0,
    name: "Britadeiras",
    nTags: 5
  },
  {
    id: 1,
    name: "Furadeiras",
    nTags: 8
  },
  {
    id: 1,
    name: "Motoserras",
    nTags: 4
  }
]


const List: React.FC = () => {
  return (
    <div id="categories-list">
      <div className="buttonContainer">
        <Link to={"/categories/add"}>
          <Button>Adicionar Categoria</Button>
        </Link>
      </div>
      <Table className='table' columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </div>
  )
}

export default List