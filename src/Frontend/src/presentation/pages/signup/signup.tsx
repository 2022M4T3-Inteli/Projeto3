import React from 'react'
import { Form, Input, Button, message } from 'antd'
import './signup.scss'
import Logo from '/src/assets/logo.png'

const Signup: React.FC = () => {
  const onFinish: any = (values: any) => {
    if (values.password === values.passwordConfirmation) {
      window.location.href = '/aproval'
    }
    else {
      info()
    }
  };

  const onFinishFailed: any = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const info: Function = () => {
    message.info('As senhas não coincidem', 3);
  };

  return (
    <div id="signup">
      <div className="left">
        <img src={Logo} alt="" />
      </div>
      <div className="right">
        <div className="row">
          <h1 className='title'>Signup</h1>
          <p className='text'>Preencha seus dados para um novo acesso</p>
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
              rules={[{ required: true, message: 'Por favor, preencha com o seu registro! ' }]}
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

            <Form.Item 
              label="Confirmação da senha"
              name="passwordConfirmation"
              rules={[{ required: true, message: 'Por favor, preencha com a senha previamente informada!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button className='button' type="primary" htmlType="submit">
                Criar novo acesso
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  )
}

export default Signup