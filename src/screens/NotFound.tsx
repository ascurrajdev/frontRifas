import { useNavigate } from "react-router-dom";
import { Result, Button } from "antd";
export function NotFound(){
    const navigate = useNavigate()
    return(
        <Result
            status="404"
            title="404"
            subTitle="Esta pagina no existe o ya expiro."
            extra={
                <Button type="primary" onClick={() => navigate(`/`)}>Volver al Inicio</Button>
            }
        />
    )
}