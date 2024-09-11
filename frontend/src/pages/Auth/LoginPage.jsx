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
import Header from "../../components/Header";
import { Input } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3001/users/login", {
        email,
        password,
      });

      if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        navigate("/");
        alert("Login bem-sucedido!");
      }
    } catch (err) {
      console.error(err.message);
      alert("Erro ao fazer login. Verifique suas credenciais.");
    }
  };
  const navigate = useNavigate();

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
          <Typography variant="h6">Entrar</Typography>
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
            <Button color="warning" variant="contained" onClick={handleLogin}>
              Login
            </Button>
            <Button
              color="info"
              variant="contained"
              onClick={() => navigate("/register")}
            >
              Registro
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}
