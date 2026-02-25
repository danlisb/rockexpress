package com.example.demo.service;

import com.example.demo.model.Carrinho;
import com.example.demo.model.Cliente;
import com.example.demo.model.ItemCarrinho;
import com.example.demo.model.Produto;
import com.example.demo.repository.CarrinhoRepository;
import com.example.demo.repository.ClienteRepository;
import com.example.demo.repository.ProdutoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Optional;

@Service
public class CarrinhoService {

    private static final Logger logger = LoggerFactory.getLogger(CarrinhoService.class);

    @Autowired
    private CarrinhoRepository carrinhoRepository;

    @Autowired
    private ClienteRepository clienteRepository;

    @Autowired
    private ProdutoRepository produtoRepository;

    /* ===============================
       ADICIONAR PRODUTO
       =============================== */
    @Transactional
    public Carrinho adicionarProduto(Long clienteId, Long produtoId, Integer quantidade) {

        Carrinho carrinho = obterOuCriarCarrinho(clienteId);

        if (carrinho.getItens() == null) {
            carrinho.setItens(new ArrayList<>());
        }

        Produto produto = produtoRepository.findById(produtoId)
                .orElseThrow(() -> new RuntimeException("Produto não encontrado"));

        if (produto.getEstoque() < quantidade) {
            throw new RuntimeException("Estoque insuficiente para o produto: " + produto.getNome());
        }

        Optional<ItemCarrinho> itemExistente = carrinho.getItens().stream()
                .filter(item -> item.getProduto().getId().equals(produtoId))
                .findFirst();

        if (itemExistente.isPresent()) {
            ItemCarrinho item = itemExistente.get();
            item.setQuantidade(item.getQuantidade() + quantidade);
        } else {
            ItemCarrinho novoItem =
                    new ItemCarrinho(carrinho, produto, quantidade, produto.getPreco());
            carrinho.getItens().add(novoItem);
        }

        carrinho.recalcularValorTotal();
        return carrinhoRepository.save(carrinho);
    }

    /* ===============================
       REMOVER PRODUTO
       =============================== */
    @Transactional
    public Carrinho removerProduto(Long clienteId, Long produtoId) {
        Carrinho carrinho = getCarrinhoByClienteId(clienteId);

        boolean removed = carrinho.getItens()
                .removeIf(item -> item.getProduto().getId().equals(produtoId));

        if (!removed) {
            throw new RuntimeException("Produto não encontrado no carrinho");
        }

        carrinho.recalcularValorTotal();
        return carrinhoRepository.save(carrinho);
    }

    /* ===============================
       ATUALIZAR QUANTIDADE
       =============================== */
    @Transactional
    public Carrinho atualizarQuantidade(Long clienteId, Long produtoId, int delta) {
        Carrinho carrinho = getCarrinhoByClienteId(clienteId);

        carrinho.getItens().removeIf(item -> {
            if (item.getProduto().getId().equals(produtoId)) {
                int novaQtd = item.getQuantidade() + delta;
                if (novaQtd <= 0) return true;
                item.setQuantidade(novaQtd);
            }
            return false;
        });

        carrinho.recalcularValorTotal();
        return carrinhoRepository.save(carrinho);
    }

    /* ===============================
       BUSCAR / CRIAR
       =============================== */
    public Carrinho getCarrinhoByClienteId(Long clienteId) {
        return carrinhoRepository.findByClienteId(clienteId)
                .orElseThrow(() ->
                        new RuntimeException("Carrinho não encontrado para o cliente ID: " + clienteId));
    }

    private Carrinho obterOuCriarCarrinho(Long clienteId) {
        return carrinhoRepository.findByClienteId(clienteId)
                .orElseGet(() -> {
                    Cliente cliente = clienteRepository.findById(clienteId)
                            .orElseThrow(() -> new RuntimeException("Cliente não encontrado"));
                    Carrinho carrinho = new Carrinho(cliente);
                    carrinho.setItens(new ArrayList<>());
                    return carrinhoRepository.save(carrinho);
                });
    }
}
