import { useState } from "react";
import { DeleteOutlined, DownloadOutlined, EditOutlined, QrcodeOutlined } from "@ant-design/icons";
import { Avatar, Button, Card, Modal, Popconfirm, QRCode } from "antd";
import { deleteUsersRaffle } from "../services/raffles";
type UserObj = {
    id: number,
    name: string,
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
interface PropType {
    userRaffle: UserRaffleObj
}
export const CardUser = ({userRaffle}: PropType) => {
    const [isOpenModalQr, setIsOpenModalQr] = useState(false)
    const [qrValue, setQrValue] = useState("");
    const handleOkModalQr = () => {
        setIsOpenModalQr(false);
    }
    const handleCancelModalQr = () => {
        setIsOpenModalQr(false);
    }
    const handleOpenQrModal = ()   => {
        setQrValue(`/market/${userRaffle.id}`);
        setIsOpenModalQr(true)
    }
    const downloadQRCode = () => {
        const canvas = document.getElementById('myqrcode')?.querySelector<HTMLCanvasElement>('canvas');
        if (canvas) {
            const url = canvas.toDataURL();
            const a = document.createElement('a');
            a.download = 'QRCode.png';
            a.href = url;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    };
    const handleDeleteUserRaffle = () => {
        deleteUsersRaffle(userRaffle.raffle_id, userRaffle.id).then((data) => {
            console.log(data)
        }).catch(() => {

        })
    }
    return (
        <>
            <Card
                hoverable
                actions={[
                    <QrcodeOutlined  key="qr" onClick={() => handleOpenQrModal()}/>,
                    <EditOutlined key="control"/>,
                    <Popconfirm
                        title="Eliminar usuario"
                        description="Desea eliminar a este usuario?"
                        onConfirm={handleDeleteUserRaffle}
                    >
                        <DeleteOutlined key="delete"/>
                    </Popconfirm>
                ]}
                >
                <Card.Meta 
                    avatar={<Avatar src={`https://ui-avatars.com/api/?name=${userRaffle.user.name}`}/>}
                    title={userRaffle.user.name}
                    description={`Nro. ${userRaffle.min_number} - ${userRaffle.max_number}`}
                />
            </Card>
            <Modal
                open={isOpenModalQr} 
                onOk={handleOkModalQr} 
                onCancel={handleCancelModalQr}
                footer={[
                    <Button onClick={() => downloadQRCode()} icon={<DownloadOutlined />} type="primary" size="large"/>
                ]}
            >
                <div id="myqrcode">
                    <QRCode value={qrValue}/>
                </div>
            </Modal>
        </>
    )
}