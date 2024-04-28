import Image from "next/image";
import styles from "./styles.module.css";

export default function Loading() {
  return (
    <Image
      className={styles["infinite-spin"]}
      src="/pokeball.png"
      alt="pokeball"
      width={400}
      height={400}
    />
  );
}
