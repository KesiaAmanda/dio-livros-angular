# Digital Innovation One
## Técnicas avançadas em Angular 8

O projeto consiste em sistema de livros, com a possibilidade de cadastros, edições, listagem e visualização dos filmes. Utilizando o JSON DB para simular chamadas REST.

## Instalação

1. clone o repositório `git clone git@github.com:KesiaAmanda/dio-livros-angular`
2. Entre no projeto e instale as dependencias `npm install`


## Ambiente Local

Execute `ng serve` para que o projeto suba localmente. Acesse a url `http://localhost:4200/`. O projeto já está com reload automático conforme as alterações que você realizar no código.

## Simulando o Back-end

Execute `npm install -g json-server` para instalar globalmente o servidor json. Após a instalação entre na pasta do projeto e execute `json-server --watch db.json`, com isso um servidor será inicializado na url `http://localhost:3000/`, após a inicialização sera possível realizar requisições http.