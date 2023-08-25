import {useEffect} from 'react'
import { Card } from "antd";
import {EditOutlined,DeleteOutlined,ControlOutlined} from '@ant-design/icons';
import { useQuery } from "@tanstack/react-query";
import { listAllRaffles } from "../../services/raffles";
interface RaffleObject{
    id: number,
    description: string,
    amount: number,
    created_at: string,
    updated_at: string,
    image_url: null | string,
}
export const ListRafflesScreen = () => {
    const {data,isLoading} = useQuery({
        queryKey: ['listRaffles'],
        queryFn: listAllRaffles
    })
    const formatCurrency = (amount: number) => {
        return `PYG. ${new Intl.NumberFormat('de-DE').format(amount)}`
    }
    return (
        <div>
            {
                !isLoading ? (
                    data?.data?.map((raffle: RaffleObject) => (
                        <Card
                            key={raffle.id}
                            hoverable
                            style={{ width:240 }}
                            cover={<img alt="imagen de la rifa" src={ !!raffle.image_url ? raffle.image_url : "https://image.slidesharecdn.com/opencontenthistory-1222747121590635-9/95/ten-years-of-open-content-21-728.jpg?cb=1222722154"}/>}
                            actions={[
                                <ControlOutlined key="control"/>,
                                <EditOutlined key="edit"/>,
                                <DeleteOutlined key="delete"/>
                            ]}
                        >
                            <Card.Meta title={raffle.description}/>
                            <Card.Meta description={formatCurrency(raffle.amount)} />
                        </Card>
                    ))
                ) : (
                    <h1>No hay datos</h1>
                )
            }
        </div>
    )
}