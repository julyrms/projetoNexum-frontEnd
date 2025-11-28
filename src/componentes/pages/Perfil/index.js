import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FaBell } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import Imagem from "../../../Img/logoheader.png";
import PerfilImg from "../../../Img/user-icon.png";



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

const Fonte = styled.div`
  color: #000000;
  font-weight: 600;
  font-size: 18px;
  margin: 0;
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

const UploadBox = styled.div`
  border: 4px solid #4b2995;
  border-radius: 12px;
  padding: 50px;
  margin-top: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UploadContent = styled.div`
  text-align: center;
  color: #aaa;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;

  input[type="file"] {
    display: none;
  }
`;

const Perfil = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState("Guilherme Felix");
  const [email, setEmail] = useState("guifelix12@outlook.com");
  const [descricao, setDescricao] = useState(
    "Perfil de Usuário Oficial - Nexum"
  );
  const [habilidades, setHabilidades] = useState([]);

  const [pais, setPais] = useState("Brasil");
  const [imagemPerfil, setImagemPerfil] = useState(PerfilImg);
  const inputFileRef = useRef(null);
  const inputHabilidadeRef = useRef(null);
  const [hover, setHover] = useState(false);
  const [hoverEditar, setHoverEditar] = useState(null);
 const [hoverExcluir, setHoverExcluir] = useState(null);
  const [meusServicos, setMeusServicos] = useState([]);
  const userId = localStorage.getItem("user_id");
  useEffect(() => {
    const habs = localStorage.getItem("user_habilidades");

    if (habs) {
      try {
        setHabilidades(JSON.parse(habs));
      } catch (err) {
        console.error("Erro ao carregar habilidades:", err);
        setHabilidades([]);
      }
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    fetch(`http://localhost:3001/servicos/usuarioServicos/${userId}`)
      .then((res) => res.json())
      .then((data) => setMeusServicos(data))
      .catch((err) => console.error("Erro ao buscar serviços:", err));
  }, [userId]);

  const handleEditar = (servico) => {
    navigate(`/editarServico/${servico.id_servico}`);
  };

  const handleExcluir = async (id) => {
    if (!window.confirm("Deseja realmente excluir este serviço?")) return;

    try {
      const resposta = await fetch(
        `http://localhost:3001/servicos/apagarServico/${id}`,
        {
          method: "DELETE",
        }
      );
      if (resposta.ok) {
        setMeusServicos((prev) => prev.filter((s) => s.id_servico !== id));
      } else {
        alert("Erro ao excluir serviço.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const nomeSalvo = localStorage.getItem("user_nome");
    const emailSalvo = localStorage.getItem("user_email");

    if (nomeSalvo) setNome(nomeSalvo);
    if (emailSalvo) setEmail(emailSalvo);
  }, []);

  return (
    <>
      {/* HEADER */}
      <Header>
        <ImageAju src={Imagem} alt="Logo da empresa" />
        <Link
          to="/dashboard"
          style={{
            margin: "0 10px",
            textDecoration: "none",
            color: "#000000ff",
          }}
        >
          Encontre Trabalhos
        </Link>

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
            <h2 style={{ marginBottom: 4 }}>
              {nome}{" "}
              <button
                onClick={() => {
                  const novoNome = prompt("Digite seu nome", nome);
                  if (novoNome && novoNome.trim() !== "")
                    setNome(novoNome.trim());
                }}
                style={{
                  border: "none",
                  background: "none",
                  cursor: "pointer",
                  color: "#5533aa",
                  fontSize: 18,
                }}
              >
                ✏️
              </button>
            </h2>

            <p
              style={{
                marginTop: 0,
                marginBottom: 4,
                fontWeight: "600",
                color: "#555",
              }}
            >
              {email}
            </p>

            <p style={{ marginTop: 4, fontWeight: "bold" }}>{descricao}</p>

            <p
              style={{
                marginTop: 8,
                fontSize: 14,
                color: "#333",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              🇧🇷 {pais}
              <span
                style={{
                  cursor: "pointer",
                  color: "#5533aa",
                  marginLeft: 8,
                }}
              ></span>
            </p>
          </div>
        </div>

        <div style={{ marginTop: 40 }}>
          <h3 style={{ marginBottom: 12 }}>Habilidades</h3>

          {habilidades.length === 0 ? (
            <p>Você ainda não adicionou habilidades.</p>
          ) : (
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {habilidades.map((hab, index) => (
                <span
                  key={index}
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
          <button
            onClick={() => {
              const novas = prompt(
                "Edite suas habilidades (separadas por vírgula):",
                habilidades.join(", ")
              );

              if (novas !== null) {
                const lista = novas
                  .split(",")
                  .map((h) => h.trim())
                  .filter((h) => h !== "");

                setHabilidades(lista);
                localStorage.setItem("user_habilidades", JSON.stringify(lista));
              }
            }}
            style={{
              marginTop: 10,
              background: "#4B2995",
              color: "#fff",
              border: "none",
              padding: "8px 12px",
              borderRadius: 8,
              cursor: "pointer",
            }}
          >
            Editar Habilidades
          </button>
        </div>
        <div style={{ marginTop: 40 }}>
          <h3 style={{ marginBottom: 12 }}>Meus Serviços</h3>
          {meusServicos.length === 0 ? (
            <p>Você ainda não cadastrou nenhum serviço.</p>
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

                <div style={{ marginTop: 8 }}>
                  <button
                    onClick={() => handleEditar(servico)}
                    onMouseEnter={() => setHoverEditar(servico.id_servico)}
                    onMouseLeave={() => setHoverEditar(null)}
                    style={{
                      background: hoverEditar === servico.id_servico ? "#4B2995" : "white",
                      color: hoverEditar === servico.id_servico ? "white" : "#4B2995",
                      border: "1px solid #4B2995",
                      borderRadius: 8,
                      padding: "6px 12px",
                      cursor: "pointer",
                      marginRight: 8,
                      transition: "0.2s"
                    }}
                  >
                    Editar
                  </button>

                  <button
                    onClick={() => handleExcluir(servico.id_servico)}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                    style={{
                      background: hover ? "#4B2995" : "white",
                      color: hover ? "white" : "#4B2995",
                      border: "1px solid #4B2995",
                      borderRadius: 8,
                      padding: "6px 12px",
                      borderColor: "#4B2995",
                      transition: "0.2s"
                      
                    }}
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default Perfil;
