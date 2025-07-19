package com.Cadastro.Receitas.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;

import java.util.Scanner;
@Entity
public class Receita {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @NotBlank(message = "Insira o titulo da receita")
    private String titulo;

    @NotBlank(message = "Insira a descrição da receita")
    @Lob
    private String descricao;

    @NotBlank(message = "Insira os ingredientes da Receita")
    @Column(columnDefinition = "TEXT")
    private String ingredientes;

    @NotBlank(message = "Insira o modo de preparo da Receita")
    @Lob
    private String modo_de_preparo;

    @Lob
    private String imagemUrl;

    @Enumerated(EnumType.STRING)
    private Categorias categoria;

    private boolean Favorito = false;

    public Receita() {
    }

    public Receita(long id, String titulo, String descricao, String ingredientes, String modo_de_preparo, String imagemUrl, Categorias categoria, boolean favorito) {
        this.id = id;
        this.titulo = titulo;
        this.descricao = descricao;
        this.ingredientes = ingredientes;
        this.modo_de_preparo = modo_de_preparo;
        this.imagemUrl = imagemUrl;
        this.categoria = categoria;
        Favorito = favorito;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getIngredientes() {
        return ingredientes;
    }

    public void setIngredientes(String ingredientes) {
        this.ingredientes = ingredientes;
    }

    public String getModo_de_preparo() {
        return modo_de_preparo;
    }

    public void setModo_de_preparo(String modo_de_preparo) {
        this.modo_de_preparo = modo_de_preparo;
    }

    public String getImagemUrl() {
        return imagemUrl;
    }

    public void setImagemUrl(String imagemUrl) {
        this.imagemUrl = imagemUrl;
    }

    public Categorias getCategoria() {
        return categoria;
    }

    public void setCategoria(Categorias categoria) {
        this.categoria = categoria;
    }

    public boolean isFavorito() {
        return Favorito;
    }

    public void setFavorito(boolean favorito) {
        Favorito = favorito;
    }
}