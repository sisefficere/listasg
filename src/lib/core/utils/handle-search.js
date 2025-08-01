export default function handleSearch(params, pathname, replace, cursor, voltar) {
  // recebe usePathname, useRouter (metodo 'replace'), useSearchParams de "next/navigation";

  // caso tenha cursor definido, lida com a paginação

  // 1 - se for um avanço de página, seta a página (após a primeira página algoritmo soma o catpage - para lidar com o botão de página anterior)
  // 2 - se for um retrocesso, seta o parametro voltar como true e subtrai 1 do catpage (página de categoria) - e se for um avanço e nos params conter o voltar como true, deletar
  // 3 - se não houver cursor, volta para a primeira página (deleta todos os parametros da URL)
  // 4 - Ao fim realiza o replace atualizando os parametros e forçando navegador a atualizar a página.
  if (cursor) {
    // 1
    if (!voltar) {
      params.set("cursor", cursor);
      if (!params.has("catPage")) {
        params.set("catPage", `1`);
      } else if (params.get("catPage") != 1 && !voltar) {
        params.set("catPage", `${Number(params.get("catPage")) + 1}`);
      }
    }
    // 2
    if (voltar) {
      params.set("voltar", voltar);
      params.set("catPage", `${Number(params.get("catPage")) - 1}`);
    } else if (params.has("voltar")) {
      params.delete("voltar");
    }
  } else {
    // 3
    if (params.has("cursor")) {
      params.delete("cursor");
    }
    if (params.has("voltar")) {
      params.delete("voltar");
    }
    if (params.has("catPage")) {
      params.delete("catPage");
    }
  }
  // 4
  replace(`${pathname}?${params.toString()}`);
}
