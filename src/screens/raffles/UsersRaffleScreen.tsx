import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getAdminUsersRaffles } from "../../services/raffles";
import { Avatar, Card, Space, Spin, Table } from "antd";
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
    const {data: dataAminUsersRaffles, isLoading} = useQuery({
        queryKey: ['raffles',raffleId,'admin'],
        queryFn: () => getAdminUsersRaffles(raffleId ?? "")
    })
    useEffect(() => {
        console.log(dataAminUsersRaffles)
    },[dataAminUsersRaffles])
    return (
        <>
        <h1>Administradores</h1>
        {
            isLoading ? (
                <div className="w-full h-screen flex">
                    <Space align="center" direction="horizontal">
                        <Space align="center" direction="vertical">
                            <Spin/>
                        </Space>
                    </Space>
                </div>
            ) : (
                <div className="w-full h-screen py-3">
                    {
                        dataAminUsersRaffles?.data?.map(({user} : AdminUserObj ) => (
                            <Card
                                hoverable
                                style={{ width:240 }}
                            >
                                <Card.Meta 
                                avatar={<Avatar src={`https://ui-avatars.com/api/?name=${user.name}`}/>}
                                title={user.name}/>
                            </Card>
                        ))
                    }
                </div>
            )
        }
        </>
    )    
}