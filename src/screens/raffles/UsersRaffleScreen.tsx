import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getAdminUsersRaffles } from "../../services/raffles";
import { Space, Spin } from "antd";
export const UsersRaffleScreen = () => {
    const {raffleId} = useParams();
    const {data, isLoading} = useQuery({
        queryKey: ['raffles',raffleId,'admin'],
        queryFn: () => getAdminUsersRaffles(raffleId ?? "")
    })
    useEffect(() => {
        console.log(data)
    },[data])
    return (
        <>
        <h1>Users Raffle Screen</h1>
        {
            isLoading ? (
                <div className="w-full h-screen">
                    <Spin/>
                </div>
            ) : (
                <div className="w-full h-screen flex">
                    <Space align="center" direction="horizontal">
                        <Space align="center" direction="vertical">
                            <Spin/>
                        </Space>
                    </Space>
                </div>
            )
        }
        </>
    )    
}