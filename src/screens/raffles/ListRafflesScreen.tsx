import { useQuery } from "@tanstack/react-query";
import { listAllRaffles } from "../../services/raffles";
import { CardRaffle } from "../../components/CardRaffle";
import { Spin, FloatButton } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
interface RaffleObject{
    id: number,
    description: string,
    amount: number,
    created_at: string,
    updated_at: string,
    image_url: null | string,
}
export const ListRafflesScreen = () => {
    const navigate = useNavigate()
    const {data,isLoading} = useQuery({
        queryKey: ['listRaffles'],
        queryFn: listAllRaffles
    })
    return (
        <div>
            {
                !isLoading ? (
                    data?.data?.map((raffle: RaffleObject) => (
                        <CardRaffle key={raffle.id} raffle={raffle}/>
                    ))
                ) : (
                    <Spin tip="Loading" size="large">
                        <div className="content" />
                    </Spin>
                )
            }
            <FloatButton type="primary" icon={<PlusOutlined/>} onClick={() => navigate('/raffles/add')}/>
        </div>
    )
}