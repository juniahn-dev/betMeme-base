import { betMemeAbi, betMemeContractAddress } from "@/constant/betMeme";
import { getaccountAssetsStorageState } from "@/store/account";
import { ethers } from "ethers";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import styles from "./index.module.scss";
import TrophyLottie from "@/assets/icons/lottie/TrophyLottie.json";
import GiftLottie from "@/assets/icons/lottie/GiftLottie.json";
import PendingLottie from "@/assets/icons/lottie/PendingLottie.json";
import { numberWithCommas } from "@/utils/formatNumber";
import { isEmpty } from "lodash";
import dynamic from "next/dynamic";
import clsx from "clsx";

const Lottie = dynamic(() => import("../Common/Lottie"), {
  ssr: false,
});

interface IBetsProps {
  amount: string;
  betUp: boolean;
  gameId: BigInt;
  status: "PENDING" | "WON" | "LOSE";
  token: string;
}

const UserBet = () => {
  const [bets, setBets] = useState<IBetsProps[]>([]);
  const accountAssets = useRecoilValue(getaccountAssetsStorageState);

  useEffect(() => {
    const fetchGameList = async () => {
      if (!window.ethereum) {
        alert("Metamask가 설치되지 않았습니다.");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const contract = new ethers.Contract(
        betMemeContractAddress,
        betMemeAbi,
        provider
      );

      try {
        if (accountAssets.account) {
          const gameList = await contract.getGameList();
          const allBets = [] as any;

          for (const v of gameList) {
            const betList = await contract.userBets(
              accountAssets.account,
              v[0]
            );

            if (isEmpty(betList[3])) {
              continue;
            }

            allBets.push({
              gameId: betList[0],
              betUp: betList[1],
              amount: String(betList[2]),
              status: betList[3],
              token: v[10],
            });
          }

          setBets(allBets);
        }
      } catch (error) {
        console.error("게임 목록 불러오기 실패:", error);
      }
    };

    fetchGameList();
  }, [accountAssets]);

  return (
    <div className={styles.container}>
      {bets.map((v, idx) => {
        return (
          <div key={idx} className={styles.claimContainer}>
            <div className={styles.item}>
              <div className={styles.itemRight}>
                <div className={styles.title}>
                  {v.status === "PENDING" && (
                    <>
                      PENDING
                      <Lottie
                        lottieData={PendingLottie}
                        className={clsx(styles.lottie, styles.pending)}
                      />
                    </>
                  )}
                  {v.status !== "PENDING" && (
                    <>
                      <p className={styles.expiredStatus}>
                        <div>{v.status === "WON" ? "Winner" : "Loser"}</div>
                      </p>
                      {v.status === "WON" ? (
                        <Lottie
                          lottieData={TrophyLottie}
                          className={styles.lottie}
                        />
                      ) : (
                        <Lottie
                          lottieData={GiftLottie}
                          className={styles.lottie}
                        />
                      )}
                    </>
                  )}
                </div>
                <span className={styles.upBorder}></span>
                <span className={styles.downBorder}></span>
              </div>

              <div className={styles.itemLeft}>
                <div className={styles.betInfo}>
                  <div className={styles.betList}>
                    Bet Status
                    <div>{v.betUp ? <div>Up</div> : <div>Down</div>}</div>
                  </div>
                  <div className={styles.betList}>
                    Bet Amount
                    <div>{numberWithCommas(Number(v.amount) / 10 ** 18)}</div>
                  </div>
                  {/* {objectData?.lastPrice <= 0 && (
              <>
                <div className={styles.priceWrapper}>
                  <div className={styles.priceContainer}>
                    <div className={styles.priceTitle}>Start Price</div>
                    <div>{Number(objectData?.markedPrice / DECIMAL_UNIT).toFixed(10)}</div>
                  </div>
                  <div className={styles.priceContainer}>
                    <div className={styles.priceTitle}>Current Price</div>
                    <div>{price}</div>
                  </div>
                </div>
                <div className={clsx(styles.percentage, pricePercentage > 0 && styles.isPlus)}>
                  {pricePercentage.toFixed(2)} %
                </div>
              </>
            )} */}
                </div>
                <div className={styles.buttons}>
                  {/* {nowStatus === 'expired' && objectData?.lastPrice > 0 && (
              <>
                {gameResult === 'win' && <button onClick={() => claim('claim', value)}>Claim</button>}
                {gameResult === 'lose' && <button onClick={() => claim('callenge', value)}>Challenge</button>}
              </>
            )} */}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default UserBet;
