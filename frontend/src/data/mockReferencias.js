// Referências normativas oficiais para consulta profissional
// Fontes verificadas e links oficiais
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
        "Fonte oficial de consulta sobre o SPED, utilizada como contexto para compreender a organização e o tratamento de informações fiscais.",
      link: "https://www.gov.br/receitafederal/pt-br/assuntos/sped",
    },
    {
      id: "efd-icms-ipi",
      titulo: "EFD-ICMS/IPI — Escrituração Fiscal Digital",
      orgao: "Receita Federal do Brasil",
      assunto: "Escrituração Fiscal Digital de ICMS e IPI",
      relevancia:
        "Fonte oficial relacionada à Escrituração Fiscal Digital de ICMS e IPI, utilizada como apoio para compreender o contexto de escrituração e organização das informações fiscais.",
      link: "https://www.gov.br/pt-br/servicos/entregar-escrituracao-fiscal-digital-efd-icms-ipi",
    },
  ],

  // Mantida no arquivo para uso futuro.
  // Não é associada automaticamente a nenhuma ocorrência no momento.
  classificacaoFiscal: [
    {
      id: "consulta-ncm",
      titulo: "Consulta sobre Classificação Fiscal de Mercadorias (NCM)",
      orgao: "Receita Federal do Brasil",
      assunto: "Classificação fiscal de mercadorias",
      relevancia:
        "Serviço oficial que demonstra como o profissional pode formalizar consultas sobre classificação fiscal de mercadorias.",
      link: "https://www.gov.br/pt-br/servicos/formalizar-consulta-sobre-classificacao-fiscal-de-mercadorias",
    },
  ],
};

// Mapeia tipo de ocorrência → referências relevantes
// Todas as ocorrências retornam apenas fontes de contexto geral.
// As regras de validação do protótipo são próprias do FiscalLens.
export const getReferenciasPorOcorrencia = () => {
  return referenciasNormativas.documentacaoFiscal;
};