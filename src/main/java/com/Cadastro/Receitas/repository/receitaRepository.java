package com.Cadastro.Receitas.repository;

import com.Cadastro.Receitas.models.Receita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface receitaRepository extends JpaRepository<Receita, Long> {

    Optional<Receita> findById(long id);

}
