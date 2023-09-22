import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getAdminUsersRaffles, getUsersRaffles } from "../../services/raffles";
import { Avatar, Card, Space, Spin, Table, Row, Col, Divider, Button, FloatButton } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
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
export const UsersRaffleScreen = () => {
    const {raffleId} = useParams();
    const {data: dataAminUsersRaffles, isLoading: isLoadingAdmin} = useQuery({
        queryKey: ['raffles',raffleId,'admin'],
        queryFn: () => getAdminUsersRaffles(raffleId ?? "")
    });
    const {data: dataUsersRaffle, isLoading: isLoadingUsers} = useQuery({
        queryKey: ['raffles',raffleId, 'users'],
        queryFn: () => getUsersRaffles(raffleId ?? "")
    })
    useEffect(() => {
        console.log(dataAminUsersRaffles);
    },[dataAminUsersRaffles])
    useEffect(() => {
        console.log(dataUsersRaffle);
    },[dataUsersRaffle])
    return (
        <div className="w-full h-screen py-3 flex">
            <div>
                <h1>Administradores:</h1>
                <Button icon={<PlusOutlined color="white"/>} type="primary" size="large" shape="circle" />
                <Divider />
                {
                    isLoadingAdmin ? (
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
                                dataAminUsersRaffles?.data?.map(({user} : AdminUserObj ) => (
                                    <Col span={6}>
                                        <Card
                                            hoverable
                                            actions={[
                                                <DeleteOutlined key="delete"/>
                                            ]}
                                            >
                                            <Card.Meta 
                                            avatar={<Avatar src={`https://ui-avatars.com/api/?name=${user.name}`}/>}
                                            title={user.name}
                                            />
                                        </Card>
                                    </Col>
                                ))
                            }
                            </Row>
                    )
                }
            </div>
            <div>
                <h1>Usuarios:</h1>
                <Button icon={<PlusOutlined color="white"/>} type="primary" size="large" shape="circle" />
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
                                dataUsersRaffle?.data?.map(({user} : AdminUserObj ) => (
                                    <Col span={6}>
                                        <Card
                                            hoverable
                                            actions={[
                                                <DeleteOutlined key="delete"/>
                                            ]}
                                            >
                                            <Card.Meta 
                                            avatar={<Avatar src={`https://ui-avatars.com/api/?name=${user.name}`}/>}
                                            title={user.name}
                                            />
                                        </Card>
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