import React, { useState, useEffect, useRef } from 'react'
import './edit.scss'
import { useLocation, useNavigate, useParams } from "react-router-dom"

import {
  Button,
  Form,
  Input,
  Select
} from 'antd'
import { Link } from 'react-router-dom';

const Edit: any = (Parent: any) => {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()
  const id = params.id
  const [category, setCategory] = useState({
    _id: '',
    name: location.state.name
  })

  async function getCategory() {
    await fetch(`http://10.254.18.38:8000/api/category/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .then((json) => {
        setCategory(json.data._category)
      })
  }

  async function editCategory(values: any) {
    await fetch(`http://10.254.18.38:8000/api/category/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: values.category})
    }).then(() => Parent.props.getCategories()).then(() => navigate('/categories'))
  }

  const onFinish: any = (values: any) => {
    if (values) {
      editCategory(values)
    }
  }

  useEffect(() => {
    getCategory()
  }, [])

  return (
    <div id="categories-edit">
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
          name="category"
          rules={[{ required: true, message: 'Preencha com o nome' }]}
          initialValue={category.name}
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