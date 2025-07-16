export function CardAnunciantes({
  srcImage,
  nome="",
  descricao,
  endereco,
  comBorda = true,
  contatos = {
    telefones: [],
    facebook: [],
    instagram: [],
    whatsapp: [],
    email: [],
  },
}) {
  return (
    <div className={`w-full max-w-[800px] items-center ${comBorda ? 'border-vermelho-3 p-5 rounded-[5px] border-2' : ""} flex flex-wrap justify-center gap-10`}>
      <img
        src={srcImage}
        alt=""
        className="w-full max-w-[200px] rounded-[5px] shadow-md"
      />
      <div className="flex flex-col gap-5 w-full break-words max-w-[500px]">
        <div className="flex flex-col w-full">
          {nome !="" ? <h3 className="tipo-titulo3 break-words">{nome}</h3> : <></>}
          {descricao ? <p className="break-words">{descricao}</p> : <></>}
        </div>
        <div className="flex flex-col gap-5">
          {endereco ? (
            <p>
              <span className="font-bold">Endereço</span>: {endereco}
            </p>
          ) : (
            <></>
          )}
          <div className="flex flex-col gap-2">
            <h4 className="tipo-titulo4">Contatos</h4>
            {contatos.telefones?.length != 0 ? (
              <p>
                <span className="font-bold">Telefone(s): </span>
                {contatos.telefones.map((el, index) => (
                  <>
                    <a
                      href={`tel:${el}`}
                      className="decoration-solid underline decoration-1"
                    >
                      {el.trim()}
                    </a>
                    {index != contatos.telefones.length - 1 ? ", " : ""}
                  </>
                ))}
              </p>
            ) : (
              <></>
            )}
            {contatos.email?.length != 0 ? (
              <p>
                <span className="font-bold">E-mail: </span>
                {contatos.email.map((el, index) => (
                  <>
                    <a
                      href={`mailto:${el.trim()}`}
                      className="decoration-solid underline decoration-1 break-all"
                    >
                      {el.trim()}
                    </a>
                    {index != contatos.email.length - 1 ? ", " : ""}
                  </>
                ))}
              </p>
            ) : (
              <></>
            )}
            {contatos.whatsapp?.length != 0 ||
            contatos.facebook?.length != 0 ||
            contatos.instagram?.length ? (
              <>
                <div className="flex flex-wrap gap-2 w-full">
                  {contatos.whatsapp.map((el) => (
                    <a
                      target="_blank"
                      href={`https://wa.me/55${el
                        .replace(" ", "")
                        .replace("-", "")}`}
                      className="bg-verde-2-principal text-branco-4-claro-principal flex-col w-full max-w-[120px] px-2 py-2 rounded-md flex items-center justify-center gap-2"
                    >
                      <svg
                        id="Layer_1"
                        version="1.1"
                        viewBox="0 0 56.693 56.693"
                        className="w-[40px] fill-branco-4-claro-principal"
                      >
                        <g>
                          <path
                            className="st0"
                            d="M46.3802,10.7138c-4.6512-4.6565-10.8365-7.222-17.4266-7.2247c-13.5785,0-24.63,11.0506-24.6353,24.6333   c-0.0019,4.342,1.1325,8.58,3.2884,12.3159l-3.495,12.7657l13.0595-3.4257c3.5982,1.9626,7.6495,2.9971,11.7726,2.9985h0.01   c0.0008,0-0.0006,0,0.0002,0c13.5771,0,24.6293-11.0517,24.635-24.6347C53.5914,21.5595,51.0313,15.3701,46.3802,10.7138z    M28.9537,48.6163h-0.0083c-3.674-0.0014-7.2777-0.9886-10.4215-2.8541l-0.7476-0.4437l-7.7497,2.0328l2.0686-7.5558   l-0.4869-0.7748c-2.0496-3.26-3.1321-7.028-3.1305-10.8969c0.0044-11.2894,9.19-20.474,20.4842-20.474   c5.469,0.0017,10.6101,2.1344,14.476,6.0047c3.8658,3.8703,5.9936,9.0148,5.9914,14.4859   C49.4248,39.4307,40.2395,48.6163,28.9537,48.6163z"
                          />
                          <path
                            className="st0"
                            d="M40.1851,33.281c-0.6155-0.3081-3.6419-1.797-4.2061-2.0026c-0.5642-0.2054-0.9746-0.3081-1.3849,0.3081   c-0.4103,0.6161-1.59,2.0027-1.9491,2.4136c-0.359,0.4106-0.7182,0.4623-1.3336,0.1539c-0.6155-0.3081-2.5989-0.958-4.95-3.0551   c-1.83-1.6323-3.0653-3.6479-3.4245-4.2643c-0.359-0.6161-0.0382-0.9492,0.27-1.2562c0.2769-0.2759,0.6156-0.7189,0.9234-1.0784   c0.3077-0.3593,0.4103-0.6163,0.6155-1.0268c0.2052-0.4109,0.1027-0.7704-0.0513-1.0784   c-0.1539-0.3081-1.3849-3.3379-1.8978-4.5706c-0.4998-1.2001-1.0072-1.0375-1.3851-1.0566   c-0.3585-0.0179-0.7694-0.0216-1.1797-0.0216s-1.0773,0.1541-1.6414,0.7702c-0.5642,0.6163-2.1545,2.1056-2.1545,5.1351   c0,3.0299,2.2057,5.9569,2.5135,6.3676c0.3077,0.411,4.3405,6.6282,10.5153,9.2945c1.4686,0.6343,2.6152,1.013,3.5091,1.2966   c1.4746,0.4686,2.8165,0.4024,3.8771,0.2439c1.1827-0.1767,3.6419-1.489,4.1548-2.9267c0.513-1.438,0.513-2.6706,0.359-2.9272   C41.211,33.7433,40.8006,33.5892,40.1851,33.281z"
                          />
                        </g>
                      </svg>
                      <span className="font-bold text-xs">{el.trim()}</span>
                    </a>
                  ))}
                  {contatos.instagram?.length != 0 ? (
                    <>
                      {contatos.instagram.map((el, index) => (
                        <a
                          target="_blank"
                          href={`https://instagram.com/${el.trim()}`}
                          className="px-5 py-2 flex flex-col gap-2 text-xs font-bold text-branco-4-claro-principal bg-gradient-to-tr from-[#833ab4] via-[#fd1d1d] to-[#fcb045] rounded-md w-full max-w-[120px] items-center justify-center text-center"
                        >
                          <svg
                            version="1.1"
                            id="Layer_1"
                            x="0px"
                            y="0px"
                            viewBox="0 0 56.7 56.7"
                            enableBackground="new 0 0 56.7 56.7"
                            className="fill-branco-4-claro-principal w-[50px]"
                          >
                            <g>
                              <path d="M28.2,16.7c-7,0-12.8,5.7-12.8,12.8s5.7,12.8,12.8,12.8S41,36.5,41,29.5S35.2,16.7,28.2,16.7z M28.2,37.7   c-4.5,0-8.2-3.7-8.2-8.2s3.7-8.2,8.2-8.2s8.2,3.7,8.2,8.2S32.7,37.7,28.2,37.7z" />
                              <circle cx="41.5" cy="16.4" r="2.9" />
                              <path d="M49,8.9c-2.6-2.7-6.3-4.1-10.5-4.1H17.9c-8.7,0-14.5,5.8-14.5,14.5v20.5c0,4.3,1.4,8,4.2,10.7c2.7,2.6,6.3,3.9,10.4,3.9   h20.4c4.3,0,7.9-1.4,10.5-3.9c2.7-2.6,4.1-6.3,4.1-10.6V19.3C53,15.1,51.6,11.5,49,8.9z M48.6,39.9c0,3.1-1.1,5.6-2.9,7.3   s-4.3,2.6-7.3,2.6H18c-3,0-5.5-0.9-7.3-2.6C8.9,45.4,8,42.9,8,39.8V19.3c0-3,0.9-5.5,2.7-7.3c1.7-1.7,4.3-2.6,7.3-2.6h20.6   c3,0,5.5,0.9,7.3,2.7c1.7,1.8,2.7,4.3,2.7,7.2V39.9L48.6,39.9z" />
                            </g>
                          </svg>

                          <span className="break-all">@{el.trim()}</span>
                        </a>
                      ))}
                    </>
                  ) : (
                    <></>
                  )}
                  {contatos.facebook.map((el, index) => (
                      <a
                        target="_blank"
                        href={`https://facebook.com/${el.trim()}`}
                        className="text-branco-4-claro-principal text-xs font-bold break-all flex flex-col gap-2 px-5 py-2 rounded-md items-center justify-center bg-[#0866ffff] w-full max-w-[120px] text-center"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="fill-branco-4-claro-principal w-[50px]"
                        >
                          <path d="M12 2.03998C6.5 2.03998 2 6.52998 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.84998C10.44 7.33998 11.93 5.95998 14.22 5.95998C15.31 5.95998 16.45 6.14998 16.45 6.14998V8.61998H15.19C13.95 8.61998 13.56 9.38998 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96C15.9164 21.5878 18.0622 20.3855 19.6099 18.57C21.1576 16.7546 22.0054 14.4456 22 12.06C22 6.52998 17.5 2.03998 12 2.03998Z" />
                        </svg>
                        <span className="break-all">@{el.trim()}</span>
                      </a>
                    ))}
                </div>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
