
-- ===============================
-- NOVAS CONSULTAS ROCKEXPRESS
-- ===============================

-- 1. Listar todos os clientes com seus carrinhos
SELECT 
    u.nome AS cliente,
    c.id AS id_cliente,
    ca.valor_total
FROM cliente c
JOIN usuario u ON c.id = u.id
JOIN carrinho ca ON ca.cliente_id = c.id;

-- 2. Pedidos com total de itens
SELECT 
    p.id AS pedido,
    COUNT(ip.id) AS total_itens,
    p.valor_total
FROM pedido p
JOIN item_pedido ip ON ip.pedido_id = p.id
GROUP BY p.id, p.valor_total;

-- 3. Produtos por categoria
SELECT 
    cat.nome AS categoria,
    pr.nome AS produto,
    pr.preco
FROM produto pr
JOIN categoria cat ON pr.categoria_id = cat.id
ORDER BY cat.nome;

-- 4. Pagamentos realizados (status = 'PAGO')
SELECT 
    p.id AS pedido,
    pg.metodo,
    pg.valor,
    pg.status
FROM pagamento pg
JOIN pedido p ON pg.pedido_id = p.id
WHERE pg.status = 'PAGO';

-- 5. Total de pedidos por cliente
SELECT 
    u.nome AS cliente,
    COUNT(p.id) AS total_pedidos
FROM pedido p
JOIN cliente c ON p.cliente_id = c.id
JOIN usuario u ON c.id = u.id
GROUP BY u.nome;

-- 6. Produtos com maior preço
SELECT 
    nome,
    preco
FROM produto
ORDER BY preco DESC
LIMIT 5;
