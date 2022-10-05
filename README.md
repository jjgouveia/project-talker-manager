# Projeto - Talker Manager

## 🔨 Desenvolvimento

A proposta deste projeto era a de construir uma aplicação de cadastro de talkers (palestrantes) em que fosse possível cadastrar, visualizar, pesquisar, editar e excluir informações. Para isso eu deveria:

* Desenvolver uma API de um CRUD (Create, Read, Update e Delete) de palestrantes (talkers) e;
* Desenvolver alguns endpoints que irão ler e escrever em um arquivo utilizando o módulo fs.

## 💻 Tecnologias utilizadas

* JavaScript
* NodeJS
* Express
* Fé 🤣


## Lissões aprendidas

* Ler e escrever arquivos localmente com NodeJs;
* Escrever os próprios scripts que criam e consomem <em>Promises</em>;
* Realizar chamadas de funções de forma consciente;
* Entender a estrutura e o funcionamente de uma aplicação <em>Express</em> e como organizar o código;
* Criar rotas baseadas em <em>CRUD</em> e aplicar middlewares;
* Escrever API's utilizando Node e Express;

## 🛠 Instalação local

Clone o projeto:

```bash
  git clone git@github.com:jjgouveia/project-talker-manager.git
```

Vá até a pasta do projeto:

```bash
  cd project-talker-manager
```

Instale as dependências:

```bash
  npm install
```

Inicie a aplicação:

```bash
  npm start
  ou
  npm run dev
```

## 🛠 Instalação no Docker
Após clonar o repositório e acessar a pasta do projeto, execute o serviço <code>node</code> com o comando <code>docker-compose up -d</code>.

Esse serviço irá inicializar um container chamado <code>talker_manager</code>.
A partir daqui você pode rodar o container via CLI ou abri-lo no VS Code.
Use o comando docker <code>exec -it talker_manager bash</code>.

Ele te dará acesso ao terminal interativo do container criado pelo compose, que está rodando em segundo plano.
Instale as dependências com o comando <code>npm install</code>.

Execute a aplicação com <code>npm start</code> ou <code>npm run dev</code>.
