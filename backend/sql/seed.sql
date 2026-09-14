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
    area_impacto,
    chave_acesso
)
VALUES
    -- PRIORIDADE ALTA | Total inconsistente
    (
        1,
        'NF-1048',
        '2026-01-15',
        2450.00,
        'Prioridade alta',
        'Total inconsistente',
        'Financeiro',
        '352609000000000001235500100000001000000001'
    ),

    -- ATENÇÃO | Documento duplicado com o registro 22
    (
        2,
        'NF-1082',
        '2026-01-18',
        8730.50,
        'Atenção',
        'Documento duplicado',
        'Compliance',
        '352609000000000001235500100000002000000002'
    ),

    -- PRIORIDADE ALTA | Total inconsistente
    (
        5,
        'NF-1117',
        '2026-01-22',
        5120.00,
        'Prioridade alta',
        'Total inconsistente',
        'Financeiro',
        '352609000000000001235500100000003000000003'
    ),

    -- ATENÇÃO | Data fora do período
    (
        3,
        'NF-1051',
        '2026-02-01',
        3280.40,
        'Atenção',
        'Data fora do período',
        'Operacional',
        '352609000000000001235500100000004000000004'
    ),

    -- ATENÇÃO | Campo obrigatório ausente
    (
        4,
        'NF-1063',
        '2026-01-12',
        1120.00,
        'Atenção',
        'Campo obrigatório ausente',
        'Compliance',
        NULL
    ),

    -- REGULAR
    (
        1,
        'NF-1074',
        '2026-01-03',
        4210.60,
        'Regular',
        NULL,
        NULL,
        '352609000000000001235500100000006000000006'
    ),

    -- ATENÇÃO | Data fora do período
    (
        3,
        'NF-1091',
        '2026-02-04',
        2760.30,
        'Atenção',
        'Data fora do período',
        'Operacional',
        '352609000000000001235500100000007000000007'
    ),

    -- REGULAR
    (
        4,
        'NF-1103',
        '2026-01-05',
        980.00,
        'Regular',
        NULL,
        NULL,
        '352609000000000001235500100000008000000008'
    ),

    -- REGULAR
    (
        5,
        'NF-1121',
        '2026-01-06',
        6450.80,
        'Regular',
        NULL,
        NULL,
        '352609000000000001235500100000009000000009'
    ),

    -- REGULAR
    (
        4,
        'NF-1138',
        '2026-01-07',
        1540.25,
        'Regular',
        NULL,
        NULL,
        '352609000000000001235500100000010000000010'
    ),

    -- REGULAR
    (
        1,
        'NF-1152',
        '2026-01-08',
        3990.10,
        'Regular',
        NULL,
        NULL,
        '352609000000000001235500100000011000000011'
    ),

    -- REGULAR
    (
        3,
        'NF-1168',
        '2026-01-09',
        7330.45,
        'Regular',
        NULL,
        NULL,
        '352609000000000001235500100000012000000012'
    ),

    -- REGULAR
    (
        1,
        'NF-1002',
        '2026-01-05',
        1820.00,
        'Regular',
        NULL,
        NULL,
        '352609000000000001235500100000013000000013'
    ),

    -- REGULAR
    (
        2,
        'NF-1008',
        '2026-01-06',
        2750.30,
        'Regular',
        NULL,
        NULL,
        '352609000000000001235500100000014000000014'
    ),

    -- REGULAR
    (
        3,
        'NF-1015',
        '2026-01-07',
        4110.00,
        'Regular',
        NULL,
        NULL,
        '352609000000000001235500100000015000000015'
    ),

    -- REGULAR
    (
        4,
        'NF-1023',
        '2026-01-08',
        890.90,
        'Regular',
        NULL,
        NULL,
        '352609000000000001235500100000016000000016'
    ),

    -- REGULAR
    (
        5,
        'NF-1029',
        '2026-01-09',
        5680.00,
        'Regular',
        NULL,
        NULL,
        '352609000000000001235500100000017000000017'
    ),

    -- REGULAR
    (
        1,
        'NF-1036',
        '2026-01-10',
        3215.75,
        'Regular',
        NULL,
        NULL,
        '352609000000000001235500100000018000000018'
    ),

    -- REGULAR
    (
        2,
        'NF-1042',
        '2026-01-12',
        1290.00,
        'Regular',
        NULL,
        NULL,
        '352609000000000001235500100000019000000019'
    ),

    -- REGULAR
    (
        3,
        'NF-1057',
        '2026-01-13',
        6720.40,
        'Regular',
        NULL,
        NULL,
        '352609000000000001235500100000020000000020'
    ),

    -- REGULAR
    (
        5,
        'NF-1069',
        '2026-01-14',
        4450.00,
        'Regular',
        NULL,
        NULL,
        '352609000000000001235500100000021000000021'
    ),

    -- PRIORIDADE ALTA | Data fora do período + Documento duplicado
    (
        1,
        'NF-1082',
        '2026-02-10',
        1890.75,
        'Prioridade alta',
        'Data fora do período + Documento duplicado',
        'Compliance',
        '352609000000000001235500100000022000000022'
    ),

    -- PRIORIDADE ALTA | Total inconsistente
    (
        3,
        'NF-1145',
        '2026-01-26',
        9340.20,
        'Prioridade alta',
        'Total inconsistente',
        'Tributário',
        '352609000000000001235500100000023000000023'
    ),

    -- REGULAR
    (
        2,
        'NF-1160',
        '2026-01-28',
        3675.90,
        'Regular',
        NULL,
        NULL,
        '352609000000000001235500100000024000000024'
    );


INSERT INTO itens_registro (
    registro_id,
    descricao,
    quantidade,
    valor_unitario,
    valor_total
)
VALUES
    -- ID 1 | NF-1048 | INCONSISTENTE
    -- Itens = R$ 2.200,00 / Registro = R$ 2.450,00
    (1, 'Produto A', 2, 500.00, 1000.00),
    (1, 'Produto B', 2, 400.00, 800.00),
    (1, 'Produto C', 1, 400.00, 400.00),

    -- ID 2 | NF-1082 | REGULAR, mas duplicado com ID 22
    (2, 'Serviço de tecnologia', 1, 5000.00, 5000.00),
    (2, 'Licença de software', 3, 1000.00, 3000.00),
    (2, 'Suporte técnico', 1, 730.50, 730.50),

    -- ID 3 | NF-1117 | INCONSISTENTE
    -- Itens = R$ 5.000,00 / Registro = R$ 5.120,00
    (3, 'Serviço de transporte', 4, 800.00, 3200.00),
    (3, 'Taxa logística', 2, 500.00, 1000.00),
    (3, 'Serviço adicional', 1, 800.00, 800.00),

    -- ID 4 | NF-1051 | DATA FORA DO PERÍODO
    (4, 'Produto A', 2, 1000.00, 2000.00),
    (4, 'Produto B', 1, 1280.40, 1280.40),

    -- ID 5 | NF-1063 | CHAVE AUSENTE
    (5, 'Serviço técnico', 1, 1120.00, 1120.00),

    -- ID 6 | NF-1074 | REGULAR
    (6, 'Produto A', 3, 1000.00, 3000.00),
    (6, 'Produto B', 1, 1210.60, 1210.60),

    -- ID 7 | NF-1091 | DATA FORA DO PERÍODO
    (7, 'Serviço de suporte', 2, 1000.00, 2000.00),
    (7, 'Licença', 1, 760.30, 760.30),

    -- ID 8 | NF-1103 | REGULAR
    (8, 'Produto A', 1, 980.00, 980.00),

    -- ID 9 | NF-1121 | REGULAR
    (9, 'Serviço logístico', 2, 2500.00, 5000.00),
    (9, 'Taxa adicional', 1, 1450.80, 1450.80),

    -- ID 10 | NF-1138 | REGULAR
    (10, 'Produto A', 1, 1540.25, 1540.25),

    -- ID 11 | NF-1152 | REGULAR
    (11, 'Serviço de tecnologia', 2, 1500.00, 3000.00),
    (11, 'Licença', 1, 990.10, 990.10),

    -- ID 12 | NF-1168 | REGULAR
    (12, 'Serviço de consultoria', 1, 3000.00, 3000.00),
    (12, 'Serviço adicional', 1, 4330.45, 4330.45),

    -- ID 13 | NF-1002 | REGULAR
    (13, 'Produto A', 2, 600.00, 1200.00),
    (13, 'Produto B', 1, 620.00, 620.00),

    -- ID 14 | NF-1008 | REGULAR
    (14, 'Licença de software', 2, 1000.00, 2000.00),
    (14, 'Suporte técnico', 1, 750.30, 750.30),

    -- ID 15 | NF-1015 | REGULAR
    (15, 'Produto A', 3, 1000.00, 3000.00),
    (15, 'Produto B', 1, 1110.00, 1110.00),

    -- ID 16 | NF-1023 | REGULAR
    (16, 'Serviço técnico', 1, 890.90, 890.90),

    -- ID 17 | NF-1029 | REGULAR
    (17, 'Produto A', 2, 2000.00, 4000.00),
    (17, 'Produto B', 1, 1680.00, 1680.00),

    -- ID 18 | NF-1036 | REGULAR
    (18, 'Produto A', 1, 2000.00, 2000.00),
    (18, 'Produto B', 1, 1215.75, 1215.75),

    -- ID 19 | NF-1042 | REGULAR
    (19, 'Serviço de suporte', 1, 1290.00, 1290.00),

    -- ID 20 | NF-1057 | REGULAR
    (20, 'Produto A', 4, 1500.00, 6000.00),
    (20, 'Produto B', 1, 720.40, 720.40),

    -- ID 21 | NF-1069 | REGULAR
    (21, 'Produto A', 2, 2000.00, 4000.00),
    (21, 'Produto B', 1, 450.00, 450.00),

    -- ID 22 | NF-1082 | DATA FORA DO PERÍODO + DUPLICADO
    (22, 'Serviço de compliance', 1, 1890.75, 1890.75),

    -- ID 23 | NF-1145 | TOTAL INCONSISTENTE
    -- Itens = R$ 9.000,00 / Registro = R$ 9.340,20
    (23, 'Produto A', 2, 4000.00, 8000.00),
    (23, 'Produto B', 1, 1000.00, 1000.00),

    -- ID 24 | NF-1160 | REGULAR
    (24, 'Serviço de compliance', 1, 3675.90, 3675.90);