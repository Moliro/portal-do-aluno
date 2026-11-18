import Header from "./components/Header.jsx";
import RedacaoCard from "./components/RedacaoCard.jsx";
import { REDACOES } from "./dados.js";
import "./estilo.css";
import { useState } from "react";

export default function App() {
  const [busca, setBusca] =
    useState("");

  const [filtro, setFiltro] =
    useState("todas");

  const visiveis = REDACOES.filter(
    (r) => r.tema.toLowerCase()
      .includes(busca.toLowerCase())
  
    .filter ((r) => filtro === "todas" || r.status === filtro)
    .filter ((r) => r.tema.includes(busca))
  );

  {visiveis.map((r) =>
    <RedacaoCard key={r.id} redacao={r} />)};

  return (
    <div className="pagina">
      <Header />

    {<input className="busca" value={busca}
        onChange={(e) => setBusca(e.target.value)}
        placeholder="Buscar por um tema"
    />};

    {<button onClick={() => setFiltro("todas")}
        className = {filtro === "todas"?"chip ativo":"chip"}/>};

    {visiveis.length === 0 ?(
      <p className = "vazio">
        Nenhuma redação encontrada.
      </p>
    ) : ( visiveis.map((r) => (
      <RedacaoCard key={r.id} redacao={r} />
    )))};

    </div>
  );
};