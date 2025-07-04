export function CardAnunciantes({
  srcImage,
  nome,
  descricao,
  endereco,
  contato,
}) {
  return (
    <div
      className="px-5 py-2 w-full max-w-[900px] items-center border-vermelho-3 rounded-[5px] border-2 flex flex-wrap gap-5"
    >
      <img
        src={srcImage}
        alt=""
        className="w-full max-w-[200px] rounded-[5px] shadow-md"
      />
      <div className="flex flex-col gap-5 w-full break-words max-w-[500px]">
        <div className="flex flex-col w-full">
          <p className="tipo-enfase">{nome}</p>
          {descricao ? <p>{descricao}</p> : <></>}
        </div>
        <div className="flex flex-col">
          {endereco ? (
            <p>
              <span className="font-bold">Endereço</span>: {endereco}
            </p>
          ) : (
            <></>
          )}
          {contato ? (
            <p>
              <span className="font-bold">Contato</span>: {contato}
            </p>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
