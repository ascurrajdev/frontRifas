import { Card, Popconfirm, message } from "antd";
import { useNavigate } from "react-router-dom";
import {EditOutlined,DeleteOutlined,ControlOutlined, UserOutlined} from '@ant-design/icons';
import { deleteRaffle } from "../services/raffles";
interface RaffleObject{
    id: number,
    description: string,
    amount: number,
    created_at: string,
    updated_at: string,
    image_url: null | string,
}
interface PropType{
    raffle: RaffleObject,
    onDelete: () => void
}
export const CardRaffle = ({raffle, onDelete}: PropType) => {
    const navigate = useNavigate()
    const formatCurrency = (amount: number) => {
        return `PYG. ${new Intl.NumberFormat('de-DE').format(amount)}`
    }
    const deleteThisRaffle = () => {
        deleteRaffle(raffle.id).then((_data) => {
            onDelete()
            message.success("La rifa ha sido borrada exitosamente")
        }).catch((_e) => {
            message.error("Ocurrio un error inesperado al borrar!")
        })
    }
    return(
        <Card
            hoverable
            style={{ width:240 }}
            cover={<img alt="imagen de la rifa" src={ !!raffle.image_url ? raffle.image_url : "https://image.slidesharecdn.com/opencontenthistory-1222747121590635-9/95/ten-years-of-open-content-21-728.jpg?cb=1222722154"}/>}
            actions={[
                <ControlOutlined key="control" onClick={() => navigate(`/raffles/${raffle.id}/statistics`)}/>,
                <UserOutlined key="users" onClick={() => navigate(`/raffles/${raffle.id}/users`)}/>,
                <EditOutlined key="edit" onClick={() => navigate(`/raffles/${raffle.id}/edit`,{
                    state: raffle
                })}/>,
                <Popconfirm title="Eliminar Rifa" description="Esta segur@ de eliminar esta rifa?" onConfirm={deleteThisRaffle} okText="Si" cancelText="No">
                    <DeleteOutlined key="delete"/>
                </Popconfirm>
            ]}
        >
            <Card.Meta title={raffle.description}/>
            <Card.Meta description={formatCurrency(raffle.amount)} />
        </Card>
    )
}