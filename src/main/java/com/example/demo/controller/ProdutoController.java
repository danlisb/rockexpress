package com.example.demo.controller;

import com.example.demo.dto.ProdutoCreateDTO;
import com.example.demo.dto.ProdutoResponseDTO;
import com.example.demo.model.Produto;
import com.example.demo.service.ProdutoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/produtos")
@CrossOrigin(origins = "http://localhost:5173")
public class ProdutoController {

    @Autowired
    private ProdutoService produtoService;

    // ===============================
    // GET - Produto por ID
    // ===============================
    @GetMapping("/{id}")
    public ResponseEntity<?> buscarPorId(@PathVariable Long id) {
        return produtoService.buscarPorId(id)
                .map(produto -> ResponseEntity.ok(toResponseDTO(produto)))
                .orElse(ResponseEntity.notFound().build());
    }

    // ===============================
    // GET - Produtos por vendedor
    // ===============================
    @GetMapping("/vendedor/{vendedorId}")
    public ResponseEntity<?> listarPorVendedor(@PathVariable Long vendedorId) {
        try {
            List<Produto> produtos = produtoService.listarPorVendedor(vendedorId);

            List<ProdutoResponseDTO> response =
                    produtos.stream()
                            .map(this::toResponseDTO)
                            .collect(Collectors.toList());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // ===============================
    // POST - Adicionar produto
    // ===============================
    @PostMapping("/vendedor/{vendedorId}")
    public ResponseEntity<?> adicionarProduto(
            @PathVariable Long vendedorId,
            @RequestBody ProdutoCreateDTO produtoDTO) {

        try {
            Produto produto = produtoService.adicionarProduto(vendedorId, produtoDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(toResponseDTO(produto));

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // ===============================
    // GET - Listar N produtos
    // ===============================
    @GetMapping("/listar/{n}")
    public ResponseEntity<?> listarNProdutos(@PathVariable int n) {
        try {
            List<Produto> produtos = produtoService.listarNProdutos(n);

            List<ProdutoResponseDTO> response =
                    produtos.stream()
                            .map(this::toResponseDTO)
                            .collect(Collectors.toList());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // ===============================
    // MAPEAMENTO CENTRAL DTO
    // ===============================
    private ProdutoResponseDTO toResponseDTO(Produto produto) {
        ProdutoResponseDTO dto = new ProdutoResponseDTO();

        dto.setId(((Number) produto.getId()).longValue());
        dto.setNome(produto.getNome());
        dto.setDescricao(produto.getDescricao());
        dto.setPreco(produto.getPreco());
        dto.setEstoque(produto.getEstoque());
        dto.setAtivo(produto.getAtivo());
        dto.setImagemBase64(produto.getImagemBase64());

        return dto;
    }
}
