import { Card, Form, Input, Button, Row, Col } from "antd"
export const LoginScreen = () => {
    return(
        <Row>
            <Col lg={{span:12, offset:6}} xs={{span:24}} sm={{span:24}}>
                <Card>
                    <Form
                        layout="vertical"
                    >
                        <Form.Item name="email" label="Email">
                            <Input placeholder="example@example.com" />
                        </Form.Item>
                        <Form.Item name="password" label="Password">
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