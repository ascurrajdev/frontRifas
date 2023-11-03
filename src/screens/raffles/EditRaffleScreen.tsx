import { Button, Form, Input, Spin, message } from "antd"
import { useParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import { getRaffle, updateRaffle } from '../../services/raffles';

export const EditRaffleScreen = () => {
    const {raffleId} = useParams();
    const [form] = Form.useForm();
    const {data, isLoading} = useQuery({
        queryKey:['raffle',raffleId,'edit'],
        queryFn: ({queryKey}) => getRaffle(queryKey[1] || "")
    })
    const onFinishEdit = (values : any) => {
        updateRaffle(raffleId ?? "",values).then((data) => {
            console.log(data)
            message.success("Se ha editado correctamente!")
        }).catch((e) => {
            message.error("Ocurrio un error al editar la rifa!")
        })
    }
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
                    onFinish={onFinishEdit}
                >
                    <Form.Item label="Descripcion" name="description">
                        <Input placeholder="Introduzca una descripcion"/>
                    </Form.Item>
                    <Form.Item label="Monto" name="amount">
                        <Input type="number" placeholder="Introduzca un monto"/>
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType="submit" type="primary">Guardar</Button>
                    </Form.Item>
                </Form>
            )
        }
        </>
    )
}