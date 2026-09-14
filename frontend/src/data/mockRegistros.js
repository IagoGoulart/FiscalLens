export const registrosMock = [
  // ---------- Prioridade alta ----------
  { id: "NF-1048", documento: "NF-1048", empresa: "Alpha Comércio Ltda.",      segmento: "Varejo",     data: "15/01/2026", valor: 2450.00, status: "Prioridade alta", ocorrencia: "Total inconsistente",       impacto: "Financeiro" },
  { id: "NF-1082", documento: "NF-1082", empresa: "Beta Tecnologia S.A.",      segmento: "Tecnologia", data: "18/01/2026", valor: 8730.50, status: "Prioridade alta", ocorrencia: "Documento duplicado",       impacto: "Compliance" },
  { id: "NF-1117", documento: "NF-1117", empresa: "Epsilon Logística Ltda.",   segmento: "Serviços",   data: "22/01/2026", valor: 5120.00, status: "Prioridade alta", ocorrencia: "Total inconsistente",       impacto: "Financeiro" },
  { id: "NF-1132", documento: "NF-1132", empresa: "Alpha Comércio Ltda.",      segmento: "Varejo",     data: "24/01/2026", valor: 1890.75, status: "Prioridade alta", ocorrencia: "Documento duplicado",       impacto: "Compliance" },
  { id: "NF-1145", documento: "NF-1145", empresa: "Gamma Distribuidora Ltda.", segmento: "Indústria",  data: "26/01/2026", valor: 9340.20, status: "Prioridade alta", ocorrencia: "Total inconsistente",       impacto: "Tributário" },
  { id: "NF-1160", documento: "NF-1160", empresa: "Beta Tecnologia S.A.",      segmento: "Tecnologia", data: "28/01/2026", valor: 3675.90, status: "Prioridade alta", ocorrencia: "Documento duplicado",       impacto: "Compliance" },

  // ---------- Atenção ----------
  { id: "NF-1051", documento: "NF-1051", empresa: "Gamma Distribuidora Ltda.", segmento: "Indústria",  data: "16/01/2026", valor: 3280.40, status: "Atenção", ocorrencia: "Campo obrigatório ausente", impacto: "Operacional" },
  { id: "NF-1063", documento: "NF-1063", empresa: "Delta Serviços ME",         segmento: "Serviços",   data: "17/01/2026", valor: 1120.00, status: "Atenção", ocorrencia: "Data fora do período",      impacto: "Operacional" },
  { id: "NF-1074", documento: "NF-1074", empresa: "Alpha Comércio Ltda.",      segmento: "Varejo",     data: "19/01/2026", valor: 4210.60, status: "Atenção", ocorrencia: "Campo obrigatório ausente", impacto: "Operacional" },
  { id: "NF-1091", documento: "NF-1091", empresa: "Gamma Distribuidora Ltda.", segmento: "Indústria",  data: "20/01/2026", valor: 2760.30, status: "Atenção", ocorrencia: "Campo obrigatório ausente", impacto: "Operacional" },
  { id: "NF-1103", documento: "NF-1103", empresa: "Delta Serviços ME",         segmento: "Serviços",   data: "21/01/2026", valor: 980.00,  status: "Atenção", ocorrencia: "Data fora do período",      impacto: "Operacional" },
  { id: "NF-1121", documento: "NF-1121", empresa: "Epsilon Logística Ltda.",   segmento: "Serviços",   data: "23/01/2026", valor: 6450.80, status: "Atenção", ocorrencia: "Data fora do período",      impacto: "Financeiro" },
  { id: "NF-1138", documento: "NF-1138", empresa: "Delta Serviços ME",         segmento: "Serviços",   data: "25/01/2026", valor: 1540.25, status: "Atenção", ocorrencia: "Campo obrigatório ausente", impacto: "Operacional" },
  { id: "NF-1152", documento: "NF-1152", empresa: "Alpha Comércio Ltda.",      segmento: "Varejo",     data: "27/01/2026", valor: 3990.10, status: "Atenção", ocorrencia: "Data fora do período",      impacto: "Operacional" },
  { id: "NF-1168", documento: "NF-1168", empresa: "Gamma Distribuidora Ltda.", segmento: "Indústria",  data: "29/01/2026", valor: 7330.45, status: "Atenção", ocorrencia: "Campo obrigatório ausente", impacto: "Operacional" },

  // ---------- Regulares ----------
  { id: "NF-1002", documento: "NF-1002", empresa: "Alpha Comércio Ltda.",      segmento: "Varejo",     data: "05/01/2026", valor: 1820.00, status: "Regular", ocorrencia: "—" },
  { id: "NF-1008", documento: "NF-1008", empresa: "Beta Tecnologia S.A.",      segmento: "Tecnologia", data: "06/01/2026", valor: 2750.30, status: "Regular", ocorrencia: "—" },
  { id: "NF-1015", documento: "NF-1015", empresa: "Gamma Distribuidora Ltda.", segmento: "Indústria",  data: "07/01/2026", valor: 4110.00, status: "Regular", ocorrencia: "—" },
  { id: "NF-1023", documento: "NF-1023", empresa: "Delta Serviços ME",         segmento: "Serviços",   data: "08/01/2026", valor: 890.90,  status: "Regular", ocorrencia: "—" },
  { id: "NF-1029", documento: "NF-1029", empresa: "Epsilon Logística Ltda.",   segmento: "Serviços",   data: "09/01/2026", valor: 5680.00, status: "Regular", ocorrencia: "—" },
  { id: "NF-1036", documento: "NF-1036", empresa: "Alpha Comércio Ltda.",      segmento: "Varejo",     data: "10/01/2026", valor: 3215.75, status: "Regular", ocorrencia: "—" },
  { id: "NF-1042", documento: "NF-1042", empresa: "Beta Tecnologia S.A.",      segmento: "Tecnologia", data: "12/01/2026", valor: 1290.00, status: "Regular", ocorrencia: "—" },
  { id: "NF-1057", documento: "NF-1057", empresa: "Gamma Distribuidora Ltda.", segmento: "Indústria",  data: "13/01/2026", valor: 6720.40, status: "Regular", ocorrencia: "—" },
  { id: "NF-1069", documento: "NF-1069", empresa: "Epsilon Logística Ltda.",   segmento: "Serviços",   data: "14/01/2026", valor: 4450.00, status: "Regular", ocorrencia: "—" },
];

export const statusOptions = [
  { value: "todos", label: "Todos" },
  { value: "Regular", label: "Regular" },
  { value: "Atenção", label: "Atenção" },
  { value: "Prioridade alta", label: "Prioridade alta" },
];

export const ocorrenciaOptions = [
  { value: "todas", label: "Todas" },
  { value: "Documento duplicado", label: "Documento duplicado" },
  { value: "Total inconsistente", label: "Total inconsistente" },
  { value: "Campo obrigatório ausente", label: "Campo obrigatório ausente" },
  { value: "Data fora do período", label: "Data fora do período" },
];

export const segmentoOptions = [
  { value: "todos", label: "Todos" },
  { value: "Varejo", label: "Varejo" },
  { value: "Indústria", label: "Indústria" },
  { value: "Serviços", label: "Serviços" },
  { value: "Tecnologia", label: "Tecnologia" },
];