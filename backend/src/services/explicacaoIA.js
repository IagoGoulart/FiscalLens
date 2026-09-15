const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function gerarExplicacaoIA(registro, resultadoValidacao) {
  const inconsistencias = resultadoValidacao.validacoes.filter(
    (validacao) => validacao.status === "inconsistente"
  );

  if (inconsistencias.length === 0) {
    return "Nenhuma inconsistência foi identificada pelas regras deste protótipo. A análise profissional permanece necessária para a validação final.";
  }

  const detalhes = inconsistencias
    .map(
      (validacao) =>
        `- ${validacao.regra}: ${validacao.mensagem}`
    )
    .join("\n");

  const prompt = `
Você é o assistente de explicação do FiscalLens.

Sua função é explicar, de forma clara e profissional, inconsistências
que já foram identificadas pelas regras determinísticas do sistema.

Você NÃO deve:
- criar novas inconsistências;
- tomar decisões tributárias;
- afirmar que existe uma infração fiscal;
- inventar informações;
- substituir a análise de um profissional.

Explique somente o que pode ser concluído a partir dos dados fornecidos.

Quando houver uma divergência entre valores, informe os valores
envolvidos e explique objetivamente a diferença.

A resposta deve:
- ser um único parágrafo;
- ter linguagem profissional e natural;
- ser objetiva;
- explicar o problema de forma compreensível;
- terminar indicando que a revisão profissional é necessária.

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

  return response.text;
}

module.exports = {
  gerarExplicacaoIA,
};