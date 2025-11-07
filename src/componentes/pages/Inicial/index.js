import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import BannerImg from "../../../Img/imagemInicial.jpg";

const PageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 30px;
  background: #f6f3ff;
`;

const Card = styled.div`
  display: flex;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  max-width: 950px;
  width: 100%;
  padding: 40px 35px;
  gap: 40px;

  @media (max-width: 760px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Image = styled.img`
  width: 380px;
  height: auto;
  border-radius: 12px;
  object-fit: cover;

  @media (max-width: 760px) {
    width: 100%;
  }
`;

const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 34px;
  font-weight: 700;
  color: #4b2995;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #333;
  max-width: 500px;
  margin-bottom: 30px;
  line-height: 1.4;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;

  @media (max-width: 760px) {
    justify-content: center;
  }
`;

const Button = styled.button`
  background: ${(props) => (props.primary ? "#4B2995" : "white")};
  color: ${(props) => (props.primary ? "white" : "#4B2995")};
  border: 2px solid #4b2995;
  padding: 12px 26px;
  border-radius: 25px;
  font-size: 16px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s;

  &:hover {
    background: ${(props) => (props.primary ? "#331a64" : "#eee5ff")};
  }
`;

export default function Home() {
  const navigate = useNavigate();

  return (
    <PageWrapper>
      <Card>
        <Image src={BannerImg} alt="Imagem de boas-vindas" />
        <Content>
          <Title>Bem-vindo à Nexum!</Title>
          <Subtitle>
            Encontre os melhores serviços que estão sendo prestados no momento.
            Conecte-se com profissionais e descubra novas oportunidades para o
            seu dia a dia.
          </Subtitle>
          <ButtonGroup>
            <Button primary onClick={() => navigate("/login")}>
              Entrar
            </Button>

            <Button onClick={() => navigate("/cadastrar")}>Criar Conta</Button>
          </ButtonGroup>
        </Content>
      </Card>
    </PageWrapper>
  );
}
