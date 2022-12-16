import React, { useEffect, useState } from 'react'
import './settings.scss'

import {
  Button,
  Form,
  Input,
  Select
} from 'antd'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

// Tela de edição de Tag
const Settings: any = (Parent: any) => {
  // Define os estados utilizados na tela assim como pega o ID passado pela URL
  const navigate = useNavigate()
  const [beacons, setBeacons] = useState(Parent.props.beacons)

  // Hook para verificar se há mudança nas categorias de acordo com o componente pai
  useEffect(() => {
    // Define as categorias como as categorias definadas no componente pai
    setBeacons(Parent.props.beacons)
  }, [Parent.props.beacons])

  // Função responsável por fazer a requisição que irá editar a Tag, passando como parâmetro o ID da Tag
  async function editBeacons(values: any) {
    await fetch(`http://${import.meta.env.VITE_HOST}:${import.meta.env.VITE_PORT}/api/tags/beacons`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      // Envia para o backend os valores informados no formulário de edição
      body: JSON.stringify(values)
    }).then(() => {
      Parent.props.getBeacons()
    }).then(() => navigate('/')) // Após, navega para a tela de listagem de Tags
  }

  // Ao finalizar o formulário, chama a função de edição de Tag
  const onFinish: any = (values: any) => {
    console.log(values)
    if (values) {
      editBeacons(values)
    }
  }

  return (
    <div id="settings">
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
          label="Posição do Beacon 1"
          name="beacon0"
          rules={[{ required: true, message: 'Preencha com o nome' }]}
          initialValue={0}
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Distância entre Beacon 1 e 2 (metros)"
          name="beaconX"
          rules={[{ required: true, message: 'Preencha com o nome' }]}
          initialValue={beacons.beaconX}
        >
          <Input type='number' />
        </Form.Item>

        <Form.Item
          label="Distância entre Beacon 1 e 3 (metros)"
          name="beaconY"
          rules={[{ required: true, message: 'Preencha com o nome' }]}
          initialValue={beacons.beaconY}
        >
          <Input type='number' />
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

export default Settings