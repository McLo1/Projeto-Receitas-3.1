package com.Cadastro.Receitas.repository;

import com.Cadastro.Receitas.models.Receita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReceitaRepository extends JpaRepository<Receita, Long> {

    @Query
    List<Receita> findByTituloContainingIgnoreCaseOrIngredientesContainingIgnoreCase(String titulo, String ingredientes);

    @Query
    List<Receita> findByFavoritoTrue();

    @Query
    List<Receita> findByFavoritoTrueAndTituloContainingIgnoreCaseOrFavoritoTrueAndIngredientesContainingIgnoreCase(String titulo, String ingredientes);

}
