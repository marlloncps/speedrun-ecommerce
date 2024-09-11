import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import Header from "../../components/Header";
import { Input } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [password, setPassword] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const navigate = useNavigate();

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3001/users/", {
        nome,
        email,
        senha: password,
        role: "user",
      });

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        alert("Registro bem-sucedido!");
        navigate("/");
      }
    } catch (err) {
      console.error(err.message);
      alert("Erro ao fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <>
      <Container maxWidth={false}>
        <Header />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 5,
          }}
        >
          <Typography variant="h6">Cadastrar</Typography>
          <FormControl sx={{ m: 1, width: "60ch" }} variant="standard">
            <TextField
              color="warning"
              label="Nome"
              variant="standard"
              value={nome}
              onChange={(e) => setNome(e.target.value)} // Atualiza o estado de email
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "60ch" }} variant="standard">
            <TextField
              color="warning"
              label="Email"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Atualiza o estado de email
            />
          </FormControl>
          <FormControl sx={{ m: 1, width: "60ch" }} variant="standard">
            <InputLabel htmlFor="standard-adornment-password">Senha</InputLabel>
            <Input
              id="standard-adornment-password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Atualiza o estado de password
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
            <Button color="info" variant="contained" onClick={handleRegister}>
              Cadastrar
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
