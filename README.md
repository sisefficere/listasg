# Stack

Next.JS + Prisma + TailwindCSS + Vercel + NeonPostgres

# Funcionalidades

## Conexão via BD

Utilizando a constante env `DATABASE_URL` é intercambiado entre BD local e remoto comentando o arquivo `.env`.
É configurado na Vercel um storage postgres com o Neon e depois o mesmo é conectado. Tudo é feito pela interface da Vercel que já adiciona as variáveis de ambiente prod necessárias para conexão com o BD remoto.

### BD Local

Utilizando um arquivo docker compose é subido um container postgres que torna mais seguro o desenvolvimento local.

Se necessário conectar outro BD:
1. acessa o BD remoto, realiza um `pg_dump`
2. no BD local, realiza um `pg_restore` (pega os dados do remoto)
3. acessa BD remoto e se houver alguma tabela `_prisma_migrations` exclua.
4. conectar o BD remoto
5. realizar um `npx prisma db pull`
6. conectar novamente o BD local
7. realizar um `npx prisma migrate reset` (dados estão a salvo no remoto)
8. realizar um `npx prisma migrate dev --name init` (cria a migration inicial)
9. conecta no BD remoto
10. realizar um `npx prisma migrate resolve --applied nome_arquivo_migration` (pois não há tabela `_prisma_migrations` no remoto).
11. realiza um `npx prisma migrate deploy` para aplicar as migrations pendentes
12. conecta o BD local
13. Realiza um `npx prisma generate`
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

## Actions

### `getCategoriasOffset()`

Retorna os dados das categorias em array e também o total de categorias para ser utilizado no componente `/molecules/paginacao`:

- define a query com o as cláusulas corretas (nesse caso pegando categorias que possuam anunciantes diretos ou em subcategorias, ordenando por nome de forma crescente)
- armazena o total de categorias de acordo com as condições na constante `totalCategorias`.
- checa se não está na página inicial.
    - Se não estiver: consulta o BD pulando a quantidade de itens por página (no momento 10, constante `perPage`)
    - Se estiver: não pula nenhum item, pega desde a primeira categoria.