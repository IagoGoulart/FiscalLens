import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchX } from "lucide-react";

import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import PageSection from "../../components/PageSection/PageSection";
import InfoRow from "../../components/InfoRow/InfoRow";
import DataTable from "../../components/DataTable/DataTable";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import Button from "../../components/Button/Button";
import EmptyState from "../../components/EmptyState/EmptyState";

import { buscarRegistros } from "../../services/registrosService";
import styles from "./Relatorios.module.css";

const PERIODO = "Janeiro de 2026";

// Ordem fixa dos principais achados, conforme definido no produto.
// A prioridade é fixa por tipo — não é inferida do volume.
const TIPOS_OCORRENCIA = [
  { tipo: "Total inconsistente",       prioridade: "Alta"  },
  { tipo: "Data fora do período",      prioridade: "Média" },
  { tipo: "Documento duplicado",       prioridade: "Alta"  },
  { tipo: "Campo obrigatório ausente", prioridade: "Média" },
];

const prioridadeTone = (p) =>
  p === "Alta" ? "danger" : p === "Média" ? "warning" : "success";

export default function Relatorios() {
  const navigate = useNavigate();

  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function carregar() {
      try {
        const dados = await buscarRegistros();
        setRegistros(dados);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar os dados do relatório.");
      } finally {
        setLoading(false);
      }
    }
    carregar();
  }, []);

  // ---- Derivados ----
  const resumo = useMemo(() => {
    const total = registros.length;
    const regulares = registros.filter((r) => r.status === "Regular").length;
    const atencao = registros.filter((r) => r.status === "Atenção").length;
    const prioridadeAlta = registros.filter(
      (r) => r.status === "Prioridade alta"
    ).length;
    return { total, regulares, atencao, prioridadeAlta };
  }, [registros]);

  // Conta cada ocorrência individualmente, mesmo quando um registro
  // possui mais de uma inconsistência (ex.: "Data fora do período + Documento duplicado").
  const principaisAchados = useMemo(() => {
    return TIPOS_OCORRENCIA.map(({ tipo, prioridade }) => {
      const ocorrencias = registros.filter((registro) =>
        registro.ocorrencia?.includes(tipo)
      ).length;

      return {
        id: tipo,
        tipo,
        ocorrencias,
        prioridade,
      };
    }).filter((linha) => linha.ocorrencias > 0);
  }, [registros]);

  const registrosPrioritarios = useMemo(
    () => registros.filter((r) => r.status === "Prioridade alta"),
    [registros]
  );

  const resumoExecutivo = useMemo(() => {
    if (resumo.total === 0) return "";
    const { total, regulares, atencao, prioridadeAlta } = resumo;
    const comPendencia = atencao + prioridadeAlta;

    const achadosTexto = principaisAchados
      .map((a) => `${a.tipo.toLowerCase()} (${a.ocorrencias})`)
      .join(", ");

    return (
      `Foram analisados ${total} registros fiscais no período de ${PERIODO.toLowerCase()}. ` +
      `${regulares} foram classificados como regulares. ` +
      `${comPendencia} registros apresentaram pontos que requerem revisão, ` +
      `sendo ${prioridadeAlta} classificados como prioridade alta. ` +
      (achadosTexto
        ? `As principais ocorrências identificadas foram: ${achadosTexto}.`
        : "Nenhuma ocorrência foi identificada no período.")
    );
  }, [resumo, principaisAchados]);

  const conclusao = useMemo(() => {
    if (resumo.prioridadeAlta === 0) {
      return (
        "Nenhum registro foi classificado como prioridade alta no período analisado. " +
        "A análise profissional permanece necessária para validação final."
      );
    }
    return (
      `Os ${resumo.prioridadeAlta} registros classificados como prioridade alta devem ser revisados ` +
      `pelo responsável antes de qualquer decisão. As inconsistências identificadas pelo FiscalLens ` +
      `servem como pontos de atenção para a análise profissional.`
    );
  }, [resumo]);

  // ---- Colunas ----
  const colunasAchados = [
    { key: "tipo", header: "Tipo de ocorrência" },
    { key: "ocorrencias", header: "Ocorrências", width: 120, align: "right" },
    { key: "prioridade", header: "Prioridade", width: 130 },
  ];

  const colunasPrioritarios = [
    { key: "documento", header: "Documento", width: 110 },
    { key: "empresa", header: "Empresa" },
    { key: "segmento", header: "Segmento", width: 110 },
    { key: "ocorrencia", header: "Ocorrência" },
    { key: "prioridade", header: "Prioridade", width: 130 },
    { key: "acao", header: "", width: 110, align: "right" },
  ];

  // ---- Estados de carregamento / erro ----
  if (loading) {
    return (
      <div className={styles.layout}>
        <Sidebar />
        <div className={styles.main}>
          <Header title="Relatórios" subtitle={`Período analisado: ${PERIODO}`} />
          <main className={styles.content}>
            <EmptyState
              title="Carregando relatório..."
              description="Aguarde enquanto os dados consolidados são carregados."
            />
          </main>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.layout}>
        <Sidebar />
        <div className={styles.main}>
          <Header title="Relatórios" subtitle={`Período analisado: ${PERIODO}`} />
          <main className={styles.content}>
            <EmptyState
              icon={SearchX}
              title="Erro ao carregar"
              description={error}
            />
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.layout}>
      <Sidebar />

      <div className={styles.main}>
        <Header
          title="Relatórios"
          subtitle={`Consolidação dos resultados do período analisado — ${PERIODO}.`}
        />

        <main className={styles.content}>
          {/* Resumo do relatório */}
          <PageSection
            title="Resumo do relatório"
            description="Consolidação dos registros processados no período."
          >
            <div className={styles.summaryCard}>
              <InfoRow label="Período analisado">{PERIODO}</InfoRow>
              <InfoRow label="Registros analisados">{resumo.total}</InfoRow>
              <InfoRow label="Registros regulares">{resumo.regulares}</InfoRow>
              <InfoRow label="Registros com atenção">{resumo.atencao}</InfoRow>
              <InfoRow label="Prioridade alta">{resumo.prioridadeAlta}</InfoRow>
            </div>
          </PageSection>

          {/* Resumo executivo */}
          <PageSection
            title="Resumo executivo"
            description="Síntese dos principais resultados identificados no período."
          >
            <div className={styles.execCard}>
              <p className={styles.execText}>{resumoExecutivo}</p>
            </div>
          </PageSection>

          {/* Principais achados */}
          <PageSection
            title="Principais achados"
            description="Contagem por tipo de ocorrência. Um registro pode apresentar mais de uma inconsistência."
          >
            <DataTable
              columns={colunasAchados}
              rows={principaisAchados}
              renderCell={(row, col) => {
                if (col.key === "prioridade") {
                  return (
                    <StatusBadge tone={prioridadeTone(row.prioridade)}>
                      {row.prioridade}
                    </StatusBadge>
                  );
                }
                return row[col.key];
              }}
            />
          </PageSection>

          {/* Registros prioritários */}
          <PageSection
            title="Registros prioritários"
            description="Registros classificados como prioridade alta que devem ser revisados pelo responsável."
          >
            <DataTable
              columns={colunasPrioritarios}
              rows={registrosPrioritarios}
              renderCell={(row, col) => {
                if (col.key === "prioridade") {
                  return <StatusBadge tone="danger">Alta</StatusBadge>;
                }
                if (col.key === "documento") {
                  return <span className={styles.docCell}>{row.documento}</span>;
                }
                if (col.key === "acao") {
                  return (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/registros/${row.id}`)}
                    >
                      Analisar →
                    </Button>
                  );
                }
                return row[col.key];
              }}
            />
          </PageSection>

          {/* Conclusão da análise */}
          <PageSection
            title="Conclusão da análise"
            description="Consolidação do período. Não constitui recomendação tributária."
          >
            <div className={styles.conclusionCard}>
              <p className={styles.conclusionText}>{conclusao}</p>
            </div>
          </PageSection>
        </main>
      </div>
    </div>
  );
}