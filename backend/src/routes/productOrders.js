import express from "express";
import pool from "../db/config.js";

const productOrdersRouter = express.Router();

// CREATE - Adicionar produtos a um pedido
productOrdersRouter.post("/", async (req, res) => {
  const { pedido_id, produto_id, quantidade } = req.body;
  
  try {
    const result = await pool.query(
      "INSERT INTO pedido_produtos (pedido_id, produto_id, quantidade) VALUES (?, ?, ?)",
      [pedido_id, produto_id, quantidade]
    );
    res.status(201).json({ id: result[0].insertId, pedido_id, produto_id, quantidade });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao adicionar produto ao pedido" });
  }
});

// READ - Obter todos os produtos de um pedido específico
productOrdersRouter.get("/", async (req, res) => {
  const { pedido_id } = req.query; // Espera-se que o pedido_id seja passado como query parameter

  try {
    const [rows] = await pool.query(
      "SELECT * FROM pedido_produtos WHERE pedido_id = ?",
      [pedido_id]
    );
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar produtos do pedido" });
  }
});

// READ - Obter um produto específico de um pedido
productOrdersRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM pedido_produtos WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Produto do pedido não encontrado" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar produto do pedido" });
  }
});

// UPDATE - Atualizar quantidade de um produto em um pedido
productOrdersRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { quantidade } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE pedido_produtos SET quantidade = ? WHERE id = ?",
      [quantidade, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Produto do pedido não encontrado" });
    }
    res.json({ message: "Quantidade atualizada com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar quantidade do produto" });
  }
});

// DELETE - Remover um produto de um pedido
productOrdersRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query("DELETE FROM pedido_produtos WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Produto do pedido não encontrado" });
    }
    res.json({ message: "Produto removido do pedido com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao remover produto do pedido" });
  }
});

export default productOrdersRouter;
