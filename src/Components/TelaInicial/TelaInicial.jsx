import { Navigate, useNavigate } from "react-router-dom"
import './TelaInicialStyle.css';

export default function TelaInicial() {

    const navigate = useNavigate();

    return (
        <div className="home">

            <div className="button-container">
                <button onClick={() => navigate("/Receitas")}>Verificar Receitas Salvas</button>
                <button onClick={() => navigate("/Cadastro")}>Cadastrar Nova Receita</button>

            </div>
        </div>
    );
}
