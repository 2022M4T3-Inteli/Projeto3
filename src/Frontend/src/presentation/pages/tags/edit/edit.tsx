import React from 'react'
import './edit.scss'

import {
  Button,
  Form,
  Input,
  Select
} from 'antd'
import { Link } from 'react-router-dom';

type CategoryType = {
  id: number;
  name: string;
}

type Devices = {
  id: number;
  macAddress: string;
}

const Edit: React.FC = () => {
  const categories: CategoryType[] = [
    {
      id: 0,
      name: "Furadeiras"
    },
    {
      id: 1,
      name: "Britadeiras"
    },
    {
      id: 2,
      name: "Motoserras"
    }
  ]

  const device: Devices = {
    id: 1,
    macAddress: "B6-50-D2-73-87-96"
  }

  return (
    <div id="tags-edit">
      <Form
        className='form'
        name="basic"
        labelAlign='left'
        layout="vertical"

        requiredMark={false}
        initialValues={{ remember: true }}
        // onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Nome da Tag"
          name="username"
          rules={[{ required: true, message: 'Por favor, preencha com o seu registro! ' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="MAC Address da Tag">
          <Select value={device.macAddress} disabled>
            <Select.Option
              className="formSelect"
              bordered={false}
              value={device.macAddress}
              key={`${device.macAddress}-0`}>
              {device.macAddress}
            </Select.Option>
            )
          </Select>
        </Form.Item>

        <Form.Item label="Categoria da Tag">
          <Select>
            {
              categories.map((category, index) => {
                return (
                  <Select.Option key={`${category}-${index}`} value={category.name}>{category.name}</Select.Option>
                )
              })
            }
          </Select>
        </Form.Item>

        <Form.Item>
          <Button className='button' htmlType="submit">
            Salvar
          </Button>
          <Link to={"/tags"} >
            <Button className='button'>
              Cancelar
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Edit