import { Card, Form, Input, Button } from "antd"
export const LoginScreen = () => {
    return(
        <Card>
            <Form>
                <Form.Item name="email" label="Email">
                    <Input />
                </Form.Item>
                <Form.Item name="password" label="Password">
                    <Input />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">Enviar</Button>
                </Form.Item>
            </Form>
        </Card>
    )
}