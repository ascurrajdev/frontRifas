import { useState } from 'react';
import { Button, Form, Input, Card, Spin, message, Image } from 'antd';
import api from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export const MainScreen = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate()
  const [form] = Form.useForm();
  const [isLoad, setIsLoad] = useState(false)
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const onPlusQuantity = () => {
    setQuantity(quantity + 1);
  };

  const onMinusQuantity = () => {
    setQuantity(quantity - 1);
  };

  const { data: detailUserRaffle, isLoading, isError } = useQuery({
    queryKey:['user-raffle-details', params.token],
    queryFn:async () => {
      const response = await api.get(`raffles/details/${params.token}`);
      return response.data.data;
    },
    retry:0
  });
  
  if(isError) navigate("/")

  return (
    <div>
      {contextHolder}
      {isLoading ? (
        <div className='w-full h-screen flex flex-center'>
          <Spin size="large" />
        </div>
      ) : (
        <Card title={detailUserRaffle?.raffle?.description} bordered={false}>
          <div>
            {
              !!detailUserRaffle?.raffle?.image_url && (
                <Image rootClassName="mb-1" className='rounded' height={100} width={90} src={detailUserRaffle?.raffle?.image_url}/>
              )
            }
          </div>
          <Form
            form={form}
            layout="vertical"
            onFinish={(data) => {
              setIsLoad(true)
              api.post('clients',data).then(({data}) => {
                api.post('payments/generate',{
                  raffle_id: detailUserRaffle.raffle_id,
                  user_id: detailUserRaffle.user_id,
                  quantity: quantity,
                  client_id: data.data.id
                }).then(({data}) => {
                  window.location = data.data.url
                }).catch((error: any) => {
                  messageApi.error(error.response?.data?.message)
                  setIsLoad(false)
                })
              }).catch((error: any) => {
                messageApi.error(error.response?.data?.message)
                setIsLoad(false)
              })
            }}
            autoComplete='off'
          >
            <Form.Item name="name" label="Nombre y Apellido" rules={[{ required: true, message: 'Por favor introduzca su nombre completo' }]} tooltip="Este campo es requerido">
              <Input placeholder="Introduzca su nombre" />
            </Form.Item>
            <Form.Item
              label="Correo"
              rules={[{ required: true, message: 'Por favor introduzca su correo' }]}
              name="email"
              tooltip="Debe introducir un correo válido"
            >
              <Input type="email" placeholder="ejemplo@prueba.com" />
            </Form.Item>
            <Form.Item
              label="Teléfono"
              rules={[{ required: true, message: 'Por favor introduzca su telefono' }]}
              name="cellphone"
              tooltip="Debe introducir un teléfono válido"
            >
              <Input type="tel" placeholder="0991123456" />
            </Form.Item>
            <Form.Item label="Rifas">
                {quantity > 1 && <Button type="default" onClick={onMinusQuantity}>-</Button>}
                &nbsp;&nbsp;&nbsp;<span>{quantity}</span>&nbsp;&nbsp;&nbsp;
                <Button type="default" onClick={onPlusQuantity}>+</Button>
            </Form.Item>
            <Form.Item>
              <Button loading={isLoad} htmlType='submit' size='large' type="primary">Pagar (Gs. {new Intl.NumberFormat("de-DE").format(quantity * detailUserRaffle?.raffle?.amount)})</Button>
            </Form.Item>
          </Form>
        </Card>
      )}
    </div>
  );
};
