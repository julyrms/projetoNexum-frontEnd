import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditarServico() {
  const [categorias, setCategorias] = useState([]);
  const [hoverSalvar, setHoverSalvar] = useState(false);
  const [hoverExcluir, setHoverExcluir] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    valor: "",
    localizacao: "",
    category_id: "",
  });

  const [carregando, setCarregando] = useState(true);

  // Carregar categorias
  useEffect(() => {
    async function carregarCategorias() {
      try {
        const res = await fetch(`http://localhost:3001/categorias/todasCategorias`);
        if (!res.ok) throw new Error("Erro ao carregar categorias");
        const data = await res.json();
        setCategorias(data);
      } catch (error) {
        console.error(error);
      }
    }
    carregarCategorias();
  }, []);

  // Carregar serviço
  useEffect(() => {
    async function carregarServico() {
      try {
        const res = await fetch(`http://localhost:3001/servicos/servicoPorId/${id}`);
        if (!res.ok) throw new Error("Erro ao carregar serviço");
        const servico = await res.json();
        setForm(servico);
      } catch (error) {
        console.error(error);
        alert("Erro ao carregar os dados do serviço.");
      } finally {
        setCarregando(false);
      }
    }
    carregarServico();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Salvar alterações
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resposta = await fetch(
        `http://localhost:3001/servicos/atualizarServico/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        }
      );

      if (resposta.ok) {
        navigate("/perfil");
      } else {
        alert("Erro ao atualizar serviço.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro de conexão ao atualizar serviço.");
    }
  };

  // Excluir serviço
  const handleExcluir = async () => {
    if (!window.confirm("Tem certeza que deseja excluir este serviço?")) return;

    try {
      const res = await fetch(
        `http://localhost:3001/servicos/deletarServico/${id}`,
        { method: "DELETE" }
      );

      if (res.ok) {
        navigate("/perfil");
      } else {
        alert("Erro ao excluir serviço.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão ao excluir.");
    }
  };

  if (carregando) return <p style={{ padding: 30 }}>Carregando...</p>;

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "40px auto",
        padding: 30,
        background: "#fff",
        borderRadius: 10,
        boxShadow: "0 0 10px rgba(0,0,0,0.1)",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h2 style={{ color: "#4B2995", marginBottom: 20 }}>Editar Serviço</h2>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>

        {/* NOME */}
        <label>
          Nome:
          <input
            type="text"
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
            style={{
              padding: 8,
              borderRadius: 6,
              border: "3px solid #4B2995",
              width: "100%",
            }}
          />
        </label>

        {/* DESCRIÇÃO */}
        <label>
          Descrição:
          <textarea
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            required
            style={{
              padding: 8,
              borderRadius: 6,
              border: "3px solid #4B2995",
              width: "100%",
              minHeight: 80,
            }}
          />
        </label>

        {/* VALOR */}
        <label>
          Valor:
          <input
            type="number"
            name="valor"
            value={form.valor}
            onChange={handleChange}
            required
            style={{
              padding: 8,
              borderRadius: 6,
              border: "3px solid #4B2995",
              width: "100%",
            }}
          />
        </label>

        {/* LOCALIZAÇÃO */}
        <label>
          Localização:
          <input
            type="text"
            name="localizacao"
            value={form.localizacao}
            onChange={handleChange}
            required
            style={{
              padding: 8,
              borderRadius: 6,
              border: "3px solid #4B2995",
              width: "100%",
            }}
          />
        </label>

        {/* CATEGORIA */}
        <label htmlFor="category_id" style={{ fontWeight: "bold" }}>
          Categoria:
        </label>

        <select
          name="category_id"
          value={form.category_id}
          onChange={handleChange}
          required
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: "12px",
            border: "3px solid #4B2995",
            outline: "none",
            fontSize: "14px",
            backgroundColor: "#faf7ff",
            transition: "0.2s",
            cursor: "pointer",
          }}
          onFocus={(e) => (e.target.style.border = "3px solid #6a3bd1")}
          onBlur={(e) => (e.target.style.border = "3px solid #4B2995")}
        >
          <option value="">Selecione uma categoria</option>
          {categorias.map((cat) => (
            <option key={cat.id_categoria} value={cat.id_categoria}>
              {cat.nome}
            </option>
          ))}
        </select>

        <button
          type="submit"
          onMouseEnter={() => setHoverSalvar(true)}
          onMouseLeave={() => setHoverSalvar(false)}
          style={{
            background: hoverSalvar ? "white" : "#4B2995",
            color: hoverSalvar ? "#4B2995" : "white",
            border: "2px solid #4B2995",
            padding: "10px 16px",
            borderRadius: 8,
            fontSize: 16,
            cursor: "pointer",
            marginTop: 10,
            transition: "0.2s",
            fontWeight: "bold",
          }}
        >
          Salvar alterações
        </button>


      </form>
    </div>
  );
}
