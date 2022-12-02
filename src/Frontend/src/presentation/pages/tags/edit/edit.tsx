import React, { useEffect, useState } from 'react'
import './edit.scss'

import {
  Button,
  Form,
  Input,
  Select
} from 'antd'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

const Edit: any = (Parent: any) => {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()
  const id = params.id
  const [tag, setTag] = useState({
    _id: '',
    name: location.state.name,
    macAddress: location.state.macAddress,
    category: location.state.category
  })
  const [categories, setCategories] = useState(Parent.props.categories)

  useEffect(() => {
    setCategories(Parent.props.categories)
  }, [Parent.props.categories])

  async function getTag() {
    await fetch(`http://10.254.18.38:8000/api/tags/${id}`, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => response.json())
      .then((json) => {
        setTag(json.data._tag)
        console.log(json.data._tag)
      })
  }

  async function editTag(values: any) {
    await fetch(`http://10.254.18.38:8000/api/tags/${id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values)
    }).then(() => Parent.props.getTags()).then(() => navigate('/tags'))
  }

  const onFinish: any = (values: any) => {
    if (values) {
      editTag(values)
    }
  }

  useEffect(() => {
    getTag()
  }, [])

  return (
    <div id="tags-edit">
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
          label="Nome da Tag"
          name="name"
          rules={[{ required: true, message: 'Prrencha com o nome' }]}
          initialValue={tag.name}
        >
          <Input />
        </Form.Item>

        <Form.Item initialValue={tag.macAddress} label="MAC Address da Tag">
          <Select value={tag.macAddress} disabled>
            <Select.Option
              className="formSelect"
              bordered={false}
              value={tag.macAdress}
              key={`${tag.macAdress}-0`}>
              {tag.macAdress}
            </Select.Option>
            )
          </Select>
        </Form.Item>

        <Form.Item name="category" initialValue={tag.category} label="Categoria da Tag">
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