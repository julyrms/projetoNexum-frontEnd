import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate, Link, useParams } from "react-router-dom";
import Imagem from "../../../Img/logoheader.png";
import PerfilImg from "../../../Img/user-icon.png";
import { FaBell } from "react-icons/fa";

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

const Fonte = styled.div`
  color: #000000ff;
  font-weight: 600;
  font-size: 18px;
  margin: 0;
`;

const Imagemnike = styled.img`
  width: 35px;
  height: 35px;
  border-radius: 80px;
  cursor: pointer;
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

export default function PerfilPublico() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [usuario, setUsuario] = useState(null);
  const [meusServicos, setMeusServicos] = useState([]);
  const [habilidades, setHabilidades] = useState([]);
  const [imagemPerfil, setImagemPerfil] = useState(PerfilImg);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const resUsuario = await fetch(
          `http://localhost:3001/usuarios/usuarioPorId/${id}`
        );

        let dataUsuario = await resUsuario.json();

        // TRATA O RETORNO COMO ARRAY OU OBJETO
        const usuarioCorrigido = Array.isArray(dataUsuario)
          ? dataUsuario[0]
          : dataUsuario;

        setUsuario(usuarioCorrigido);
        setHabilidades(usuarioCorrigido.habilidades || []);

        const resServicos = await fetch(
          `http://localhost:3001/servicos/usuarioServicos/${id}`
        );

        let dataServicos = await resServicos.json();
        console.log("RETORNO DA API SERVICOS:", dataServicos);

        // TRATA SERVICOS
        setMeusServicos(Array.isArray(dataServicos) ? dataServicos : []);
      } catch (err) {
        console.error("Erro ao buscar perfil:", err);
      }
    };

    fetchPerfil();
  }, [id]);

  const abrirWhatsApp = () => {
    if (!usuario || !usuario.celular) return;
    const numero = usuario.celular.replace(/\D/g, "");
    const mensagem = encodeURIComponent(
      `Olá ${usuario.nome}, tenho interesse nos seus serviços.`
    );
    window.open(`https://wa.me/55${numero}?text=${mensagem}`, "_blank");
  };

  if (!usuario)
    return (
      <p style={{ textAlign: "center", marginTop: "50px" }}>
        Carregando perfil...
      </p>
    );

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
          fontFamily: "Arial, sans-serif",
          maxWidth: 720,
          margin: "90px auto 20px",
          padding: 20,
          backgroundColor: "#fff",
        }}
      >
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            background: "transparent",
            border: "none",
            fontSize: 22,
            cursor: "pointer",
            color: "#4B2995",
            marginBottom: 10,
            marginLeft: -5,
          }}
          title="Voltar"
        >
          ←
        </button>

        <div style={{ display: "flex", gap: 32 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img
              src={imagemPerfil}
              alt="Foto do perfil"
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                objectFit: "cover",
                border: "3px solid #5533aa",
              }}
            />
          </div>

          <div style={{ flex: 1 }}>
            <h2>{usuario.nome}</h2>
            <p style={{ fontWeight: "600", color: "#555" }}>{usuario.email}</p>
            <p style={{ marginTop: 4, fontWeight: "bold" }}>
              {usuario.descricao || "Perfil do usuário"}
            </p>
            <p style={{ marginTop: 8, fontSize: 14, color: "#333" }}>
              🇧🇷 Brasil
            </p>
          </div>
        </div>
        <div style={{ marginTop: 30, textAlign: "center" }}>
          <button
            onClick={abrirWhatsApp}
            style={{
              background: "#4B2995",
              color: "#fff",
              border: "none",
              padding: "10px 20px",
              borderRadius: 25,
              fontSize: 16,
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Contatar via WhatsApp
          </button>
        </div>
        {/* HABILIDADES */}
        <div style={{ marginTop: 40 }}>
          <h3>Habilidades</h3>
          {habilidades.length === 0 ? (
            <p>Este usuário ainda não adicionou habilidades.</p>
          ) : (
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {habilidades.map((hab, idx) => (
                <span
                  key={idx}
                  style={{
                    background: "#f3e8ff",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    color: "#4B2995",
                    border: "2px solid #4B2995",
                    fontWeight: "600",
                  }}
                >
                  {hab}
                </span>
              ))}
            </div>
          )}
        </div>

        <div style={{ marginTop: 40 }}>
          <h3 style={{ marginBottom: 12 }}>Serviços postados</h3>
          {meusServicos.length === 0 ? (
            <p>Este usuário ainda não cadastrou serviços.</p>
          ) : (
            meusServicos.map((servico) => (
              <div
                key={servico.id_servico}
                style={{
                  border: "5px solid #5533aa",
                  borderRadius: 10,
                  padding: 16,
                  marginBottom: 12,
                }}
              >
                <h4 style={{ margin: 0, color: "#4B2995" }}>{servico.nome}</h4>
                <p style={{ margin: "4px 0" }}>
                  <strong>Categoria:</strong> {servico.nome_categoria}
                </p>
                <p style={{ margin: "4px 0" }}>{servico.descricao}</p>
                <p style={{ margin: "4px 0" }}>
                  <strong>Valor:</strong> R$ {servico.valor}
                </p>
                <p style={{ margin: "4px 0" }}>
                  <strong>Localização:</strong> {servico.localizacao}
                </p>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
