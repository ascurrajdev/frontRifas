import { useEffect } from "react";
import { Card, Col, Row, Skeleton, Statistic, Table } from "antd"
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Line } from "react-chartjs-2"
import { statisticsRaffles } from "../../services/raffles";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    // BarElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
    LineElement,
  } from 'chart.js';
import { ColumnsType } from "antd/es/table";

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);
export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: '',
      },
    },
  };
  
  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  
  export const dataChart = {
    labels,
    datasets: [
      {
        label: 'Recaudacion Total',
        data: [123233,2,3,4,5,6,7],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Jose Ascurra',
        data: [1,10000,3,0,5,6,7],
        backgroundColor: 'rgba(5, 1, 255, 0.5)',
      },
    ],
  };
  interface DataType {
    key:string,
    name:string,
    sold: number,
    available: number,
  }
  const columns: ColumnsType<DataType> = [
    {
      title:'Name',
      dataIndex:'name',
      key:'name'
    },
    {
      title:'Sold',
      dataIndex:'sold',
      key:'sold'
    },
    {
      title:'Available',
      dataIndex:'available',
      key:'available'
    },
    {
      title:'Share',
      dataIndex:'share',
      key:'share'
    }
  ];
export const StatisticsRaffle = () => {
  // const [dataSheet, setDataSheet] = useState({
  //   labels:[],
  //   datasets:[]
  // })
  const {raffleId} = useParams()
  const {data, isLoading} = useQuery({
    queryKey:['statistics', raffleId],
    queryFn: ({queryKey}) => statisticsRaffles(queryKey[1] ?? "")
  })
  return(
      <div>
          <h1>Estadisticas generales de la rifa</h1>
          <Row>
              <Col span={12}>
                <Card bordered={false}>
                  <Statistic value={data?.data?.totals?.sold_quantity ?? 0} suffix={` /${data?.data?.totals?.quantity ?? 0}`} title="Rifas Vendidas" loading={isLoading}/>
                </Card>
              </Col>
              <Col span={12}>
                <Card bordered={false}>
                  <Statistic value={data?.data?.totals?.sold_amount ?? 0} title="Total Recaudado" prefix="PYG " loading={isLoading}/>
                </Card>
              </Col>
              <Col lg={24}>
                <Card>
                  <Line options={options} data={dataChart} />
                </Card>
              </Col>
              <Col span={24}>
                <Table columns={columns} />
              </Col>
          </Row>
      </div>
  )
}