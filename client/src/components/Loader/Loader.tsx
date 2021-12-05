import { useEffect, useState } from "react";
import styles from "./Loader.module.scss";

type LoaderTypes = {
  fullPage?: boolean;
};

export default function Loader({ fullPage }: LoaderTypes) {
  const [loaderWidth,setLoaderWidth]=useState(0);

  useEffect(()=>{
    let width=loaderWidth;
    const timer=setInterval(()=>{
      width+=20;
      setLoaderWidth(width)

      if(width>=200) clearInterval(timer)
    },500)
  },[])

  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        <div className={styles.loaderBar} style={{width:loaderWidth}}></div>
      </div>
    </div>
  );
}
