import React from 'react'
import {
  Button,
  Form,
  Input,
  Select
} from 'antd';
import './add.scss'
import { Link, useNavigate } from 'react-router-dom';

const Add: any = (Parent: any) => {
  const navigate = useNavigate()

  async function createCategory(values: any) {
    await fetch("http://10.254.18.38:8000/api/category", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    }).then(() => Parent.props.getCategories()).then(() => navigate('/categories'))
  }

  const onFinish: any = (values: any) => {
    if (values) {
      console.log(values)
      createCategory(values)
    }
  }

  return (
    <div id="categories-add">
      <Form
        className='form'
        name="basic"
        labelAlign='left'
        layout="vertical"

        requiredMark={false}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Nome da Categoria"
          name="name"
          rules={[{ required: true, message: 'Preencha com o nome' }]}
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