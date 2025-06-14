import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Cadastro.css';
import Categorias from "../../enums/categoria";
import categoriasLegiveis from "../../enums/categoriasLegiveis";

export default function Cadastro() {
  const navigate = useNavigate();

  const [receita, setReceita] = useState({
    titulo: '',
    descricao: '',
    ingredientes: '',
    modo_de_preparo: '',
    imagemUrl: '',
    categoria: '',
  });

  

  const [imagemArquivo, setImagemArquivo] = useState(null);
  const [tipoImagem, setTipoImagem] = useState("url");

  const novaReceita = async (e) => {
    e.preventDefault();

    if (tipoImagem === "upload" && imagemArquivo) {
      const formData = new FormData();
      formData.append('imagem', imagemArquivo);

      const imagemresponse = await axios.post('http://localhost:8080/receitas/upload-imagem', formData);
      const imagemUrl = imagemresponse.data;

      console.log('Imagem enviada com sucesso:', imagemUrl);
      
      const receitaAtualizada = {
        ...receita,
        imagemUrl: imagemUrl
      };

      await axios.post('http://localhost:8080/receitas', receitaAtualizada);

    } else {
      axios.post('http://localhost:8080/receitas', receita )
      .then(response => {
        console.log('Receita cadastrada com sucesso:', response.data);
        console.log('Receita', receita)
      })
      .catch(error => {
        console.error('Erro ao cadastrar receita:', error);
      });
    }
  }

  return (
    <div className="cadastro">
      <h1>Cadastro de Receita</h1>
      <form onSubmit={novaReceita} className="form-cadastro-receita">
        <label htmlFor="titulo">Título:</label>
        <input
          type="text"
          id="titulo"
          value={receita.titulo}
          onChange={(e) => setReceita({ ...receita, titulo: e.target.value })}
          required
        />

        <label htmlFor="descricao">Descrição:</label>
        <textarea
          type="text"
          id="descricao"
          value={receita.descricao}
          onChange={(e) => setReceita({ ...receita, descricao: e.target.value })}
          required
        ></textarea>

        <label htmlFor="ingredientes">Ingredientes:</label>
        <textarea
          type="text"
          id="ingredientes"
          value={receita.ingredientes}
          onChange={(e) => setReceita({ ...receita, ingredientes: e.target.value })}
          required
        ></textarea>

        <label htmlFor="modoPreparo">Modo de Preparo:</label>
        <textarea
         type="text"
          id="modo_de_Preparo"
          value={receita.modo_de_preparo}
          onChange={(e) => setReceita({ ...receita, modo_de_preparo: e.target.value })}
          required
        ></textarea>

        <label htmlFor="categorias">Categorias:</label>
        <select
          id="categoria"
          value={receita.categoria}
          onChange={(e) => setReceita({ ...receita, categoria: e.target.value })}
        >
          <option value="">Selecione uma categoria</option>
          {Object.values(Categorias).map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoriasLegiveis[categoria] || categoria}
            </option>
          ))}
        </select>

        <label>Tipo de imagem:</label>
        <select
          value={tipoImagem}
          onChange={(e) => {
            setTipoImagem(e.target.value);
            setReceita((r) => ({ ...r, imagemUrl: '' }));
            setImagemArquivo(null);
          }}
        >
          <option value="url">Imagem por URL</option>
          <option value="upload">Fazer upload da imagem</option>
        </select>

        {tipoImagem === "url" ? (
          <>
            <label>URL da imagem:</label>
            <input
              type="text"
              value={receita.imagemUrl ?? ''}
              onChange={(e) =>
                setReceita({ ...receita, imagemUrl: e.target.value })
              }
            />
          </>
        ) : (
          <>
            <label>Upload da imagem:</label>
            <input
              type="file"
              accept="image/*"
              key="upload" // força recriação do input quando tipo muda
              onChange={(e) => setImagemArquivo(e.target.files[0])}
            />
          </>
        )}

        <button type="submit" className="botao" onClick={novaReceita}>Cadastrar</button>
        <button type="button" onClick={() => navigate('/')} className="botao">
          Voltar à tela inicial
        </button>
      </form>
    </div>
  );
}
