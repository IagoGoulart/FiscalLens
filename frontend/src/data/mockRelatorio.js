export const relatorioMock = {
  empresa: "Empresa Alpha",
  segmento: "Varejo",
  periodo: "Janeiro de 2026",
  registrosAnalisados: 250,
  registrosAtencao: 37,
  registrosPrioridadeAlta: 15,

  resumoExecutivo:
    "A análise dos registros identificou pontos de atenção relacionados principalmente a inconsistências de valores, duplicidades e preenchimento de informações. Os casos classificados como prioridade alta devem ser revisados pelo responsável antes da consolidação dos resultados. Os impactos apresentados são potenciais e dependem de avaliação profissional para qualquer conclusão.",

  principaisAchados: [
    { tipo: "Documento duplicado",       ocorrencias: 12, prioridade: "Alta" },
    { tipo: "Total inconsistente",       ocorrencias: 10, prioridade: "Alta" },
    { tipo: "Campo obrigatório ausente", ocorrencias: 8,  prioridade: "Média" },
    { tipo: "Data fora do período",      ocorrencias: 7,  prioridade: "Média" },
  ],

  impactosPotenciais: [
    { categoria: "Financeiro",  registros: 18 },
    { categoria: "Operacional", registros: 14 },
    { categoria: "Tributário",  registros: 11 },
    { categoria: "Compliance",  registros: 12 },
  ],

  recomendacoes: [
    "Revisar registros classificados como prioridade alta antes da consolidação dos resultados.",
    "Conferir divergências entre soma de itens e total declarado.",
    "Investigar possíveis duplicidades documentais no período.",
    "Validar registros com data fora do período analisado.",
    "Avaliar possíveis impactos tributários aplicáveis em conjunto com a área responsável.",
  ],

  preparacaoApresentacao: {
    titulo: "Resumo para apresentação ao cliente",
    subtitulo: "Síntese executiva dos principais resultados identificados no período.",
    topicos: [
      "Panorama geral dos registros analisados.",
      "Principais pontos de atenção identificados.",
      "Possíveis impactos no negócio.",
      "Recomendações de revisão e próximos passos.",
    ],
    observacao:
      "Este material é um protótipo demonstrativo e não constitui entrega final. A consolidação executiva para o cliente deve ser realizada pelo profissional responsável.",
  },
};

// Fontes oficiais utilizadas como contexto na análise.
// Não representam validação oficial das regras do protótipo.
export const referenciasConsultadas = [
  { orgao: "Receita Federal do Brasil", quantidade: 2 },
];