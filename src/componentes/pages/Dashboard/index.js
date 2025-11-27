import { useNavigate } from "react-router-dom";
import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";
import { FaBell } from "react-icons/fa";
import Imagem from "../../../Img/logoheader.png";
import PerfilPadrao from "../../../Img/user-icon.png";
import ImageBloco from "../../../Img/imagembloco.png";
import "../Dashboard/index.css";
import { Link } from "react-router-dom";

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
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
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
  z-index: 10;
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
  gap: 90px;
`;

const Escopo = styled.div`
  width: 800px;
  background-color: #fff;
  border-radius: 12px;
  border: 2px solid #a794cf;
  padding: 25px 30px;
  display: flex;
  flex-direction: column;
  font-size: 16px;
  font-weight: 400;
  color: #000000ff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  cursor: default;

  &:hover {
    box-shadow: 0px 6px 20px rgba(0, 0, 0, 0.15);
  }
`;

const Pasta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  gap: 40px;
  width: 100%;
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

const NotifPopup = styled.div`
  position: absolute;
  top: 50px;
  right: 0;
  width: 300px;
  background: #fff;
  border: 2px solid #a794cf;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  padding: 15px;
  z-index: 999;
`;

const NotifItem = styled.div`
  background: #f4f2ff;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  font-size: 14px;
  color: #333;
`;

const NotifTitulo = styled.h5`
  font-size: 15px;
  margin: 0 0 5px 0;
  color: #4b2995;
`;

const Badge = styled.span`
  position: absolute;
  top: -4px;
  right: -4px;
  background: #4b2995;
  color: #fff;
  font-size: 0.7rem;
  padding: 2px 6px;
  border-radius: 50%;
`;

const Notificacoes = () => {
  const [notificacoes, setNotificacoes] = useState([]);
  const [notifAberta, setNotifAberta] = useState(false);
  const [erroNotif, setErroNotif] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const popupRef = useRef(null);

  const toggleNotificacoes = () => setNotifAberta(!notifAberta);

  useEffect(() => {
    const handleClickFora = (e) => {
      if (popupRef.current && !popupRef.current.contains(e.target)) {
        setNotifAberta(false);
      }
    };
    document.addEventListener("click", handleClickFora);
    return () => document.removeEventListener("click", handleClickFora);
  }, []);

  useEffect(() => {
    if (!notifAberta) return;

    const fetchNotificacoes = async () => {
      setCarregando(true);
      setErroNotif(null);
      try {
        const res = await fetch(
          "http://localhost:3001/notificacoes/todasNotificacoes"
        );
        if (!res.ok) throw new Error("Erro ao buscar notificações");

        const data = await res.json();

        const notificacoesLimitadas = data.slice(0, 6).reverse();
        setNotificacoes(notificacoesLimitadas);
      } catch (err) {
        setErroNotif(err.message);
      } finally {
        setCarregando(false);
      }
    };

    fetchNotificacoes();
  }, [notifAberta]);

  const apagarNotificacao = async (id) => {
    try {
      const res = await fetch(
        `http://localhost:3001/notificacoes/apagarNotificacao/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!res.ok) throw new Error("Erro ao apagar notificação");

      setNotificacoes((prev) => prev.filter((n) => n.id_notificacao !== id));
    } catch (err) {
      console.error(err);
      setErroNotif("Erro ao apagar notificação");
    }
  };

  return (
    <div ref={popupRef} style={{ position: "relative" }}>
      <FaBell
        onClick={toggleNotificacoes}
        style={{ fontSize: "20px", color: "#4B2995", cursor: "pointer" }}
      />

      {notifAberta && (
        <NotifPopup
          style={{
            maxHeight: "400px",
            overflowY: "auto",
            scrollbarWidth: "thin",
            scrollbarColor: "#4B2995 #eaeaea",
          }}
        >
          <h5 style={{ marginBottom: "10px", color: "#4B2995" }}>
            Notificações
          </h5>

          {carregando ? (
            <p>Carregando...</p>
          ) : erroNotif ? (
            <p style={{ color: "red" }}>{erroNotif}</p>
          ) : notificacoes.length === 0 ? (
            <p>Nenhuma notificação.</p>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                paddingBottom: "5px",
              }}
            >
              {notificacoes.map((n) => (
                <NotifItem key={n.id_notificacao}>
                  <NotifTitulo>{n.titulo || "Nova Notificação"}</NotifTitulo>
                  <div>{n.mensagem}</div>
                  <button
                    onClick={() => apagarNotificacao(n.id_notificacao)}
                    style={{
                      marginTop: "8px",
                      alignSelf: "flex-end",
                      fontSize: "12px",
                      background: "transparent",
                      border: "none",
                      color: "red",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    Apagar
                  </button>
                </NotifItem>
              ))}
            </div>
          )}
        </NotifPopup>
      )}
    </div>
  );
};

export default function Dashboard() {
  const navigate = useNavigate();
  const [servicos, setServicos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [imagemPerfil, setImagemPerfil] = useState(PerfilPadrao);
  const [filtroTexto, setFiltroTexto] = useState("");
  const [filtroCidade, setFiltroCidade] = useState("");

  useEffect(() => {
    const carregarServicos = async () => {
      try {
        setLoading(true);
        const resposta = await fetch(
          "http://localhost:3001/servicos/todosServicos"
        );
        if (!resposta.ok) throw new Error("Erro ao buscar serviços");
        const dados = await resposta.json();
        console.log("Serviços recebidos do backend:", dados);
        setServicos(dados);
      } catch (erro) {
        setErro("Erro ao buscar serviços. Verifique o servidor.");
      } finally {
        setLoading(false);
      }
    };
    carregarServicos();
  }, []);

  const formatarData = (dataIso) => {
    if (!dataIso) return "Data Desconhecida";
    const data = new Date(dataIso);
    return data.toLocaleDateString("pt-BR");
  };

  const abrirWhatsApp = (telefoneDono, nomeServico) => {
    if (!telefoneDono) {
      alert("Número de telefone não disponível.");
      return;
    }
    const numero = telefoneDono.replace(/\D/g, "");
    const mensagem = encodeURIComponent(
      `Olá! Tenho interesse no serviço "${nomeServico}".`
    );
    const link = `https://wa.me/55${numero}?text=${mensagem}`;
    window.open(link, "_blank");
  };

  return (
    <>
      <Header>
        <ImageAju src={Imagem} alt="Logo da empresa" />
        <Fonte style={{ margin: "0 10px", color: "#4B2995" }}>
          Encontre Trabalhos
        </Fonte>

        <Link
          to="/cadastroServico"
          style={{ margin: "0 10px", textDecoration: "none", color: "#000000" }}
        >
          Cadastro de serviço
        </Link>

        <div
          style={{
            marginLeft: "auto",
            display: "flex",
            alignItems: "center",
            gap: "16px",
            position: "relative",
          }}
        >
          <Notificacoes />
          <Imagemnike
            src={imagemPerfil}
            alt="Foto do perfil"
            onClick={() => navigate("/perfil")}
          />
        </div>
      </Header>

      <div
        style={{
          width: "800px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "100px auto 0 auto",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Pesquisar serviço..."
          value={filtroTexto}
          onChange={(e) => setFiltroTexto(e.target.value)}
          style={{
            flex: 2,
            padding: "10px 15px",
            borderRadius: "8px",
            border: "2px solid #a794cf",
            fontSize: "15px",
            outline: "none",
          }}
        />

        <select
          value={filtroCidade}
          onChange={(e) => setFiltroCidade(e.target.value)}
          style={{
            flex: 1,
            padding: "10px 15px",
            borderRadius: "8px",
            border: "2px solid #a794cf",
            fontSize: "15px",
            outline: "none",
            backgroundColor: "white",
          }}
        >
          <option value="">Todas as cidades</option>
          {[...new Set(servicos.map((s) => s.localizacao))].map((cidade) => (
            <option key={cidade} value={cidade}>
              {cidade}
            </option>
          ))}
        </select>
      </div>

      <Corpo>
        <div className="container">
          <Quadro>
            <Bloco>
              <ImagemRoxo src={ImageBloco} alt="Imagem decorativa" />
              <Fontes>
                A <b>Nexum</b> oferece um serviço de busca de empregos e
                funcionários para <b>empresas de grande e pequeno porte.</b>{" "}
                Vagas de diversos ramos do mercado estão disponíveis em{" "}
                <b>nosso sistema</b>, navegue pela barra de pesquisa e encontre
                a <b>oportunidade da sua vida.</b>
              </Fontes>
            </Bloco>
          </Quadro>

          <Fonte
            style={{
              margin: "25px 250px   ",
              color: "#8437b4ff",
              fontWeight: "bold",
            }}
          >
            Trabalhos disponíveis:
          </Fonte>

          <Pasta>
            {loading && (
              <p style={{ width: "800px", textAlign: "center" }}>
                Carregando serviços...
              </p>
            )}
            {erro && (
              <p style={{ color: "red", width: "800px", textAlign: "center" }}>
                {erro}
              </p>
            )}
            {!loading &&
              servicos
                .filter((servico) => {
                  const textoMatch = servico.nome
                    ?.toLowerCase()
                    .includes(filtroTexto.toLowerCase());
                  const cidadeMatch = filtroCidade
                    ? servico.localizacao === filtroCidade
                    : true;
                  return textoMatch && cidadeMatch;
                })
                .map((servico) => (
                  <Escopo key={servico.id_servico}>
                    <div>
                      <div style={{ fontWeight: "bold", fontSize: "20px" }}>
                        {servico.nome || "Serviço sem nome"}
                      </div>
                      <div
                        style={{
                          fontSize: "14px",
                          marginTop: "8px",
                          color: "#555",
                        }}
                      >
                        Publicado: {formatarData(servico.criacao)} &nbsp;&nbsp;
                        <p>
                          Publicado por:{" "}
                          <span
                            style={{
                              color: "#4B2995",
                              cursor: "pointer",
                              textDecoration: "underline",
                            }}
                            onClick={() =>
                              navigate(`/usuarioPorId/${servico.user_id}`)
                            }
                          >
                            {servico.nome_usuario}
                          </span>
                        </p>
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
                        R$ {Number(servico.valor).toFixed(2).replace(".", ",")}
                      </div>
                      <div
                        style={{
                          marginTop: "20px",
                          fontSize: "16px",
                          lineHeight: 1.5,
                        }}
                      >
                        {servico.descricao}
                      </div>
                      <div
                        style={{
                          marginTop: "20px",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <BotaoX
                          onClick={() =>
                            abrirWhatsApp(
                              servico.telefone_usuario,
                              servico.nome
                            )
                          }
                        >
                          Enviar proposta
                        </BotaoX>
                        <span
                          style={{
                            fontSize: "14px",
                            display: "flex",
                            alignItems: "center",
                            gap: "5px",
                          }}
                        >
                          🇧🇷 {servico.localizacao}
                        </span>
                      </div>
                    </div>
                  </Escopo>
                ))}
          </Pasta>
        </div>
      </Corpo>
    </>
  );
}
