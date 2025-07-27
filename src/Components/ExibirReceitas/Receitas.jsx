import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './style.css';
import categoriasLegiveis from "../../enums/categoriasLegiveis";
import Compartilhar from "../modalCompartilhar/compartilhar";

export default function Receitas() {

    const [receitas, setReceitas] = useState([]);

    const navigate = useNavigate();

    const [busca, setBusca] = useState('');

    const handleChange = (event) => {
        setBusca(event.target.value);
    }


    const [mostrarModal, isModalOpen] = useState(false) // <<-- Botão para abrir o modal compartilhar receitas
    const [receitaselecionada, setReceitaSelecionada] = useState(null);

    const abrirModal = (receita) => {
        setReceitaSelecionada(receita);
        isModalOpen(true);
    };

    const fecharModal = () => isModalOpen(false);

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

    function toggleFavorito(id) {
        axios.put(`http://localhost:8080/receitas/${id}/favorito`)
            .then(res => {
                console.log('Favorito atualizado', res.data);
                // Aqui você pode atualizar o estado para refletir no frontend
            })
            .catch(err => {
                console.error('Erro ao atualizar favorito', err);
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
                        <h3>Modo de Preparo:</h3>
                        <p>{receita.modo_de_preparo}</p>
                        <p><strong>Categorias:</strong> {categoriasLegiveis[receita.categoria]}</p>
                        <div className="deletar-favoritar">
                            <button className="lista-receitas-delete" onClick={() => deletarReceita(receita.id)}>🗑️</button>
                            <button className="lista-receitas-favoritar" onClick={() => toggleFavorito(receita.id)}>⭐</button>
                            <button className="lista-receitas-compartilhar" onClick={() => abrirModal(receita)}>🔗</button>
                        </div>
                    </li>

                ))}
                <button className="lista-receitas-Home" onClick={() => navigate('/')}>Voltar para tela inicial</button>

            </ul>

            {mostrarModal && <Compartilhar fecharModal={fecharModal} receita={receitaselecionada} />}
        </div>
    )

}
