import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { FaBell } from "react-icons/fa";
import Imagem from "../../../Img/logoheader.png";
import Perfil from "../../../Img/logo.png"; // Corrigido
import ImageBloco from "../../../Img/imagembloco.png";
import "../Dashboard/index.css";

// Função para buscar movimentações do usuário
const fetchMovimentacoes = async () => {
  try {
    const usuarioString = localStorage.getItem("usuario");
    const usuario = JSON.parse(usuarioString);
    const usuarioId = usuario?.id;

    const resposta = await fetch(
      `http://localhost:3000/movimentacoes/getMovimentacoesPorUsuario/${usuarioId}`
    );
    if (!resposta.ok) {
      throw new Error("Erro ao buscar movimentações");
    }
    const dados = await resposta.json();
    return dados;
  } catch (erro) {
    console.error("Descrição do erro:", erro);
    throw erro;
  }
};

const cargos = [
  "Designer Gráfico",
  "Designer UI/UX",
  "Designer de Produto",
  "Desenvolvedor Front-end",
  "Desenvolvedor Fullstack",
];

const cidades = [
  "Araçatuba",
  "Birigui",
  "Penápolis",
  "Guararapes",
  "Bilac",
  "Brejo Alegre",
  "Coroados",
  "Mirandópolis",
  "Lavínia",
  "Valparaíso",
  "Castilho",
  "Santa Fé do Sul",
  "Ribeirão Preto",
  "Mirassol",
  "S. J. do Rio Preto",
  "Tupã",
  "Marília",
  "São Paulo - Capital",
];

// Styled Components
const Botao = styled.button`
  background-color: rgb(0, 1, 85);
  color: white;
  padding: 5px;
  border: none;
  border-radius: 9px;
  transition: background-color 0.3s;
  &:hover {
    background-color: rgb(130, 161, 255);
    color: black;
  }
`;

const Fonte = styled.div`
  color: #000000ff;
  font-weight: 600;
  font-size: 18px;
  margin: 0;
`;

const Fontes = styled.div`
  color: #ffffffff;
  font-weight: 600;
  font-size: 18px;
  margin: 0;
`;

const Corpo = styled.div`
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding-top: 60px;
  padding-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 75px;
  align-items: center;
  height: 70px;
  padding: 12px 40px;
  background: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`;

const ImageAju = styled.img`
  width: 150px;
  height: 25px;
`;

const Imagemnike = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 80px;
  cursor: pointer;
`;

const ImagemRoxo = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 80px;
  cursor: pointer;
  gap: 20px;
`;

const Caixa = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const Bloco = styled.div`
  width: 800px;
  height: 150px;
  background-color: #a794cf;
  border-radius: 19px;
  color: #ffffff;
  padding: 20px 30px;
  max-width: 800px;
  display: flex;
  align-items: center;
  gap: 30px;
  font-weight: bold;
`;

const Quadro = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 90px;
`;

const Escopo = styled.div`
  width: 800px;
  height: 300px;
  background-color: #ffffffff;
  border-radius: 19px;
  border: 3px solid #a794cf;
  color: #000000ff;
  padding: 20px 30px;
  max-width: 800px;
  display: flex;
  font-weight: bold;
  font-size: 25px;
`;

const Pasta = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
  gap: 90px;
`;

const Texto = styled.div`
  font-size: 14px;
  color: #756b6bff;
`;

const BotaoX = styled.button`
  padding: 10px 25px;
  border: 2px solid #a794cf;
  background: white;
  color: #a794cf;
  font-weight: bold;
  border-radius: 20px;
  cursor: pointer;
  font-size: 15px;
  transition: all 0.3s ease;

  &:hover {
    background-color: #7b61ff;
    color: white;
    border: #7b61ff;
  }
`;

export default function Dashboard() {
  const [movimentacoes, setMovimentacoes] = useState([]);
  const [totalEntradas, setTotalEntradas] = useState(0);
  const [totalSaidas, setTotalSaidas] = useState(0);
  const [cargoBusca, setCargoBusca] = useState("");
  const [cargosFiltrados, setCargosFiltrados] = useState([]);
  const [cidadeSelecionada, setCidadeSelecionada] = useState("");
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  const handleCargoChange = (e) => {
    const valor = e.target.value;
    setCargoBusca(valor);

    if (valor.length > 0) {
      const filtrados = cargos.filter((c) =>
        c.toLowerCase().includes(valor.toLowerCase())
      );
      setCargosFiltrados(filtrados);
    } else {
      setCargosFiltrados([]);
    }
  };

  useEffect(() => {
    const carregarMovimentacoes = async () => {
      try {
        setLoading(true);
        setErro(null);
        const dados = await fetchMovimentacoes();
        setMovimentacoes(dados);
      } catch (erro) {
        console.error("Erro ao buscar movimentações:", erro);
        setErro("Erro ao buscar movimentações");
      } finally {
        setLoading(false);
      }
    };

    carregarMovimentacoes();
  }, []);

  useEffect(() => {
    let entradas = 0;
    let saidas = 0;
    movimentacoes.forEach((mov) => {
      if (mov.tipo === "entrada") entradas += Number(mov.valor);
      else if (mov.tipo === "saida") saidas += Number(mov.valor);
    });
    setTotalEntradas(entradas);
    setTotalSaidas(saidas);
  }, [movimentacoes]);

  return (
    <>
      <Header>
        <ImageAju src={Imagem} alt="Logo da empresa" />
        <Fonte>Encontre Trabalhos</Fonte>
        <Fonte>Cadastro de serviço</Fonte>
        <Fonte>Sobre</Fonte>

        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: "16px",
          }}
        >
          <FaBell
            style={{
              fontSize: "20px",
              color: "#4B2995",
              cursor: "pointer",
            }}
          />
          <Imagemnike src={Perfil} alt="Foto do perfil" />
        </div>
      </Header>

      <Corpo>
        <div className="container">
          <div className="row">
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "20px",
                marginTop: "40px",
              }}
            >
              <div style={{ position: "relative", width: "400px" }}>
                <input
                  type="text"
                  value={cargoBusca}
                  onChange={handleCargoChange}
                  placeholder="Filtre os Cargos Disponíveis"
                  style={{
                    width: "100%",
                    padding: "10px 15px",
                    border: "3px solid #a794cf",
                    borderRadius: "25px",
                    fontSize: "14px",
                  }}
                />
                {cargosFiltrados.length > 0 && (
                  <ul
                    style={{
                      listStyle: "none",
                      margin: 0,
                      padding: "10px",
                      border: "1px solid #a794cf",
                      borderRadius: "10px",
                      background: "#fff",
                      position: "absolute",
                      top: "45px",
                      width: "100%",
                      zIndex: 10,
                    }}
                  >
                    {cargosFiltrados.map((c, index) => (
                      <li
                        key={index}
                        style={{ padding: "5px 0", cursor: "pointer" }}
                        onClick={() => {
                          setCargoBusca(c);
                          setCargosFiltrados([]);
                        }}
                      >
                        {c}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <select
                value={cidadeSelecionada}
                onChange={(e) => setCidadeSelecionada(e.target.value)}
                style={{
                  width: "400px",
                  padding: "10px 15px",
                  border: "3px solid #a794cf",
                  borderRadius: "25px",
                  fontSize: "14px",
                }}
              >
                <option value="">Filtre as Cidades</option>
                {cidades.map((cidade, idx) => (
                  <option key={idx} value={cidade}>
                    🇧🇷 {cidade}
                  </option>
                ))}
              </select>
            </div>

            <Quadro>
              <Bloco>
                <ImagemRoxo src={ImageBloco} alt="Imagem decorativa" />
                <Fontes>
                  A <b>Nexum</b> oferece um serviço de busca de empregos e
                  funcionários para <b>empresas de grande e pequeno porte.</b>{" "}
                  Vagas de diversos ramos do mercado de trabalho estão
                  disponíveis em <b>nosso sistema</b>, navegue pela barra de
                  pesquise e encontre a <b>oportunidade da sua vida.</b>
                </Fontes>
              </Bloco>
            </Quadro>

            <Pasta>
              <Escopo>
                <div>
                  <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                    Desenvolvimento de uma identidade visual para uma página de
                    Instagram - Açaíteria
                  </div>

                  <div
                    style={{
                      fontSize: "14px",
                      marginTop: "8px",
                      color: "#555",
                    }}
                  >
                    Publicado: 08/08/2025 &nbsp;&nbsp; Guilherme Felix dos
                    Santos
                  </div>

                  <div
                    style={{
                      backgroundColor: "#D9C9F3",
                      color: "white",
                      fontWeight: "bold",
                      borderRadius: "10px",
                      padding: "4px 12px",
                      float: "right",
                      marginTop: "-36px",
                    }}
                  >
                    R$1200
                  </div>

                  <div
                    style={{
                      marginTop: "20px",
                      fontSize: "16px",
                      lineHeight: 1.5,
                    }}
                  >
                    Preciso de artes que divulguem meus produtos e meu trabalho
                    com montagem de copos de açaí.{" "}
                    <strong>- Prazo pra Entrega: 18/08.</strong>
                  </div>

                  <div
                    style={{
                      marginTop: "15px",
                      display: "flex",
                      gap: "10px",
                    }}
                  >
                    <span
                      style={{
                        backgroundColor: "#C0E7FF",
                        padding: "3px 10px",
                        borderRadius: "10px",
                        fontSize: "12px",
                      }}
                    >
                      Canva
                    </span>
                    <span
                      style={{
                        backgroundColor: "#C0E7FF",
                        padding: "3px 10px",
                        borderRadius: "10px",
                        fontSize: "12px",
                      }}
                    >
                      Photoshop
                    </span>
                  </div>

                  <div
                    style={{
                      marginTop: "20px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <BotaoX>Enviar proposta</BotaoX>
                    <span
                      style={{
                        fontSize: "14px",
                        display: "flex",
                        alignItems: "center",
                        gap: "5px",
                      }}
                    >
                      🇧🇷 S. J. do Rio Preto
                    </span>
                  </div>
                </div>
              </Escopo>
            </Pasta>
          </div>
        </div>
      </Corpo>
    </>
  );
}
