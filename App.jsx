// Hoje as redações deixam de vir de um arquivo fixo e passam a vir de uma API.
// Rode a API num terminal (npm run api) e o site noutro (npm run dev).
// Siga os 5 passos marcados como TODO (os slides explicam cada um).

// TODO (passo 1): importe também o useEffect.
import { useState } from "react";
import Header from "./components/Header.jsx";
import RedacaoCard from "./components/RedacaoCard.jsx";
import "./estilo.css";

const API = "http://localhost:3001";

export default function App() {
  // TODO (passo 1): estados da API.
  // const [redacoes, setRedacoes] = useState([]);
  // const [carregando, setCarregando] = useState(true);
  // const [erro, setErro] = useState(null);

  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("todas");

  // TODO (passo 4): estado do campo "novo tema".
  // const [novoTema, setNovoTema] = useState("");

  // TODO (passo 2): buscar as redações da API quando a tela monta.
  // useEffect(() => {
  //   fetch(API + "/redacoes")
  //     .then((r) => r.json())
  //     .then((dados) => setRedacoes(dados))
  //     .catch((e) => setErro("Não foi possível carregar."))
  //     .finally(() => setCarregando(false));
  // }, []);

  // TODO (passo 5): enviar a nova redação para a API (POST) e atualizar a lista.
  // async function adicionar(e) {
  //   e.preventDefault();
  //   if (!novoTema.trim()) return;
  //   const resp = await fetch(API + "/redacoes", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ tema: novoTema, status: "em_correcao" }),
  //   });
  //   const salva = await resp.json();
  //   setRedacoes([...redacoes, salva]);
  //   setNovoTema("");
  // }

  // TODO (passo 3): calcule a lista visível a partir de "redacoes" (não mais de REDACOES).
  const visiveis = [];

  return (
    <div className="pagina">
      <Header />

      {/* TODO (passo 4): formulário de nova redação (input controlado + botão). */}

      <input
        className="busca"
        value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Buscar por tema…"
      />

      <div className="filtros">
        <button className={filtro === "todas" ? "chip ativo" : "chip"} onClick={() => setFiltro("todas")}>Todas</button>
        <button className={filtro === "corrigida" ? "chip ativo" : "chip"} onClick={() => setFiltro("corrigida")}>Corrigidas</button>
        <button className={filtro === "em_correcao" ? "chip ativo" : "chip"} onClick={() => setFiltro("em_correcao")}>Em correção</button>
      </div>

      {/* TODO (passo 3): enquanto carrega, mostre <p className="carregando">Carregando…</p>;
          se der erro, <p className="erro">{erro}</p>; senão, a lista (ou o aviso de vazio). */}
      {visiveis.map((r) => (
        <RedacaoCard key={r.id} redacao={r} />
      ))}

    </div>
  );
}
