import express from "express";
import pool from "../db/config.js";

const ordersRouter = express.Router();

ordersRouter.post("/", async (req, res) => {
  const { userId, items } = req.body;

  if (!userId || !items || !items.length) {
    return res.status(400).json({ error: "Dados do pedido inválidos." });
  }

  const connection = await pool.getConnection();

  try {
    // Começa uma transação
    await connection.beginTransaction();

    // Inserir o pedido na tabela `pedidos`
    const [result] = await connection.query(
      "INSERT INTO pedidos (user_id, status) VALUES (?, ?)",
      [userId, "pending"]
    );
    const orderId = result.insertId;

    // Inserir itens do pedido
    const orderItems = items.map((item) => [
      orderId,
      item.productId,
      1,
    ]);
    await connection.query(
      "INSERT INTO pedido_produtos (pedido_id, product_id, quantidade) VALUES ?",
      [orderItems]
    );

    // Comitar a transação
    await connection.commit();

    // Enviar resposta de sucesso
    res.status(201).json({ message: "Pedido criado com sucesso!" });
  } catch (err) {
    // Reverter a transação em caso de erro
    await connection.rollback();
    console.error(err);
    res.status(500).json({ error: "Erro ao criar pedido." });
  } finally {
    // Liberar a conexão
    connection.release();
  }
});
ordersRouter.get("/user/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    // Obter pedidos do usuário
    const [orders] = await pool.query(
      "SELECT * FROM pedidos WHERE user_id = ?",
      [userId]
    );

    if (orders.length === 0) {
      return res.status(404).json({ error: "Nenhum pedido encontrado para este usuário." });
    }

    // Obter itens de cada pedido
    const ordersWithItems = await Promise.all(orders.map(async (order) => {
      const [items] = await pool.query(
        "SELECT * FROM pedido_produtos WHERE pedido_id = ?",
        [order.id]
      );

      return {
        ...order,
        items
      };
    }));

    res.json(ordersWithItems);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar pedidos do usuário." });
  }
});

// READ - Obter um pedido por ID
ordersRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM pedidos WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar pedido" });
  }
});

// UPDATE - Atualizar um pedido por ID
ordersRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { user_id, status } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE pedidos SET user_id = ?, status = ? WHERE id = ?",
      [user_id, status, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }
    res.json({ message: "Pedido atualizado com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar pedido" });
  }
});

// DELETE - Excluir um pedido por ID
ordersRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query("DELETE FROM pedidos WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Pedido não encontrado" });
    }
    res.json({ message: "Pedido excluído com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao excluir pedido" });
  }
});

export default ordersRouter;
