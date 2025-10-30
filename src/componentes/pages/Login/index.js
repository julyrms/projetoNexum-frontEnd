import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import Sublogo from "../../../Img/sublogo.png";
import Logo from "../../../Img/logo.png";

const Moldura = styled.div`
  border: 4px solid #4b2695;
  border-radius: 10px;
  padding: 20px;
  width: 600px;
  position: relative;
  text-align: center;
`;

const Fundo = styled.div`
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Fonte = styled.div`
  color: #4b2695;
  font-weight: bold;
`;

const BotaoAzul = styled.button`
  background-color: #4b2695;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  display: inline-block;
  font-weight: bold;
  margin-bottom: 10px;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgb(130, 161, 255);
    color: black;
    text-decoration: none;
  }
`;

const Slogo = styled.img`
  display: block;
  width: 120px;
  height: 120px;
  margin: 0 auto;
`;

const Plogo = styled.img`
  width: 200px;
  height: auto;
  position: absolute;
  top: -0.5px;
  left: 50%;
  transform: translateX(-50%);
  background: white;
  padding: 5px;
  border-radius: 8px;
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const executaSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const resposta = await fetch("http://localhost:3001/usuarios/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await resposta.json();

      if (resposta.ok) {
        alert("Login bem-sucedido");
        console.log("Dados da API", data);
        localStorage.setItem("user_id", data.usuario.id);
        localStorage.setItem("user_nome", data.usuario.nome);
        localStorage.setItem("user_email", data.usuario.email);
        navigate("/dashboard");
      } else {
        setError(data.erro || "Erro ao fazer o Login. Tente novamente");
      }
    } catch (erro) {
      console.error("Falha ao conectar à API:", erro);
      setError("Não foi possível conectar ao servidor. Verifique sua conexão");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fundo>
      <div className="container-sm">
        <div className="row justify-content-center mt-5 text-center">
          <Plogo src={Logo} alt="Logo" />
          <Moldura>
            <Slogo src={Sublogo} alt="Sublogo" />

            <Fonte>
              <h1>Login</h1>
            </Fonte>

            <form onSubmit={executaSubmit}>
              <div className="mb-3">
                <Fonte>
                  <label htmlFor="email" className="form-label">
                    E-mail
                  </label>
                </Fonte>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  placeholder="Insira seu e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <Fonte>
                  <label htmlFor="senha" className="form-label">
                    Senha
                  </label>
                </Fonte>
                <input
                  type="password"
                  className="form-control"
                  id="senha"
                  name="senha"
                  placeholder="Insira sua senha"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
              </div>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <BotaoAzul type="submit" disabled={loading}>
                {loading ? "Entrando..." : "Login"}
              </BotaoAzul>
              <br />

              <Link
                style={{ color: "#4B2695" }}
                className="link-sucess link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                to="/cadastrar"
              >
                Cadastrar
              </Link>
            </form>
          </Moldura>
        </div>
      </div>
    </Fundo>
  );
}
