import React from 'react'
import './edit.scss'

import {
  Button,
  Form,
  Input,
  Select
} from 'antd'
import { Link } from 'react-router-dom';

const Edit: React.FC = () => {
  return (
    <div id="categories-edit">
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
          rules={[{ required: true, message: 'Por favor, preencha com a categoria! ' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item>
          <Button className='button' htmlType="submit">
            Salvar
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

export default Edit