package com.Cadastro.Receitas.service;

import com.Cadastro.Receitas.models.Receita;
import com.Cadastro.Receitas.repository.receitaRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class receitaService {

    private receitaRepository receitaRepository;

    public receitaService(receitaRepository receitaRepository) {
        this.receitaRepository = receitaRepository;
    }

    public List<Receita> listarTodos() {
        return receitaRepository.findAll();
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
    public void remover(long id) {
        Receita receitaAtualizar = receitaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Receita não existe"));
        receitaRepository.deleteById(id);
    }
}
