package com.example.demo.controller;

import com.example.demo.dto.CarrinhoDTO;
import com.example.demo.dto.CarrinhoResponseDTO;
import com.example.demo.model.Carrinho;
import com.example.demo.service.CarrinhoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/carrinhos")
@CrossOrigin(origins = "http://localhost:5173")
public class CarrinhoController {

    @Autowired
    private CarrinhoService carrinhoService;

    // ===============================
    // GET - Buscar carrinho
    // ===============================
    @GetMapping("/{clienteId}")
    public ResponseEntity<?> getCarrinho(@PathVariable Long clienteId) {
        try {
            Carrinho carrinho = carrinhoService.getCarrinhoByClienteId(clienteId);
            return ResponseEntity.ok(toResponseDTO(carrinho));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // ===============================
    // POST - Adicionar produto
    // ===============================
    @PostMapping("/{clienteId}/adicionar")
    public ResponseEntity<?> adicionarAoCarrinho(
            @PathVariable Long clienteId,
            @RequestBody CarrinhoDTO request) {

        try {
            Carrinho carrinho = carrinhoService.adicionarProduto(
                    clienteId,
                    request.getProdutoId(),
                    request.getQuantidade()
            );

            return ResponseEntity.ok(toResponseDTO(carrinho));

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // ===============================
    // DELETE - Remover produto
    // ===============================
    @DeleteMapping("/{clienteId}/remover/{produtoId}")
    public ResponseEntity<?> removerDoCarrinho(
            @PathVariable Long clienteId,
            @PathVariable Long produtoId) {

        try {
            Carrinho carrinho = carrinhoService.removerProduto(clienteId, produtoId);
            return ResponseEntity.ok(toResponseDTO(carrinho));
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // ===============================
    // PUT - Atualizar quantidade
    // ===============================
    @PutMapping("/{clienteId}/atualizar/{produtoId}")
    public ResponseEntity<?> atualizarQuantidade(
            @PathVariable Long clienteId,
            @PathVariable Long produtoId,
            @RequestParam int quantidade) {

        try {
            Carrinho carrinho =
                    carrinhoService.atualizarQuantidade(clienteId, produtoId, quantidade);

            return ResponseEntity.ok(toResponseDTO(carrinho));

        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    // ===============================
    // MÉTODO CENTRAL DE MAPEAMENTO
    // ===============================
    private CarrinhoResponseDTO toResponseDTO(Carrinho carrinho) {

        List<CarrinhoResponseDTO.ItemDTO> itensDTO =
                carrinho.getItens().stream().map(item -> {
                    CarrinhoResponseDTO.ItemDTO dto =
                            new CarrinhoResponseDTO.ItemDTO();

                    dto.setProdutoId(
                            ((Number) item.getProduto().getId()).longValue()
                    );
                    dto.setNomeProduto(item.getProduto().getNome());
                    dto.setQuantidade(item.getQuantidade());
                    dto.setPreco(item.getPreco());

                    return dto;
                }).collect(Collectors.toList());

        CarrinhoResponseDTO response = new CarrinhoResponseDTO();
        response.setId(carrinho.getId());
        response.setItens(itensDTO);
        response.setValorTotal(carrinho.getValorTotal());

        return response;
    }
}
