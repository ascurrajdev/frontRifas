import {Col, Row, Statistic} from 'antd';
import { useQuery } from '@tanstack/react-query';
import { getGeneralStatistics } from '../services/statistics';
export const HomeScreen = () => {
  const {data, isLoading} = useQuery({
    queryKey: ['statistics','general'],
    queryFn: () => getGeneralStatistics()
  })
  return(
    <div style={{ padding: 24, minHeight: 360 }}>
      <Row>
          <Col span={6}>
              <Statistic loading={isLoading} title="Rifas" value={data?.data?.raffles_count} />
          </Col>
          <Col span={6}>
              <Statistic title="Clientes" loading={isLoading} value={data?.data?.clients_count} />
          </Col>
      </Row>
    </div>
  )
}