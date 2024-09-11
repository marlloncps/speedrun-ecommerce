import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Container, Typography, List, Box, Button } from "@mui/material";
import ListProduct from "../components/ListProduct";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  // Buscar produtos uma vez ao montar o componente
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };
    fetchProducts();
  }, []); // Dependências vazias para garantir que execute apenas uma vez

  // Atualizar produtos do carrinho e calcular total quando products ou cart mudarem
  useEffect(() => {
    if (products.length && cart.length) {
      const selectedProducts = products.filter((product) =>
        cart.includes(product.id)
      );

      setCartProducts(selectedProducts);
      calculateTotal(selectedProducts);
    }
  }, [products, cart]); // Dependências: produtos e carrinho

  const handleDelete = (id) => {
    const updatedCart = cart.filter((item) => item !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    const updatedProducts = products.filter((product) =>
      updatedCart.includes(product.id)
    );
    setCartProducts(updatedProducts);
    calculateTotal(updatedProducts);
  };

  const calculateTotal = (items) => {
    const total = items.reduce((sum, item) => sum + Number(item.price), 0);
    setTotalPrice(total);
  };

  const handleTotal = async () => {
    if (cartProducts.length === 0) return alert("Nao pode fazer pedido sem items!")
    try {
      const order = cartProducts.map((product) => ({
        productId: product.id,
        quantity: 1,
      }));

      await axios.post("http://localhost:3001/orders", {
        userId: user.id,
        items: order,
        totalPrice,
      });

      localStorage.removeItem("cart");
      setCartProducts([]);
      setTotalPrice(0);

      alert(`Compra realizada com sucesso! Total: R$ ${totalPrice.toFixed(2)}`);
      navigate("/");
    } catch (error) {
      console.error("Erro ao finalizar compra:", error);
      alert("Ocorreu um erro ao finalizar a compra. Tente novamente.");
    }
  };

  useEffect(() => {
    if (user?.id) {
      const fetchOrders = async () => {
        try {
          const response = await axios.get(
            `http://localhost:3001/orders/user/${user.id}`
          );
        } catch (error) {
          console.error("Erro ao buscar pedidos do usuário:", error);
        }
      };
      fetchOrders();
    }
  }, [user?.id]); 

  return (
    <>
      <Header />
      <Container
        maxWidth="xl"
        sx={{
          mt: 6,
          display: "flex",
          gap: 2,
          flexWrap: "wrap",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h3">Carrinho</Typography>
        <Box>
          <List
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {cartProducts.map((product) => (
              <ListProduct
                key={product.id}
                title={product.title}
                src={product.src}
                price={`R$ ${Number(product.price).toFixed(2)}`}
                onDelete={() => handleDelete(product.id)}
              />
            ))}
          </List>
          <Box>
            <Typography variant="h5">
              Total: R$ {totalPrice.toFixed(2)}
            </Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            onClick={handleTotal}
            sx={{ mt: 2 }}
          >
            Finalizar Compra
          </Button>
        </Box>
      </Container>
    </>
  );
}
