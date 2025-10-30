import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function EditarServico() {
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

  useEffect(() => {
    async function carregarServico() {
      try {
        const res = await fetch(
          `http://localhost:3001/servicos/servicoPorId/${id}`
        );
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
        alert("Serviço atualizado com sucesso!");
        navigate("/perfil");
      } else {
        alert("Erro ao atualizar serviço.");
      }
    } catch (err) {
      console.error(err);
      alert("Erro de conexão ao atualizar serviço.");
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
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: 14 }}
      >
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
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
        </label>

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
              border: "1px solid #ccc",
              width: "100%",
              minHeight: 80,
            }}
          />
        </label>

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
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
        </label>

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
              border: "1px solid #ccc",
              width: "100%",
            }}
          />
        </label>

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
        <button
          type="submit"
          style={{
            background: "#4B2995",
            color: "white",
            border: "none",
            padding: "10px 16px",
            borderRadius: 8,
            fontSize: 16,
            cursor: "pointer",
            marginTop: 10,
          }}
        >
          Salvar alterações
        </button>
      </form>
    </div>
  );
}

// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";

// export default function EditarServico() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [form, setForm] = useState({
//     nome: "",
//     descricao: "",
//     valor: "",
//     localizacao: "",
//     category_id: "",
//   });

//   useEffect(() => {
//     fetch(`http://localhost:3001/servicos/todosServicos`)
//       .then((res) => res.json())
//       .then((data) => {
//         const servico = data.find((s) => s.id_servico === parseInt(id));
//         if (servico) setForm(servico);
//       });
//   }, [id]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const resposta = await fetch(`http://localhost:3001/servicos/atualizarServico/${id}`, {
//       method: "PUT",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     });
//     if (resposta.ok) {
//       alert("Serviço atualizado com sucesso!");
//       navigate("/perfil");
//     } else {
//       alert("Erro ao atualizar serviço.");
//     }
//   };

//   return (
//     <div style={{ padding: 30 }}>
//       <h2>Editar Serviço</h2>
//       <form onSubmit={handleSubmit}>
//         <input name="nome" value={form.nome} onChange={handleChange} />
//         <input
//           name="descricao"
//           value={form.descricao}
//           onChange={handleChange}
//         />
//         <input name="valor" value={form.valor} onChange={handleChange} />
//         <input
//           name="localizacao"
//           value={form.localizacao}
//           onChange={handleChange}
//         />
//         <input
//           name="category_id"
//           value={form.category_id}
//           onChange={handleChange}
//         />
//         <button type="submit">Salvar</button>
//       </form>
//     </div>
//   );
// }
