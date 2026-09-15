<div align="center">

# 🔎 FiscalLens

**Plataforma de análise e validação fiscal para consultoria tributária**

<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black"/>
<img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
<img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
<img src="https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white"/>
<img src="https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white"/>
<img src="https://img.shields.io/badge/Gemini%20API-4285F4?style=for-the-badge&logo=google&logoColor=white"/>

<br/><br/>

<img src="https://img.shields.io/badge/status-prot%C3%B3tipo-blue?style=flat-square"/>
<img src="https://img.shields.io/badge/licen%C3%A7a-MIT-blue?style=flat-square"/>

</div>

---

## 📖 Sobre o projeto

O FiscalLens é uma aplicação full stack voltada ao contexto de **consultoria tributária**, desenvolvida como protótipo de portfólio. O sistema analisa registros fiscais, aplica **validações determinísticas** para identificar possíveis inconsistências e utiliza **inteligência artificial** para contextualizar os resultados — sempre deixando a decisão final para o profissional responsável.

O princípio que orienta todas as decisões do produto é:

> **O sistema identifica. A IA explica. O profissional decide.**

A proposta não é substituir a análise tributária, mas apoiá-la: automatizar a identificação de inconsistências objetivas e apresentar os resultados de forma organizada, para que o profissional concentre esforço na interpretação e na decisão.

---

## 🌐 Demonstração

* **Aplicação:** https://fiscal-lens.vercel.app/
* **API:** https://fiscallens.onrender.com
* **Código:** https://github.com/IagoGoulart/FiscalLens

---

## ✨ Funcionalidades

### Análise e validação

* Consulta e análise de registros fiscais
* Validação automatizada por **regras determinísticas**
* Identificação de inconsistências
* Classificação automática por criticidade
* Análise individual de cada registro

### Inteligência artificial

* Explicação e contextualização das inconsistências identificadas (Gemini)
* Recomendação do que o profissional deve verificar
* Regeneração individual de explicação ou recomendação

### Interface

* Dashboard com visão consolidada
* Filtros por status, segmento e tipo de ocorrência
* Paginação de resultados
* Navegação entre visão geral, registros, análise e relatórios
* Responsividade para tablet e mobile

---

## 🔍 Regras de validação

As regras aplicadas pelo FiscalLens são **determinísticas** — a IA não participa desta etapa.

Atualmente, as regras implementadas são:

| Regra                         | Descrição                                                      |
| ----------------------------- | -------------------------------------------------------------- |
| **Data dentro do período**    | Verifica se a data de emissão está dentro do período analisado |
| **Documento duplicado**       | Identifica registros com o mesmo número de documento           |
| **Chave de acesso informada** | Confere se a chave de acesso foi preenchida                    |
| **Soma dos itens = total**    | Compara a soma dos itens com o valor total do documento        |

### Classificação por status

| Inconsistências identificadas     | Status             |
| --------------------------------- | ------------------ |
| Nenhuma                           | ✅ Regular          |
| Uma                               | ⚠️ Atenção         |
| Duas ou mais                      | 🔴 Prioridade alta |
| Inconsistência no total dos itens | 🔴 Prioridade alta |

---

## 🤖 Como a IA é utilizada

A IA **não realiza validações** e **não toma decisões tributárias**. As inconsistências são identificadas exclusivamente pelas regras determinísticas do sistema.

A IA atua **depois** das validações, com três funções:

1. **Explicar** — descreve de forma objetiva o que foi identificado.
2. **Contextualizar** — relaciona as inconsistências identificadas com os dados do registro.
3. **Recomendar** — indica o que o profissional deve verificar.

O prompt da IA é restrito para:

* não criar novas inconsistências;
* não inventar valores ou informações ausentes;
* não citar legislação específica;
* não recomendar aprovação ou rejeição de documentos.

A decisão final permanece, em qualquer cenário, com o profissional.

---

## 🔧 Nota técnica

Este é um protótipo demonstrativo e utiliza a API do Gemini para geração das respostas de IA. O volume de requisições depende dos limites definidos pelo plano da API utilizada.

Em um cenário de produção, seria necessário considerar limites de uso, monitoramento, custos e estratégias de controle de requisições.

O papel restrito da IA — explicar, contextualizar e recomendar — é uma decisão de design do produto, e não uma limitação técnica.

---

## ⚠️ Limitações

O FiscalLens é um protótipo demonstrativo desenvolvido com dados controlados e fictícios.

As validações implementadas representam regras objetivas definidas para o projeto e não substituem a análise de um profissional tributário.

A IA também possui papel limitado à explicação, contextualização e recomendação a partir das inconsistências previamente identificadas pelo sistema.

---

## 🛠️ Tecnologias

### Frontend

* **React** — biblioteca de UI
* **Vite** — build tool e dev server
* **JavaScript** — linguagem
* **CSS Modules** — estilização com escopo local
* **React Router DOM** — roteamento
* **Lucide React** — ícones

### Backend

* **Node.js** — runtime
* **Express** — framework HTTP
* **PostgreSQL** — banco de dados relacional
* **Gemini API** — inteligência artificial

### Deploy

* **Vercel** — frontend
* **Render** — backend

---

## 🏗️ Arquitetura

```text
┌─────────────────────┐
│   Frontend (React)  │
│   Vite + CSS Modules│
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│   API (Node/Express)│
│   Rotas REST        │
└──────────┬──────────┘
           │
     ┌─────┴─────┐
     ▼           ▼
┌─────────┐  ┌────────────┐
│PostgreSQL│  │ Gemini API │
└─────────┘  └────────────┘
```

A comunicação com o banco de dados e com a API de inteligência artificial é realizada exclusivamente pelo backend.

As credenciais e chaves de acesso são mantidas no ambiente do servidor e não são expostas no frontend.
