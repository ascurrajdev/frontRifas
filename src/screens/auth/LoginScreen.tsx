import { Card, Form, Input, Button, Row, Col, message } from "antd"
import { loginWithEmailAndPassword } from "../../services/auth"
import { userStore } from "../../store/userStore"
interface CredentialsObject {
    email: string,
    password: string,
}
export const LoginScreen = () => {
    const [messageApi, contextHolder] = message.useMessage()
    const loginState = userStore((state) => state.login)
    const onFinishSubmit = (values: CredentialsObject) => {
        loginWithEmailAndPassword(values).then((data) => {
            loginState(data.data)
        }).catch((e) => {
            if(!!e?.response?.data?.message){
                messageApi.error(e?.response?.data?.message);
            }else{
                messageApi.error(e?.message);
            }
        })
    }
    return(
        <Row>
            {contextHolder}
            <Col lg={{span:12, offset:6}} xs={{span:24}} sm={{span:24}}>
                <Card>
                    <Form
                        layout="vertical"
                        onFinish={onFinishSubmit}
                    >
                        <Form.Item name="email" label="Email" rules={[{required:true, message:'Por favor, introduzca el email'}]}>
                            <Input placeholder="example@example.com"/>
                        </Form.Item>
                        <Form.Item name="password" label="Password" rules={[{required:true, message: 'Por favor, introduzca su password'}]}>
                            <Input.Password placeholder="12345"/>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">Enviar</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Col>
        </Row>
    )
}