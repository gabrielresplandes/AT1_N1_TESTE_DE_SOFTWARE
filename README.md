# Projeto de Automação Web com Cypress

Este projeto contém testes automatizados para a aplicação web [Sauce Demo](https://www.saucedemo.com/v1/), desenvolvidos com Cypress.io.

## Informações do Aluno e Professor

* **Aluno:** Gabriel Morais Resplandes Sirqueira
* **Matrícula:** UC23102715
* **Professor:** Oscar Galdino

## Objetivo

Avaliar a capacidade de automatizar casos de uso em sites reais utilizando Cypress, aplicando boas práticas de desenvolvimento de testes e documentação.

## Aplicação Testada

* **URL:** `https://www.saucedemo.com/v1/`

---

## Casos de Teste Escritos em BDD

A abordagem BDD (Behavior-Driven Development) foca no comportamento observável, facilitando a comunicação entre as equipes de desenvolvimento e de negócio. Os cenários de teste foram elaborados seguindo essa metodologia.

### 1. Login e Logout

* **Cenário: Login bem-sucedido**
    * **Dado** que estou na página de login da Sauce Demo.
    * **Quando** eu insiro um usuário válido (`standard_user`) e uma senha válida (`secret_sauce`).
    * **E** clico no botão "LOGIN".
    * **Então** devo ser redirecionado para a página de produtos.
    * **E** devo ver o título "Products" na página.

* **Cenário: Tentativa de login com credenciais incorretas**
    * **Dado** que estou na página de login da Sauce Demo.
    * **Quando** eu insiro um usuário inválido e/ou uma senha inválida.
    * **E** clico no botão "LOGIN".
    * **Então** devo ver uma mensagem de erro indicando que as credenciais não correspondem.

* **Cenário: Logout bem-sucedido**
    * **Dado** que eu estou logado na aplicação Sauce Demo.
    * **Quando** eu clico no ícone do menu lateral.
    * **E** clico na opção "Logout".
    * **Então** devo ser redirecionado de volta para a página de login.

### 2. Produtos

* **Cenário: Visualização da lista de produtos após login**
    * **Dado** que eu estou logado na aplicação e na página de produtos.
    * **Quando** a página é carregada.
    * **Então** devo ver uma lista de produtos exibida.
    * **E** o título da página deve ser "Products".

* **Cenário: Visualização dos detalhes de um produto**
    * **Dado** que eu estou na página de produtos.
    * **Quando** eu clico no nome de um produto na lista.
    * **Então** devo ser redirecionado para a página de detalhes desse produto.
    * **E** devo ver o nome, descrição e preço do produto detalhados.

* **Cenário: Ordenar produtos por nome (A a Z)**
    * **Dado** que eu estou na página de produtos.
    * **Quando** eu seleciono a opção "Name (A to Z)" no filtro de ordenação.
    * **Então** os produtos devem ser exibidos em ordem alfabética crescente pelo nome.

* **Cenário: Ordenar produtos por nome (Z a A)**
    * **Dado** que eu estou na página de produtos.
    * **Quando** eu seleciono a opção "Name (Z to A)" no filtro de ordenação.
    * **Então** os produtos devem ser exibidos em ordem alfabética decrescente pelo nome.

* **Cenário: Ordenar produtos por preço (menor para maior)**
    * **Dado** que eu estou na página de produtos.
    * **Quando** eu seleciono a opção "Price (low to high)" no filtro de ordenação.
    * **Então** os produtos devem ser exibidos em ordem crescente pelo preço.

* **Cenário: Ordenar produtos por preço (maior para menor)**
    * **Dado** que eu estou na página de produtos.
    * **Quando** eu seleciono a opção "Price (high to low)" no filtro de ordenação.
    * **Então** os produtos devem ser exibidos em ordem decrescente pelo preço.

### 3. Carrinho

* **Cenário: Adicionar produtos ao carrinho**
    * **Dado** que eu estou na página de produtos.
    * **Quando** eu clico no botão "Add to cart" para um ou mais produtos.
    * **Então** o contador do carrinho de compras deve ser atualizado.

* **Cenário: Remover produtos do carrinho**
    * **Dado** que eu adicionei produtos ao carrinho.
    * **Quando** eu navego para a página do carrinho.
    * **E** clico no botão "Remove" de um produto.
    * **Então** o produto deve ser removido da lista do carrinho.
    * **E** o contador do carrinho deve ser atualizado ou desaparecer se não houver mais itens.

* **Cenário: Validar itens adicionados no carrinho**
    * **Dado** que eu adicionei um ou mais produtos ao carrinho.
    * **Quando** eu navego para a página do carrinho.
    * **Então** devo ver os produtos que adicionei listados corretamente no carrinho.

### 4. Checkout

* **Cenário: Iniciar checkout e preencher dados obrigatórios**
    * **Dado** que eu adicionei produtos ao carrinho e estou na página do carrinho.
    * **Quando** eu clico no botão "CHECKOUT".
    * **E** preencho os campos obrigatórios (First Name, Last Name, Zip/Postal Code).
    * **E** clico no botão "CONTINUE".
    * **Então** devo ser redirecionado para a página de resumo da compra (Checkout: Overview).

* **Cenário: Validar resumo da compra**
    * **Dado** que eu adicionei produtos ao carrinho e preenchi meus dados no checkout.
    * **Quando** eu estou na página de resumo da compra (Checkout: Overview).
    * **Então** devo ver o resumo dos itens da compra, o subtotal, impostos e o valor total.

* **Cenário: Finalizar compra e validar mensagem de sucesso**
    * **Dado** que eu estou na página de resumo da compra (Checkout: Overview).
    * **Quando** eu clico no botão "FINISH".
    * **Então** devo ser redirecionado para a página de confirmação da compra.
    * **E** devo ver uma mensagem de sucesso, como "THANK YOU FOR YOUR ORDER".

---

## Scripts de Testes Automatizados Organizados por Funcionalidade

Os scripts de testes automatizados foram organizados em arquivos separados, seguindo as funcionalidades principais da aplicação. Essa organização facilita a manutenção, a leitura e a execução de conjuntos específicos de testes, aderindo às boas práticas de automação.

A estrutura de pastas e arquivos do projeto é a seguinte:

Aqui está a parte da estrutura de pastas em formato de texto, organizada da melhor forma possível:

```
automacao_saucedemo/
├── cypress.config.js       # Arquivo de configuração principal do Cypress.
├── package.json            # Contém as informações do projeto e as dependências.
├── package-lock.json       # Garante a consistência das versões das dependências instaladas.
└── cypress/                # Pasta raiz para todos os arquivos de automação do Cypress.
    ├── downloads/          # (Opcional) Armazena arquivos baixados durante os testes.
    ├── integration/        # Pasta que contém os arquivos de teste (specs) propriamente ditos.
    │   ├── cart.spec.js        # Contém os testes automatizados para a funcionalidade do Carrinho.
    │   ├── checkout.spec.js    # Contém os testes automatizados para a funcionalidade de Checkout.
    │   ├── login_logout.spec.js# Contém os testes automatizados para as funcionalidades de Login e Logout.
    │   └── products.spec.js    # Contém os testes automatizados para a funcionalidade de Produtos.
    ├── screenshots/        # (Opcional) Armazena as capturas de tela tiradas durante a execução dos testes, especialmente em caso de falhas.
    └── support/            # Pasta para arquivos de suporte globais.
        ├── commands.js         # Define comandos personalizados do Cypress que podem ser reutilizados em vários testes (ex: um comando de login).
        └── e2e.js              # Ponto de entrada para carregar arquivos de suporte e garantir que os comandos personalizados estejam disponíveis para todos os testes.
```

---

## Como Executar os Testes

Para executar os testes, siga os passos abaixo:

1.  **Pré-requisitos:** Certifique-se de ter Node.js e npm (ou Yarn) instalados.
2.  **Instalar Dependências:** Navegue até a raiz do projeto no terminal e instale as dependências:
    ```bash
    npm install
    # ou
    yarn install
    ```
3.  **Executar Testes em Modo Interativo (Visual):**
    Para abrir a interface do Cypress e executar os testes visualmente:
    ```bash
    npx cypress open
    ```
    Na interface do Cypress, selecione "E2E Testing" e clique no arquivo de teste (`.spec.js`) que deseja executar.
4.  **Executar Testes via Terminal:**
    Para executar todos os testes em um navegador sem interface gráfica:
    ```bash
    npx cypress run
    ```
    Para executar um arquivo de teste específico:
    ```bash
    npx cypress run --spec "cypress/integration/login_logout.spec.js"
    ```
````
