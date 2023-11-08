import { Button, Form, Input, message} from "antd"
import { addRaffle } from "../../services/raffles";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
export const StoreRaffleScreen = () => {
    const [form] = Form.useForm()
    const [messageApi, contextHolder] = message.useMessage();
    const navigate = useNavigate();
    const mutation = useMutation({
        mutationFn:(values) => addRaffle(values),
        onSuccess: (data) => {
            messageApi.success("Se ha creado correctamente la rifa")
            navigate("/raffles")
        },
        onError: (data) => {
            messageApi.error("Ha ocurrido un error al registra la rifa")
        }
    })
    const onFinishForm = (values: any) => {
        mutation.mutate(values)
    }
    return(
        <>
            {contextHolder}
            <h1>Nueva Rifa</h1>
            <Form
                layout="vertical"
                form={form}
                onFinish={onFinishForm}
                initialValues={{
                    quantity: 100
                }}
            >
                <Form.Item label="Descripcion" name="description" rules={[{
                    required:true, message:"La descripcion es requerida"
                }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Monto" name="amount" rules={[{
                    required: true, message: 'El monto es requerido'
                }]}>
                    <Input type="number"/>
                </Form.Item>
                <Form.Item label="Cantidad" name="quantity" rules={[{
                    required:true, message:'La cantidad es requerida'
                }]}>
                    <Input type="number"/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary">Enviar</Button>
                </Form.Item>
            </Form>
        </>
    )
}