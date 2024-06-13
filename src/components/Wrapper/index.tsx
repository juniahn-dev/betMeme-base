"use client";

import Header from "../Header";
import styles from "./index.module.scss";

interface WrapperProps {
  children: JSX.Element;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  // const { isConnecting } = useCurrentWallet();

  // if (isConnecting) {
  //   return <Loading />;
  // }

  return (
    <div className={styles.container}>
      <Header />

      <div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};

export default Wrapper;
