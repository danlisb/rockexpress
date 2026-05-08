USE rockexpress;

START TRANSACTION;

-- =========================
-- USUÁRIOS
-- =========================
INSERT INTO usuario (id, ativo, data_cadastro, email, nivel_acesso, nome, senha) VALUES
(1, b'1', NOW(), 'admin@rockexpress.com', 'ADMIN', 'Administrador Geral', '123456'),
(2, b'1', NOW(), 'cliente@rockexpress.com', 'CLIENTE', 'Daniel Lisboa', '123456'),
(3, b'1', NOW(), 'vendedor@rockexpress.com', 'VENDEDOR', 'Rock Store', '123456');

-- =========================
-- PERFIS
-- =========================
INSERT INTO administrador (id, nivel_acesso_especial) VALUES
(1, 10);

INSERT INTO cliente (id, cpf) VALUES
(2, '123.456.789-00');

INSERT INTO vendedor (id, cnpj) VALUES
(3, '12.345.678/0001-99');

-- =========================
-- CARRINHO
-- =========================
INSERT INTO carrinho (id, valor_total, cliente_id) VALUES
(1, 0.00, 2);

UPDATE cliente SET carrinho_id = 1 WHERE id = 2;

-- =========================
-- ENDEREÇOS
-- =========================
INSERT INTO endereco (
  bairro, cep, cidade, estado, logradouro, numero, cliente_id, usuario_id
) VALUES (
  'Centro', '96010-000', 'Pelotas', 'RS', 'Rua Principal', '123', 2, 2
);

INSERT INTO cliente_enderecos (cliente_id, enderecos_id) VALUES
(2, 1);

-- =========================
-- CATEGORIAS
-- =========================
INSERT INTO categoria (nome, descricao) VALUES
('Camisetas', 'Camisetas de bandas de rock'),
('Acessórios', 'Acessórios temáticos'),
('Vinil', 'Discos de vinil clássicos');

-- =========================
-- PRODUTOS
-- =========================
INSERT INTO produto (
  ativo, data_cadastro, nome, descricao, estoque, preco, categoria_id, vendedor_id
) VALUES
(b'1', NOW(), 'Camiseta Metallica', 'Camiseta preta banda Metallica', 50, 89.90, 1, 3),
(b'1', NOW(), 'Pulseira Rock', 'Pulseira de couro com spikes', 30, 39.90, 2, 3),
(b'1', NOW(), 'Vinil AC/DC', 'Highway to Hell - Vinil', 10, 199.90, 3, 3);

-- =========================
-- ITENS DO CARRINHO
-- =========================
INSERT INTO item_carrinho (preco, quantidade, carrinho_id, produto_id) VALUES
(89.90, 2, 1, 1),
(39.90, 1, 1, 2);

UPDATE carrinho SET valor_total = 219.70 WHERE id = 1;

-- =========================
-- PEDIDO
-- =========================
INSERT INTO pedido (
  id, data_inicio, status, valor_total, cliente_id, vendedor_id
) VALUES (
  1, NOW(), 'PAGO', 219.70, 2, 3
);

-- =========================
-- ITENS DO PEDIDO
-- =========================
INSERT INTO item_pedido (preco, quantidade, pedido_id, produto_id) VALUES
(89.90, 2, 1, 1),
(39.90, 1, 1, 2);

-- =========================
-- PAGAMENTO
-- =========================
INSERT INTO pagamento (
  data_pagamento, metodo, status, valor, pedido_id
) VALUES (
  NOW(), 'CARTAO_CREDITO', 'PAGO', 219.70, 1
);

COMMIT;
