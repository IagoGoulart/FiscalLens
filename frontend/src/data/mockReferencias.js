// Referências oficiais para consulta profissional.
//
// As regras de validação do FiscalLens são próprias do protótipo.
// As fontes abaixo servem apenas como contexto para a análise profissional.

export const referenciasNormativas = {
  documentacaoFiscal: [
    {
      id: "sped-portal",
      titulo: "Portal Nacional do SPED",
      orgao: "Receita Federal do Brasil",
      assunto: "Sistema Público de Escrituração Digital",
      relevancia:
        "Fonte oficial para consulta sobre o SPED e sobre a organização das informações utilizadas na escrituração fiscal.",
      link: "https://www.gov.br/receitafederal/pt-br/assuntos/sped",
    },
  ],

  efdIcmsIpi: [
    {
      id: "efd-icms-ipi",
      titulo: "EFD-ICMS/IPI — Escrituração Fiscal Digital",
      orgao: "Receita Federal do Brasil",
      assunto: "Escrituração Fiscal Digital de ICMS e IPI",
      relevancia:
        "Fonte oficial relacionada à escrituração fiscal e à organização das informações fiscais que podem ser utilizadas como contexto na análise profissional.",
      link: "https://www.gov.br/pt-br/servicos/entregar-escrituracao-fiscal-digital-efd-icms-ipi",
    },
  ],

  classificacaoFiscal: [
    {
      id: "consulta-ncm",
      titulo: "Consulta sobre Classificação Fiscal de Mercadorias (NCM)",
      orgao: "Receita Federal do Brasil",
      assunto: "Classificação fiscal de mercadorias",
      relevancia:
        "Serviço oficial para consultas relacionadas à classificação fiscal de mercadorias.",
      link: "https://www.gov.br/pt-br/servicos/formalizar-consulta-sobre-classificacao-fiscal-de-mercadorias",
    },
  ],
};

// Mapeia a ocorrência identificada pelo FiscalLens
// para referências que podem auxiliar a análise profissional.
export const getReferenciasPorOcorrencia = (ocorrencia) => {
  if (!ocorrencia || ocorrencia === "—") {
    return [];
  }

  if (ocorrencia.includes("Total inconsistente")) {
    return referenciasNormativas.documentacaoFiscal;
  }

  if (ocorrencia.includes("Documento duplicado")) {
    return referenciasNormativas.documentacaoFiscal;
  }

  if (ocorrencia.includes("Campo obrigatório ausente")) {
    return referenciasNormativas.efdIcmsIpi;
  }

  if (ocorrencia.includes("Data fora do período")) {
    return referenciasNormativas.efdIcmsIpi;
  }

  return [];
};