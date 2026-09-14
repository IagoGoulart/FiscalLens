INSERT INTO empresas (razao_social, segmento)
VALUES
    ('Alpha Comércio Ltda.', 'Varejo'),
    ('Beta Tecnologia S.A.', 'Tecnologia'),
    ('Gamma Distribuidora Ltda.', 'Indústria'),
    ('Delta Serviços ME', 'Serviços'),
    ('Epsilon Logística Ltda.', 'Serviços');


INSERT INTO registros_fiscais (
    empresa_id,
    numero_documento,
    data_emissao,
    valor_total,
    status,
    ocorrencia,
    area_impacto
)
VALUES
    -- PRIORIDADE ALTA
    (1, 'NF-1048', '2026-01-15', 2450.00, 'Prioridade alta', 'Total inconsistente', 'Financeiro'),
    (2, 'NF-1082', '2026-01-18', 8730.50, 'Prioridade alta', 'Documento duplicado', 'Compliance'),
    (5, 'NF-1117', '2026-01-22', 5120.00, 'Prioridade alta', 'Total inconsistente', 'Financeiro'),

    -- ATENÇÃO
    (3, 'NF-1051', '2026-02-01', 3280.40, 'Atenção', 'Data fora do período', 'Operacional'),
    (4, 'NF-1063', '2026-02-02', 1120.00, 'Atenção', 'Data fora do período', 'Operacional'),
    (1, 'NF-1074', '2026-02-03', 4210.60, 'Atenção', 'Data fora do período', 'Operacional'),
    (3, 'NF-1091', '2026-02-04', 2760.30, 'Atenção', 'Data fora do período', 'Operacional'),
    (4, 'NF-1103', '2026-02-05', 980.00, 'Atenção', 'Data fora do período', 'Operacional'),
    (5, 'NF-1121', '2026-02-06', 6450.80, 'Atenção', 'Data fora do período', 'Financeiro'),
    (4, 'NF-1138', '2026-02-07', 1540.25, 'Atenção', 'Data fora do período', 'Operacional'),
    (1, 'NF-1152', '2026-02-08', 3990.10, 'Atenção', 'Data fora do período', 'Operacional'),
    (3, 'NF-1168', '2026-02-09', 7330.45, 'Atenção', 'Data fora do período', 'Operacional'),

    -- REGULAR
    (1, 'NF-1002', '2026-01-05', 1820.00, 'Regular', NULL, NULL),
    (2, 'NF-1008', '2026-01-06', 2750.30, 'Regular', NULL, NULL),
    (3, 'NF-1015', '2026-01-07', 4110.00, 'Regular', NULL, NULL),
    (4, 'NF-1023', '2026-01-08', 890.90, 'Regular', NULL, NULL),
    (5, 'NF-1029', '2026-01-09', 5680.00, 'Regular', NULL, NULL),
    (1, 'NF-1036', '2026-01-10', 3215.75, 'Regular', NULL, NULL),
    (2, 'NF-1042', '2026-01-12', 1290.00, 'Regular', NULL, NULL),
    (3, 'NF-1057', '2026-01-13', 6720.40, 'Regular', NULL, NULL),
    (5, 'NF-1069', '2026-01-14', 4450.00, 'Regular', NULL, NULL),

    -- PRIORIDADE ALTA
    (1, 'NF-1132', '2026-01-24', 1890.75, 'Prioridade alta', 'Documento duplicado', 'Compliance'),
    (3, 'NF-1145', '2026-01-26', 9340.20, 'Prioridade alta', 'Total inconsistente', 'Tributário'),
    (2, 'NF-1160', '2026-01-28', 3675.90, 'Prioridade alta', 'Documento duplicado', 'Compliance');


INSERT INTO itens_registro (
    registro_id,
    descricao,
    quantidade,
    valor_unitario,
    valor_total
)
VALUES
    -- NF-1048 | INCONSISTENTE: itens = R$ 2.200,00 / registro = R$ 2.450,00
    (1, 'Produto A', 2, 500.00, 1000.00),
    (1, 'Produto B', 2, 400.00, 800.00),
    (1, 'Produto C', 1, 400.00, 400.00),

    -- NF-1082 | Documento será duplicado com o registro 22
    (2, 'Serviço de tecnologia', 1, 5000.00, 5000.00),
    (2, 'Licença de software', 3, 1000.00, 3000.00),
    (2, 'Suporte técnico', 1, 730.50, 730.50),

    -- NF-1117 | INCONSISTENTE: itens = R$ 5.000,00 / registro = R$ 5.120,00
    (3, 'Serviço de transporte', 4, 800.00, 3200.00),
    (3, 'Taxa logística', 2, 500.00, 1000.00),
    (3, 'Serviço adicional', 1, 800.00, 800.00),

    -- ATENÇÃO | Apenas a data está fora do período
    (4, 'Produto A', 2, 1000.00, 2000.00),
    (4, 'Produto B', 1, 1280.40, 1280.40),

    (5, 'Serviço técnico', 1, 1120.00, 1120.00),

    (6, 'Produto A', 3, 1000.00, 3000.00),
    (6, 'Produto B', 1, 1210.60, 1210.60),

    (7, 'Serviço de suporte', 2, 1000.00, 2000.00),
    (7, 'Licença', 1, 760.30, 760.30),

    (8, 'Produto A', 1, 980.00, 980.00),

    (9, 'Serviço logístico', 2, 2500.00, 5000.00),
    (9, 'Taxa adicional', 1, 1450.80, 1450.80),

    (10, 'Produto A', 1, 1540.25, 1540.25),

    (11, 'Serviço de tecnologia', 2, 1500.00, 3000.00),
    (11, 'Licença', 1, 990.10, 990.10),

    (12, 'Serviço de consultoria', 1, 3000.00, 3000.00),
    (12, 'Serviço adicional', 1, 4330.45, 4330.45),

    -- REGULARES
    (13, 'Produto A', 2, 600.00, 1200.00),
    (13, 'Produto B', 1, 620.00, 620.00),

    (14, 'Licença de software', 2, 1000.00, 2000.00),
    (14, 'Suporte técnico', 1, 750.30, 750.30),

    (15, 'Produto A', 3, 1000.00, 3000.00),
    (15, 'Produto B', 1, 1110.00, 1110.00),

    (16, 'Serviço técnico', 1, 890.90, 890.90),

    (17, 'Produto A', 2, 2000.00, 4000.00),
    (17, 'Produto B', 1, 1680.00, 1680.00),

    (18, 'Produto A', 1, 2000.00, 2000.00),
    (18, 'Produto B', 1, 1215.75, 1215.75),

    (19, 'Serviço de suporte', 1, 1290.00, 1290.00),

    (20, 'Produto A', 4, 1500.00, 6000.00),
    (20, 'Produto B', 1, 720.40, 720.40),

    (21, 'Produto A', 2, 2000.00, 4000.00),
    (21, 'Produto B', 1, 450.00, 450.00),

    -- PRIORIDADE ALTA | NF-1132
    (22, 'Serviço de compliance', 1, 1890.75, 1890.75),

    -- PRIORIDADE ALTA | Total inconsistente
    (23, 'Produto A', 2, 4000.00, 8000.00),
    (23, 'Produto B', 1, 1000.00, 1000.00),

    -- PRIORIDADE ALTA | Documento duplicado com o registro 23
    (24, 'Serviço de compliance', 1, 3675.90, 3675.90);