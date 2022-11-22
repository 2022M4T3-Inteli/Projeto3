import React from 'react'
import { Space, Table, Button, Modal } from 'antd'
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
import { ExclamationCircleFilled } from '@ant-design/icons';

type CategoryType = {
  id: number;
  name: string;
  nTags: number;
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

const { confirm } = Modal;

const showConfirm: Function = () => {
  confirm({
    title: 'Você realmente desaja excluir a categoria?',
    icon: <ExclamationCircleFilled />,
    // content: 'Não poderá ser desfeita',
    okText:"Excluir",
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


const List: any = (Parent: any) => {
  const handleActive: Function = (index: number) => {
    Parent.props.changePage(index)
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
      title: 'Ações',
      key: 'action',
      render: (_, obj, index) => (
        <Space size="middle">
          <Link onClick={() => handleActive(index)} to={"/"}>
            <VisibilityIcon className='actionIcon' />
          </Link>
          <Link to={"/categories/edit"}>
            <EditIcon className='actionIcon' />
          </Link>
          <DeleteIcon onClick={() => showConfirm()} className='actionIcon' />
        </Space>
      )
    }
  ]

  return (
    <div id="categories-list">
      <div className="buttonContainer">
        <Link to={"/categories/add"}>
          <Button>Adicionar Categoria</Button>
        </Link>
      </div>
      <Table rowKey="name" className='table' columns={columns} dataSource={data} pagination={{ pageSize: 5 }} />
    </div>
  )
}

export default List