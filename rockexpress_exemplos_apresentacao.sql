USE rockexpress;

-- =====================================================
-- CONSULTA 1 - Listar todos os usuários cadastrados
-- =====================================================

SELECT id, nome, email, nivel_acesso, ativo, data_cadastro
FROM usuario;

-- =====================================================
-- CONSULTA 2 - Listar produtos com preço maior que R$ 50,00
-- =====================================================

SELECT id, nome, preco, estoque
FROM produto
WHERE preco > 50.00;

-- =====================================================
-- CONSULTA 3 - Contar quantos produtos existem em cada categoria
-- =====================================================

SELECT c.nome AS categoria,
       COUNT(p.id) AS quantidade_produtos
FROM categoria c
LEFT JOIN produto p ON p.categoria_id = c.id
GROUP BY c.nome;

-- =====================================================
-- CONSULTA 4 - Detalhes completos de um produto específico (id = 1)
-- =====================================================

SELECT p.id,
       p.nome,
       p.descricao,
       p.preco,
       p.estoque,
       c.nome AS categoria,
       u.nome AS vendedor
FROM produto p
JOIN categoria c ON p.categoria_id = c.id
JOIN vendedor v ON p.vendedor_id = v.id
JOIN usuario u ON v.id = u.id
WHERE p.id = 1;

-- =====================================================
-- CONSULTA 5 - Visualizar carrinho de compras de um cliente (cliente id = 2)
-- =====================================================

SELECT u.nome AS cliente,
       p.nome AS produto,
       ic.quantidade,
       ic.preco,
       (ic.quantidade * ic.preco) AS subtotal
FROM carrinho c
JOIN cliente cl ON c.cliente_id = cl.id
JOIN usuario u ON cl.id = u.id
JOIN item_carrinho ic ON ic.carrinho_id = c.id
JOIN produto p ON ic.produto_id = p.id
WHERE cl.id = 2;

-- =====================================================
-- CONSULTA 6 - Listar pedidos com dados do cliente e vendedor
-- =====================================================

SELECT pe.id AS pedido,
       pe.data_inicio,
       pe.status,
       pe.valor_total,
       uc.nome AS cliente,
       uv.nome AS vendedor
FROM pedido pe
JOIN cliente c ON pe.cliente_id = c.id
JOIN usuario uc ON c.id = uc.id
JOIN vendedor v ON pe.vendedor_id = v.id
JOIN usuario uv ON v.id = uv.id;


-- =====================================================
-- TRIGGER 1 - Atualizar automaticamente o valor total do carrinho
-- =====================================================

DELIMITER $$

CREATE TRIGGER atualizar_valor_carrinho
AFTER INSERT ON item_carrinho
FOR EACH ROW
BEGIN
    UPDATE carrinho
    SET valor_total = (
        SELECT IFNULL(SUM(preco * quantidade), 0)
        FROM item_carrinho
        WHERE carrinho_id = NEW.carrinho_id
    )
    WHERE id = NEW.carrinho_id;
END$$

DELIMITER ;

-- Testar a trigger inserindo item no carrinho: 
-- SELECT * FROM carrinho WHERE id = 1;
-- INSERT INTO item_carrinho (preco, quantidade, carrinho_id, produto_id) VALUES (100.00, 2, 1, 1);
