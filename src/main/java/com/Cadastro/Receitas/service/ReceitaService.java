package com.Cadastro.Receitas.service;

import com.Cadastro.Receitas.models.Receita;
import com.Cadastro.Receitas.repository.ReceitaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReceitaService {

    private ReceitaRepository receitaRepository;

    public ReceitaService(ReceitaRepository receitaRepository) {
        this.receitaRepository = receitaRepository;
    }

    public List<Receita> listarTodos() {
        return receitaRepository.findAll();
    }

    public List<Receita> buscarPorTermo(String termo) { // <-- Faz a consulta através
        if (termo == null || termo.isBlank()) {         //     do titulo ou ingrediente
            return receitaRepository.findAll();         //     da receita
        }
           return receitaRepository.findByTituloContainingIgnoreCaseOrIngredientesContainingIgnoreCase(termo, termo);
    }

    public Receita salvar(Receita receita) {
        if (receitaRepository.findById(receita.getId()).isPresent()) {
            throw new RuntimeException("Receita já existente");
        }
        return receitaRepository.save(receita);
    }
    public Receita atualizar(Receita receita) {
        Receita receitaAtualizar = receitaRepository.findById(receita.getId())
                .orElseThrow(() -> new RuntimeException("Receita não existe"));

        receitaAtualizar.setTitulo(receita.getTitulo());
        receitaAtualizar.setDescricao(receita.getDescricao());
        receitaAtualizar.setIngredientes(receita.getIngredientes());
        receitaAtualizar.setModo_de_preparo(receita.getModo_de_preparo());

        return receitaRepository.save(receitaAtualizar);
    }

    public Receita toggleFavoritar(long id) {
        Receita receitaAtualizar = receitaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Receita não existe"));

        receitaAtualizar.setFavorito(!receitaAtualizar.isFavorito()); // <-- Faz a verificação do valor boolean
                                                                      //      Garantindo que ele verifique o valor real
        return receitaRepository.save(receitaAtualizar);
    }

    public List<Receita> ListarFavoritos() {
        return receitaRepository.findByFavoritoTrue();
    }

    public List<Receita> listarReceitasFavoritadas(String termo) {
        return receitaRepository.findByFavoritoTrueAndTituloContainingIgnoreCaseOrFavoritoTrueAndIngredientesContainingIgnoreCase(termo, termo);
    }

    public void remover(long id) {
        Receita receitaAtualizar = receitaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Receita não existe"));
        receitaRepository.deleteById(id);
    }
}
