# Mytos — Coleção de Criaturas Mitológicas

## 1. Sobre o projeto

O Mytos é uma aplicação web desenvolvida com o objetivo de criar uma coleção de criaturas mitológicas. A ideia do projeto é permitir que o usuário conheça diferentes criaturas, visualize suas características e organize sua própria coleção.

O sistema foi desenvolvido como parte de um trabalho acadêmico, utilizando os conhecimentos adquiridos durante as aulas e colocando em prática conceitos de desenvolvimento web.

O projeto permite cadastrar novas criaturas, visualizar suas informações, editar os dados, remover criaturas e interagir com elas por meio de algumas funcionalidades.

Além disso, a aplicação possui uma interface com tema de fantasia, utilizando cores, imagens e elementos visuais relacionados à mitologia.

## 2. Objetivos

O principal objetivo do Mytos é desenvolver uma aplicação web interativa, colocando em prática os conceitos de programação e desenvolvimento de interfaces.

Com o projeto, buscamos trabalhar com:

- Componentização no React;
- Manipulação de dados;
- Formulários para cadastro e edição;
- Eventos e interações com o usuário;
- Filtros e pesquisa;
- Armazenamento de informações no navegador;
- Organização dos componentes e arquivos;
- Criação de uma interface responsiva.

## 3. Funcionalidades

O Mytos possui as seguintes funcionalidades:

### Cadastro de criaturas

O usuário pode cadastrar novas criaturas, informando dados como nome, espécie, descrição, origem, energia, personalidade, raridade, características e poderes especiais.

Também é possível selecionar uma imagem do computador para representar a criatura.

### Listagem e detalhes

As criaturas cadastradas aparecem em cartões na interface principal.

Ao selecionar a opção de detalhes, o usuário pode consultar mais informações sobre a criatura escolhida.

### Edição e remoção

O sistema permite editar as informações das criaturas já cadastradas e remover aquelas que não deseja mais manter no sistema.

### Pesquisa e filtros

A aplicação possui uma ferramenta de pesquisa para facilitar a localização das criaturas.

Também é possível filtrar a coleção por espécie e raridade, além de consultar as criaturas favoritas.

As espécies cadastradas pelos usuários também podem ser utilizadas na pesquisa, permitindo que o sistema seja ampliado com novas criaturas.

### Favoritos

O usuário pode marcar suas criaturas favoritas e consultar quais foram selecionadas.

Também é possível retirar uma criatura da lista de favoritos.

### Cuidados com as criaturas

O sistema possui interações de cuidado, permitindo alimentar, brincar e descansar as criaturas.

Essas ações alteram o nível de energia, respeitando o limite de 0 a 100.

### Coleção de criaturas

O usuário pode adicionar criaturas à sua coleção e remover criaturas da coleção sem precisar excluir seus dados do sistema.

Essa funcionalidade foi adaptada ao tema do Mytos, que tem como proposta colecionar criaturas mitológicas.

### Armazenamento de dados

O projeto utiliza o `localStorage` para manter os dados salvos no navegador.

Dessa forma, as informações podem continuar disponíveis quando a página for recarregada no mesmo navegador, desde que os dados armazenados não sejam apagados.

## 4. Tecnologias utilizadas

As principais tecnologias utilizadas no desenvolvimento foram:

- **React:** utilizado para construir a interface e organizar a aplicação em componentes.
- **JavaScript:** utilizado para implementar as funcionalidades e manipular os dados.
- **HTML:** utilizado na estruturação dos elementos da interface por meio do JSX.
- **CSS:** utilizado para estilizar a aplicação e adaptar a interface a diferentes tamanhos de tela.
- **Vite:** utilizado para criar e executar o ambiente de desenvolvimento.
- **localStorage:** utilizado para armazenar os dados no navegador.

## 5. Organização do projeto

O projeto está organizado em arquivos e componentes, facilitando a manutenção e a alteração das funcionalidades.

Entre os principais arquivos e pastas estão:

- `src/App.jsx`: contém a estrutura principal da aplicação e organiza as funcionalidades.
- `src/App.css`: contém os estilos utilizados na interface.
- `src/criaturas.js`: contém os dados das criaturas iniciais.
- `src/components/CartaoCriatura.jsx`: responsável pela apresentação das criaturas em cartões.
- `src/components/FormularioCriatura.jsx`: responsável pelo formulário de cadastro e edição.
- `public/imagens/`: pasta destinada às imagens utilizadas no projeto.

A estrutura pode conter outros arquivos e componentes utilizados para organizar as funcionalidades da aplicação.

## 6. Como executar o projeto

Para executar o Mytos no computador, é necessário ter o Node.js instalado.

### Passo 1 — Baixar o projeto

Baixe ou clone o repositório do projeto e abra sua pasta no Visual Studio Code.

### Passo 2 — Instalar as dependências

Abra o terminal na pasta do projeto e execute:

```bash
npm install
```

### Passo 3 — Executar a aplicação

Depois da instalação, execute:

```bash
npm run dev
```

O Vite mostrará no terminal o endereço local para acessar a aplicação pelo navegador.

### Passo 4 — Gerar a versão de produção

Para verificar a compilação do projeto, execute:

```bash
npm run build
```

Se a compilação for concluída sem erros, será gerada a pasta `dist` com os arquivos da versão de produção.

## 7. Armazenamento das informações

O Mytos utiliza o `localStorage` do navegador para guardar as informações das criaturas.

Isso permite que os dados permaneçam salvos após recarregar a página.

Entretanto, os dados ficam armazenados localmente no navegador utilizado. Portanto, as informações não são automaticamente compartilhadas entre computadores ou navegadores diferentes.

## 8. Desenvolvimento e utilização de inteligência artificial

Durante o desenvolvimento do Mytos, foi utilizada inteligência artificial como ferramenta de apoio.

A IA auxiliou na compreensão de códigos, na identificação de possíveis erros, na organização de algumas funcionalidades e na elaboração de sugestões para melhorar a interface.

As sugestões foram utilizadas como apoio ao desenvolvimento, sendo necessário analisar os códigos e verificar se as alterações atendiam às necessidades do projeto.

O desenvolvimento também envolveu a realização de ajustes e testes para verificar o funcionamento das funcionalidades implementadas.

A utilização da IA não substituiu a necessidade de compreender o código, testar as alterações e acompanhar o desenvolvimento da aplicação.

## 9. Considerações finais

O desenvolvimento do Mytos foi uma oportunidade de colocar em prática os conhecimentos de desenvolvimento web, principalmente na utilização do React, JavaScript e CSS.

Durante a criação do projeto, foi possível trabalhar com componentes, formulários, estados, eventos, filtros e armazenamento de dados no navegador.

A proposta de trabalhar com criaturas mitológicas permitiu desenvolver uma aplicação com uma identidade visual própria, além de incluir funcionalidades interativas para tornar a experiência do usuário mais interessante.

O projeto também contribuiu para compreender melhor a importância da organização do código, da realização de testes e da correção de erros durante o desenvolvimento.

O Mytos continuará recebendo melhorias, com o objetivo de aprimorar suas funcionalidades, corrigir possíveis problemas e tornar a interface cada vez mais organizada e fácil de utilizar. Novas ideias poderão ser implementadas conforme o andamento do projeto e as necessidades identificadas.

Como resultado, o Mytos reúne funcionalidades de cadastro, organização e interação com criaturas mitológicas em uma aplicação web que continuará evoluindo ao longo do seu desenvolvimento.