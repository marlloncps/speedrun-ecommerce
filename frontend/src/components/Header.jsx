import React, { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { ExitToApp, Home, ListAlt, Person } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import logo from "../images/logo.png";

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) ?? null;

  const handleLogout = () => {
    localStorage.clear();
    alert("Você deslogou com sucesso");
    window.location.reload();
  };

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-around" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            component="img"
            src={logo}
            sx={{
              width: 100,
              height: 50,
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          />
          <IconButton onClick={() => navigate("/")} color="inherit">
            <Home sx={{ color: "black", mr: 0.5 }} />
            <Typography variant="h6" sx={{ color: "black" }}>
              Início
            </Typography>
          </IconButton>
        </Box>

        <Box
          sx={{
            display: "flex",
          }}
        >
          <IconButton color="inherit" onClick={() => navigate("/favorites")}>
            <FavoriteIcon sx={{ color: "black" }} />
          </IconButton>

          <IconButton color="inherit" onClick={() => navigate("/cart")}>
            <ShoppingCartIcon sx={{ color: "black" }} />
          </IconButton>
          {user && (
            <IconButton color="inherit" onClick={() => navigate("/orders")}>
              <ListAlt sx={{ color: "black" }} />
            </IconButton>
          )}

          <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
            {user ? (
              <>
                <Typography
                  sx={{ textTransform: "capitalize", color: "black" }}
                >
                  Olá, {user.nome} !
                </Typography>
                <IconButton onClick={() => handleLogout()}>
                  <ExitToApp />
                </IconButton>
              </>
            ) : (
              <>
                <Button
                  onClick={() => navigate("/login")}
                  variant="outlined"
                  sx={{
                    color: "black",
                    border: "1px solid black",
                    py: 0,
                    px: 1,
                  }}
                >
                  Entrar
                </Button>
                <Button
                  onClick={() => navigate("/register")}
                  variant="outlined"
                  sx={{
                    color: "black",
                    border: "1px solid black",
                    py: 0,
                    px: 1,
                  }}
                >
                  Registro
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
