
-- ===============================
-- NOVO TRIGGER ROCKEXPRESS
-- ===============================

DELIMITER //

-- Atualiza status do pedido automaticamente para 'PAGO'
-- quando um pagamento com status 'PAGO' é inserido

CREATE TRIGGER trg_atualizar_status_pedido
AFTER INSERT ON pagamento
FOR EACH ROW
BEGIN
    IF NEW.status = 'PAGO' THEN
        UPDATE pedido
        SET status = 'PAGO'
        WHERE id = NEW.pedido_id;
    END IF;
END //

DELIMITER ;
