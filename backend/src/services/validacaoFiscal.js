function validarDataPeriodo(dataEmissao, inicioPeriodo, fimPeriodo) {
  const data = new Date(dataEmissao);
  const inicio = new Date(inicioPeriodo);
  const fim = new Date(fimPeriodo);

  return data >= inicio && data <= fim;
}

async function validarDocumentoDuplicado(pool, numeroDocumento, idRegistro) {
  const result = await pool.query(
    `
      SELECT id
      FROM registros_fiscais
      WHERE numero_documento = $1
        AND id <> $2;
    `,
    [numeroDocumento, idRegistro]
  );

  return result.rows.length > 0;
}

function validarChaveAcesso(chaveAcesso) {
  return Boolean(chaveAcesso);
}

async function validarTotalItens(pool, registro) {
  const itemTotal = await pool.query(
    `
      SELECT SUM(valor_total) AS total_itens, COUNT(*) AS quantidade_item
      FROM itens_registro
      WHERE registro_id = $1;
    `,
    [registro.id]
  );

  const totalItens = Number(itemTotal.rows[0].total_itens);
  const quantidadeItens = Number(itemTotal.rows[0].quantidade_item);

  return { totalItens, quantidadeItens };
}

async function validarRegistro(pool, registro) {
  const validacoes = [];

  const dataValida = validarDataPeriodo(
    registro.data_emissao,
    "2026-01-01",
    "2026-01-31"
  );

  validacoes.push({
    regra: "Data dentro do período",
    status: dataValida ? "aprovado" : "inconsistente",
    mensagem: dataValida
      ? "A data de emissão está dentro do período analisado."
      : "A data de emissão está fora do período analisado.",
  });

  const documentoDuplicado = await validarDocumentoDuplicado(
    pool,
    registro.numero_documento,
    registro.id
  );

  validacoes.push({
    regra: "Documento único",
    status: documentoDuplicado ? "inconsistente" : "aprovado",
    mensagem: documentoDuplicado
      ? "Foi encontrado outro registro com o mesmo número de documento."
      : "Não foi encontrado outro registro com o mesmo número de documento.",
  });

  const chaveAcessoValida = validarChaveAcesso(registro.chave_acesso);

  validacoes.push({
    regra: "Chave de acesso",
    status: chaveAcessoValida ? "aprovado" : "inconsistente",
    mensagem: chaveAcessoValida
      ? "A chave de acesso está preenchida."
      : "A chave de acesso não foi informada.",
  });

  const resultadoItens = await validarTotalItens(pool, registro);

  validacoes.push({
    regra: "Total dos itens",
    status:
      resultadoItens.quantidadeItens === 0 ||
      resultadoItens.totalItens !== Number(registro.valor_total)
        ? "inconsistente"
        : "aprovado",

    mensagem:
      resultadoItens.quantidadeItens === 0
        ? "Não foram encontrados itens para este registro."
        : resultadoItens.totalItens !== Number(registro.valor_total)
        ? "A soma dos valores dos itens não corresponde ao valor total do registro."
        : "A soma dos valores dos itens corresponde ao valor total do registro.",
  });

  const quantidadeInconsistencias = validacoes.filter(
    (validacao) => validacao.status === "inconsistente"
  ).length;

  const totalInconsistente = validacoes.some(
    (validacao) =>
      validacao.regra === "Total dos itens" &&
      validacao.status === "inconsistente"
  );

  const ocorrencias = [];

if (
  validacoes.some(
    (validacao) =>
      validacao.regra === "Chave de acesso" &&
      validacao.status === "inconsistente"
  )
) {
  ocorrencias.push("Campo obrigatório ausente");
}

if (
  validacoes.some(
    (validacao) =>
      validacao.regra === "Data dentro do período" &&
      validacao.status === "inconsistente"
  )
) {
  ocorrencias.push("Data fora do período");
}

if (
  validacoes.some(
    (validacao) =>
      validacao.regra === "Documento único" &&
      validacao.status === "inconsistente"
  )
) {
  ocorrencias.push("Documento duplicado");
}

if (
  validacoes.some(
    (validacao) =>
      validacao.regra === "Total dos itens" &&
      validacao.status === "inconsistente"
  )
) {
  ocorrencias.push("Total inconsistente");
}

const ocorrencia =
  ocorrencias.length > 0
    ? ocorrencias.join(" + ")
    : null;


  console.log("Validações:", validacoes);
  console.log("Quantidade:", quantidadeInconsistencias);
  console.log("Total inconsistente:", totalInconsistente);
  console.log("Ocorrência:", ocorrencia);

  const classificacao =
    quantidadeInconsistencias >= 2
      ? "Prioridade alta"
      : totalInconsistente
      ? "Prioridade alta"
      : quantidadeInconsistencias === 1
      ? "Atenção"
      : "Regular";

  return {
    validacoes,
    classificacao,
    ocorrencia,
  };
}

module.exports = {
  validarRegistro,
};

