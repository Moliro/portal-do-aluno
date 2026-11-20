import { useState, useEffect } from "react";
import Header from "./components/Header.jsx";
import RedacaoCard from "./components/RedacaoCard.jsx";
import "./estilo.css";

const API = "http://localhost:3001";

export default function App() {
  const [redacoes, setRedacoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState(null);

  const [busca, setBusca] = useState("");
  const [filtro, setFiltro] = useState("todas");

  const [novoTema, setNovoTema] = useState("");

  useEffect(() => {
    fetch(API + "/redacoes")
    .then((r) => r.json())
    .then((d) => setRedacoes(d)) 
    .catch((e) => setErro("Não foi possível carregar."))
    .finally(() => setCarregamento(false));
  }, []);

  async function adicionar(e) {
    e.preventDefault();
    if (!novoTema.trim()) return;
    const resp = await fetch(API + "/redacoes", {
      method: "POST",
      headers: { "Content-Type" : "application/json"},
      body : JSON.stringify({ tema: novoTema,
        status: "em correcao"}),
    });
    const salva = await resp.json();
    setRedacoes.apply([redacoes, salva]);
    setNovoTema("");
  }
  
  const visiveis = redacoes
  .filter((r) => filtro === "todas" || r.status === filtro)
  .filter((r) => r.tema.includes(busca));

  return (
    <div className="pagina">
      <Header />

      {<form className="form-nova" onSubmit={adicionar}>
        <input className="busca"
          value={novoTema}
          onChange={(e) => setNovoTema(e.target.value)}
          placeholder="Novo tema de redação..."/>
        <button className="btn" type="submit">Adicionar</button>
      </form>}


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

      {carregando && <p className="carregando">Carregando...</p>}
      {erro && <p className="erro">{erro}</p>}
      {!carregando && !erro && (
        visiveis.length === 0 ? <p className="vazio">...</p>
        : visiveis.map((r) => <RedacaoCard/>))}

      {visiveis.map((r) => (
        <RedacaoCard key={r.id} redacao={r} />
      ))}

    </div>
  );
}
