import React from 'react'
import { Form, Input, Button } from 'antd'
import './login.scss'
import Logo from '/src/assets/logo.png'

const Login: React.FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div id="login">
      <div className="left">
        <img src={Logo} alt="" />
      </div>
      <div className="right">
        <div className="row">
          <h1 className='title'>Login</h1>
          <p className='text'>Identifique-se para acessar a ferramenta</p>
        </div>

        <div className="row">
          <Form
            name="basic"
            layout="vertical"
            requiredMark={false}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Registro de funcionário"
              name="username"
              rules={[{ required: true, message: 'Por favor, preencha com o seu registro!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item 
              label="Senha"
              name="password"
              rules={[{ required: true, message: 'Por favor, preencha com a sua senha!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button className='button' type="primary" htmlType="submit">
                Acessar a ferramenta
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Login