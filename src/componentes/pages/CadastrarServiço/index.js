import React, { useState } from "react";
import styled from "styled-components";

const ContainerCentralizado = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
`;

const Moldura = styled.div`
  border: 2px solid #5b2ca0;
  border-radius: 12px;
  padding: 30px;
  width: 600px;
  text-align: center;
`;

const Titulo = styled.h2`
  color: #5b2ca0;
  margin-bottom: 25px;
  font-weight: bold;
  font-size: 20;
`;

const Campo = styled.div`
  margin-bottom: 15px;
  text-align: left;

  label {
    font-weight: bold;
    margin-bottom: 6px;
    display: block;
  }

  input,
  select {
    width: 100%;
    padding: 10px;
    border: 1.5px solid #5b2ca0;
    border-radius: 20px;
    outline: none;
  }
`;

const Botao = styled.button`
  padding: 12px 20px;
  border: 2px solid #5b2ca0;
  border-radius: 25px;
  background: white;
  color: #5b2ca0;
  font-size: 16px;
  cursor: pointer;
  margin-top: 10px;
  width: 200px;
  font-weight: 600;
  transition: all 0.3s;

  &:hover {
    background: #5b2ca0;
    color: white;
  }
`;

export default function CadastroServico() {
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    categoria: "",
    valor: "",
    data: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const executaSubmit = async (event) => {
    event.preventDefault();
    try {
      const resposta = await fetch("http://localhost:3000/servicos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await resposta.json();

      if (resposta.ok) {
        alert("Serviço cadastrado com sucesso!");
        console.log("Resposta API:", data);
      } else {
        alert(data.message || "Erro ao cadastrar serviço.");
      }
    } catch (erro) {
      console.error("Erro de conexão:", erro);
      alert("Não foi possível conectar ao servidor.");
    }
  };

  return (
    <ContainerCentralizado>
      <Moldura>
        <form onSubmit={executaSubmit}>
          <Titulo>Cadastre seu serviço</Titulo>

          <Campo>
            <label htmlFor="nome">Nome</label>
            <input
              type="text"
              name="nome"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </Campo>

          <Campo>
            <label htmlFor="descricao">Descrição</label>
            <input
              type="text"
              name="descricao"
              value={form.descricao}
              onChange={handleChange}
              required
            />
          </Campo>

          <Campo>
            <label htmlFor="categoria">Categoria</label>
            <input
              type="text"
              name="categoria"
              value={form.categoria}
              onChange={handleChange}
              required
            />
          </Campo>

          <Campo>
            <label htmlFor="valor">Valor cobrado</label>
            <input
              type="number"
              name="valor"
              value={form.valor}
              onChange={handleChange}
              required
            />
          </Campo>

          <Campo>
            <label htmlFor="data">Data de publicação</label>
            <input
              type="date"
              name="data"
              value={form.data}
              onChange={handleChange}
              required
            />
          </Campo>

          <Botao type="submit">Cadastrar</Botao>
        </form>
      </Moldura>
    </ContainerCentralizado>
  );
}
