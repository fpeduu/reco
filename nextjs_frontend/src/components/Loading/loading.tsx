import Image from "next/image";
import Styles from "./loading.module.scss";

export default function LoadingBar() {
  return (
    <div className="w-full h-40 flex flex-col items-center justify-center">
      <Image src="/logo_preta.svg" alt="logo" width={125} height={31} />
      <div className={Styles.loadingBox}>
        <div className="loader">
        </div>
      </div>
    </div>
  );
}
