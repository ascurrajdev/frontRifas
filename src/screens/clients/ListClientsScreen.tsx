import { Table } from "antd";
import { getAllClients } from "../../services/clients";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
export const ListClientsScreen = () => {
  const [listClients, setListClients] = useState([]);
  const {data, isLoading} = useQuery({
      queryKey:['clients','index'],
      queryFn: () => getAllClients()
  })
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Cellphone',
      dataIndex: 'cellphone',
      key: 'cellphone',
    },
  ];
  useEffect(() => {
    if(!!data){
      setListClients(data.data)
    }
  },[data])
  return(
      <div>
          <h1>Listado de clientes</h1>
          <Table dataSource={listClients} loading={isLoading} columns={columns} bordered />
      </div>
  );
}