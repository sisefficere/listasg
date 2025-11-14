# Definição

Projeto que visa expor anunciantes, como em uma moderna lista telefônica, desenvolvida pensando em dispositivos móveis mas adaptável a outros tamanhos de tela.

## Padrão de projeto

### Estrutura

- /prisma: esquemas/tabelas do BD e migrations do ORM Prisma.
- /public: arquivos estáticos e públicos (imagens, fontes, etc)
- /src:
    - /actions: actions que compõem as regras de negócio e consumo de dados do BD, normalmente acionados via formulário.
    - /app: rotas do sistema, páginas e estilos das páginas.
    - /lib: biblioteca local de códigos
        - /components: componentes organizados de acordo com o ATOMIC Design em pastas e com código em arquivos `index.jsx`.
        - /utils: código utilitário e singletons (`auth.js`, `prisma.js`, etc).

### Arquivos

- Componentes são organizados de acordo com o ATOMIC Design: pastas atoms, molecules, organisms, pages e templates (as duas últimas se necessário).
- Importar componentes e códigos locais por meio dos paths definidos no `jsconfig.json`: @utils, @components, @actions, @app ou @public.
- Dentro da pasta do componente o arquivo a ser criado é sempre com o nome `index.jsx`, deixa a importação mais legível. Exemplo: `/components/molecules/form-login/index.jsx`.
- Arquivos de componentes e páginas são no formato `jsx`.
- Arquivos de `actions` e JS puro serão sempre no formato `js`.

### Nomenclaturas

- Sempre em inglês.
- camelCase no nome de variáveis e funções.
- PascalCase no nome de componentes e páginas.
- SNAKE_CASE em caps lock para variáveis de ambientes e constantes.
- underline inicial para parâmetros não utilizados mas passados na função para possibilitar a passagem de outro parâmetro (exemplo: `function tal(_parametroNaoUtilizado, parametroUtilizado)`).


## Stack

- Infra: Vercel + NeonPostgres + Cloudinary (para imagens - https://next.cloudinary.dev)
- Back: Next.JS + Auth.JS + Prisma + Zod.
- Front: React + TailwindCSS + Tanstack UI + Shadcn UI
- Design: Figma

# Funcionalidades

## Conexão via BD

Utilizando a constante env `DATABASE_URL` é intercambiado entre BD local e remoto comentando o arquivo `.env`.
É configurado na Vercel um storage postgres com o Neon e depois o mesmo é conectado. Tudo é feito pela interface da Vercel que já adiciona as variáveis de ambiente prod necessárias para conexão com o BD remoto.

### BD Local

Utilizando um arquivo docker compose é subido um container postgres que torna mais seguro o desenvolvimento local.

Se necessário conectar outro BD:
1. acessa o BD remoto, realiza um `pg_dump`
2. acessa BD remoto e se houver alguma tabela `_prisma_migrations` exclua.
3. conectar o BD remoto
4. realizar um `npx prisma db pull`
5. conectar novamente o BD local
6. realizar um `npx prisma migrate reset` (dados estão a salvo no remoto)
7. realizar um `npx prisma migrate dev --name init` (cria a migration inicial)
8. conecta no BD remoto
9. realizar um `npx prisma migrate resolve --applied nome_arquivo_migration` (pois não há tabela `_prisma_migrations` no remoto).
10. realiza um `npx prisma migrate deploy` para aplicar as migrations pendentes
11. conecta o BD local
12. Realiza um `npx prisma generate`
13. Realiza um `pg_restore` (pega os dados do remoto)
14. sempre que realizada alteração no schema, repetir passos 8, 9, 11, 12 e 13

Fontes: [1](https://www.youtube.com/watch?v=BIfvmEhbtBE), [2](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/introspection-typescript-postgresql).

## Paginação

Funciona via query params utilizando offset (`take` e `skip`) para query no BD via prisma.

### Página inicial (`/app/page.jsx`)

- Pega o parâmetro `catPage` da URL por meio do `searchParams` e guarda na constante `currentCatPage`;
- define a quantidade de categorias por página e guarda na constante `catPerPage`
- lida com a paginação por meio da action `getCategoriasOffset()` (que retorna o total de categorias e um array com os dados das categorias) passando a página atual e a quantidade de categorias por página.

#### Componente `/organisms/categorias`

Renderiza as categorias passando o array com os dados, o total de categorias e a quantidade de itens por página ao componente `/molecules/paginacao`:
- componente do lado cliente: usa o hook `useSearchParams()` para pegar o parâmetro `catPage` da URL e instancia uma classe `URLSearchParams` para lidar com eles utilizam `has()` e `get()`.
- calcula o total de páginas e guarda na constante `totalPages` arredondando pra cima.
- inicializa a página: se houver página no parâmetro, a define, senão inicializa com 1.
- renderiza os links/botões com o componente nativo `Link` do Next que lida nativamente com a navegação e query params.

## Autenticação

Implementada com Auth.JS (antigo NextAuth). Utiliza `bcrypt` para realizar o salt e o hash das senhas, comparando a senha bruta com o hash armazenado no BD. O método de autenticação é por credenciais simples de e-mail e senha, estes armazenados na tabela `usuario` no BD.

Fontes: [1](https://authjs.dev/getting-started/authentication/credentials), [2](https://authjs.dev/reference/core/providers/credentials#credentialsconfigcredentialsinputs:~:text=Properties-,authorize(),-authorize%3A%20(credentials)

### `@utils/auth.js`

TODO

### `@utils/middleware.js`

TODO

### `@actions/check-credentials.js`

TODO

### Rotas

Rotas envolvidas na funcionalidade.

#### `/api/auth/[...nextauth]`

Utilizado internamente pela lib `auth`.

#### `/login`

Contém o formulário de login.

### Componentes

Componentes envolvidos na funcionalidade.

#### `@components/atoms/button-logout`

TODO

#### `@components/molecules/form-login`

TODO

### Validações


# Actions

## `getCategoriasOffset()`

Retorna os dados das categorias em array e também o total de categorias para ser utilizado no componente `/molecules/paginacao`:

- define a query com o as cláusulas corretas (nesse caso pegando categorias que possuam anunciantes diretos ou em subcategorias, ordenando por nome de forma crescente)
- armazena o total de categorias de acordo com as condições na constante `totalCategorias`.
- checa se não está na página inicial.
    - Se não estiver: consulta o BD pulando a quantidade de itens por página (no momento 10, constante `perPage`)
    - Se estiver: não pula nenhum item, pega desde a primeira categoria.