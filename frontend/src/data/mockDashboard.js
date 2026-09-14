export const metrics = {
  analisados: 250,
  regulares: 198,
  atencao: 37,
  prioridadeAlta: 15,
};

export const distribuicao = [
  { label: "Regulares",       value: 198, tone: "success" },
  { label: "Atenção",         value: 37,  tone: "warning" },
  { label: "Prioridade alta", value: 15,  tone: "danger"  },
];

export const principaisOcorrencias = [
  { id: "oc-1", tipo: "Documento duplicado",       ocorrencias: 12, prioridade: "Alta"  },
  { id: "oc-2", tipo: "Total inconsistente",       ocorrencias: 10, prioridade: "Alta"  },
  { id: "oc-3", tipo: "Campo obrigatório ausente", ocorrencias: 8,  prioridade: "Média" },
  { id: "oc-4", tipo: "Data fora do período",      ocorrencias: 7,  prioridade: "Média" },
];

export const registrosAtencao = [
  { id: "NF-1048", documento: "NF-1048", empresa: "Alpha Comércio Ltda.",      problema: "Total inconsistente",       prioridade: "Alta"  },
  { id: "NF-1082", documento: "NF-1082", empresa: "Beta Tecnologia S.A.",      problema: "Documento duplicado",       prioridade: "Alta"  },
  { id: "NF-1091", documento: "NF-1091", empresa: "Gamma Distribuidora Ltda.", problema: "Campo obrigatório ausente", prioridade: "Média" },
  { id: "NF-1103", documento: "NF-1103", empresa: "Delta Serviços ME",         problema: "Data fora do período",      prioridade: "Média" },
  { id: "NF-1117", documento: "NF-1117", empresa: "Epsilon Logística Ltda.",   problema: "Total inconsistente",       prioridade: "Alta"  },
];

// Distribuição demonstrativa dos possíveis impactos identificados.
// Números fictícios, apenas para ilustrar a visão executiva do Dashboard.
export const impactosPotenciais = [
  { categoria: "Financeiro",  registros: 18, nivel: "alto"  },
  { categoria: "Operacional", registros: 14, nivel: "médio" },
  { categoria: "Tributário",  registros: 11, nivel: "médio" },
  { categoria: "Compliance",  registros: 12, nivel: "médio" },
];

// Distribuição demonstrativa dos registros por segmento.
// Todos com tone "info" — segmento é informação neutra, não alerta.
export const distribuicaoSegmentos = [
  { label: "Varejo",     value: 86, tone: "info" },
  { label: "Indústria",  value: 62, tone: "info" },
  { label: "Serviços",   value: 58, tone: "info" },
  { label: "Tecnologia", value: 44, tone: "info" },
];