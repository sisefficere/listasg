"use client";

import { useState, useEffect } from "react";

// fonte: https://medium.com/@thomasaugot/adding-zoom-functionality-to-an-image-viewer-in-react-next-js-4621be8eb770

export default function ImageHandle({ srcImage, id, imgWidthClass }) {

    // state para lidar com o display do modal (flex quando true e fechado quando false/null)
  const [zoomedImage, setZoomedImage] = useState(null);
  const openZoomedImage = (imageUrl, id) => {
    setZoomedImage(imageUrl);
    const modalEl = document.getElementById(id);
    modalEl.showModal();

    window.onscroll = () =>{
      setZoomedImage(null);
        const modalEl = document.getElementById(id);
        modalEl.close();
  }
  };
 
  // Function to close zoomed image
  const closeZoomedImage = (id) => {
    setZoomedImage(null);
    const modalEl = document.getElementById(id);
    modalEl.close();
  };

  
  const idModal = "modal-img-" + id;
  
  return (
    <>
      <img
        src={srcImage}
        alt=""
        className={`cursor-pointer ${imgWidthClass ? imgWidthClass : 'w-full max-w-[200px]'}  rounded-[5px] shadow-[0_0_10px_5px_rgba(0,0,0,0.1)]`}
        onClick={() => openZoomedImage(srcImage, idModal)}
      />
      <dialog
        id={idModal}
        className={`md:top-[20px] flex w-full h-full justify-center items-center bg-[transparent] ${
          zoomedImage ? "flex" : "hidden"
        }`}
      >
        <div
          className="absolute z-0 h-full w-full"
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
          {/* <div className="z-[10000] relative  flex w-full items-center min-h-max">
          </div> */}
        </div>
      </dialog>
    </>
  );
}
