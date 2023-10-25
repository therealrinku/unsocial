import { ReactChild } from "react";
import { FiX } from "react-icons/fi";

type ModalTypes = {
  children: ReactChild;
  title?: string;
  hideTitleBar?: boolean;
  onClose?: () => void;
};

const Modal = ({ children, title, hideTitleBar, onClose }: ModalTypes) => {
  return (
    <div className="text-sm w-full md:w-[350px] fixed left-[50%] bg-white z-50 top-[50%] transform -translate-x-1/2 -translate-y-1/2">
      {!hideTitleBar && (
        <section className="border-b px-3 py-1 flex justify-between items-center">
          <p className="font-bold py-1">{title}</p>
          {onClose && (
            <button onClick={onClose}>
              <FiX size={20} />
            </button>
          )}
        </section>
      )}

      <section className="p-5">{children}</section>
    </div>
  );
};

export default Modal;
