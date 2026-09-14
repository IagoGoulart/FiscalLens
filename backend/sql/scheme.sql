CREATE TABLE empresas (
    id SERIAL PRIMARY KEY,
    razao_social VARCHAR(150) NOT NULL,
    segmento VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE registros_fiscais (
    id SERIAL PRIMARY KEY,
    empresa_id INTEGER NOT NULL REFERENCES empresas(id),
    numero_documento VARCHAR(50) NOT NULL,
    data_emissao DATE NOT NULL,
    valor_total NUMERIC(12, 2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    ocorrencia VARCHAR(100),
    area_impacto VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE itens_registro (
    id SERIAL PRIMARY KEY,
    registro_id INTEGER NOT NULL REFERENCES registros_fiscais(id),
    descricao VARCHAR(200) NOT NULL,
    quantidade NUMERIC(10, 2) NOT NULL,
    valor_unitario NUMERIC(12, 2) NOT NULL,
    valor_total NUMERIC(12, 2) NOT NULL
);