import express from "express";
import cors from "cors";
const app = express();
import usersRoute from "./routes/users.js";
import productsRouter from "./routes/products.js";
import ordersRouter from "./routes/orders.js";
import productOrdersRouter from "./routes/productOrders.js";

app.use(express.json());

app.use(cors());

app.use("/users", usersRoute);

app.use("/products", productsRouter);

app.use("/orders", ordersRouter);

app.use("/product-orders", productOrdersRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
