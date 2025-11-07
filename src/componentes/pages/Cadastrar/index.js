import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


const Moldura = styled.div`
  border: 4px solid white;
  border-radius: 10px;
  padding: 20px;
  width: 600px;
  border-color: #4b2695;
  text-align: left;
`;

const Fundo = styled.div`
  background-color: white;
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
  text-align: center;
`;

const Fonte2 = styled.div`
  color: #4b2695;
  font-weight: bold;
  text-align: left;
`;

const BotaoAzul = styled.button`
  background-color: rgb(0, 1, 85);
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  text-decoration: none;
  display: inline-block;
  font-weight: bold;
  margin-bottom: 10px;
  transition: background-color 0.3s;
  margin: 0 auto;

  &:hover {
    background-color: rgb(130, 161, 255);
    color: black;
    text-decoration: none;
  }
`;

export default function Cadastrar() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [celular, setCelular] = useState("");
  const [senha, setSenha] = useState("");
  const [confSenha, setConfSenha] = useState("");
  const [habilidades, setHabilidades] = useState("");

  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const exeSubmit = async (event) => {
    event.preventDefault();

    if (senha !== confSenha) {
      setErro("As senhas não são iguais. Tente novamente!");
      setSenha("");
      setConfSenha("");
      return;
    }

    setErro("");
    setLoading(true);

    try {
      const resposta = await fetch(
        "http://localhost:3001/usuarios/criarUsuario",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nome,
            celular,
            senha,
            email,
            habilidades: habilidades.split(",").map((h) => h.trim()),
          }),
        }
      );

      const dados = await resposta.json();
      console.log(dados);

      if (resposta.ok) {
        navigate("/login");
      } else {
        setErro(
          dados.detalhe || "Erro ao realizar o cadastro. Tente novamente."
        );
      }
    } catch (e) {
      console.error("Falha ao conectar à API", e);
      setErro("Não foi possível conectar ao servidor.", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Fundo>
      <div className="container-sm">
        <div className="row justify-content-center mt-5 text-center">
          <Moldura>
            <Fonte>
              <h1>Cadastro</h1>
            </Fonte>
            <form onSubmit={exeSubmit}>
              <div className="mb-3">
                <Fonte2>
                  <label htmlFor="nome" className="form-label">
                    Nome
                  </label>
                </Fonte2>
                <input
                  type="text"
                  className="form-control"
                  id="nome"
                  name="nome"
                  placeholder="Insira seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <Fonte2>
                  <label htmlFor="celular" className="form-label">
                    Telefone
                  </label>
                </Fonte2>
                <input
                  type="text"
                  className="form-control"
                  id="celular"
                  name="celular"
                  placeholder="Insira seu número de telefone"
                  value={celular}
                  onChange={(e) => setCelular(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <Fonte2>
                  <label htmlFor="email" className="form-label">
                    E-mail
                  </label>
                </Fonte2>
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
                <Fonte2>
                  <label htmlFor="senha" className="form-label">
                    Senha
                  </label>
                </Fonte2>
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

              <div className="mb-3">
                <Fonte2>
                  <label htmlFor="confirmaSenha" className="form-label">
                    Confirmar Senha
                  </label>
                </Fonte2>
                <input
                  type="password"
                  className="form-control"
                  id="confirmaSenha"
                  name="confirmaSenha"
                  placeholder="Confirme sua senha"
                  value={confSenha}
                  onChange={(e) => setConfSenha(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <Fonte2>
                  <label htmlFor="habilidades" className="form-label">
                    Habilidades (separe por vírgulas)
                  </label>
                </Fonte2>
                <input
                  type="text"
                  className="form-control"
                  id="habilidades"
                  name="habilidades"
                  placeholder="Ex: Jardinagem, Limpeza, Manutenção"
                  value={habilidades}
                  onChange={(e) => setHabilidades(e.target.value)}
                />
              </div>

              {erro && <div className="text-danger mb-3">{erro}</div>}

              <BotaoAzul className="btn btn-primary">
                {loading ? "Castrando..." : "Salvar"}
              </BotaoAzul>
            </form>
          </Moldura>
        </div>
      </div>
    </Fundo>
  );
}
