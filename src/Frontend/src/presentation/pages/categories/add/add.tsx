import React from 'react'
import {
  Button,
  Form,
  Input,
  Select
} from 'antd';
import './add.scss'
import { Link } from 'react-router-dom';

type CategoryType = {
  id: number;
  name: string;
}

type Devices = {
  id: number;
  macAddress: string;
}

const Add: React.FC = () => {
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

  const newDevices: Devices[] = [
    {
      id: 0,
      macAddress: "58-91-D3-93-8D-5F"
    },
    {
      id: 1,
      macAddress: "B6-50-D2-73-87-96"
    },
    {
      id: 2,
      macAddress: "3F-B5-45-50-DC-A4"
    }
  ]

  return (
    <div id="categories-add">
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
          label="Nome da Categoria"
          name="username"
          rules={[{ required: true, message: 'Por favor, preencha com o seu registro! ' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button className='button' htmlType="submit">
            Cadastrar
          </Button>
          <Link to={"/categories"} >
            <Button className='button'>
              Cancelar
            </Button>
          </Link>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Add