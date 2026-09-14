import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import PageSection from "../../components/PageSection/PageSection";
import DataTable from "../../components/DataTable/DataTable";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import Button from "../../components/Button/Button";
import ImpactCard from "../../components/ImpactCard/ImpactCard";
import InfoRow from "../../components/InfoRow/InfoRow";

import { relatorioMock, referenciasConsultadas } from "../../data/mockRelatorio";
import { registrosMock } from "../../data/mockRegistros";
import styles from "./Relatorios.module.css";

const prioridadeTone = (p) =>
  p === "Alta" ? "danger" : p === "Média" ? "warning" : "success";

export default function Relatorios() {
  const navigate = useNavigate();
  const r = relatorioMock;

  const registrosPrioritarios = registrosMock
    .filter((reg) => reg.status === "Prioridade alta")
    .slice(0, 6);

  const colunasAchados = [
    { key: "tipo", header: "Tipo de ocorrência" },
    { key: "ocorrencias", header: "Ocorrências", width: 120, align: "right" },
    { key: "prioridade", header: "Prioridade", width: 130 },
  ];

  const colunasRegistros = [
    { key: "documento", header: "Documento", width: 110 },
    { key: "empresa", header: "Empresa" },
    { key: "segmento", header: "Segmento", width: 110 },
    { key: "ocorrencia", header: "Ocorrência" },
    { key: "prioridade", header: "Prioridade", width: 130 },
    { key: "acao", header: "", width: 110, align: "right" },
  ];

  return (
    <div className={styles.layout}>
      <Sidebar />

      <div className={styles.main}>
        <Header
          title="Relatórios"
          subtitle="Consolidação dos principais resultados e pontos de atenção identificados na análise."
        />

        <main className={styles.content}>
          {/* Resumo do relatório */}
          <PageSection
            title="Resumo do relatório"
            description="Contexto da análise consolidada."
          >
            <div className={styles.summaryCard}>
              <InfoRow label="Empresa">{r.empresa}</InfoRow>
              <InfoRow label="Segmento">{r.segmento}</InfoRow>
              <InfoRow label="Período">{r.periodo}</InfoRow>
              <InfoRow label="Registros analisados">{r.registrosAnalisados}</InfoRow>
              <InfoRow label="Registros com atenção">{r.registrosAtencao}</InfoRow>
              <InfoRow label="Prioridade alta">{r.registrosPrioridadeAlta}</InfoRow>
            </div>
          </PageSection>

          {/* Resumo executivo */}
          <PageSection
            title="Resumo executivo"
            description="Síntese dos principais resultados identificados no período."
          >
            <div className={styles.execCard}>
              <p className={styles.execText}>{r.resumoExecutivo}</p>
            </div>
          </PageSection>

          {/* Principais achados */}
          <PageSection
            title="Principais achados"
            description="Tipos de ocorrência com maior incidência no período analisado."
          >
            <DataTable
              columns={colunasAchados}
              rows={r.principaisAchados.map((a, i) => ({ id: `a-${i}`, ...a }))}
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

          {/* Impactos */}
          <PageSection
            title="Impactos potenciais"
            description="Distribuição demonstrativa dos possíveis impactos identificados. Não representam conclusões tributárias."
          >
            <div className={styles.impactsGrid}>
              {r.impactosPotenciais.map((i) => (
                <ImpactCard
                  key={i.categoria}
                  categoria={`${i.categoria} — ${i.registros} registros`}
                />
              ))}
            </div>
          </PageSection>

          {/* Recomendações */}
          <PageSection
            title="Recomendações"
            description="Orientações para revisão e próximos passos. Não constituem decisão automática."
          >
            <ol className={styles.recommendationList}>
              {r.recomendacoes.map((rec, i) => (
                <li key={i} className={styles.recommendationItem}>
                  <span className={styles.recommendationNumber}>{i + 1}</span>
                  <span>{rec}</span>
                </li>
              ))}
            </ol>
          </PageSection>

          {/* Referências consultadas */}
          <PageSection
            title="Referências consultadas"
            description="Fontes oficiais utilizadas como contexto de apoio à análise. Não constituem validação das regras do protótipo."
          >
            <div className={styles.referencesSummary}>
              {referenciasConsultadas.map((ref) => (
                <div key={ref.orgao} className={styles.referenceItem}>
                  <span className={styles.referenceOrgao}>{ref.orgao}</span>
                  <span className={styles.referenceQtd}>
                    {ref.quantidade} {ref.quantidade === 1 ? "fonte" : "fontes"}
                  </span>
                </div>
              ))}
            </div>
          </PageSection>

          {/* Registros prioritários */}
          <PageSection
            title="Registros prioritários"
            description="Registros classificados como prioridade alta que devem ser revisados pelo responsável."
          >
            <DataTable
              columns={colunasRegistros}
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

          {/* Preparação para apresentação */}
          <PageSection
            title={r.preparacaoApresentacao.titulo}
            description={r.preparacaoApresentacao.subtitulo}
          >
            <div className={styles.presentationCard}>
              <ul className={styles.presentationList}>
                {r.preparacaoApresentacao.topicos.map((t, i) => (
                  <li key={i}>{t}</li>
                ))}
              </ul>
              <p className={styles.presentationObs}>
                {r.preparacaoApresentacao.observacao}
              </p>
            </div>
          </PageSection>
        </main>
      </div>
    </div>
  );
}