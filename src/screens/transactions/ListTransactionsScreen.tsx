import {useState, useEffect} from 'react'
import { useQuery } from "@tanstack/react-query"
import { Table } from "antd";
import { getAllCollections } from "../../services/collections";
export const ListTransactionsScreen = () => {
    const {data, isLoading} = useQuery({
        queryKey:['collections','index'],
        queryFn: () => getAllCollections()
    });
    const [listCollections, setListCollections] = useState([])
    const columns = [
        {
            title:'#',
            dataIndex:'id',
            key:'id'
        },
        {
            title:'Usuario',
            dataIndex:'user',
            render:(user) => <a>{user.name}</a>
        },
        {
            title:'Cliente',
            dataIndex:'client',
            render:(client) => <a>{client.name}</a>
        },
        {
            title:'Monto Total',
            dataIndex:'amount',
            key:'amount'
        },
        {
            title:'Monto Pagado',
            dataIndex:'paid',
            key:'paid'
        },
        {
            title:'Creado',
            dataIndex:'created_at',
            key: 'created_at',
        },
        {
            title:'Actualizado',
            dataIndex: 'updated_at',
            key:'updated_at'
        }
    ]
    useEffect(() => {
        if(!!data?.data){
            setListCollections(data.data)
        }
    },[data])
    return(
        <div>
            <h1>Listado de Transacciones</h1>
            <Table dataSource={listCollections} loading={isLoading} columns={columns}/>
        </div>
    )
}