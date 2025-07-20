package com.Cadastro.Receitas.controller;

import com.Cadastro.Receitas.models.Receita;
import com.Cadastro.Receitas.service.ReceitaService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/receitas")
@CrossOrigin(origins = "http://localhost:5173")
public class ReceitaController {
    private ReceitaService receitaService;

    public ReceitaController(ReceitaService receitaService) {
        this.receitaService = receitaService;
    }

    @GetMapping
    public List<Receita> listar() {
        return receitaService.listarTodos();
    }

    @GetMapping("/buscar")
    public List<Receita> buscarTermo(@RequestParam(required = false) String termo) {
            return receitaService.buscarPorTermo(termo); // < --- Controller para buscar por ingredientes ou titulo
    }

    @GetMapping("/favoritos")
    public ResponseEntity<List<Receita>> buscarFavoritos() {
        return ResponseEntity.ok(receitaService.ListarFavoritos());
    }

    @GetMapping("/favoritos/buscar")
    public List<Receita> listarReceitasFavoritadas(@RequestParam(required = false) String termo) {
        return receitaService.listarReceitasFavoritadas(termo);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> Salvar(@Valid @RequestBody Receita receita) {
        receitaService.salvar(receita);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of("Mensagem:", "Receita Salvo com sucesso!"));
    }


        @PostMapping("/upload-imagem")
        public ResponseEntity<String> uploadImagem(@RequestParam("imagem") MultipartFile imagem) {
            try {
                // Pasta absoluta para salvar as imagens
                String pastaUploads = "C:/uploads/";

                // Nome do arquivo seguro (remove caracteres estranhos)
                String nomeArquivo = System.currentTimeMillis() + "_" +
                        imagem.getOriginalFilename().replaceAll("[^a-zA-Z0-9\\.\\-]", "_");

                // Cria o arquivo destino
                File arquivoDestino = new File(pastaUploads + nomeArquivo);

                // Cria os diretórios se não existirem
                arquivoDestino.getParentFile().mkdirs();

                // Salva o arquivo no disco
                imagem.transferTo(arquivoDestino);

                // Retorna a URL pública para acessar a imagem
                String urlImagem = "http://localhost:8080/uploads/" + nomeArquivo;
                return ResponseEntity.ok(urlImagem);

            } catch (IOException e) {
                e.printStackTrace();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("Erro ao salvar imagem: " + e.getMessage());
            }
        }


    @PutMapping
    public ResponseEntity<Map<String, Object>> atualizar(@Valid @RequestBody Receita receita) {
        receitaService.atualizar(receita);
        return ResponseEntity.status(HttpStatus.OK)
                .body(Map.of("Mensagem:", "Receita Atualizada com sucesso!"));
    }

    @PutMapping("/{id}/favorito")
    public ResponseEntity<Map<String, Object>> Toggle_Favoritar(@PathVariable long id) {
        receitaService.toggleFavoritar(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(Map.of("Mensagem:", "Receita Favoritada com sucesso!"));
    }

    @DeleteMapping("{id}")
    public ResponseEntity<Map<String, Object>> deletar(@PathVariable long id) {
        receitaService.remover(id);
        return ResponseEntity.status(HttpStatus.OK)
                .body(Map.of("Mensagem:", "Receita Excluida com sucesso!"));
    }
}
