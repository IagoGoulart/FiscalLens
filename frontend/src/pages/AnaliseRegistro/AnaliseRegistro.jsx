import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, SearchX, RefreshCw, AlertCircle } from "lucide-react";

import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import PageSection from "../../components/PageSection/PageSection";
import StatusBadge from "../../components/StatusBadge/StatusBadge";
import Button from "../../components/Button/Button";
import ValidationRow from "../../components/ValidationRow/ValidationRow";
import ImpactCard from "../../components/ImpactCard/ImpactCard";
import ReferenceCard from "../../components/ReferenceCard/ReferenceCard";
import DecisionBox from "../../components/DecisionBox/DecisionBox";
import InfoRow from "../../components/InfoRow/InfoRow";
import EmptyState from "../../components/EmptyState/EmptyState";

import {
  buscarRegistroPorId,
  buscarValidacoesPorRegistro,
  buscarExplicacaoIA,
} from "../../services/registrosService";

import { getAnalise } from "../../data/mockAnalises";
import { getReferenciasPorOcorrencia } from "../../data/mockReferencias";
import styles from "./AnaliseRegistro.module.css";

const statusTone = (status) =>
  status === "Prioridade alta"
    ? "danger"
    : status === "Atenção"
    ? "warning"
    : "success";

const formatBRL = (value) =>
  value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

export default function AnaliseRegistro() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [registro, setRegistro] = useState(null);
  const [validacoes, setValidacoes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // IA — carga inicial
  const [loadingIA, setLoadingIA] = useState(false);

  // IA — estados independentes por seção
  const [explicacaoIA, setExplicacaoIA] = useState("");
  const [recomendacaoIA, setRecomendacaoIA] = useState("");

  const [loadingExplicacao, setLoadingExplicacao] = useState(false);
  const [loadingRecomendacao, setLoadingRecomendacao] = useState(false);

  const [errorExplicacao, setErrorExplicacao] = useState(null);
  const [errorRecomendacao, setErrorRecomendacao] = useState(null);

  useEffect(() => {
    async function carregarRegistro() {
      try {
        const dados = await buscarRegistroPorId(id);
        const resultadoValidacao = await buscarValidacoesPorRegistro(id);

        setRegistro({
          ...dados,
          status: resultadoValidacao.status,
        });

        setValidacoes(resultadoValidacao.validacoes);

        if (resultadoValidacao.status !== "Regular") {
          setLoadingIA(true);

          try {
            const resultadoIA = await buscarExplicacaoIA(id);

            setExplicacaoIA(resultadoIA.explicacao);
            setRecomendacaoIA(resultadoIA.recomendacao);
          } catch (err) {
            console.error("Erro ao gerar explicação com IA:", err);

            setExplicacaoIA(
              "Não foi possível gerar a explicação com IA neste momento. A análise das inconsistências identificadas pelo sistema permanece disponível."
            );

            setRecomendacaoIA(
              "Verificar as inconsistências identificadas pelo sistema e realizar a análise profissional dos dados antes da validação final."
            );
          } finally {
            setLoadingIA(false);
          }
        } else {
          setExplicacaoIA(
            "Nenhuma inconsistência foi identificada pelas regras deste protótipo. A análise profissional permanece necessária para a validação final."
          );

          setRecomendacaoIA(
            "Manter o registro disponível para análise profissional e confirmar as informações antes da validação final."
          );
        }
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar o registro.");
      } finally {
        setLoading(false);
      }
    }

    carregarRegistro();
  }, [id]);

  // Regenera somente a explicação ou somente a recomendação
  async function regenerarCampoIA(campo) {
    const setLoading =
      campo === "explicacao"
        ? setLoadingExplicacao
        : setLoadingRecomendacao;

    const setError =
      campo === "explicacao"
        ? setErrorExplicacao
        : setErrorRecomendacao;

    const setValor =
      campo === "explicacao"
        ? setExplicacaoIA
        : setRecomendacaoIA;

    setError(null);
    setLoading(true);

    try {
      const resultado = await buscarExplicacaoIA(id, {
        apenas: campo,
      });

      const novoValor = resultado?.[campo];

      if (
        typeof novoValor === "string" &&
        novoValor.trim().length > 0
      ) {
        setValor(novoValor);
      }
    } catch (err) {
      console.error(`Erro ao gerar nova ${campo}:`, err);

      setError(
        campo === "explicacao"
          ? "Não foi possível gerar uma nova explicação. A versão anterior foi mantida."
          : "Não foi possível gerar uma nova recomendação. A versão anterior foi mantida."
      );
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className={styles.layout}>
        <Sidebar />

        <div className={styles.main}>
          <Header
            title="Análise do Registro"
            subtitle="Carregando informações do registro..."
          />

          <main className={styles.content}>
            <EmptyState
              title="Carregando registro..."
              description="Aguarde enquanto os dados são carregados."
            />
          </main>
        </div>
      </div>
    );
  }

  if (error || !registro) {
    return (
      <div className={styles.layout}>
        <Sidebar />

        <div className={styles.main}>
          <Header
            title="Análise do Registro"
            subtitle="Registro não encontrado."
          />

          <main className={styles.content}>
            <EmptyState
              icon={SearchX}
              title="Registro não encontrado"
              description={
                error ||
                "O documento informado não existe na base deste protótipo."
              }
            />

            <div className={styles.backWrap}>
              <Button
                variant="secondary"
                onClick={() => navigate("/registros")}
              >
                <ArrowLeft size={14} strokeWidth={1.75} />
                Voltar para Registros Fiscais
              </Button>
            </div>
          </main>
        </div>
      </div>
    );
  }

  // Os impactos continuam utilizando dados mockados.
  const analise = getAnalise(registro.documento);
  const referencias = getReferenciasPorOcorrencia(
    registro.ocorrencia
  );

  return (
    <div className={styles.layout}>
      <Sidebar />

      <div className={styles.main}>
        <Header
          title="Análise do Registro"
          subtitle={`${registro.documento} · ${registro.empresa} · ${registro.segmento}`}
          actions={
            <Button
              variant="secondary"
              size="md"
              onClick={() => navigate("/registros")}
            >
              <ArrowLeft size={14} strokeWidth={1.75} />
              Voltar
            </Button>
          }
        />

        <main className={styles.content}>
          {/* Dados do registro */}
          <PageSection
            title="Dados do registro"
            description="Informações declaradas no documento analisado."
          >
            <div className={styles.infoCard}>
              <InfoRow label="Documento">
                {registro.documento}
              </InfoRow>

              <InfoRow label="Empresa">
                {registro.empresa}
              </InfoRow>

              <InfoRow label="Segmento">
                {registro.segmento}
              </InfoRow>

              <InfoRow label="Data">
                {registro.data}
              </InfoRow>

              <InfoRow label="Valor">
                {formatBRL(registro.valor)}
              </InfoRow>

              <InfoRow label="Status">
                <StatusBadge tone={statusTone(registro.status)}>
                  {registro.status}
                </StatusBadge>
              </InfoRow>

              <InfoRow label="Ocorrência">
                {registro.ocorrencia}
              </InfoRow>
            </div>
          </PageSection>

          {/* Validações */}
          <PageSection
            title="Validações realizadas"
            description="Regras determinísticas aplicadas ao registro. O sistema identifica; a IA explica."
          >
            <div className={styles.validationsCard}>
              {validacoes.map((validacao) => (
                <ValidationRow
                  key={validacao.regra}
                  regra={validacao.regra}
                  resultado={
                    validacao.status === "aprovado"
                      ? "regular"
                      : "inconsistente"
                  }
                  detalhe={validacao.mensagem}
                />
              ))}
            </div>
          </PageSection>

          {/* Explicação com IA */}
          <PageSection
            title="Explicação com IA"
            description="A IA não decide — ela contextualiza."
          >
            <div className={styles.aiCard}>
              <span className={styles.aiTag}>
                {loadingIA || loadingExplicacao
                  ? "Gerando explicação..."
                  : "Explicação gerada por IA"}
              </span>

              <p className={styles.aiText}>
                {loadingIA
                  ? "Aguarde enquanto o FiscalLens gera uma explicação para as inconsistências identificadas."
                  : explicacaoIA}
              </p>

              {errorExplicacao && !loadingExplicacao && (
                <div className={styles.aiError}>
                  <AlertCircle
                    size={13}
                    strokeWidth={1.75}
                  />
                  <span>{errorExplicacao}</span>
                </div>
              )}

              <div className={styles.aiActions}>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    regenerarCampoIA("explicacao")
                  }
                  disabled={
                    loadingExplicacao || loadingIA
                  }
                >
                  <RefreshCw
                    size={13}
                    strokeWidth={1.75}
                    className={
                      loadingExplicacao
                        ? styles.spinning
                        : ""
                    }
                  />

                  {loadingExplicacao
                    ? "Gerando..."
                    : "Gerar nova explicação"}
                </Button>
              </div>
            </div>
          </PageSection>

          {/* Impactos */}
          {analise.impactos.length > 0 && (
            <PageSection
              title="Impactos potenciais no negócio"
              description="Possíveis desdobramentos identificados a partir do ponto de atenção. Não constituem conclusões tributárias."
            >
              <div className={styles.impactsGrid}>
                {analise.impactos.map((impacto) => (
                  <ImpactCard
                    key={impacto.categoria}
                    categoria={impacto.categoria}
                    nivel={impacto.nivel}
                    descricao={impacto.descricao}
                  />
                ))}
              </div>
            </PageSection>
          )}

          {/* Referências */}
          {referencias.length > 0 && (
            <PageSection
              title="Referências para consulta"
              description="Fontes oficiais que podem apoiar a pesquisa do profissional. Não substituem a análise da legislação aplicável. As regras de validação do FiscalLens são próprias do protótipo e simplificadas."
            >
              <div className={styles.referencesGrid}>
                {referencias.map((referencia) => (
                  <ReferenceCard
                    key={referencia.id}
                    titulo={referencia.titulo}
                    orgao={referencia.orgao}
                    assunto={referencia.assunto}
                    relevancia={referencia.relevancia}
                    link={referencia.link}
                  />
                ))}
              </div>
            </PageSection>
          )}

          {/* Recomendação */}
          <PageSection
            title="Recomendação para análise"
            description="Orientação gerada por IA para apoiar a análise profissional. Não constitui decisão automática."
          >
            <div className={styles.recommendationCard}>
              <span className={styles.aiTag}>
                {loadingIA || loadingRecomendacao
                  ? "Gerando recomendação..."
                  : "Recomendação gerada por IA"}
              </span>

              <p className={styles.recommendationText}>
                {loadingIA
                  ? "Aguarde enquanto o FiscalLens gera uma recomendação para este registro."
                  : recomendacaoIA}
              </p>

              {errorRecomendacao &&
                !loadingRecomendacao && (
                  <div className={styles.aiError}>
                    <AlertCircle
                      size={13}
                      strokeWidth={1.75}
                    />
                    <span>{errorRecomendacao}</span>
                  </div>
                )}

              <div className={styles.aiActions}>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    regenerarCampoIA("recomendacao")
                  }
                  disabled={
                    loadingRecomendacao || loadingIA
                  }
                >
                  <RefreshCw
                    size={13}
                    strokeWidth={1.75}
                    className={
                      loadingRecomendacao
                        ? styles.spinning
                        : ""
                    }
                  />

                  {loadingRecomendacao
                    ? "Gerando..."
                    : "Gerar nova recomendação"}
                </Button>
              </div>
            </div>
          </PageSection>

          {/* Decisão */}
          <PageSection
            title="Decisão do profissional"
            description="O sistema identifica. A IA explica e orienta a análise. A legislação fornece o contexto. O profissional decide."
          >
            <DecisionBox />
          </PageSection>
        </main>
      </div>
    </div>
  );
}