import styles from "./Loader.module.scss";

type LoaderTypes = {
  fullPage?: boolean;
};

export default function Loader({ fullPage }: LoaderTypes) {
  return (
    <div className={`${styles.wrapper} ${fullPage && styles.fullPageWrapper}`}>
      <div className={styles.loader}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
}
