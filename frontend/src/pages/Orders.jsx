import React, { useEffect, useState } from "react";
import { Container, Typography, List, Box } from "@mui/material";
import Header from "../components/Header";
import ListProduct from "../components/ListProduct";
import axios from "axios";
import ListOrder from "../components/ListOrder";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userId = 2; // ou outro método para obter o userId
        const response = await axios.get(
          `http://localhost:3001/orders/user/${user.id}`
        );
        setOrders(response.data);
      } catch (error) {
        console.error("Erro ao carregar pedidos:", error);
      }
    };

    fetchOrders();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    return `${day}/${month}/${year} ${hours}:${minutes}`;
  };

  return (
    <Container maxWidth={false}>
      <Header />
      <Box
        sx={{
          mt: 6,
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {orders.map((order) => (
          <Box key={order.id} sx={{ mb: 4 }}>
            <List
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              <ListOrder
                number={order.id}
                items={order.items.length}
                data={formatDate(order.created_at)}
              />
            </List>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
