import { Navigate, useNavigate } from "react-router-dom"
import TelaInicial from "../Components/TelaInicial/TelaInicial";

export default function Home() {

    const navigate = useNavigate();

    return(
        <div className="home">
            <h1>Bem-vindo à nossa página inicial!</h1>
            <p>Esta é a página inicial do nosso projeto.</p>
            <p>Você pode navegar para outras seções usando o menu.</p>

            <TelaInicial />
        </div>
    );
}
