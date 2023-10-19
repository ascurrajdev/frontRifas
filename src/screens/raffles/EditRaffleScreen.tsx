import {useEffect} from 'react'
import { Button, Form, Input, Spin } from "antd"
import { useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { getRaffle } from '../../services/raffles';

export const EditRaffleScreen = () => {
    const {raffleId} = useParams();
    const [form] = Form.useForm();
    const {data, isLoading} = useQuery({
        queryKey:['raffle',raffleId,'edit'],
        queryFn: ({queryKey}) => getRaffle(queryKey[1] || "")
    })
    useEffect(() => {
        console.log(data)
    },[data])
    return(
        <>
        {
            isLoading ? (
                <Spin />
            ) : (
                <Form 
                    layout="vertical"
                    form={form}
                    initialValues={data?.data}
                >
                    <Form.Item label="Descripcion" name="description">
                        <Input value={"Todos por Kamila LCIK"} placeholder="Introduzca una descripcion"/>
                    </Form.Item>
                    <Form.Item label="Monto" name="amount">
                        <Input type="number" value={1000} placeholder="Introduzca un monto"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary">Guardar</Button>
                    </Form.Item>
                </Form>
            )
        }
        </>
    )
}