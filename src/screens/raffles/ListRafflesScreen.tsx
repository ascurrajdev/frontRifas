import { Card } from "antd";
import {EditOutlined,DeleteOutlined,ControlOutlined} from '@ant-design/icons';
export const ListRafflesScreen = () => {
    return (
        <div>
            <Card
                hoverable
                style={{ width:240 }}
                cover={<img alt="imagen de la rifa" src="https://image.slidesharecdn.com/opencontenthistory-1222747121590635-9/95/ten-years-of-open-content-21-728.jpg?cb=1222722154"/>}
                actions={[
                    <ControlOutlined key="control"/>,
                    <EditOutlined key="edit"/>,
                    <DeleteOutlined key="delete"/>
                ]}
            >
                <Card.Meta title="Pollada de Beneficiencia"/>
                <Card.Meta description="Gs. 20.000" />
                {/* <Switch checkedChildren="Activo" unCheckedChildren="Inactivo"/> */}
            </Card>
        </div>
    )
}