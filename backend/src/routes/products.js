import express from "express";
import pool from "../db/config.js";

const productsRouter = express.Router();

// CREATE - Criar um novo produto
productsRouter.post("/", async (req, res) => {
  const { title, categorie, price, tag, stock, src } = req.body;
  
  try {
    const result = await pool.query(
      "INSERT INTO products (title, categorie, price, tag, stock, src) VALUES (?, ?, ?, ?, ?, ?)",
      [title, categorie, price, tag, stock, src]
    );
    res.status(201).json({ id: result[0].insertId, title, categorie, price, tag, stock, src });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar produto" });
  }
});

// READ - Obter todos os produtos
productsRouter.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM products");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar produtos" });
  }
});

// READ - Obter um produto por ID
productsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar produto" });
  }
});

// UPDATE - Atualizar um produto por ID
productsRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, categorie, price, tag, stock, src } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE products SET title = ?, categorie = ?, price = ?, tag = ?, stock = ?, src = ? WHERE id = ?",
      [title, categorie, price, tag, stock, src, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    res.json({ message: "Produto atualizado com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar produto" });
  }
});

// DELETE - Excluir um produto por ID
productsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query("DELETE FROM products WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    res.json({ message: "Produto excluído com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao excluir produto" });
  }
});

export default productsRouter;
