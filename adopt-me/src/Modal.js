import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const modalRoot = document.querySelector("#modal");

const Modal = ({ children }) => {
  // a contianer for state that you want to survive past render cycles
  const elRef = useRef(null);
  if (!elRef.current) {
    elRef.current = document.createElement("div");
  }

  useEffect(() => {
    modalRoot.appendChild(elRef.current);
    // How you clean up an effect
    return () => modalRoot.removeChild(elRef.current);
  }, []);

  return createPortal(<div>{children}</div>, elRef.current);
};

export default Modal;
