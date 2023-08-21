import { Card } from "antd";
import {EditOutlined,DeleteOutlined,ControlOutlined} from '@ant-design/icons';
import { useQuery } from "@tanstack/react-query";
import { listAllRaffles } from "../../services/raffles";
export const ListRafflesScreen = () => {
    const {data,isLoading} = useQuery({
        queryKey: [],
        queryFn: listAllRaffles
    })
    return (
        <div>
            {
                data?.map((value: object) => {
                    <h1>{JSON.stringify(value)}</h1>
                })
            }
            <Card
                hoverable
                style={{ width:240 }}
                cover={<img alt="imagen de la rifa" src="https://image.slidesharecdn.com/opencontenthistory-1222747121590635-9/95/ten-years-of-open-content-21-728.jpg?cb=1222722154"/>}
                actions={[
                    <ControlOutlined key="control"/>,
                    <EditOutlined key="edit"/>,
                    <DeleteOutlined key="delete"/>
                ]}
            >
                <Card.Meta title="Pollada de Beneficiencia"/>
                <Card.Meta description="Gs. 20.000" />
            </Card>
        </div>
    )
}