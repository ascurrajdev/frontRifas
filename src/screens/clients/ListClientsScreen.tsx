import { Table } from "antd";
import { getAllClients } from "../../services/clients";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
export const ListClientsScreen = () => {
    const {data, isLoading} = useQuery({
        queryKey:['clients','index'],
        queryFn: () => getAllClients()
    })
    const dataSource = [
        {
          key: '1',
          name: 'Mike',
          age: 32,
          address: '10 Downing Street',
        },
        {
          key: '2',
          name: 'John',
          age: 42,
          address: '10 Downing Street',
        },
      ];
      
      const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
        },
        {
          title: 'Age',
          dataIndex: 'age',
          key: 'age',
        },
        {
          title: 'Address',
          dataIndex: 'address',
          key: 'address',
        },
      ];
    useEffect(() => {
        console.log(data)
    },[data])
    return(
        <div>
            <h1>Listado de clientes</h1>
            <Table dataSource={dataSource} columns={columns} bordered />
        </div>
    );
}