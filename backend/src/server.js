require("dotenv").config();

const cors = require("cors");
const express = require("express");
const pool = require("./config/database");
const { validarRegistro } = require("./services/validacaoFiscal");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get("/api/health/encoding2", (req, res) => {
  res.setHeader("Content-Type", "application/json; charset=utf-8");

  res.end(JSON.stringify({
    teste: "Comércio",
    teste2: "Logística",
    teste3: "Indústria",
    teste4: "Serviços",
    teste5: "Tributário"
  }));
});

// Rota de teste da API
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "API is running",
  });
});

// Rota de teste da conexão com o PostgreSQL
app.get("/api/health/database", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        current_database(),
        current_user,
        COUNT(*) AS quantidade,
        COUNT(chave_acesso) AS chaves_preenchidas
      FROM registros_fiscais
    `);

    res.json(result.rows[0]);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Erro ao conectar ao PostgreSQL",
    });
  }
});

app.get("/api/health/database-info", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        current_database(),
        current_user,
        inet_server_addr()
    `);

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Erro ao consultar informações do banco",
    });
  }
});

// Lista todos os registros fiscais
app.get("/api/registros", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
        registros_fiscais.id,
        registros_fiscais.numero_documento,
        empresas.razao_social,
        empresas.segmento,
        registros_fiscais.data_emissao,
        registros_fiscais.valor_total,
        registros_fiscais.status,
        registros_fiscais.chave_acesso,
        registros_fiscais.ocorrencia,
        registros_fiscais.area_impacto
      FROM registros_fiscais
      JOIN empresas
        ON registros_fiscais.empresa_id = empresas.id
      ORDER BY registros_fiscais.id;
    `);
    const registros = [];


    for (const registro of result.rows) {
        const resultadoFinal = await validarRegistro(pool, registro)
        
        registros.push({
            ...registro,
            status: resultadoFinal.classificacao,
            ocorrencia: resultadoFinal.ocorrencia
        })
    }

    res.json(registros);



  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Erro ao buscar registros fiscais",
    });
  }
});

// Busca um registro fiscal específico pelo ID
app.get("/api/registros/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
        SELECT
          registros_fiscais.id,
          registros_fiscais.numero_documento,
          empresas.razao_social,
          empresas.segmento,
          registros_fiscais.data_emissao,
          registros_fiscais.valor_total,
          registros_fiscais.status,
          registros_fiscais.ocorrencia,
          registros_fiscais.area_impacto
        FROM registros_fiscais
        JOIN empresas
          ON registros_fiscais.empresa_id = empresas.id
        WHERE registros_fiscais.id = $1;
      `,
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Registro fiscal não encontrado",
      });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Erro ao buscar registro fiscal",
    });
  }
});

app.get("/api/registros/:id/validacao", async (req, res) => {
  try {
    const { id } = req.params;

const result = await pool.query(
  `
    SELECT
      id,
      numero_documento,
      data_emissao,
      valor_total,
      chave_acesso
    FROM registros_fiscais
    WHERE id = $1;
  `,
  [id]
);

    if (result.rows.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "Registro fiscal não encontrado",
      });
    }

    const registro = result.rows[0];
    const resultadoFinal = await validarRegistro(pool, registro);


    res.json({
      registro: {
        id: registro.id,
        documento: registro.numero_documento,
      },
      status: resultadoFinal.classificacao,
      validacoes: resultadoFinal.validacoes,
      ocorrencia: resultadoFinal.ocorrencia,
    });
    
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "error",
      message: "Erro ao validar registro fiscal",
    });
  }
});

// Inicia o servidor
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});