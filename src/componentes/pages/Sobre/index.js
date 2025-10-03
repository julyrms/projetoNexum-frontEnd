import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";

import styled from "styled-components";
import Imagem from "../../../Img/logoheader.png";

import { FaBell } from "react-icons/fa";
import Perfil from "../../../Img/nike.jpg";
import ImageBloco from "../../../Img/imagembloco.png";
import "../Dashboard/index.css";

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

const Fonte = styled.div`
  color: #726b6bff;
  font-weight: 600;
  font-size: 18px;
  margin: 0;
`;

const Fontes = styled.div`
  color: #000000ff;
  font-weight: 600;
  font-size: 18px;
  margin: 0;
`;

const Corpo = styled.div`
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5));
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  padding-top: 60px; /* distancia do topo */
  padding-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: flex-start; /* alinha ao topo */
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

const FiltroSelect = styled.select`
  width: 400px;
  padding: 10px 15px;
  border: 3px solid #a794cf;
  border-radius: 25px;
  font-size: 14px;
  color: #555;
  background: white;
`;

const Bloco = styled.div`
  width: 800px;
  height: 225px;
  background-color: #ffffffff;
  border-radius: 19px;
  color: #a794cf;
  border: 3px solid #a794cf; /* define cor + tamanho + estilo */
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
  color: #5100ff;
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

const Font = styled.div`
  color: #a794cf;
  font-weight: bold;
  font-size: 50px;
  align-items: center;
  margin-top: 80px;
  display: flex;
  justify-content: center;
`;
export default function App() {
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
          <Imagemnike src={Perfil} alt="Logo da empresa" />
        </div>
      </Header>
      <Font>Sobre Nós</Font>
      <Quadro>
        <Bloco>
          <Fontes>
            A <b>Nexum é uma plataforma inovadora</b> que conecta profissionais
            freelancers a empresas e pessoas que buscam serviços de qualidade.
            Nosso objetivo é facilitar o encontro entre quem oferece e quem
            precisa de soluções, criando um ambiente simples, rápido e
            acessível. Com a Nexum, você encontra oportunidades de trabalho em{" "}
            <b>diferentes áreas</b> e pode divulgar seus serviços para ampliar
            sua rede de clientes. <b>Tudo de forma prática e gratuita</b>, para
            que o foco esteja no que realmente importa:{" "}
            <b>gerar conexões que transformam ideias em resultados.</b>
          </Fontes>
        </Bloco>
      </Quadro>
    </>
  );
}
