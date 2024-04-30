import Image from "next/image";
import styles from "./styles.module.css";

interface UserFeedbackProps {
  imgSrc: string;
  imgAlt: string;
  message: string;
  animation?: string;
}

export default function UserFeedback({
  imgSrc,
  imgAlt,
  message,
  animation,
}: UserFeedbackProps) {
  return (
    <div className="flex-col items-center justify-center">
      <Image
        src={imgSrc}
        alt={imgAlt}
        width={300}
        height={300}
        className={
          "mx-auto saturate-150 " +
          (!!animation ? styles[animation as string] : "")
        }
      />
      <p className="bold text-center mt-4 text-lg">{message}</p>;
    </div>
  );
}
