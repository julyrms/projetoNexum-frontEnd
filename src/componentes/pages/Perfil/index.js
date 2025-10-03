import React, { useState, useRef } from "react";
import styled from "styled-components";
import { FaBell } from "react-icons/fa";
import Imagem from "./img/logo.png";

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

const Fonte = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  cursor: pointer;
  &:hover {
    color: #4b2995;
  }
`;

const ImageAju = styled.img`
  height: 40px;
  cursor: pointer;
`;

const Imagemnike = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  object-fit: cover;
  cursor: pointer;
`;

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
  const [nome, setNome] = useState("Guilherme Felix");
  const [cargo, setCargo] = useState("guifelix12@outlook.com");
  const [descricao, setDescricao] = useState(
    "Peril de Usuário Oficial - Nexum"
  );
  const [pais, setPais] = useState("Brasil");
  const [imagemPerfil, setImagemPerfil] = useState("");
  const inputFileRef = useRef(null);
  const inputHabilidadeRef = useRef(null);

  const alterarImagem = () => {
    inputFileRef.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => setImagemPerfil(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleUploadClick = () => {
    inputHabilidadeRef.current.click();
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        maxWidth: 720,
        margin: "90px auto 20px",
        padding: 20,
        backgroundColor: "#fff",
      }}
    >
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
          <Imagemnike src={imagemPerfil} alt="Perfil" onClick={alterarImagem} />
        </div>
      </Header>

      {/* Perfil */}
      <div style={{ display: "flex", gap: 32 }}>
        {/* Foto + botão */}
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
          <button
            onClick={alterarImagem}
            style={{
              marginTop: 8,
              background: "none",
              border: "none",
              color: "#5533aa",
              textDecoration: "underline",
              cursor: "pointer",
              fontSize: 14,
            }}
          >
            Alterar Imagem
          </button>
          <input
            type="file"
            accept="image/*"
            ref={inputFileRef}
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>

        {/* Infos */}
        <div style={{ flex: 1 }}>
          <h2
            style={{
              marginBottom: 4,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            {nome}
            <button
              title="Editar nome"
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
                padding: 0,
                lineHeight: 1,
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
            {cargo}
          </p>

          <p style={{ marginTop: 4, fontWeight: "bold" }}>{descricao}</p>

          {/* País */}
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
            <span role="img" aria-label="bandeira Brasil">
              🇧🇷
            </span>
            {pais}
            <span
              style={{
                border: "none",
                background: "none",
                cursor: "pointer",
                color: "#5533aa",
                fontSize: 14,
                padding: 0,
                lineHeight: 1,
                marginLeft: 8,
              }}
            >
              ✏️
            </span>
          </p>
        </div>
      </div>

      <div style={{ marginTop: 40 }}>
        <h3 style={{ marginBottom: 12 }}>Habilidades</h3>

        <UploadBox onClick={handleUploadClick}>
          <UploadContent>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="40"
              height="40"
              fill="rgba(0,0,0,0.3)"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 16V4m0 0l-4 4m4-4l4 4m5 4v8H3v-8"
                stroke="rgba(0,0,0,0.3)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p style={{ color: "#777", marginTop: 8 }}>Carregar Arquivos</p>
            <input
              type="file"
              ref={inputHabilidadeRef}
              accept=".pdf,.doc,.docx,.txt"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  alert(`Arquivo "${file.name}" carregado com sucesso!`);
                }
              }}
            />
          </UploadContent>
        </UploadBox>
      </div>
    </div>
  );
};

export default Perfil;
