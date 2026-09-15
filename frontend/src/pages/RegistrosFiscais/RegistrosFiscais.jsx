import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchX } from "lucide-react";

import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import DataTable from "../../components/DataTable/DataTable";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import Button from "../../components/Button/Button";
import SearchInput from "../../components/SearchInput/SearchInput";
import Select from "../../components/Select/Select";
import FilterBar from "../../components/FilterBar/FilterBar";
import Pagination from "../../components/Pagination/Pagination";
import EmptyState from "../../components/EmptyState/EmptyState";

import { buscarRegistros } from "../../services/registrosService";
import {
  statusOptions,
  ocorrenciaOptions,
  segmentoOptions,
} from "../../data/mockRegistros";
import styles from "./RegistrosFiscais.module.css";

const PAGE_SIZE = 10;

const statusTone = (status) =>
  status === "Prioridade alta"
    ? "danger"
    : status === "Atenção"
    ? "warning"
    : "success";

const formatBRL = (value) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export default function RegistrosFiscais() {
  const navigate = useNavigate();

  // Dados assíncronos
  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filtros
  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState("todos");
  const [ocorrencia, setOcorrencia] = useState("todas");
  const [segmento, setSegmento] = useState("todos");

  // Paginação
  const [currentPage, setCurrentPage] = useState(1);

  // Carrega registros
  useEffect(() => {
    async function carregarRegistros() {
      try {
        const dados = await buscarRegistros();
        setRegistros(dados);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar os registros.");
      } finally {
        setLoading(false);
      }


}

    




    carregarRegistros();
  }, []);

  // Filtragem derivada
  const registrosFiltrados = useMemo(() => {
    const termo = busca.trim().toLowerCase();

    return registros.filter((r) => {
      const matchBusca =
        !termo ||
        r.documento.toLowerCase().includes(termo) ||
        r.empresa.toLowerCase().includes(termo);

      const matchStatus = status === "todos" || r.status === status;
      const matchOcorrencia =
        ocorrencia === "todas" || r.ocorrencia === ocorrencia;
      const matchSegmento =
        segmento === "todos" || r.segmento === segmento;

      return matchBusca && matchStatus && matchOcorrencia && matchSegmento;
    });
  }, [registros, busca, status, ocorrencia, segmento]);

  // Paginação derivada
  const totalPages = Math.max(
    1,
    Math.ceil(registrosFiltrados.length / PAGE_SIZE)
  );
  const page = Math.min(currentPage, totalPages);

  const registrosPaginados = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return registrosFiltrados.slice(start, start + PAGE_SIZE);
  }, [registrosFiltrados, page]);

  const handleOpenRegistro = (id) => {
    navigate(`/registros/${id}`);
  };

  const columns = [
    { key: "documento",  header: "Documento",  width: 110 },
    { key: "empresa",    header: "Empresa" },
    { key: "segmento",   header: "Segmento",   width: 110 },
    { key: "data",       header: "Data",       width: 100 },
    { key: "valor",      header: "Valor",      width: 120, align: "right" },
    { key: "status",     header: "Status",     width: 140 },
    { key: "ocorrencia", header: "Ocorrência" },
    { key: "acao",       header: "",           width: 110, align: "right" },
  ];

  const renderCell = (row, col) => {
    switch (col.key) {
      case "documento":
        return <span className={styles.docCell}>{row.documento}</span>;

      case "valor":
        return <span className={styles.valorCell}>{formatBRL(row.valor)}</span>;

      case "status":
        return (
          <StatusBadge tone={statusTone(row.status)}>{row.status}</StatusBadge>
        );

      case "ocorrencia":
        return row.ocorrencia === "—" ? (
          <span className={styles.muted}>—</span>
        ) : (
          row.ocorrencia
        );

      case "acao":
        return (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleOpenRegistro(row.id)}
          >
            Analisar →
          </Button>
        );

      default:
        return row[col.key];
    }
  };

  return (
    <div className={styles.layout}>
      <Sidebar />

      <div className={styles.main}>
        <Header
          title="Registros Fiscais"
          subtitle="Consulta e validação dos registros processados no período analisado."
        />

        <main className={styles.content}>
          {/* Resumo discreto */}
          <div className={styles.summary}>
            <span className={styles.summaryStrong}>24 registros analisados</span>
            <span className={styles.summaryDot}>·</span>
            <span>Janeiro de 2026 · Todas as empresas</span>
          </div>

          {/* Filtros */}
          <section className={styles.section}>
            <SectionHeader
              title="Filtros"
              description="Refine a lista por documento, empresa, status, segmento ou tipo de ocorrência."
            />
            <FilterBar>
              <div className={styles.filterField}>
                <label className={styles.filterLabel}>Busca</label>
                <SearchInput
                  value={busca}
                  onChange={(v) => {
                    setBusca(v);
                    setCurrentPage(1);
                  }}
                  placeholder="Buscar por documento ou empresa"
                />
              </div>

              <Select
                label="Status"
                value={status}
                onChange={(v) => {
                  setStatus(v);
                  setCurrentPage(1);
                }}
                options={statusOptions}
              />

              <Select
                label="Segmento"
                value={segmento}
                onChange={(v) => {
                  setSegmento(v);
                  setCurrentPage(1);
                }}
                options={segmentoOptions}
              />

              <Select
                label="Tipo de ocorrência"
                value={ocorrencia}
                onChange={(v) => {
                  setOcorrencia(v);
                  setCurrentPage(1);
                }}
                options={ocorrenciaOptions}
              />

              <div className={styles.periodBox}>
                <span className={styles.filterLabel}>Período</span>
                <span className={styles.periodValue}>Janeiro de 2026</span>
              </div>
            </FilterBar>
          </section>

          {/* Resultado */}
          <section className={styles.section}>
            <SectionHeader
              title="Resultado"
              description={
                registrosFiltrados.length === 1
                  ? "1 registro encontrado"
                  : `${registrosFiltrados.length} registros encontrados`
              }
            />

            {loading ? (
              <EmptyState
                title="Carregando registros..."
                description="Aguarde enquanto os dados são carregados."
              />
            ) : error ? (
              <EmptyState
                icon={SearchX}
                title="Erro ao carregar"
                description={error}
              />
            ) : registrosFiltrados.length === 0 ? (
              <EmptyState
                icon={SearchX}
                title="Nenhum registro encontrado"
                description="Tente ajustar os filtros ou realizar uma nova busca."
              />
            ) : (
              <div className={styles.tableCard}>
                <DataTable
                  columns={columns}
                  rows={registrosPaginados}
                  renderCell={renderCell}
                />
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  totalItems={registrosFiltrados.length}
                  pageSize={PAGE_SIZE}
                  onPageChange={setCurrentPage}
                />
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}