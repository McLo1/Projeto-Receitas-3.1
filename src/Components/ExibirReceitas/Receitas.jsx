import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './style.css';
import categoriasLegiveis from "../../enums/categoriasLegiveis";

export default function Receitas() {

    const [receitas, setReceitas] = useState([]);

    const navigate = useNavigate();

    const [busca, setBusca] = useState('');

    const handleChange = (event) => {
        setBusca(event.target.value);
    }


    const BuscarNomIng = () => {
        axios.get(`http://localhost:8080/receitas/buscar?termo=${busca}`)
        .then(response => {
            setReceitas(response.data);
            console.log(`Exibindo receitas com a busca ${busca}`);
        })
        .catch(error => {
            console.log("Erro ao buscar receitas", error);
        })
    }




    useEffect(() => {
        axios.get('http://localhost:8080/receitas')
            .then(response => {
                setReceitas(response.data);
                console.log('Receitas obtidas com sucesso:', response.data);
            })
            .catch(error => {
                console.error('Erro ao obter receitas:', error);
            });
    }, []);

    const deletarReceita = (id) => {
        axios.delete(`http://localhost:8080/receitas/${id}`)
            .then(() => {
                setReceitas(receitas.filter(receita => receita.id !== id));
                console.log('Receita deletada com sucesso');
            })
            .catch(error => {
                console.error('Erro ao deletar receita:', error);
            });
    }

    return (
        <div>

            <div className="pesquisa-input-button">
                <input type="text" value={busca} onChange={handleChange} placeholder="Buscar Receitas" />
                <button onClick={BuscarNomIng}>🔍</button>
            </div>

            <ul className="lista-receitas">
                {receitas.map((receita, index) => (
                    <li key={index}>
                        <img src={receita.imagemUrl} alt="imagem_da_Receita" width={200} />
                        <h3>Titulo</h3>
                        <h2>{receita.titulo}</h2>
                        <h3>Descrição</h3>
                        <p>{receita.descricao}</p>
                        <h3>Ingredientes:</h3>
                        <p>{receita.ingredientes}</p>
                        <p>{receita.modoDePreparo}</p>
                        <p><strong>Categorias:</strong> {categoriasLegiveis[receita.categoria]}</p>
                        <button className="lista-receitas-delete" onClick={() => deletarReceita(receita.id)}>🗑️</button>
                    </li>

                ))}
                <button className="lista-receitas-Home" onClick={() => navigate('/')}>Voltar para tela inicial</button>

            </ul>
        </div>
    )

}
