const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function gerarExplicacaoIA(
  registro,
  resultadoValidacao,
  apenas = null
) {
  const inconsistencias = resultadoValidacao.validacoes.filter(
    (validacao) => validacao.status === "inconsistente"
  );

  if (inconsistencias.length === 0) {
    const resultado = {
      explicacao:
        "Nenhuma inconsistência foi identificada pelas regras deste protótipo. A análise profissional permanece necessária para a validação final.",

      recomendacao:
        "Manter o registro disponível para análise profissional e confirmar as informações antes da validação final.",
    };

    if (apenas === "explicacao") {
      return {
        explicacao: resultado.explicacao,
      };
    }

    if (apenas === "recomendacao") {
      return {
        recomendacao: resultado.recomendacao,
      };
    }

    return resultado;
  }

  const detalhes = inconsistencias
    .map((validacao) => {
      let detalhe = `- ${validacao.regra}: ${validacao.mensagem}`;

      // Quando a inconsistência envolve o total dos itens,
      // enviamos os valores reais para a IA.
      if (
        validacao.regra === "Total dos itens" &&
        validacao.detalhes
      ) {
        const {
          totalItens,
          quantidadeItens,
          valorRegistro,
        } = validacao.detalhes;

        const diferenca = Math.abs(
          totalItens - valorRegistro
        );

        detalhe += `
  Quantidade de itens: ${quantidadeItens}
  Soma dos itens: R$ ${totalItens.toFixed(2)}
  Total do documento: R$ ${valorRegistro.toFixed(2)}
  Diferença: R$ ${diferenca.toFixed(2)}`;
      }

      return detalhe;
    })
    .join("\n");

  let instrucaoSaida;

  if (apenas === "explicacao") {
    instrucaoSaida = `
Gere somente a informação "explicacao".

A explicação deve:
- ser clara, objetiva e profissional;
- ter no máximo 3 frases;
- explicar somente as inconsistências fornecidas;
- usar somente números e informações presentes nos dados fornecidos.
`;
  } else if (apenas === "recomendacao") {
    instrucaoSaida = `
Gere somente a informação "recomendacao".

A recomendação deve:
- orientar o profissional sobre o que verificar ou comparar;
- ter no máximo 3 frases curtas;
- ser uma orientação de análise;
- não tomar uma decisão pelo profissional.
`;
  } else {
    instrucaoSaida = `
Gere duas informações:

1. "explicacao":
Explique de forma clara, objetiva e profissional o que foi identificado.
A explicação deve ter no máximo 3 frases.
Use somente números e informações presentes nos dados fornecidos.

2. "recomendacao":
Indique o que o profissional deve verificar ou comparar para investigar
a inconsistência identificada.
A recomendação deve ter no máximo 3 frases curtas.
Ela deve ser uma orientação de análise, e não uma decisão tributária.
`;
  }

  let schema;

  if (apenas === "explicacao") {
    schema = {
      type: "object",
      properties: {
        explicacao: {
          type: "string",
        },
      },
      required: ["explicacao"],
    };
  } else if (apenas === "recomendacao") {
    schema = {
      type: "object",
      properties: {
        recomendacao: {
          type: "string",
        },
      },
      required: ["recomendacao"],
    };
  } else {
    schema = {
      type: "object",
      properties: {
        explicacao: {
          type: "string",
        },
        recomendacao: {
          type: "string",
        },
      },
      required: ["explicacao", "recomendacao"],
    };
  }

  const prompt = `
Você é o assistente de análise do FiscalLens.

Sua função é explicar inconsistências que já foram identificadas
pelas regras determinísticas do sistema e orientar o profissional
sobre o que deve ser verificado.

Você NÃO deve:
- criar novas inconsistências;
- tomar decisões tributárias;
- afirmar que existe uma infração fiscal;
- inventar informações, valores ou diferenças;
- inferir informações que não estejam nos dados fornecidos;
- citar leis, artigos, instruções normativas ou dispositivos legais específicos;
- inventar referências legais;
- recomendar automaticamente aprovação, correção ou rejeição de um documento;
- substituir a análise de um profissional.

Explique somente o que pode ser concluído a partir dos dados fornecidos.

${instrucaoSaida}

Se uma informação necessária para explicar a inconsistência
não estiver nos dados fornecidos, não invente essa informação.

Não cite legislação específica.

Dados do registro:

Documento: ${registro.numero_documento}
Empresa: ${registro.razao_social}
Segmento: ${registro.segmento}
Data de emissão: ${registro.data_emissao}
Valor total do documento: R$ ${Number(
    registro.valor_total
  ).toFixed(2)}

Inconsistências identificadas pelo FiscalLens:

${detalhes}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
      responseSchema: schema,
    },
  });

  try {
    return JSON.parse(response.text);
  } catch (error) {
    console.error(
      "Resposta inválida recebida da IA:",
      response.text
    );

    throw new Error(
      "A resposta da IA não possui um formato JSON válido."
    );
  }
}

module.exports = {
  gerarExplicacaoIA,
};