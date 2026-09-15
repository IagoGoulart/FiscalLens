const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function gerarExplicacaoIA(registro, resultadoValidacao) {
  const inconsistencias = resultadoValidacao.validacoes.filter(
    (validacao) => validacao.status === "inconsistente"
  );

  if (inconsistencias.length === 0) {
    return {
      explicacao:
        "Nenhuma inconsistência foi identificada pelas regras deste protótipo. A análise profissional permanece necessária para a validação final.",
      recomendacao:
        "Manter o registro disponível para análise profissional e confirmar as informações antes da validação final.",
    };
  }

  const detalhes = inconsistencias
    .map(
      (validacao) =>
        `- ${validacao.regra}: ${validacao.mensagem}`
    )
    .join("\n");

  const prompt = `
Você é o assistente de análise do FiscalLens.

Sua função é explicar inconsistências que já foram identificadas
pelas regras determinísticas do sistema e orientar o profissional
sobre o que deve ser verificado.

Você NÃO deve:
- criar novas inconsistências;
- tomar decisões tributárias;
- afirmar que existe uma infração fiscal;
- inventar informações;
- substituir a análise de um profissional;
- recomendar automaticamente aprovação ou correção de um documento.

Explique somente o que pode ser concluído a partir dos dados fornecidos.

Gere duas informações:

1. "explicacao":
Explique de forma clara, objetiva e profissional o que foi identificado.
Quando houver divergência entre valores, informe os valores envolvidos
e a diferença encontrada.

2. "recomendacao":
Indique o que o profissional deve verificar ou comparar para investigar
a inconsistência identificada. A recomendação deve ser uma orientação
de análise, e não uma decisão tributária.

A resposta deve ser obrigatoriamente um JSON válido, seguindo exatamente
esta estrutura:

{
  "explicacao": "texto da explicação",
  "recomendacao": "texto da recomendação"
}

Não inclua markdown, comentários ou qualquer texto fora do JSON.

Dados do registro:

Documento: ${registro.numero_documento}
Empresa: ${registro.razao_social}
Segmento: ${registro.segmento}
Data de emissão: ${registro.data_emissao}
Valor total do documento: R$ ${Number(registro.valor_total).toFixed(2)}

Inconsistências identificadas pelo FiscalLens:
${detalhes}
`;

  const response = await ai.models.generateContent({
    model: "gemini-3.6-flash",
    contents: prompt,
  });

  const resultado = JSON.parse(response.text);

  return resultado;
}

module.exports = {
  gerarExplicacaoIA,
};