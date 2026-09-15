import {
  FileText,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  UserCheck,
  Database,
  Code2,
  Server,
} from "lucide-react";

import Sidebar from "../../components/Sidebar/Sidebar";
import Header from "../../components/Header/Header";
import PageSection from "../../components/PageSection/PageSection";


import styles from "./SobreProjeto.module.css";

// Etapas do fluxo de análise
const FLUXO = [
  {
    id: "registro",
    titulo: "Registro fiscal",
    descricao: "Documento é processado pelo sistema.",
    icon: FileText,
  },
  {
    id: "validacoes",
    titulo: "Validações automáticas",
    descricao: "Regras determinísticas analisam o registro.",
    icon: CheckCircle2,
  },
  {
    id: "inconsistencias",
    titulo: "Inconsistências",
    descricao: "O sistema classifica o resultado.",
    icon: AlertTriangle,
  },
  {
    id: "ia",
    titulo: "IA contextualiza",
    descricao: "Explicação e recomendação são geradas.",
    icon: Sparkles,
  },
  {
    id: "profissional",
    titulo: "Análise profissional",
    descricao: "A decisão final permanece humana.",
    icon: UserCheck,
  },
];

// Regras de validação implementadas
const VALIDACOES = [
  {
    id: "data",
    titulo: "Data dentro do período",
    descricao:
      "Verifica se a data de emissão do documento está dentro do período analisado.",
  },
  {
    id: "duplicidade",
    titulo: "Documento duplicado",
    descricao:
      "Identifica se existe outro registro com o mesmo documento no período.",
  },
  {
    id: "chave",
    titulo: "Chave de acesso informada",
    descricao:
      "Confere se a chave de acesso foi informada no registro.",
  },
  {
    id: "total",
    titulo: "Soma dos itens = total declarado",
    descricao:
      "Compara a soma dos itens declarados com o valor total do documento.",
  },
];

// Regras de classificação do status
const CLASSIFICACAO = [
  { id: "regular",   label: "Nenhuma inconsistência", resultado: "Regular",         tone: "success" },
  { id: "atencao",   label: "Uma inconsistência",     resultado: "Atenção",         tone: "warning" },
  { id: "alta",      label: "Duas ou mais",           resultado: "Prioridade alta", tone: "danger"  },
  { id: "alta-total", label: "Inconsistência no total dos itens", resultado: "Prioridade alta", tone: "danger" },
];

export default function SobreProjeto() {
  return (
    <div className={styles.layout}>
      <Sidebar />

      <div className={styles.main}>
        <Header
          title="Sobre o projeto"
          subtitle="Apresentação institucional do FiscalLens — protótipo de análise e validação fiscal."
        />

        <main className={styles.content}>
          {/* 1. Sobre o FiscalLens */}
          <PageSection
            title="Sobre o FiscalLens"
            description="Uma visão geral do projeto."
          >
            <div className={styles.textCard}>
              <p className={styles.text}>
                O FiscalLens é um protótipo de plataforma de análise e
                validação fiscal. O sistema recebe registros fiscais, aplica
                validações determinísticas para identificar possíveis
                inconsistências e utiliza inteligência artificial para
                contextualizar os resultados e orientar o profissional.
              </p>
              <p className={styles.text}>
                O projeto foi desenvolvido como parte de um portfólio
                técnico voltado à aplicação de tecnologia na área de
                consultoria tributária. O princípio central que orienta
                todas as decisões do produto é:
              </p>
              <p className={styles.principio}>
                O sistema identifica. A IA explica. O profissional decide.
              </p>
            </div>
          </PageSection>

          {/* 2. Objetivo */}
          <PageSection
            title="Objetivo"
            description="O problema que o sistema busca apoiar."
          >
            <div className={styles.textCard}>
              <p className={styles.text}>
                A conferência manual de grandes volumes de registros fiscais
                é uma tarefa operacionalmente custosa e sujeita a erros. A
                identificação de inconsistências simples — como duplicidades,
                campos ausentes ou divergências de valores — costuma consumir
                tempo que poderia ser dedicado à análise de maior valor.
              </p>
              <p className={styles.text}>
                O FiscalLens busca apoiar essa etapa: automatizar a
                identificação de inconsistências objetivas e apresentar os
                resultados de forma organizada, para que o profissional
                concentre seu esforço na interpretação e na decisão.
              </p>
            </div>
          </PageSection>

          {/* 3. Como funciona */}
          <PageSection
            title="Como funciona"
            description="Fluxo de análise de um registro fiscal."
          >
            <div className={styles.fluxo}>
              {FLUXO.map((etapa, index) => {
                const Icon = etapa.icon;
                return (
                  <div key={etapa.id} className={styles.fluxoItem}>
                    <div className={styles.fluxoCard}>
                      <div className={styles.fluxoIcon}>
                        <Icon size={18} strokeWidth={1.75} aria-hidden="true" />
                      </div>
                      <div className={styles.fluxoText}>
                        <span className={styles.fluxoTitulo}>
                          {etapa.titulo}
                        </span>
                        <span className={styles.fluxoDescricao}>
                          {etapa.descricao}
                        </span>
                      </div>
                    </div>
                    {index < FLUXO.length - 1 && (
                      <span className={styles.fluxoArrow} aria-hidden="true">
                        →
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </PageSection>

          {/* 4. Validações realizadas */}
          <PageSection
            title="Validações realizadas"
            description="Regras determinísticas aplicadas a cada registro."
          >
            <div className={styles.validacoesCard}>
              {VALIDACOES.map((validacao) => (
                <div key={validacao.id} className={styles.validacaoItem}>
                  <div className={styles.validacaoBullet} />
                  <div>
                    <span className={styles.validacaoTitulo}>
                      {validacao.titulo}
                    </span>
                    <span className={styles.validacaoDescricao}>
                      {validacao.descricao}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className={styles.classificacaoBloco}>
              <span className={styles.classificacaoLabel}>
                Como o status é definido
              </span>
              <div className={styles.classificacaoGrid}>
                {CLASSIFICACAO.map((regra) => (
                  <div key={regra.id} className={styles.classificacaoItem}>
                    <span className={styles.classificacaoLabel}>
                      {regra.label}
                    </span>
                    <span
                      className={`${styles.classificacaoResultado} ${styles[regra.tone]}`}
                    >
                      {regra.resultado}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </PageSection>

          {/* 5. Inteligência artificial */}
          <PageSection
            title="Inteligência artificial"
            description="O que a IA faz — e o que ela não faz."
          >
            <div className={styles.textCard}>
              <p className={styles.text}>
                A inteligência artificial do FiscalLens não realiza
                validações e não toma decisões tributárias. As
                inconsistências são identificadas exclusivamente pelas
                regras determinísticas do sistema.
              </p>
              <p className={styles.text}>
                A IA recebe as inconsistências já identificadas e atua em
                três frentes:
              </p>
              <ul className={styles.lista}>
                <li>Explicar de forma objetiva o que foi identificado;</li>
                <li>Contextualizar os dados encontrados no registro;</li>
                <li>
                  Recomendar o que o profissional deve verificar antes de
                  tomar qualquer decisão.
                </li>
              </ul>
              <p className={styles.text}>
                A decisão final permanece, em qualquer cenário, com o
                profissional responsável.
              </p>
            </div>
          </PageSection>

          {/* 6. Tecnologias */}
          <PageSection
            title="Tecnologias"
            description="Stack utilizada no protótipo."
          >
            <div className={styles.tecnologiasCard}>
              <div className={styles.stackGrid}>
                <div className={styles.stackBloco}>
                  <div className={styles.stackHeader}>
                    <Code2 size={16} strokeWidth={1.75} aria-hidden="true" />
                    <span className={styles.stackTitulo}>Frontend</span>
                  </div>
                  <ul className={styles.stackLista}>
                    <li>React</li>
                    <li>Vite</li>
                    <li>JavaScript</li>
                    <li>CSS Modules</li>
                    <li>React Router DOM</li>
                    <li>Lucide React</li>
                  </ul>
                </div>

                <div className={styles.stackBloco}>
                  <div className={styles.stackHeader}>
                    <Server size={16} strokeWidth={1.75} aria-hidden="true" />
                    <span className={styles.stackTitulo}>Backend</span>
                  </div>
                  <ul className={styles.stackLista}>
                    <li>Node.js</li>
                    <li>Express</li>
                    <li>PostgreSQL</li>
                    <li>Gemini API</li>
                  </ul>
                </div>
              </div>

              <div className={styles.arquiteturaBloco}>
                <div className={styles.stackHeader}>
                  <Database size={16} strokeWidth={1.75} aria-hidden="true" />
                  <span className={styles.stackTitulo}>Arquitetura</span>
                </div>
                <p className={styles.arquiteturaTexto}>
                  Frontend React/Vite → API Node/Express → PostgreSQL.
                </p>
                <p className={styles.arquiteturaObs}>
                  O frontend não acessa diretamente o banco de dados. Todas
                  as requisições passam pela API.
                </p>
              </div>
            </div>
          </PageSection>

          {/* 7. Limitações do protótipo */}
          <PageSection
            title="Limitações do protótipo"
            description="O que o sistema não é."
          >
            <div className={styles.limitacoesCard}>
              <p className={styles.text}>
                O FiscalLens é um protótipo acadêmico/experimental. As regras
                de validação implementadas são simplificadas e têm finalidade
                demonstrativa.
              </p>
              <ul className={styles.lista}>
                <li>
                  Não constitui uma ferramenta fiscal oficial ou um sistema
                  de compliance certificado.
                </li>
                <li>
                  Não substitui a análise de um profissional tributário.
                </li>
                <li>
                  Não realiza interpretação de legislação ou cálculo
                  tributário.
                </li>
                <li>
                  Não deve ser utilizado como base para decisões fiscais sem
                  validação humana.
                </li>
              </ul>
              <p className={styles.text}>
                Todas as análises apresentadas têm finalidade de apoio e
                requerem revisão profissional antes de qualquer conclusão.
              </p>
            </div>
          </PageSection>
        </main>
      </div>
    </div>
  );
}