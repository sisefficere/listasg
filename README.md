## Sistema de paginação

Funciona via query params e cursor (ID do último registro avança, ID do primeiro registro retrocede) para query no BD via prisma.

/ (pagina inicial)
    função get-categorias
        Pega o conteúdo por meio de uma lógica:
            - utiliza o cursor, que é o ID do último item retornado
            - se não tem cursor, então é primeira consulta
            - se tem cursor, verifica se é um retrocesso, se for, pega os 10 registros anteriores. Caso contrário, avança 10 registros.
    componente Categorias
    componente Paginação