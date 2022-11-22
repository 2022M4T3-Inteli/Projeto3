import React from 'react'
import { Space, Table, Button, Popover, Modal } from 'antd'
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
import InfoIcon from '@mui/icons-material/Info'
import { ExclamationCircleFilled } from '@ant-design/icons';

type TagType = {
  id: number;
  macAdress: string;
  name: string;
  category: string;
  battery: any;
  isMoving: boolean
  position: [number, number]
}

type NewTagType = {
  id: number;
  macAddess: string;
}

const { confirm } = Modal;

const showConfirm: Function = () => {
  confirm({
    title: 'Você realmente desaja excluir a Tag?',
    icon: <ExclamationCircleFilled />,
    // content: 'Não poderá ser desfeita',
    okText: "Excluir",
    okType: 'danger',
    cancelText: 'Não',
    onOk() {
      console.log('OK');
    },
    onCancel() {
      console.log('Cancel');
    },
  });
};

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

const newTags: NewTagType[] = [
  {
    id: 0,
    macAddess: "32-146-23-62"
  },
  {
    id: 1,
    macAddess: "74-123-46-98"
  }
]

const data: TagType[] = [
  {
    id: 0,
    macAdress: 'abc',
    name: "Objeto 1",
    battery: batteryLevel(28),
    category: "Furadeiras",
    isMoving: true,
    position: [100, 250]
  },
  {
    id: 1,
    macAdress: 'abc',
    name: "Objeto 2",
    battery: batteryLevel(50),
    category: "Motoserras",
    isMoving: true,
    position: [100, 350]
  },
  {
    id: 2,
    macAdress: 'abc',
    name: "Objeto 3",
    battery: batteryLevel(72),
    category: "Britadeiras",
    isMoving: false,
    position: [50, 450]
  },
  {
    id: 3,
    macAdress: 'abc',
    name: "Objeto 4",
    battery: batteryLevel(89),
    category: "Motoserras",
    isMoving: true,
    position: [175, 600]
  },
  {
    id: 4,
    macAdress: 'abc',
    name: "Objeto 5",
    battery: batteryLevel(10),
    category: "Britadeiras",
    isMoving: false,
    position: [200, 250]
  },
  {
    id: 5,
    macAdress: 'abc',
    name: "Objeto 6",
    battery: batteryLevel(0),
    category: "Furadeiras",
    isMoving: true,
    position: [120, 520]
  },
  {
    id: 6,
    macAdress: 'abc',
    name: "Objeto 7",
    battery: batteryLevel(100),
    category: "Motoserras",
    isMoving: true,
    position: [300, 450]
  },
  {
    id: 7,
    macAdress: 'abc',
    name: "Objeto 8",
    battery: batteryLevel(45),
    category: "Britadeiras",
    isMoving: false,
    position: [300, 150]
  }
]


const List: any = (Parent: any) => {
  const handleActive: Function = (index: number) => {
    Parent.props.changeTag(index)
    Parent.props.changePage(0)
  }

  const columns: ColumnsType<TagType> = [
    {
      title: 'Tag',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'battery',
      key: 'status',
    },
    {
      title: 'Categoria',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Ações',
      key: 'action',
      render: (_, obj, index) => (
        <Space size="middle">
          <Link onClick={() => handleActive(index)} to={"/"}>
            <VisibilityIcon className='actionIcon' />
          </Link>
          <Link to={"/tags/edit"}>
            <EditIcon className='actionIcon' />
          </Link>
          <DeleteIcon onClick={() => showConfirm()} className='actionIcon' />
        </Space>
      )
    }
  ]

  const content: any = (
    <div>Clique em Adicionar Tag</div>
  )

  const haveNewTags: Function = () => {
    if (newTags.length > 0) {
      return (
        <Popover placement='bottom' content={content} title="Novas tags encontradas" trigger="click">
          <InfoIcon className='icon' />
        </Popover>
      )
    }
  }

  return (
    <div id="tags-list">
      <div className="buttonContainer">
        {haveNewTags()}
        <Link to={"/tags/add"}>
          <Button>Adicionar Tag</Button>
        </Link>
      </div>
      <Table rowKey="name" className='table' columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </div>
  )
}

export default List