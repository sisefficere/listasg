"use client";

import { useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

// fonte: https://medium.com/@thomasaugot/adding-zoom-functionality-to-an-image-viewer-in-react-next-js-4621be8eb770

export default function ImageHandle({
  srcImage,
  id,
  imgWidthClass,
  boxShadow = null,
}) {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const [showModal, setShowModal] = useState(searchParams.get("showModal"));

  const [zoomedImage, setZoomedImage] = useState(null);

  const openZoomedImage = (imageUrl, id) => {
    setZoomedImage(imageUrl);
    params.set("showModal", "true");
    setShowModal(true);
  };
  useEffect(() => {
    window.onscroll = () => {
      setZoomedImage(null);
      params.delete("showModal");
      setShowModal(false);
    };
  });

  // Function to close zoomed image
  const closeZoomedImage = (id) => {
    setZoomedImage(null);
    params.delete("showModal");
    setShowModal(false);
  };

  const idModal = "modal-img-" + id;

  return (
    <>
      <img
        src={srcImage}
        alt=""
        className={`cursor-pointer ${imgWidthClass ? imgWidthClass : "w-full max-w-[200px]"}  rounded-[5px] ${boxShadow || "shadow-[0_0_10px_5px_rgba(0,0,0,0.1)]"}`}
        onClick={() => openZoomedImage(srcImage, idModal)}
      />
      {showModal && (
        <div
          id={idModal}
          className={`fixed inset-0 flex w-full h-full justify-center items-center bg-transparent`}
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
