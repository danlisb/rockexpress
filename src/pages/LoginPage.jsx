import "../styles/LoginPage.css";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate(); // hook para redirecionar

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login success:", data);

        // Armazena informações no localStorage
        localStorage.setItem("usuarioId", data.usuarioId);
        localStorage.setItem("email", data.email);
        localStorage.setItem("nome", data.nome);
        localStorage.setItem("nivelAcesso", data.nivelAcesso);

        // se for cliente, salva clienteId
        if (data.clienteId) {
          localStorage.setItem("clienteId", data.clienteId);
        }

        // se for vendedor, salva vendedorId
        if (data.vendedorId) {
          localStorage.setItem("vendedorId", data.vendedorId);
        }

        // Redireciona para homepage
        navigate("/");
      } else {
        console.error("Login failed:", data.message);
        alert(data.message || "Erro ao fazer login.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h2>Olá, novamente!</h2>
        <p className="login-subtitle">Login com Email</p>

        <form onSubmit={handleLogin} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />

          <button type="submit" className="login-button">
            LOGAR
          </button>
        </form>

        <p className="register-link">
          <Link to="/cadastro">Ou crie sua conta</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
