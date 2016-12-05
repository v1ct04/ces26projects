# Projetos CES-26

Neste repositório estão armazenados todos os exercícios resolvidos durante e para a matéria de `CES-26` de Desenvolvimento Web do **ITA**, cursada no segundo semestre do ano de 2016, quando foi ministrada pelo Prof. Edgar Yano.

Partindo de implementações mais básicas possíveis de servidores web progressivamente mais complexas, adquiriu-se experiência com diversas tecnologias atuais de desenvolvimento web, com foco principal em [Node.js](https://nodejs.org/), [Express](http://expressjs.com/) e [Angular.JS](https://angularjs.org/) 1 e 2.

Cada uma das aulas tinha foco no treinamento em alguma técnica específica de desenvolvimento web, e cada um dos exercícios resolvidos estão em uma pasta diferente na base desse repositório. Mesmo caso as aulas fossem iterativas, fez-se uma cópia das pastas separada, para versionamento isolado de cada um dos exercícios resolvidos.

Segue uma breve descrição de cada uma das tarefas propostas durante o curso e dos códigos desenvolvidos:

- [**aula2**](https://github.com/v1ct04/ces26projects/tree/master/aula2): Implementação básica de um código em JavaScript simples para ser executado no browser, necessariamente fazendo mudanças no DOM (sem utilização de [jQuery](https://jquery.com/)). Incluso diretamente num .html podendo ser servido por qualquer servidor HTTP simples.
- [**aula3**](https://github.com/v1ct04/ces26projects/tree/master/aula3): Incremento sobre a tarefa anterior, criando-se agora um servidor em Node.js para fornecimento de *endpoints* para requisições GET e POST. Inclui também processamento de cookies utilizando o módulo [cookie-parser](https://github.com/expressjs/cookie-parser).
- [**aula4**](https://github.com/v1ct04/ces26projects/tree/master/aula4): Incrementação das tarefas anteriores, explorando agora a biblioteca jQuery para fazer animações e requisições AJAX.
- [**aula5**](https://github.com/v1ct04/ces26projects/tree/master/aula5): Iniciação em Angular 1 através da implementação de uma aplicação simples com métodos simples de detecção de palíndromes e demonstração de uma lista de palíndromes encontrados gerada automaticamente pelo Angular.
- [**aula6**](https://github.com/v1ct04/ces26projects/tree/master/aula6): Iniciação em Angular 2 através do desenvolvimento de uma aplicação simples de Hello World (seguindo o [Quickstart](https://angular.io/docs/ts/latest/quickstart.html) oficial).
- [**aula7**](https://github.com/v1ct04/ces26projects/tree/master/aula7): Aprofundamento em Angular 2 através do início do desenvolvimento do tutorial [Tour of Heroes](https://angular.io/docs/ts/latest/tutorial/) do Angular 2.
- [**aula8**](https://github.com/v1ct04/ces26projects/tree/master/aula8): Continuação do tutorial [Tour of Heroes](https://angular.io/docs/ts/latest/tutorial/) do Angular 2.
- [**aula9**](https://github.com/v1ct04/ces26projects/tree/master/aula9): Finalização do tutorial [Tour of Heroes](https://angular.io/docs/ts/latest/tutorial/) do Angular 2.
- [**heroes-server**](https://github.com/v1ct04/ces26projects/tree/master/heroes-server): Extensão do código desenvolvido para a aplicação Tour of Heroes através da criação de um servidor remoto propriamente dito (em Node) para servir as requisições HTTP no lugar de usar um banco de dados falso em memória.

Essa aplicação final desenvolvida na Aula 9, constituída da aplicação Angular 2 e do servidor Node.js servidor de dados, estão implantadas e disponíveis a acesso no endereço:  http://ces26.v1ct04.com/

### Heroes Server

Vale entrar em detalhes ainda no método de *deployment* do servidor *heroes-server*, visto que o mesmo foi desenvolvido como uma aplicação separada do servidor Angular 2, mas configurado de forma a estar sob o mesmo domínio, evitando-se requests Cross-Origin que gerariam problemas adicionais.

Para isso, utilizou-se a aplicação [nginx](https://www.nginx.com/resources/wiki/) para configuração de um único servidor HTTP na máquina, que foi configurado de modo a rotear requisições no caminho `/app/heroes` (caminho base da API) para o servidor Node.js e quaisquer outras para o servidor Angular 2, ambos sendo executados na mesma máquina onde o nginx se encontra, em processos separados.
