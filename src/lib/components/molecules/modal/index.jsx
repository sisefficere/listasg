"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Modal({ idModal, showModal, zoomedImage }) {
  const searchParams = useSearchParams();

  const params = new URLSearchParams(searchParams);

  const closeZoomedImage = () => {
    params.delete("showModal");
    setShowModal(false);
  };

  return (
    <>
      {showModal && (
        <div
          id={idModal}
          className={`md:top-[20px] absolute inset-0 flex w-full h-full justify-center items-center bg-transparent`}
        >
          <div
            className="absolute z-0 h-full w-full"
            style={{ backdropFilter: "blur(10px)" }}
            onClick={() => closeZoomedImage(idModal)}
          ></div>
          <div className="z-[1000] flex w-full max-w-[400px] items-center gap-5 h-full overflow-visible">
            <div
              className="absolute z-0 inset-0 w-full h-full"
              onClick={() => closeZoomedImage(idModal)}
            ></div>
            <img
              src={zoomedImage}
              alt="Imagem com zoom"
              onClick={() => closeZoomedImage(idModal)}
              className="z-[10000] w-full max-w-[400px] shadow-[0_0_20px_5px_rgba(0,0,0,0.3)] rounded-[10px]"
            />
          </div>
        </div>
      )}
    </>
  );
}
