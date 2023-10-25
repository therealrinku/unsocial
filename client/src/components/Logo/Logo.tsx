import { Link } from "react-router-dom";
import styles from "./Logo.module.scss";

export default function Logo() {
  return (
    <Link to={"/"} className={styles.logo}>
      <p>
        <i>robo</i>social
      </p>
    </Link>
  );
}
