import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, SearchX } from "lucide-react";

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

  useEffect(() => {
    async function carregarRegistro() {
      try {
        const dados = await buscarRegistroPorId(id);
        const resultadoValidacao = await buscarValidacoesPorRegistro(id);

        setRegistro({
          ...dados,
          status: resultadoValidacao.status
        });
        setValidacoes(resultadoValidacao.validacoes);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar o registro.");
      } finally {
        setLoading(false);
      }
    }

    carregarRegistro();
  }, [id]);

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

  // A explicação, os impactos e a recomendação ainda utilizam dados mockados.
  const analise = getAnalise(registro.documento);

  const referencias = getReferenciasPorOcorrencia(registro.ocorrencia);

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
              <InfoRow label="Documento">{registro.documento}</InfoRow>

              <InfoRow label="Empresa">{registro.empresa}</InfoRow>

              <InfoRow label="Segmento">{registro.segmento}</InfoRow>

              <InfoRow label="Data">{registro.data}</InfoRow>

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
                      :"inconsistente"
                  }
                  detalhe={validacao.detalhe}
                />
              ))}
            </div>
          </PageSection>

          {/* IA */}
          <PageSection
            title="Explicação com IA"
            description="A IA não decide — ela contextualiza."
          >
            <div className={styles.aiCard}>
              <span className={styles.aiTag}>
                Conteúdo demonstrativo
              </span>

              <p className={styles.aiText}>
                {analise.explicacaoIA}
              </p>
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
            description="Orientação para o profissional. Não constitui decisão automática."
          >
            <div className={styles.recommendationCard}>
              <p>{analise.recomendacao}</p>
            </div>
          </PageSection>

          {/* Decisão */}
          <PageSection
            title="Decisão do profissional"
            description="O sistema identifica. A IA explica. A legislação fornece o contexto. O profissional decide."
          >
            <DecisionBox />
          </PageSection>
        </main>
      </div>
    </div>
  );
}
