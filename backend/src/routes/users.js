import express from "express";
import pool from "../db/config.js";

const usersRouter = express.Router();

// CREATE - Criar um novo usuário
usersRouter.post("/", async (req, res) => {
  const { nome, email, senha, role } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO users (nome, email, senha, role) VALUES (?, ?, ?, ?)",
      [nome, email, senha, role || "user"]
    );
    res.status(201).json({ id: result[0].insertId, nome, email, role });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
});

usersRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [result] = await pool.query(
      "SELECT * from users WHERE email = ? AND senha = ?",
      [email, password]
    );
    if (result.length === 0) {
      return res.status(404).json({ error: "Usuário não cadastrado" });
    }
    const user = result[0]
    delete user.senha;
    return res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao fazer login" });
  }
});

// READ - Obter todos os usuários
usersRouter.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
});

// READ - Obter um usuário por ID
usersRouter.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [rows] = await pool.query("SELECT * FROM users WHERE id = ?", [id]);
    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json(rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
});

// UPDATE - Atualizar um usuário por ID
usersRouter.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, email, senha, role } = req.body;

  try {
    const [result] = await pool.query(
      "UPDATE users SET nome = ?, email = ?, senha = ?, role = ? WHERE id = ?",
      [nome, email, senha, role, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json({ message: "Usuário atualizado com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
});

// DELETE - Excluir um usuário por ID
usersRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query("DELETE FROM users WHERE id = ?", [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.json({ message: "Usuário excluído com sucesso" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Erro ao excluir usuário" });
  }
});

export default usersRouter;
