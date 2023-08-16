import {Col, Row, Statistic} from 'antd';
export const HomeScreen = () => {
  return(
    <div style={{ padding: 24, minHeight: 360 }}>
      <Row>
          <Col span={6}>
              <Statistic title="Rifas" value={1} />
          </Col>
          <Col span={6}>
              <Statistic title="Clientes" value={12} />
          </Col>
      </Row>
    </div>
  )
}