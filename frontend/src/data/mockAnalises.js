// Análises detalhadas por ID de registro.
//
// As validações reais são realizadas pelo backend.
// Este arquivo mantém apenas conteúdos complementares da tela,
// como impactos potenciais e textos demonstrativos.
//
// As referências normativas são resolvidas em runtime
// por getReferenciasPorOcorrencia() em src/data/mockReferencias.js.

export const analisesMock = {
  // ID 1 | NF-1048 | Total inconsistente
  1: {
    impactos: [
      {
        categoria: "Financeiro",
        nivel: "alto",
        descricao:
          "Pode exigir conciliação entre o valor total do documento e a composição dos itens registrados.",
      },
      {
        categoria: "Operacional",
        nivel: "médio",
        descricao:
          "Pode demandar revisão manual dos itens e dos valores utilizados no registro.",
      },
      {
        categoria: "Compliance",
        nivel: "baixo",
        descricao:
          "Pode representar um ponto de atenção nos controles de conferência documental.",
      },
    ],
  },

  // ID 2 | NF-1082 | Documento duplicado
  2: {
    impactos: [
      {
        categoria: "Compliance",
        nivel: "alto",
        descricao:
          "Pode exigir conferência da rastreabilidade dos registros que utilizam o mesmo número de documento.",
      },
      {
        categoria: "Operacional",
        nivel: "médio",
        descricao:
          "Pode demandar comparação entre os registros para identificar se representam a mesma operação.",
      },
      {
        categoria: "Financeiro",
        nivel: "médio",
        descricao:
          "Pode gerar impacto caso os registros correspondam à mesma operação lançada mais de uma vez.",
      },
    ],
  },

  // ID 3 | NF-1117 | Total inconsistente
  3: {
    impactos: [
      {
        categoria: "Financeiro",
        nivel: "alto",
        descricao:
          "Pode exigir conciliação entre a soma dos itens e o valor total informado no documento.",
      },
      {
        categoria: "Operacional",
        nivel: "médio",
        descricao:
          "Pode demandar revisão da composição dos serviços e dos valores registrados.",
      },
      {
        categoria: "Compliance",
        nivel: "baixo",
        descricao:
          "Pode representar um ponto de atenção nos procedimentos de conferência dos registros.",
      },
    ],
  },

  // ID 4 | NF-1051 | Data fora do período
  4: {
    impactos: [
      {
        categoria: "Operacional",
        nivel: "médio",
        descricao:
          "Pode exigir conferência do período ao qual o documento deve ser associado.",
      },
      {
        categoria: "Financeiro",
        nivel: "baixo",
        descricao:
          "Pode afetar a organização dos valores quando o documento é considerado em um período diferente.",
      },
      {
        categoria: "Compliance",
        nivel: "baixo",
        descricao:
          "Pode demandar registro da justificativa para a presença do documento fora do período analisado.",
      },
    ],
  },

  // ID 5 | NF-1063 | Chave de acesso ausente
  5: {
    impactos: [
      {
        categoria: "Compliance",
        nivel: "alto",
        descricao:
          "Pode dificultar a rastreabilidade e a conferência da identificação do documento.",
      },
      {
        categoria: "Operacional",
        nivel: "médio",
        descricao:
          "Pode demandar complementação ou conferência das informações utilizadas no registro.",
      },
      {
        categoria: "Financeiro",
        nivel: "baixo",
        descricao:
          "Não há impacto financeiro direto identificado apenas pela regra aplicada neste protótipo.",
      },
    ],
  },

  // ID 7 | NF-1091 | Data fora do período
  7: {
    impactos: [
      {
        categoria: "Operacional",
        nivel: "médio",
        descricao:
          "Pode exigir conferência do período ao qual o documento deve ser associado.",
      },
      {
        categoria: "Compliance",
        nivel: "baixo",
        descricao:
          "Pode demandar registro da justificativa para a presença do documento fora do período analisado.",
      },
      {
        categoria: "Financeiro",
        nivel: "baixo",
        descricao:
          "Pode exigir conferência do impacto do documento caso os valores sejam considerados em período diferente.",
      },
    ],
  },

  // ID 23 | NF-1145 | Total inconsistente
  23: {
    impactos: [
      {
        categoria: "Financeiro",
        nivel: "alto",
        descricao:
          "Pode exigir conciliação entre o valor total informado e a composição dos itens registrados.",
      },
      {
        categoria: "Tributário",
        nivel: "médio",
        descricao:
          "Pode demandar avaliação profissional caso a divergência altere a base de informações utilizada na análise tributária.",
      },
      {
        categoria: "Compliance",
        nivel: "baixo",
        descricao:
          "Pode representar um ponto de atenção nos controles de conferência documental.",
      },
    ],
  },
};

// Registros sem inconsistências não precisam de análise complementar.
export const analiseRegularPadrao = {
  impactos: [],
};

export const getAnalise = (id) =>
  analisesMock[id] || analiseRegularPadrao;