import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { getAdminUsersRaffles, getUsersRaffles } from "../../services/raffles";
import { Avatar, Card, Space, Spin, Table, Row, Col, Divider, Button, Modal, QRCode } from "antd";
import { ControlOutlined, DeleteOutlined, DownloadOutlined, EditOutlined, PlusOutlined, PrinterOutlined, QrcodeOutlined, ShareAltOutlined } from "@ant-design/icons";
import { CardUser } from "../../components/CardUser";
interface UserObj{
    id: number,
    name: string,
}
interface AdminUserObj {
    id: number,
    user_id: number,
    raffle_id: number,
    created_at: string,
    updated_at: string,
    user: UserObj
}
type UserRaffleObj = {
    id: string,
    user_id: number,
    raffle_id: number,
    created_at: string,
    updated_at: string,
    user: UserObj,
    max_number: number,
    min_number: number
}
export const UsersRaffleScreen = () => {
    const navigate = useNavigate();
    const {raffleId} = useParams();
    // const {data: dataAminUsersRaffles, isLoading: isLoadingAdmin} = useQuery({
    //     queryKey: ['raffles',raffleId,'admin'],
    //     queryFn: () => getAdminUsersRaffles(raffleId ?? "")
    // });
    const {data: dataUsersRaffle, isLoading: isLoadingUsers, refetch: refetchUsersRaffle} = useQuery({
        queryKey: ['raffles',raffleId, 'users'],
        queryFn: () => getUsersRaffles(raffleId ?? "")
    })
    return (
        <div className="w-full h-screen py-3 flex">
            <div>
                <h1>Usuarios:</h1>
                <Button icon={<PlusOutlined color="white"/>} onClick={() => navigate(`/raffles/${raffleId}/users/add`)} type="primary" size="large" shape="circle" />
                <Divider />
                {
                    isLoadingUsers ? (
                        <div className="w-full h-screen flex">
                            <Space align="center" direction="horizontal">
                                <Space align="center" direction="vertical">
                                    <Spin/>
                                </Space>
                            </Space>
                        </div>
                    ) : (
                            <Row>
                            {
                                dataUsersRaffle?.data?.map((userRaffle: UserRaffleObj ) => (
                                    <Col key={userRaffle.id} span={6}>
                                        <CardUser onDelete={() => refetchUsersRaffle()} userRaffle={userRaffle}/>
                                    </Col>
                                ))  
                            }
                            </Row>
                    )
                }
            </div>
            
        </div>
    )    
}