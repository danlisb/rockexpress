-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 17/02/2026 às 01:56
-- Versão do servidor: 10.4.28-MariaDB
-- Versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `rockexpress`
--

-- --------------------------------------------------------

--
-- Estrutura para tabela `administrador`
--

CREATE TABLE IF NOT EXISTS `administrador` (
  `nivel_acesso_especial` int(11) NOT NULL,
  `id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `avaliacao`
--

CREATE TABLE IF NOT EXISTS `avaliacao` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ativo` bit(1) NOT NULL,
  `comentario` varchar(2000) DEFAULT NULL,
  `data_avaliacao` datetime(6) NOT NULL,
  `nota` int(11) NOT NULL,
  `cliente_id` bigint(20) NOT NULL,
  `produto_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKpogwypj6dq5o1p5vu3q31lifm` (`cliente_id`),
  KEY `FK7qu25chyabrdpl82m6ga9gpjh` (`produto_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `carrinho`
--

CREATE TABLE IF NOT EXISTS `carrinho` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `valor_total` decimal(10,2) NOT NULL,
  `cliente_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKd2amlxdq5n5mho547c1338tm6` (`cliente_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `categoria`
--

CREATE TABLE IF NOT EXISTS `categoria` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `descricao` varchar(1000) DEFAULT NULL,
  `nome` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKprx5elpv558ah8pk8x18u56yc` (`nome`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `cliente`
--

CREATE TABLE IF NOT EXISTS `cliente` (
  `cnpj` varchar(255) DEFAULT NULL,
  `cpf` varchar(255) DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  `carrinho_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK2vf89ija5fea0souakqh3bg59` (`cnpj`),
  UNIQUE KEY `UKr1u8010d60num5vc8fp0q1j2a` (`cpf`),
  UNIQUE KEY `UKq72w0o6bpa2nnssvsxfycwb8` (`carrinho_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `cliente_enderecos`
--

CREATE TABLE IF NOT EXISTS `cliente_enderecos` (
  `cliente_id` bigint(20) NOT NULL,
  `enderecos_id` bigint(20) NOT NULL,
  UNIQUE KEY `UKesopwo551jm1jhv15aghmt4i6` (`enderecos_id`),
  KEY `FKbr7t5gnjf71hvnxhu13pdlu7p` (`cliente_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `endereco`
--

CREATE TABLE IF NOT EXISTS `endereco` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `bairro` varchar(255) NOT NULL,
  `cep` varchar(255) NOT NULL,
  `cidade` varchar(255) NOT NULL,
  `complemento` varchar(255) DEFAULT NULL,
  `estado` varchar(255) NOT NULL,
  `logradouro` varchar(255) NOT NULL,
  `numero` varchar(255) NOT NULL,
  `cliente_id` bigint(20) NOT NULL,
  `usuario_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8s7ivtl4foyhrfam9xqom73n9` (`cliente_id`),
  KEY `FKekdpb8k6gmp3lllla9d1qgmxk` (`usuario_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `item_carrinho`
--

CREATE TABLE IF NOT EXISTS `item_carrinho` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `preco` decimal(10,2) NOT NULL,
  `quantidade` int(11) NOT NULL,
  `carrinho_id` bigint(20) NOT NULL,
  `produto_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKr3dusq21jhlttwc4hanxhlbua` (`carrinho_id`),
  KEY `FK7he6x1mtdwm4fmlsa09yxjifx` (`produto_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `item_pedido`
--

CREATE TABLE IF NOT EXISTS `item_pedido` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `preco` decimal(10,2) NOT NULL,
  `quantidade` int(11) NOT NULL,
  `pedido_id` bigint(20) NOT NULL,
  `produto_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK60ym08cfoysa17wrn1swyiuda` (`pedido_id`),
  KEY `FKtk55mn6d6bvl5h0no5uagi3sf` (`produto_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `pagamento`
--

CREATE TABLE IF NOT EXISTS `pagamento` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `data_pagamento` datetime(6) NOT NULL,
  `metodo` varchar(255) NOT NULL,
  `status` enum('FALHOU','PAGO','PENDENTE') NOT NULL,
  `valor` decimal(10,2) NOT NULL,
  `pedido_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKsc46s3wc046ujpdoumidm4cr7` (`pedido_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `pedido`
--

CREATE TABLE IF NOT EXISTS `pedido` (
  `id` bigint(20) NOT NULL,
  `data_inicio` datetime(6) NOT NULL,
  `status` enum('CANCELADO','ENTREGUE','ENVIADO','PAGO','PENDENTE') NOT NULL,
  `valor_total` decimal(10,2) NOT NULL,
  `cliente_id` bigint(20) NOT NULL,
  `vendedor_id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK30s8j2ktpay6of18lbyqn3632` (`cliente_id`),
  KEY `FKi6y72r3lhf410eb1mqbr41bwv` (`vendedor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `pedido_seq`
--

CREATE TABLE IF NOT EXISTS `pedido_seq` (
  `next_val` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Despejando dados para a tabela `pedido_seq`
--

INSERT INTO `pedido_seq` (`next_val`) VALUES
(1);

-- --------------------------------------------------------

--
-- Estrutura para tabela `produto`
--

CREATE TABLE IF NOT EXISTS `produto` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ativo` bit(1) NOT NULL,
  `data_cadastro` datetime(6) NOT NULL,
  `descricao` varchar(1000) DEFAULT NULL,
  `estoque` int(11) NOT NULL,
  `imagem_base64` text DEFAULT NULL,
  `nome` varchar(255) NOT NULL,
  `preco` decimal(10,2) NOT NULL,
  `categoria_id` bigint(20) DEFAULT NULL,
  `vendedor_id` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKopu9jggwnamfv0c8k2ri3kx0a` (`categoria_id`),
  KEY `FKkqdt03qfuuhr6ib9p9kp7omw3` (`vendedor_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `usuario`
--

CREATE TABLE IF NOT EXISTS `usuario` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `ativo` bit(1) NOT NULL,
  `data_cadastro` datetime(6) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nivel_acesso` enum('ADMIN','CLIENTE','VENDEDOR') DEFAULT NULL,
  `nome` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK5171l57faosmj8myawaucatdw` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura para tabela `vendedor`
--

CREATE TABLE IF NOT EXISTS `vendedor` (
  `cnpj` varchar(255) DEFAULT NULL,
  `id` bigint(20) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UKmf9gvcdbica4ghb6gfvroriy3` (`cnpj`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Restrições para tabelas despejadas
--

--
-- Restrições para tabelas `administrador`
--
ALTER TABLE `administrador`
  ADD CONSTRAINT `FK2pojw9weqmkc0476cs86vyyrb` FOREIGN KEY (`id`) REFERENCES `usuario` (`id`);

--
-- Restrições para tabelas `avaliacao`
--
ALTER TABLE `avaliacao`
  ADD CONSTRAINT `FK7qu25chyabrdpl82m6ga9gpjh` FOREIGN KEY (`produto_id`) REFERENCES `produto` (`id`),
  ADD CONSTRAINT `FKpogwypj6dq5o1p5vu3q31lifm` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`);

--
-- Restrições para tabelas `carrinho`
--
ALTER TABLE `carrinho`
  ADD CONSTRAINT `FKd2amlxdq5n5mho547c1338tm6` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`);

--
-- Restrições para tabelas `cliente`
--
ALTER TABLE `cliente`
  ADD CONSTRAINT `FKkatvlvo5aud0l2upf7ml89m4i` FOREIGN KEY (`carrinho_id`) REFERENCES `carrinho` (`id`),
  ADD CONSTRAINT `FKsitxst8o302fspskxfjatuyrl` FOREIGN KEY (`id`) REFERENCES `usuario` (`id`);

--
-- Restrições para tabelas `cliente_enderecos`
--
ALTER TABLE `cliente_enderecos`
  ADD CONSTRAINT `FKbr7t5gnjf71hvnxhu13pdlu7p` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`),
  ADD CONSTRAINT `FKc3dtkjs5dppgk62n356gtfm53` FOREIGN KEY (`enderecos_id`) REFERENCES `endereco` (`id`);

--
-- Restrições para tabelas `denuncia`
--
ALTER TABLE `denuncia`
  ADD CONSTRAINT `FKaupp59qdo0v0ilm58dwmjctsm` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`);

--
-- Restrições para tabelas `denuncia_avaliacao`
--
ALTER TABLE `denuncia_avaliacao`
  ADD CONSTRAINT `FKc91kqgv1nwk1qa6b5ucccwkes` FOREIGN KEY (`avaliacao_id`) REFERENCES `avaliacao` (`id`),
  ADD CONSTRAINT `FKecrg9pll6dfra8yq9o09wsmey` FOREIGN KEY (`id`) REFERENCES `denuncia` (`id`);

--
-- Restrições para tabelas `denuncia_produto`
--
ALTER TABLE `denuncia_produto`
  ADD CONSTRAINT `FK26kab7o6wu9i43oab7ydys74` FOREIGN KEY (`id`) REFERENCES `denuncia` (`id`),
  ADD CONSTRAINT `FKkms3ro793kt0rnt7hd6d2g61i` FOREIGN KEY (`produto_id`) REFERENCES `produto` (`id`);

--
-- Restrições para tabelas `endereco`
--
ALTER TABLE `endereco`
  ADD CONSTRAINT `FK8s7ivtl4foyhrfam9xqom73n9` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`),
  ADD CONSTRAINT `FKekdpb8k6gmp3lllla9d1qgmxk` FOREIGN KEY (`usuario_id`) REFERENCES `usuario` (`id`);

--
-- Restrições para tabelas `item_carrinho`
--
ALTER TABLE `item_carrinho`
  ADD CONSTRAINT `FK7he6x1mtdwm4fmlsa09yxjifx` FOREIGN KEY (`produto_id`) REFERENCES `produto` (`id`),
  ADD CONSTRAINT `FKr3dusq21jhlttwc4hanxhlbua` FOREIGN KEY (`carrinho_id`) REFERENCES `carrinho` (`id`);

--
-- Restrições para tabelas `item_pedido`
--
ALTER TABLE `item_pedido`
  ADD CONSTRAINT `FK60ym08cfoysa17wrn1swyiuda` FOREIGN KEY (`pedido_id`) REFERENCES `pedido` (`id`),
  ADD CONSTRAINT `FKtk55mn6d6bvl5h0no5uagi3sf` FOREIGN KEY (`produto_id`) REFERENCES `produto` (`id`);

--
-- Restrições para tabelas `pagamento`
--
ALTER TABLE `pagamento`
  ADD CONSTRAINT `FKthad9tkw4188hb3qo1lm5ueb0` FOREIGN KEY (`pedido_id`) REFERENCES `pedido` (`id`);

--
-- Restrições para tabelas `pedido`
--
ALTER TABLE `pedido`
  ADD CONSTRAINT `FK30s8j2ktpay6of18lbyqn3632` FOREIGN KEY (`cliente_id`) REFERENCES `cliente` (`id`),
  ADD CONSTRAINT `FKi6y72r3lhf410eb1mqbr41bwv` FOREIGN KEY (`vendedor_id`) REFERENCES `vendedor` (`id`);

--
-- Restrições para tabelas `produto`
--
ALTER TABLE `produto`
  ADD CONSTRAINT `FKkqdt03qfuuhr6ib9p9kp7omw3` FOREIGN KEY (`vendedor_id`) REFERENCES `vendedor` (`id`),
  ADD CONSTRAINT `FKopu9jggwnamfv0c8k2ri3kx0a` FOREIGN KEY (`categoria_id`) REFERENCES `categoria` (`id`);

--
-- Restrições para tabelas `vendedor`
--
ALTER TABLE `vendedor`
  ADD CONSTRAINT `FK56h6euqf4ja8oths7umydy9` FOREIGN KEY (`id`) REFERENCES `usuario` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
