import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { Container, Typography, List } from "@mui/material";
import ListProduct from "../components/ListProduct";
import axios from "axios";

export default function Favorites() {
  const [products, setProducts] = useState([]);
  const [favoriteProducts, setFavoriteProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products");
        setProducts(response.data);
        
        // Atualiza os produtos favoritos após os produtos serem carregados
        const favorites = JSON.parse(localStorage.getItem("favs") || "[]");
        const selectedProducts = response.data.filter((product) =>
          favorites.includes(product.id)
        );
        setFavoriteProducts(selectedProducts);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleDelete = (id) => {
    const updatedFavorites = JSON.parse(localStorage.getItem("favs") || "[]")
      .filter((item) => item !== id);
    localStorage.setItem("favs", JSON.stringify(updatedFavorites));

    // Atualiza os produtos favoritos sem precisar chamar o fetchProducts novamente
    const updatedProducts = products.filter((product) =>
      updatedFavorites.includes(product.id)
    );
    setFavoriteProducts(updatedProducts);
  };

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
        <Typography variant="h3">Favoritos</Typography>
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {favoriteProducts.map((product) => (
            <ListProduct
              key={product.id}
              title={product.title}
              src={product.src}
              price={`R$ ${product.price}`}
              onRemoveFav={() => handleDelete(product.id)}
            />
          ))}
        </List>
      </Container>
    </>
  );
}
