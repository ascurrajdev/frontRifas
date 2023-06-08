import React, { useState } from 'react';
import { Button, Form, Input, Card } from 'antd';


export const MainScreen: React.FC = () => {
  const [form] = Form.useForm();
  const [quantity, setQuantity] = useState(1)
  const onPlusQuantity = () => {
    setQuantity(quantity + 1)
  }
  const onMinusQuantity = () => {
    setQuantity(quantity - 1)
  }
  return (
  <Card title="Rifa Solidaria" bordered={false}>
    <Form
      form={form}
      layout="vertical"
      onFinish={() => {

      }}
    >
      <Form.Item name="name" label="Nombre y Apellido" required tooltip="Este campo es requerido">
        <Input placeholder="Introduzca su nombre" />
      </Form.Item>
      <Form.Item
        label="Correo"
        required
        name="email"
        tooltip="Debe introducir un correo valido"
      >
        <Input type="email" placeholder="example@test.com" />
      </Form.Item>
      <Form.Item
        label="Telefono"
        required
        name="cellphone"
        tooltip="Debe introducir un telefono valido"
      >
        <Input type="tel" placeholder="0991123456" />
      </Form.Item>
      <Form.Item
        label="Rifas"
        required
      >
        {
          quantity > 1 && <Button type="default" onClick={onMinusQuantity}>-</Button>
        }
       &nbsp;&nbsp;&nbsp; <span>{quantity}</span> &nbsp;&nbsp;&nbsp;
        <Button type="default" onClick={onPlusQuantity}>+</Button>
      </Form.Item>
      <Form.Item>
        <Button size='large' type="primary">Pagar (Gs. {new Intl.NumberFormat("de-DE").format(quantity * 10000)})</Button>
      </Form.Item>
    </Form>
  </Card>
  );
};