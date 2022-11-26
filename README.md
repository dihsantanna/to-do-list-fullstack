# :heavy_check_mark: to do list fullStack

O projeto consiste em um pequeno site, construido com Vue.js, e um backend, construido em node com dados persistentes em banco de dados não relacional. Trata-se de uma "lista de tarefas", com sitema de registro e login.

Era só para ser um simples todo list, mas acabei usando para exercitar meus conhecimentos de backend, ainda utilizando alguns princípios de SOLID e POO na construção de apis com node js.

---

Você pode conferir o deploy da aplicação acessando [https://to-do-list-dihsantanna.vercel.app/](https://to-do-list-dihsantanna.vercel.app/);

*** Você pode se cadastrar com qualquer email no formato `email@email.com`, eu não coloquei confirmação de email para facilitar o teste manual, pois a aplicação é somente demonstrativa.

---

![demonstração da pagina](./demonstracao.gif)

## Back-End 🧱

<details>
  <summary>
    <strong>Tecnologias utilizadas 💻 </strong>
  </summary>
  <br/>

- **`Node + ExpressJs + Typescript`** para implementação da api, pensando na organização de modo a implementar a arquitetura **`MSC`**, também escolhi o *`TypeScript`* pois é bem útil na implementação de **`POO`**;
- **`Prisma ORM`** para implementar de forma mais prática os Models, Queries e Associações, trazendo mais facilidade e versatilidade na hora de fazer as requisições para o banco de Dados **`MongoDB`**;
- Alguns dos conceitos de **`SOLID`**, como `Single Responsiblity Principle`, `Open-Closed Principle` e `Dependency Inversion Principle`;
- **`Decorators/di`** para facilitar a implementação do principio **`Dependency Inversion Principle`** de  SOLID;
- **`ESLint`** para manter um código mais limpo e padronizado;
- **`Vitest`** para realização de testes unitários de algumas das Classes da aplicação.

</details>

<details>
  <summary>
    <strong>Rotas ✈️</strong>
  </summary>
  <br/>
  <details>
    <summary>
      <strong>Users</strong>
    </summary>
  <br/>

  #### POST `/users/register` -> Cadastro de novos usuários:


  Body a ser enviado:
  ```ts
    {
      name: string,
      email: string,
      password: string
    }
  ```
  Resposta:
  ```json
    {
      "_id": "65ddbb71-a3d8-447c-9e1d-f52a10e72963",
      "email": "john@email.com",
      "name": "John Doe",
      "createdAt": "2022-11-18T23:42:02.266+00:00",
      "updatedAt": null
    }
  ```

  #### POST `/users/sing-in` -> login de usuários:
  Body a ser enviado:
  ```ts
    {
      email: string,
      password: string
    }
  ```
  Resposta:
  ```json
    {
      "_id": "65ddbb71-a3d8-447c-9e1d-f52a10e72963",
      "email": "john@email.com",
      "name": "John Doe",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWRkYmI3MS1hM2Q4LTQ0N2MtOWUxZC1mNTJhMTBlNzI5NjMiLCJlbWFpbCI6ImpvaG5AZW1haWwuY29tIiwiaWF0IjoxNjY5NDEwMzg3LCJleHAiOjE2Njk0OTY3ODd9.rQZ_Lk7cs6gWd7deyK5V3izT1Hc-vBHDCufhdfjLNvg"
    }
  ```

  #### GET `/users/validate` -> validação de token inserido no Header Authorization:

  *** Retorna os dados do usuário e um token atualizado.
  <br/>

  Resposta:
  ```json
    {
      "_id": "65ddbb71-a3d8-447c-9e1d-f52a10e72963",
      "email": "john@email.com",
      "name": "John Doe",
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NWRkYmI3MS1hM2Q4LTQ0N2MtOWUxZC1mNTJhMTBlNzI5NjMiLCJlbWFpbCI6ImpvaG5AZW1haWwuY29tIiwiaWF0IjoxNjY5NDEwMzg3LCJleHAiOjE2Njk0OTY3ODd9.rQZ_Lk7cs6gWd7deyK5V3izT1Hc-vBHDCufhdfjLNvg"
    }
  ```

  </details>
  <details>
    <summary>
      <strong>Todos</strong>
    </summary>
  <br/>

  *** ATENÇÃO: `TODAS` as requisições da rota /todos precisam que o token seja enviado pelo Header `Authorization`.

  #### POST `/todos` -> cria uma nova tarefa:

  Body a ser enviado:
  ```ts
    {
      title: string,
    }
  ```
  Resposta:
  ```json
    {
      "_id": "f4253cca-b394-48cc-8571-f4d972995542",
      "title": "Fazer a documentação",
      "userId": "65ddbb71-a3d8-447c-9e1d-f52a10e72963",
      "completed": false,
      "createdAt": "2022-11-18T23:42:02.287+00:00",
      "updatedAt": null
    }
  ```

  #### GET `/todos` -> retorna todas as tarefas do usuário selecionado:
  Resposta:
  ```json
    [
      {
        "_id": "fa099616-f83b-4f11-9f78-4c7dabd7c8e6",
        "title": "fazer o deploy do backend",
        "userId": "5c9cb03e-da97-42a2-ac88-3ced5697f6d0",
        "completed": true,
        "createdAt": "2022-11-25T04:46:45.476+00:00",
        "updatedAt": "2022-11-25T17:04:16.210+00:00"
      },
      {
        "_id": "9d8a992e-9ba3-4f8f-ba6d-3c25cbf659dd",
        "title": "fazer o deploy do frontend",
        "userId": "5c9cb03e-da97-42a2-ac88-3ced5697f6d0",
        "completed": true,
        "createdAt": "2022-11-25T06:08:21.093+00:00",
        "updatedAt": "2022-11-25T06:08:50.075+00:00"
      }
    ]
  ```

  #### PATCH `/todos/title/:id` -> edita titulo da tarefa cujo o id foi passado:

  Body a ser enviado:
  ```ts
    {
      title: string,
    }
  ```

  Resposta:
  ```json
    {
      "_id": "f4253cca-b394-48cc-8571-f4d972995542",
      "title": "Criar documentação",
      "userId": "65ddbb71-a3d8-447c-9e1d-f52a10e72963",
      "completed": false,
      "createdAt": "2022-11-18T23:42:02.287+00:00",
      "updatedAt": "2022-11-25T06:08:50.075+00:00"
    }
  ```

  #### PATCH `/todos/progress/:id` -> edita o progresso da tarefa cujo o id foi passado:

  Body a ser enviado:
  ```ts
    {
      completed: boolean,
    }
  ```

  Resposta:
  ```json
    {
      "_id": "f4253cca-b394-48cc-8571-f4d972995542",
      "title": "Criar documentação",
      "userId": "65ddbb71-a3d8-447c-9e1d-f52a10e72963",
      "completed": true,
      "createdAt": "2022-11-18T23:42:02.287+00:00",
      "updatedAt": "2022-11-25T06:08:50.075+00:00"
    }
  ```

  #### DELETE `/todos/:id` -> delete a tarefa cujo o id foi passado:

  Body a ser enviado:
  ```ts
    {
      completed: boolean,
    }
  ```

  Resposta:
  ```json
    {
      "_id": "f4253cca-b394-48cc-8571-f4d972995542",
      "title": "Criar documentação",
      "userId": "65ddbb71-a3d8-447c-9e1d-f52a10e72963",
      "completed": true,
      "createdAt": "2022-11-18T23:42:02.287+00:00",
      "updatedAt": "2022-11-25T06:08:50.075+00:00"
    }
  ```

  </details>

</details>

## Front-End 🏕️

<details>
  <summary>
    <strong>Tecnologias utilizadas 💻</strong>
  </summary>
  <br/>

- **`VueJS + VueX`** para manipulação e estruturação da pagina, e também a manipulação de estados;
- **`TypeScript`** como linguagem base da aplicação, para poder ter uma maior tipagem;
- **`TailwindCSS`** para uma estilização mais produtiva.
- **`Axios`** para realizar as requisições de forma mais simples e intuitiva;
- **`Vite`** para uma maior rapidez e performance no ambiente de desenvolvimento.

</details>

___

## Variáveis de ambiente :open_file_folder:

Tanto nos caminho `./app/backend`, quanto no caminho `./app/frontend`, existe um arquivo chamado `.env.example` que deve ser renomeado para `.env` e preenchido de acordo com os exemplos encontrados nos mesmos. Sem o preenchimento com as informações, não será possível rodar a aplicação.

Backend
```
PORT=3001 -> Porta que a api irá rodar. Sugiro que a mantenha.
DATABASE_URL=mongodb://USERNAME:PASSWORD@HOST:PORT/DATABASE -> coloque aqui a url de seu mongodb seguido do nome do banco de dados a ser utilizado.
JWT_SECRET=umasenhamuitodificil -> Uma senha necessária para gerar o token de verificação, responsável pela autenticação do usuário.
```

Frontend
```
VITE_API_URL=http://localhost:3001 -> Url da api se você segui a sugestão de manter o numero da porta 3001, pode manter essa mesma url.
```

___

# Instalando aplicação :rocket:
- Faça o clone do repositório:
    ```bash
      git clone git@github.com:dihsantanna/to-do-list-fullstack.git
    ```
- Entre na pasta `to-do-list-fullstack`:
    ```bash
      cd to-do-list-fullstack
    ```
- Execute o comando abaixo para fazer a instalação de dependencias:

    npm:
    ```bash
    npm run install:npm
    ```

    yarn:
    ```bash
    yarn install:yarn
    ```

- Para rodar o backend execute:

    npm:
    ```bash
    npm run backend:npm
    ```

    yarn:
    ```bash
    yarn backend:yarn
    ```

- Para rodar o frontend execute:

    npm:
    ```bash
    npm run frontend:npm
    ```

    yarn:
    ```bash
    yarn frontend:yarn
    ```

PRONTO! Agora basta abrir o navegador e acessar [http://localhost:5173/](http://localhost:5173/) e utilzar a aplicação.

Caso queira ver somente o funcionamento da api é so acessar [http://localhost:3001](http://localhost:3001) com o cliente http de sua preferência.

___

# Aprendizados

Mas uma vez o **Vue js** surpreende com sua simplicidade e performance, dessa vez pude desenvolver consolidar ainda mais meus conhecimentos e testar novos aprendizados como o de `Composables`. Pude ainda enriquecer meus conhecimentos no `Vue Router` na implementações de rotas controladas por autenticação de usuário, redirecionamento de rotas e fortalecer a base de conhecimentos do `Vuex` assim como aprender melhor como funciona seus métodos. :smile:
