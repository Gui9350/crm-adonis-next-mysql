# CRM - Sistema de Gerenciamento de Relacionamento com o Cliente

Este é um projeto de demonstração de um Sistema de Gerenciamento de Relacionamento com o Cliente (CRM). O objetivo é apresentar a estrutura de dados de um CRM de forma clara e organizada, utilizando dados de clientes, funcionários, produtos, vendas e outras entidades importantes para o gerenciamento do relacionamento.

## Estrutura de Dados

O projeto é composto por nove entidades principais, organizadas de forma relacional. A seguir, a estrutura de cada entidade é apresentada em tabelas Markdown para facilitar a visualização e compreensão.

### 1. Clientes
<img width="453" height="549" alt="image" src="https://github.com/user-attachments/assets/a54c89eb-a272-4df3-bb30-de51e18683b3" />

A tabela de clientes armazena informações detalhadas sobre os indivíduos ou empresas que interagem com o negócio.

| id | nome | sobrenome | email | telefone | endereco | cidade | estado | cep | pais | segmento | valorvidacliente |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Fulano | da Silva | fulanolocal@gmail.com | 123456789 | Rua Exemplo, 123 | Cidade Exemplo | Estado Exemplo | 12345-678 | Pais Exemplo | Varejo | 1000.00 |
| 2 | Fulano2 | da Guerra | fulanoGuerra@gmail.com | 1234567898 | Rua Exemplo, 124 | Cidade Exemplo4 | Estado Exemplo3 | 12345-670 | País Exemplo2 | Alimentação | 2000.00 |

### 2. Funcionários
<img width="383" height="337" alt="image" src="https://github.com/user-attachments/assets/d13b79e2-cb77-44ec-908e-1b504fa716cd" />


A tabela de funcionários registra os colaboradores que fazem parte da equipe, incluindo seus cargos e informações de contato.

| id | nome | sobrenome | email | cargo |
| :--- | :--- | :--- | :--- | :--- |
| 1 | João | da Silva | joaosilva@hotmail.com | Gerente |
| 2 | Maria | Oliveira | mariaoliveira@outlook.com | Analista |

### 3. Produtos
<img width="416" height="336" alt="image" src="https://github.com/user-attachments/assets/42f637b0-5879-4508-a2ab-f5c1227c6459" />

A tabela de produtos lista os itens disponíveis para venda, com detalhes como descrição, preço e categoria.

| id | nome | descricao | preco | categoria | ativo |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Notebook | Notebook 15 polegadas | 3500.00 | Eletrônicos | 1 |
| 2 | Mouse | Mouse sem fio | 120.00 | Acessórios | 1 |

### 4. Campanhas
<img width="431" height="420" alt="image" src="https://github.com/user-attachments/assets/91fd45f2-8efd-435a-98fe-609cee9b9603" />

A tabela de campanhas registra as iniciativas de marketing da empresa, com detalhes como tipo, orçamento e objetivo.

| id | nomeCampanha | tipoCampanha | dataInicio | dataFin | orcamento | objetivo | statusCampanha |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Campanha Verão | Desconto | null | null | 5000.00 | Aumentar vendas no verão | ativa |
| 2 | Campanha Inverno | Brinde | null | null | 5000.00 | Fidelizar clientes | inativa |

### 5. Clientes e Campanhas (`clientes_campanhas`)
<img width="419" height="546" alt="image" src="https://github.com/user-attachments/assets/7fa68ab0-23e4-4974-886b-d73bd64cec5c" />

Esta é uma tabela de junção (ou pivô) que relaciona clientes a campanhas, registrando a participação de cada cliente em uma campanha específica.

| id | clienteId | campanhaId | statusParticipacao | ativo | dataParticipacao |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 1 | 1 | ativo | null | 2025-08-11T07:49:06.000+00:00 |
| 2 | 2 | 2 | ativo | null | 2025-08-11T07:49:06.000+00:00 |

### 6. Interações
<img width="505" height="533" alt="image" src="https://github.com/user-attachments/assets/d3ea33ca-e916-49b9-8bd8-fcf8ccf81c2e" />

Esta tabela registra todas as interações entre a equipe e os clientes (e-mails, ligações, reuniões, etc.).

| id | clienteId | funcionarioId | tipoInteracao | assunto | detalhes | dataInteracao |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 1 | 1 | Telefone | Dúvida sobre produto | Cliente ligou perguntando sobre o notebook | 2025-08-11T10:48:16.000+00:00 |
| 2 | 2 | 2 | Email | Solicitação de orçamento | Cliente solicitou orçamento para compra em grande quantidade | 2025-08-11T10:48:16.000+00:00 |

### 7. Tickets de Suporte (`tickets_suportes`)
<img width="476" height="572" alt="image" src="https://github.com/user-attachments/assets/3b7b3588-7326-45dd-85b5-592b0d5b3d8a" />


Esta tabela gerencia os tickets de suporte abertos pelos clientes, rastreando o status, a prioridade e o responsável.

| id | clienteId | funcionarioId | assunto | descricao | dataFechamento | statusTicket |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 1 | 1 | Problema no pedido | Pedido não chegou no prazo | null | aberto |
| 2 | 2 | 2 | Produto com defeito | Notebook apresentou defeito | 2025-08-11T10:49:28.000+00:00 | fechado |

### 8. Vendas
<img width="613" height="522" alt="image" src="https://github.com/user-attachments/assets/f3b2ad9c-f4a7-4868-a933-a7d36473c81e" />


A entidade de vendas conecta clientes, funcionários e produtos. Cada venda possui um `clienteId` e um `funcionarioId` que se referenciam às tabelas correspondentes.

#### Tabela Principal de Vendas

| id | clienteId | funcionarioId | valorTotal | statusVenda | canalVenda | dataVenda |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | 1 | 1 | 3620.00 | concluida | Online | 2025-08-11T10:47:13.000+00:00 |
| 2 | 2 | 2 | 120.00 | pendente | Loja Física | 2025-08-11T10:47:13.000+00:00 |

#### Detalhes dos Itens de Venda (`itens_vendas`)
<img width="242" height="396" alt="image" src="https://github.com/user-attachments/assets/538caf85-6ac2-41bc-9f31-c41c2885efe6" />


Esta tabela de junção conecta uma venda com os produtos nela incluídos, armazenando a quantidade e o preço unitário.

| vendaId | produtoId | quantidade | precoUnitario |
| :--- | :--- | :--- | :--- |
| 1 | 1 | 1 | 3500.00 |
| 1 | 2 | 1 | 120.00 |
| 2 | 2 | 1 | 120.00 |

## Relacionamentos

* **Venda -> Cliente:** Uma venda está associada a um `clienteId`.
* **Venda -> Funcionário:** Uma venda é processada por um `funcionarioId`.
* **Venda <-> Itens de Venda <-> Produto:** A tabela `itens_vendas` conecta a tabela de `vendas` e a de `produtos`.
* **Clientes <-> Clientes e Campanhas <-> Campanhas:** A tabela `clientes_campanhas` conecta clientes a campanhas, formando um relacionamento de muitos-para-muitos.
* **Interação -> Cliente:** Cada interação está associada a um `clienteId`.
* **Interação -> Funcionário:** Cada interação é realizada por um `funcionarioId`.
* **Ticket de Suporte -> Cliente:** Cada ticket de suporte está associado a um `clienteId`.
* **Ticket de Suporte -> Funcionário:** Cada ticket de suporte é atribuído a um `funcionarioId`.

---
