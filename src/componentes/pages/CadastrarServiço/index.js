import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate, Link } from "react-router-dom";
import { FaBell } from "react-icons/fa";
import Imagem from "../../../Img/logoheader.png";
import PerfilImg from "../../../Img/logo.png"; // imagem padrão

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
  z-index: 100;
`;

const Fonte = styled.div`
  color: #000000ff;
  font-weight: 600;
  font-size: 18px;
  margin: 0;
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

const Notificacoes = () => {
  const [notificacoes, setNotificacoes] = useState([]);
  const [notifAberta, setNotifAberta] = useState(false);
  const [erroNotif, setErroNotif] = useState(null);
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
    if (notifAberta) {
      fetch("http://localhost:3000/notificacoes")
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao buscar notificações");
          return res.json();
        })
        .then((data) => setNotificacoes(data))
        .catch((err) => setErroNotif(err.message));
    }
  }, [notifAberta]);

  return (
    <div ref={popupRef} style={{ position: "relative" }}>
      <div style={{ position: "relative" }}>
        <FaBell
          onClick={toggleNotificacoes}
          style={{ fontSize: "20px", color: "#4B2995", cursor: "pointer" }}
        />
        {notificacoes.length > 0 && <Badge>{notificacoes.length}</Badge>}
      </div>

      {notifAberta && (
        <NotifPopup>
          <h5 style={{ marginBottom: "10px", color: "#4B2995" }}>
            Notificações
          </h5>
          {erroNotif ? (
            <p style={{ color: "red" }}>{erroNotif}</p>
          ) : notificacoes.length === 0 ? (
            <p>Nenhuma notificação.</p>
          ) : (
            notificacoes.map((n) => (
              <NotifItem key={n.id}>
                <NotifTitulo>{n.titulo}</NotifTitulo>
                <div>{n.mensagem}</div>
              </NotifItem>
            ))
          )}
        </NotifPopup>
      )}
    </div>
  );
};

const ContainerCentralizado = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 100vh;
  background-color: #fafafa;
  padding-top: 120px; /* espaçamento pro header fixo */
`;

const Moldura = styled.div`
  border: 2px solid #5b2ca0;
  border-radius: 12px;
  padding: 25px;
  width: 500px;
  text-align: center;
  background-color: #fff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;

const Titulo = styled.h2`
  color: #5b2ca0;
  margin-bottom: 25px;
  font-weight: bold;
  font-size: 20px;
`;

const Campo = styled.div`
  margin-bottom: 15px;
  text-align: left;

  label {
    font-weight: bold;
    margin-bottom: 6px;
    display: block;
    font-size: 14px;
    color: #333;
  }

  input,
  select {
    width: 100%;
    padding: 8px 12px;
    border: 1.5px solid #5b2ca0;
    border-radius: 20px;
    outline: none;
    font-size: 14px;
    transition: all 0.2s ease;

    &:focus {
      border-color: #7c4dff;
      box-shadow: 0 0 4px rgba(124, 77, 255, 0.3);
    }
  }
`;

const Botao = styled.button`
  padding: 10px 20px;
  border: 2px solid #5b2ca0;
  border-radius: 25px;
  background: white;
  color: #5b2ca0;
  font-size: 15px;
  cursor: pointer;
  margin-top: 10px;
  width: 180px;
  font-weight: 600;
  transition: all 0.3s;

  &:hover {
    background: #5b2ca0;
    color: white;
  }
`;

export default function CadastroServico() {
  const [categorias, setCategorias] = useState([]);
  useEffect(() => {
    async function carregarCategorias() {
      try {
        const res = await fetch(
          `http://localhost:3001/categorias/todasCategorias`
        );
        if (!res.ok) throw new Error("Erro ao carregar categorias");
        const data = await res.json();
        console.log("Categorias recebidas:", data);
        setCategorias(data);
      } catch (error) {
        console.error(error);
      }
    }
    carregarCategorias();
  }, []);

  const [form, setForm] = useState({
    user_id: "",
    category_id: "",
    nome: "",
    descricao: "",
    valor: "",
    localizacao: "",
  });

  const [imagemPerfil, setImagemPerfil] = useState(PerfilImg);
  const navigate = useNavigate();

  useEffect(() => {
    const imgSalva = localStorage.getItem("imagemPerfil");
    if (imgSalva) setImagemPerfil(imgSalva);
  }, []);

  useEffect(() => {
    const usuario = localStorage.getItem("user_id");
    const nomeUsuario = localStorage.getItem("user_nome");

    console.log("Usuário logado:", usuario, nomeUsuario);

    if (!usuario) {
      alert("Você precisa estar logado para cadastrar um serviço.");
      return;
    }

    setForm((prevForm) => ({
      ...prevForm,
      user_id: usuario,
      user_nome: nomeUsuario || "",
    }));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const executaSubmit = async (event) => {
    event.preventDefault();
    try {
      const resposta = await fetch(
        "http://localhost:3001/servicos/postarServico",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );
      const data = await resposta.json();
      if (resposta.ok) {
        alert("Serviço cadastrado com sucesso!");
        navigate("/dashboard");
        setForm({
          user_id: "",
          category_id: "",
          nome: "",
          descricao: "",
          valor: "",
          localizacao: "",
        });
      } else {
        alert(data.erro || "Erro ao cadastrar serviço.");
      }
    } catch (erro) {
      console.error("Erro de conexão:", erro);
      alert("Não foi possível conectar ao servidor.");
    }
  };

  return (
    <>
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
        <Fonte style={{ margin: "0 10px", color: "#4B2995" }}>
          Cadastro de Serviço
        </Fonte>

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

      <ContainerCentralizado>
        <Moldura>
          <form onSubmit={executaSubmit}>
            <Titulo>Cadastre seu serviço</Titulo>

            <Campo>
              <label htmlFor="user_id">Usuário</label>
              <input
                type="text"
                name="user_id"
                value={form.user_nome || ""}
                onChange={handleChange}
                readOnly
                required
              />
            </Campo>

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
              <label htmlFor="category_id">Categoria</label>
              <select
                name="category_id"
                value={form.category_id}
                onChange={handleChange}
                required
              >
                <option value="">Selecione uma categoria</option>
                {categorias.map((cat) => (
                  <option key={cat.id_categoria} value={cat.id_categoria}>
                    {cat.nome}
                  </option>
                ))}
              </select>
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
              <label htmlFor="localizacao">Localização</label>
              <input
                type="text"
                name="localizacao"
                value={form.localizacao}
                onChange={handleChange}
                required
              />
            </Campo>

            <Botao type="submit">Cadastrar</Botao>
          </form>
        </Moldura>
      </ContainerCentralizado>
    </>
  );
}
