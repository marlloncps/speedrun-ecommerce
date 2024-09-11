import { Container } from "@mui/material";
import ProductCard from "./ProductCard";
import axios from "axios";
import { useEffect, useState } from "react";

export default function ProductsCardContainer() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [favs, setFavs] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const storedFavs = JSON.parse(localStorage.getItem("favs") || "[]");
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3001/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };

    fetchProducts();
    setCart(storedCart);
    setFavs(storedFavs);
  }, []);

  const addCart = (id) => {
    if (!cart.includes(id)) {
      const updatedCart = [...cart, id];
      setCart(updatedCart);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      alert("Produto já está no carrinho!");
    }
  };

  const addFav = (id) => {
    if (!favs.includes(id)) {
      const updatedFavs = [...favs, id];
      setFavs(updatedFavs);
      localStorage.setItem("favs", JSON.stringify(updatedFavs));
    } else {
      alert("Produto já está nos favoritos!");
    }
  };

  return (
    <Container
      maxWidth="xl"
      sx={{ mt: 6, display: "flex", gap: 2, flexWrap: "wrap" }}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          categorie={product.categorie}
          price={product.price}
          tag={product.tag}
          stock={product.stock}
          addCart={() => addCart(product.id)}
          addFavs={() => addFav(product.id)}
          imageUrl={product.src}
        />
      ))}
    </Container>
  );
}
