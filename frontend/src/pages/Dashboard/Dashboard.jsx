import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import MetricCard from "../../components/MetricCard/MetricCard";
import SectionHeader from "../../components/SectionHeader/SectionHeader";
import BarChart from "../../components/Chart/BarChart";
import DataTable from "../../components/DataTable/DataTable";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import Button from "../../components/Button/Button";
import ImpactCard from "../../components/ImpactCard/ImpactCard";
import PageSection from "../../components/PageSection/PageSection";

import {
  metrics,
  distribuicao,
  principaisOcorrencias,
  registrosAtencao,
  impactosPotenciais,
  distribuicaoSegmentos,
} from "../../data/mockDashboard";
import styles from "./Dashboard.module.css";

const prioridadeTone = (p) =>
  p === "Alta" ? "danger" : p === "Média" ? "warning" : "success";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleOpenRegistro = useCallback(
    (id) => {
      navigate(`/registros/${id}`);
    },
    [navigate]
  );

  const ocorrenciasColumns = [
    { key: "tipo",        header: "Tipo de ocorrência" },
    { key: "ocorrencias", header: "Ocorrências", width: 120, align: "right" },
    { key: "prioridade",  header: "Prioridade",  width: 130 },
  ];

  const registrosColumns = [
    { key: "documento",  header: "Documento", width: 120 },
    { key: "empresa",    header: "Empresa" },
    { key: "problema",   header: "Problema" },
    { key: "prioridade", header: "Prioridade", width: 130 },
    { key: "acao",       header: "", width: 120, align: "right" },
  ];

  return (
    <div className={styles.layout}>
      <Sidebar />

      <div className={styles.main}>
        <Header
          title="Visão geral da análise"
          subtitle="Informações fiscais e financeiras processadas no período analisado — Empresa Alpha · Janeiro de 2026 · 250 registros."
        />

        <main className={styles.content}>
          {/* Indicadores principais */}
          <PageSection
            title="Indicadores"
            description="Resumo consolidado do período analisado."
          >
            <div className={styles.metricsGrid}>
              <MetricCard
                label="Registros analisados"
                value={metrics.analisados}
                hint="Total processado no período"
                accent="neutral"
              />
              <MetricCard
                label="Sem inconsistências"
                value={metrics.regulares}
                hint={`${((metrics.regulares / metrics.analisados) * 100).toFixed(1)}% do total`}
                accent="success"
              />
              <MetricCard
                label="Pontos de atenção"
                value={metrics.atencao}
                hint={`${((metrics.atencao / metrics.analisados) * 100).toFixed(1)}% do total`}
                accent="warning"
              />
              <MetricCard
                label="Prioridade alta"
                value={metrics.prioridadeAlta}
                hint={`${((metrics.prioridadeAlta / metrics.analisados) * 100).toFixed(1)}% do total`}
                accent="danger"
              />
            </div>
          </PageSection>

          {/* Distribuição da análise */}
          <PageSection
            title="Distribuição da análise"
            description="Classificação dos registros por nível de criticidade."
          >
            <BarChart data={distribuicao} />
          </PageSection>

          {/* Impactos potenciais */}
          <PageSection
            title="Impactos potenciais"
            description="Distribuição demonstrativa dos possíveis impactos identificados nos registros com atenção. Não representam conclusões tributárias."
          >
            <div className={styles.impactsGrid}>
              {impactosPotenciais.map((i) => (
                <ImpactCard
                  key={i.categoria}
                  categoria={`${i.categoria} — ${i.registros} registros`}
                  nivel={i.nivel}
                />
              ))}
            </div>
          </PageSection>

          {/* Distribuição por segmento */}
          <PageSection
            title="Registros por segmento"
            description="Distribuição dos registros analisados entre os segmentos de atuação das empresas."
          >
            <BarChart data={distribuicaoSegmentos} />
          </PageSection>

          {/* Principais ocorrências */}
          <PageSection
            title="Principais pontos identificados"
            description="Tipos de ocorrência com maior incidência no período."
          >
            <DataTable
              columns={ocorrenciasColumns}
              rows={principaisOcorrencias}
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

          {/* Registros que exigem atenção */}
          <PageSection
            title="Registros que exigem atenção"
            description="Itens com inconsistências que precisam de revisão do profissional."
            action={
              <Button variant="ghost" size="sm" onClick={() => navigate("/registros")}>
                Ver todos →
              </Button>
            }
          >
            <DataTable
              columns={registrosColumns}
              rows={registrosAtencao}
              renderCell={(row, col) => {
                if (col.key === "prioridade") {
                  return (
                    <StatusBadge tone={prioridadeTone(row.prioridade)}>
                      {row.prioridade}
                    </StatusBadge>
                  );
                }
                if (col.key === "documento") {
                  return <span className={styles.docCell}>{row.documento}</span>;
                }
                if (col.key === "acao") {
                  return (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenRegistro(row.id)}
                    >
                      Analisar →
                    </Button>
                  );
                }
                return row[col.key];
              }}
            />
          </PageSection>
        </main>
      </div>
    </div>
  );
}