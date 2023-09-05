import { Card } from "antd";
import { useNavigate } from "react-router-dom";
import {EditOutlined,DeleteOutlined,ControlOutlined, UserOutlined} from '@ant-design/icons';
interface RaffleObject{
    id: number,
    description: string,
    amount: number,
    created_at: string,
    updated_at: string,
    image_url: null | string,
}
interface PropType{
    raffle: RaffleObject
}
export const CardRaffle = ({raffle}: PropType) => {
    const navigate = useNavigate()
    const formatCurrency = (amount: number) => {
        return `PYG. ${new Intl.NumberFormat('de-DE').format(amount)}`
    }

    return(
        <Card
            hoverable
            style={{ width:240 }}
            cover={<img alt="imagen de la rifa" src={ !!raffle.image_url ? raffle.image_url : "https://image.slidesharecdn.com/opencontenthistory-1222747121590635-9/95/ten-years-of-open-content-21-728.jpg?cb=1222722154"}/>}
            actions={[
                <ControlOutlined key="control" onClick={() => navigate(`/raffles/${raffle.id}/statistics`)}/>,
                <UserOutlined key="users"/>,
                <EditOutlined key="edit" onClick={() => navigate(`/raffles/${raffle.id}/edit`)}/>,
                <DeleteOutlined key="delete"/>
            ]}
        >
            <Card.Meta title={raffle.description}/>
            <Card.Meta description={formatCurrency(raffle.amount)} />
        </Card>
    )
}