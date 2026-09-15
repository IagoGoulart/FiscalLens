const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function buscarRegistros() {
  const response = await fetch(`${API_URL}/api/registros`);

  if (!response.ok) {
    throw new Error("Erro ao buscar registros fiscais");
  }

  const dados = await response.json();

  return dados.map((registro) => ({
    id: registro.id,
    documento: registro.numero_documento,
    empresa: registro.razao_social,
    segmento: registro.segmento,
    data: new Date(registro.data_emissao).toLocaleDateString("pt-BR"),
    valor: Number(registro.valor_total),
    status: registro.status,
    ocorrencia: registro.ocorrencia || "—",
    areaImpacto: registro.area_impacto,
  }));
}

export async function buscarRegistroPorId(id) {
  const response = await fetch(`${API_URL}/api/registros/${id}`);

  if (!response.ok) {
    throw new Error("Erro ao buscar registro fiscal");
  }

  const registro = await response.json();

  return {
    id: registro.id,
    documento: registro.numero_documento,
    empresa: registro.razao_social,
    segmento: registro.segmento,
    data: new Date(registro.data_emissao).toLocaleDateString("pt-BR"),
    valor: Number(registro.valor_total),
    status: registro.status,
    ocorrencia: registro.ocorrencia || "—",
    areaImpacto: registro.area_impacto,
  };
}

export async function buscarValidacoesPorRegistro(id) {
  const response = await fetch(
    `${API_URL}/api/registros/${id}/validacao`
  );

  if (!response.ok) {
    throw new Error("Erro ao buscar validações do registro");
  }

  return response.json();
}

export async function buscarExplicacaoIA(id) {
  const response = await fetch(
    `${API_URL}/api/registros/${id}/explicacao-ia`,
    {
      method: "POST",
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao gerar explicação com IA");
  }

  return response.json();
}

