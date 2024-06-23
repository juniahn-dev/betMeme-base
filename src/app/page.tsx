"use client";

import Wrapper from "@/components/Wrapper";
import styles from "./index.module.scss";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import GameList from "@/components/GameList";

export default function Home() {
  const router = useRouter();

  return (
    <Wrapper>
      <div>
        <div className={styles.container}>
          <h1>Join the BetMeme powered by Web3</h1>
          <div className={styles.subTitle}>
            On this platform, you can bet on the value of meme tokens
          </div>
          <button
            className={clsx(styles.btnHover, styles.color8)}
            onClick={() => router.push("/#memeList")}
          >
            Let's Bet!
          </button>
          <div className={styles.listContainer}>
            <GameList />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
