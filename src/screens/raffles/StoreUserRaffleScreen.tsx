import { Button, Form, Input, Select, Spin, message } from "antd";
import { useState, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import lodash from 'lodash'
import { searchUsers } from "../../services/users";
import { storeUserRaffle } from "../../services/usersRaffle";
export function StoreUserRaffleScreen(){
    const {raffleId} = useParams()
    const [fetching, setFetching] = useState(false);
    const [options, setOptions] = useState([]);
    const fetchRef = useRef(0)
    const navigate = useNavigate()
    const debounceFetcher = useMemo(() => {
        const loadOptions = (value: string) => {
          fetchRef.current += 1;
          const fetchId = fetchRef.current;
          setOptions([]);
          setFetching(true);
    
          searchUsers(value).then((data) => {
            if (fetchId !== fetchRef.current) {
              return;
            }
            let options = []
            options = data?.data?.map((user: any) => (
                {
                    label: `${user.name} - ${user.email}`,
                    value: user.id
                }
            ))
            setOptions(options);
            setFetching(false);
          });
        };
    
        return lodash.debounce(loadOptions, 800);
      }, [searchUsers, 800]);
    const handleFinishForm = (fields: any) => {
        let data = {
            user_id: fields.user_id.value,
            min_number: fields.min_number,
            max_number: fields.max_number
        }
        storeUserRaffle(data,raffleId ?? "").then((data) => {
            message.success('Se ha registrado correctamente')
            navigate(`/raffles/${raffleId}/users`)
        })
    }
    return(
        <div>
            <h1>Nuevo Usuario</h1>
            <Form
                layout="vertical"
                onFinish={handleFinishForm}
            >
                <Form.Item
                    name="user_id"
                    label="Usuario"
                    rules={[{required:true, message:'Debe seleccionar un usuario'}]}
                >
                    <Select
                        showSearch
                        labelInValue
                        filterOption={false}
                        onSearch={debounceFetcher}
                        notFoundContent={fetching ? <Spin size="small" /> : null}
                        options={options}
                        />
                </Form.Item>
                <Form.Item
                    name="min_number"
                    label="Nro. Desde"
                    rules={[{required:true, message:'El numero minimo es requerido'}]}
                >
                    <Input type="number"/>
                </Form.Item>
                <Form.Item
                    name="max_number"
                    label="Nro. Hasta"
                    rules={[{required:true, message:'El numero maximo es requerido'}]}
                >
                    <Input type="number"/>
                </Form.Item>
                <Form.Item>
                    <Button htmlType="submit" type="primary">Guardar</Button>
                </Form.Item>
            </Form>
        </div>
    )
}