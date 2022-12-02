import React, { useEffect, useState } from 'react'
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
  const [newTags, setNewTags] = useState(Parent.props.newTags)
  const [categories, setCategories] = useState(Parent.props.categories)

  async function createTag(values: any) {
    await fetch(`http://10.254.18.38:8000/api/tags/${values.id}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    }).then(() => Parent.props.getTags()).then(() => navigate('/tags'))
  }

  const onFinish: any = (values: any) => {
    if (values) {
      console.log(values)
      createTag(values)
    }
  }

  useEffect(() => {
    setCategories(Parent.props.categories)
  }, [Parent.props.categories])

  useEffect(() => {
    setNewTags(Parent.props.newTags)
  }, [Parent.props.newTags])

  return (
    <div id="tags-add">
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
          rules={[{ required: true, message: 'Prencha com o nome' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item name="id" label="MAC Address da Tag">
          <Select>
            {
              newTags.map((newTag: any, index: number) => {
                return (
                  <Select.Option
                    className="formSelect"
                    bordered={false}
                    value={newTag._id}
                    key={`${newTag.macAddress}-${index}`}>
                    {newTag.macAddress}
                  </Select.Option>
                )
              })
            }
          </Select>
        </Form.Item>

        <Form.Item name='category' label="Categoria da Tag">
          <Select>
            {
              categories.map((category: any, index: number) => {
                return (
                  <Select.Option key={`${category}-${index}`} value={category.name}>{category.name}</Select.Option>
                )
              })
            }
          </Select>
        </Form.Item>

        <Form.Item>
          <Button className='button' htmlType="submit">
            Cadastrar
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

export default Add