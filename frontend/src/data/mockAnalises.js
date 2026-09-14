// Análises detalhadas por ID de registro.
// Contém: validações determinísticas, explicação demonstrativa de IA,
// impactos potenciais no negócio e recomendação.
//
// As referências normativas NÃO ficam aqui — são resolvidas em runtime
// por getReferenciasPorOcorrencia() em src/data/mockReferencias.js.

export const analisesMock = {
  "NF-1048": {
    validacoes: [
      { regra: "Campos obrigatórios",              resultado: "regular",       detalhe: "Todos os campos obrigatórios estão presentes." },
      { regra: "Documento duplicado",              resultado: "regular",       detalhe: "Nenhuma duplicidade identificada no período." },
      { regra: "Quantidade × valor unitário",      resultado: "regular",       detalhe: "Cálculo consistente nos itens declarados." },
      { regra: "Soma dos itens = total declarado", resultado: "inconsistente", detalhe: "A soma dos itens difere do total declarado no documento." },
      { regra: "Data dentro do período analisado", resultado: "regular",       detalhe: "Data compatível com o período de janeiro de 2026." },
    ],
    explicacaoIA:
      "Foi identificada uma divergência entre a soma dos itens informados e o total declarado no registro. O resultado representa um ponto de atenção que deve ser conferido pelo profissional responsável antes de qualquer conclusão. Não há elementos suficientes, neste protótipo, para afirmar a natureza ou a origem da divergência.",
    impactos: [
      { categoria: "Financeiro",  nivel: "alto",  descricao: "Pode exigir revisão de valores registrados e eventual conciliação com os documentos de origem." },
      { categoria: "Operacional", nivel: "médio", descricao: "Pode demandar revisão manual do registro antes do fechamento do período." },
      { categoria: "Tributário",  nivel: "médio", descricao: "Pode exigir avaliação adicional do tratamento tributário aplicável à operação." },
      { categoria: "Compliance",  nivel: "baixo", descricao: "Pode representar um ponto de atenção para os controles internos." },
    ],
    recomendacao:
      "Recomenda-se conferir a composição dos itens e comparar os valores informados com o total declarado antes de concluir a análise. Caso a divergência seja confirmada, avaliar o possível impacto nos registros fiscais e financeiros relacionados.",
  },

  "NF-1082": {
    validacoes: [
      { regra: "Campos obrigatórios",              resultado: "regular",       detalhe: "Todos os campos obrigatórios estão presentes." },
      { regra: "Documento duplicado",              resultado: "inconsistente", detalhe: "Foi identificado outro registro com o mesmo documento no período." },
      { regra: "Quantidade × valor unitário",      resultado: "regular",       detalhe: "Cálculo consistente nos itens declarados." },
      { regra: "Soma dos itens = total declarado", resultado: "regular",       detalhe: "Soma dos itens compatível com o total declarado." },
      { regra: "Data dentro do período analisado", resultado: "regular",       detalhe: "Data compatível com o período de janeiro de 2026." },
    ],
    explicacaoIA:
      "Foi identificada a existência de outro registro com o mesmo número de documento no período analisado. Esse é um ponto de atenção que deve ser conferido pelo profissional, pois pode representar duplicidade de lançamento ou reutilização indevida do número. A análise definitiva depende da conferência documental.",
    impactos: [
      { categoria: "Compliance",  nivel: "alto",  descricao: "Pode demandar revisão documental e rastreabilidade do registro." },
      { categoria: "Operacional", nivel: "médio", descricao: "Pode demandar conferência do processo de emissão ou registro." },
      { categoria: "Financeiro",  nivel: "médio", descricao: "Pode representar impacto caso a duplicidade corresponda a lançamento em duplicidade." },
      { categoria: "Tributário",  nivel: "baixo", descricao: "Pode exigir avaliação adicional do tratamento tributário aplicável à operação." },
    ],
    recomendacao:
      "Recomenda-se confirmar se os dois registros representam a mesma operação. Em caso positivo, avaliar o tratamento adequado conforme o processo interno. Em caso negativo, verificar a origem da reutilização do número do documento.",
  },

  "NF-1091": {
    validacoes: [
      { regra: "Campos obrigatórios",              resultado: "atencao", detalhe: "Um dos campos obrigatórios não foi preenchido." },
      { regra: "Documento duplicado",              resultado: "regular", detalhe: "Nenhuma duplicidade identificada no período." },
      { regra: "Quantidade × valor unitário",      resultado: "regular", detalhe: "Cálculo consistente nos itens declarados." },
      { regra: "Soma dos itens = total declarado", resultado: "regular", detalhe: "Soma dos itens compatível com o total declarado." },
      { regra: "Data dentro do período analisado", resultado: "regular", detalhe: "Data compatível com o período de janeiro de 2026." },
    ],
    explicacaoIA:
      "Foi identificado que um dos campos obrigatórios do registro está ausente. A ausência desse campo pode dificultar a conferência e a rastreabilidade do documento. A análise profissional permanece necessária para avaliar a relevância do campo no contexto da operação.",
    impactos: [
      { categoria: "Operacional", nivel: "médio", descricao: "Pode demandar complementação de informação no registro." },
      { categoria: "Compliance",  nivel: "médio", descricao: "Pode demandar revisão documental para manter a rastreabilidade." },
      { categoria: "Financeiro",  nivel: "baixo", descricao: "Sem impacto financeiro direto identificado neste protótipo." },
      { categoria: "Tributário",  nivel: "baixo", descricao: "Pode exigir avaliação adicional do tratamento tributário aplicável à operação." },
    ],
    recomendacao:
      "Recomenda-se verificar a origem da ausência do campo e, se aplicável, complementar a informação antes de consolidar a análise.",
  },

  "NF-1103": {
    validacoes: [
      { regra: "Campos obrigatórios",              resultado: "regular", detalhe: "Todos os campos obrigatórios estão presentes." },
      { regra: "Documento duplicado",              resultado: "regular", detalhe: "Nenhuma duplicidade identificada no período." },
      { regra: "Quantidade × valor unitário",      resultado: "regular", detalhe: "Cálculo consistente nos itens declarados." },
      { regra: "Soma dos itens = total declarado", resultado: "regular", detalhe: "Soma dos itens compatível com o total declarado." },
      { regra: "Data dentro do período analisado", resultado: "atencao", detalhe: "Data do documento não coincide com o período analisado." },
    ],
    explicacaoIA:
      "Foi identificado que a data do documento está fora do período analisado. Esse é um ponto de atenção que pode indicar necessidade de conferência do registro ou ajuste no recorte do período. A análise profissional permanece necessária.",
    impactos: [
      { categoria: "Operacional", nivel: "médio", descricao: "Pode demandar conferência do recorte de período." },
      { categoria: "Financeiro",  nivel: "baixo", descricao: "Sem impacto financeiro direto identificado neste protótipo." },
      { categoria: "Compliance",  nivel: "baixo", descricao: "Pode demandar registro da conferência efetuada." },
      { categoria: "Tributário",  nivel: "baixo", descricao: "Pode exigir avaliação adicional do tratamento tributário aplicável à operação." },
    ],
    recomendacao:
      "Recomenda-se confirmar se o documento pertence ao período analisado e, se necessário, ajustar o recorte ou revisar o registro.",
  },

  "NF-1117": {
    validacoes: [
      { regra: "Campos obrigatórios",              resultado: "regular",       detalhe: "Todos os campos obrigatórios estão presentes." },
      { regra: "Documento duplicado",              resultado: "regular",       detalhe: "Nenhuma duplicidade identificada no período." },
      { regra: "Quantidade × valor unitário",      resultado: "regular",       detalhe: "Cálculo consistente nos itens declarados." },
      { regra: "Soma dos itens = total declarado", resultado: "inconsistente", detalhe: "A soma dos itens difere do total declarado no documento." },
      { regra: "Data dentro do período analisado", resultado: "regular",       detalhe: "Data compatível com o período de janeiro de 2026." },
    ],
    explicacaoIA:
      "Foi identificada uma divergência entre a soma dos itens informados e o total declarado no registro. O resultado representa um ponto de atenção que deve ser conferido pelo profissional responsável antes de qualquer conclusão.",
    impactos: [
      { categoria: "Financeiro",  nivel: "alto",  descricao: "Pode exigir revisão de valores registrados e eventual conciliação com os documentos de origem." },
      { categoria: "Operacional", nivel: "médio", descricao: "Pode demandar revisão manual do registro antes do fechamento do período." },
      { categoria: "Tributário",  nivel: "médio", descricao: "Pode exigir avaliação adicional do tratamento tributário aplicável à operação." },
      { categoria: "Compliance",  nivel: "baixo", descricao: "Pode representar um ponto de atenção para os controles internos." },
    ],
    recomendacao:
      "Recomenda-se conferir a composição dos itens e comparar os valores informados com o total declarado antes de concluir a análise.",
  },
};

// Fallback para registros sem análise específica (Regulares)
export const analiseRegularPadrao = {
  validacoes: [
    { regra: "Campos obrigatórios",              resultado: "regular", detalhe: "Todos os campos obrigatórios estão presentes." },
    { regra: "Documento duplicado",              resultado: "regular", detalhe: "Nenhuma duplicidade identificada no período." },
    { regra: "Quantidade × valor unitário",      resultado: "regular", detalhe: "Cálculo consistente nos itens declarados." },
    { regra: "Soma dos itens = total declarado", resultado: "regular", detalhe: "Soma dos itens compatível com o total declarado." },
    { regra: "Data dentro do período analisado", resultado: "regular", detalhe: "Data compatível com o período de janeiro de 2026." },
  ],
  explicacaoIA:
    "Nenhuma inconsistência foi identificada pelas regras deste protótipo. A análise profissional permanece necessária para validação final.",
  impactos: [],
  recomendacao:
    "Nenhuma inconsistência foi identificada pelas regras deste protótipo. A análise profissional permanece necessária.",
};

export const getAnalise = (id) => analisesMock[id] || analiseRegularPadrao;