import { ReactChild } from "react";
import styles from "./Modal.module.scss";

type ModalTypes = {
  children: ReactChild;
  title?: string;
  hideTitleBar?: boolean;
};

const Modal = ({ children, title, hideTitleBar }: ModalTypes) => {
  return (
    <div className={styles.Modal}>
      {!hideTitleBar && (
        <section className={styles.Topbar}>
          <p>{title}</p>
        </section>
      )}

      <section className={styles.Body}>{children}</section>
    </div>
  );
};

export default Modal;
