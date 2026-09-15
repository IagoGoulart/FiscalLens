import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import MetricCard from "../../components/MetricCard/MetricCard";
import BarChart from "../../components/Chart/BarChart";
import DataTable from "../../components/DataTable/DataTable";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import Button from "../../components/Button/Button";
import PageSection from "../../components/PageSection/PageSection";

import styles from "./Dashboard.module.css";
import { buscarRegistros } from "../../services/registrosService";

const prioridadeTone = (prioridade) =>
  prioridade === "Alta"
    ? "danger"
    : prioridade === "Média"
    ? "warning"
    : "success";

export default function Dashboard() {
  const navigate = useNavigate();

  const [registros, setRegistros] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function carregarRegistros() {
      try {
        const dados = await buscarRegistros();

        setRegistros(dados);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    carregarRegistros();
  }, []);

  /*
   * INDICADORES
   */

  const analisados = registros.length;

  const regulares = registros.filter(
    (registro) => registro.status === "Regular"
  ).length;

  const atencao = registros.filter(
    (registro) => registro.status === "Atenção"
  ).length;

  const prioridadeAlta = registros.filter(
    (registro) => registro.status === "Prioridade alta"
  ).length;

  const percentual = (quantidade) =>
    analisados > 0 ? ((quantidade / analisados) * 100).toFixed(1) : "0.0";

  /*
   * DISTRIBUIÇÃO
   */

  const distribuicaoReal = [
    {
      label: "Regular",
      value: regulares,
      tone: "success",
    },
    {
      label: "Atenção",
      value: atencao,
      tone: "warning",
    },
    {
      label: "Prioridade alta",
      value: prioridadeAlta,
      tone: "danger",
    },
  ];

  /*
   * PRINCIPAIS OCORRÊNCIAS
   */

  const totalInconsistente = registros.filter(
    (registro) =>
      registro.ocorrencia?.includes("Total inconsistente")
  ).length;

  const dataForaPeriodo = registros.filter(
    (registro) =>
      registro.ocorrencia?.includes("Data fora do período")
  ).length;

  const documentosDuplicados = registros.filter(
    (registro) =>
      registro.ocorrencia?.includes("Documento duplicado")
  ).length;

  const campoObrigatorioAusente = registros.filter(
    (registro) =>
      registro.ocorrencia?.includes("Campo obrigatório ausente")
  ).length;

  const principaisOcorrenciasReal = [
    {
      tipo: "Total inconsistente",
      ocorrencias: totalInconsistente,
      prioridade: "Alta",
    },
    {
      tipo: "Data fora do período",
      ocorrencias: dataForaPeriodo,
      prioridade: "Média",
    },
    {
      tipo: "Documento duplicado",
      ocorrencias: documentosDuplicados,
      prioridade: "Média",
    },
    {
      tipo: "Campo obrigatório ausente",
      ocorrencias: campoObrigatorioAusente,
      prioridade: "Média",
    },
  ];

  /*
   * DISTRIBUIÇÃO POR SEGMENTO
   */

  const contagemSegmentos = {};

  registros.forEach((registro) => {
    const segmento = registro.segmento || "Não informado";

    contagemSegmentos[segmento] =
      (contagemSegmentos[segmento] || 0) + 1;
  });

  const distribuicaoSegmentosReal = Object.entries(
    contagemSegmentos
  ).map(([segmento, quantidade]) => ({
    label: segmento,
    value: quantidade,
    tone: "info",
  }));

  /*
   * REGISTROS QUE EXIGEM ATENÇÃO
   */

  const registrosAtencaoReal = registros
    .filter((registro) => registro.status !== "Regular")
    .slice(0, 5)
    .map((registro) => ({
      id: registro.id,
      documento: registro.documento,
      empresa: registro.empresa,
      problema: registro.ocorrencia,
      prioridade:
        registro.status === "Prioridade alta"
          ? "Alta"
          : "Média",
    }));

  /*
   * NAVEGAÇÃO
   */

  const handleOpenRegistro = useCallback(
    (id) => {
      navigate(`/registros/${id}`);
    },
    [navigate]
  );

  /*
   * COLUNAS DAS TABELAS
   */

  const ocorrenciasColumns = [
    {
      key: "tipo",
      header: "Tipo de ocorrência",
    },
    {
      key: "ocorrencias",
      header: "Ocorrências",
      width: 120,
      align: "right",
    },
    {
      key: "prioridade",
      header: "Prioridade",
      width: 130,
    },
  ];

  const registrosColumns = [
    {
      key: "documento",
      header: "Documento",
      width: 120,
    },
    {
      key: "empresa",
      header: "Empresa",
    },
    {
      key: "problema",
      header: "Problema",
    },
    {
      key: "prioridade",
      header: "Prioridade",
      width: 130,
    },
    {
      key: "acao",
      header: "",
      width: 120,
      align: "right",
    },
  ];

  if (loading) {
    return <p>Carregando registros...</p>;
  }

  return (
    <div className={styles.layout}>
      <Sidebar />

      <div className={styles.main}>
        <Header
          title="Visão geral da análise"
          subtitle={`Informações fiscais e financeiras processadas no período analisado — ${analisados} registros.`}
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
                value={analisados}
                hint="Total processado no período"
                accent="neutral"
              />

              <MetricCard
                label="Sem inconsistências"
                value={regulares}
                hint={`${percentual(regulares)}% do total`}
                accent="success"
              />

              <MetricCard
                label="Pontos de atenção"
                value={atencao}
                hint={`${percentual(atencao)}% do total`}
                accent="warning"
              />

              <MetricCard
                label="Prioridade alta"
                value={prioridadeAlta}
                hint={`${percentual(prioridadeAlta)}% do total`}
                accent="danger"
              />
            </div>
          </PageSection>

          {/* Distribuição da análise */}

          <PageSection
            title="Distribuição da análise"
            description="Classificação dos registros por nível de criticidade."
          >
            <BarChart data={distribuicaoReal} />
          </PageSection>

          {/* Distribuição por segmento */}

          <PageSection
            title="Registros por segmento"
            description="Distribuição dos registros analisados entre os segmentos das empresas."
          >
            <BarChart data={distribuicaoSegmentosReal} />
          </PageSection>

          {/* Principais ocorrências */}

          <PageSection
            title="Principais pontos identificados"
            description="Tipos de ocorrência encontrados durante a validação dos registros."
          >
            <DataTable
              columns={ocorrenciasColumns}
              rows={principaisOcorrenciasReal}
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
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate("/registros")}
              >
                Ver todos →
              </Button>
            }
          >
            <DataTable
              columns={registrosColumns}
              rows={registrosAtencaoReal}
              renderCell={(row, col) => {
                if (col.key === "prioridade") {
                  return (
                    <StatusBadge tone={prioridadeTone(row.prioridade)}>
                      {row.prioridade}
                    </StatusBadge>
                  );
                }

                if (col.key === "documento") {
                  return (
                    <span className={styles.docCell}>
                      {row.documento}
                    </span>
                  );
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