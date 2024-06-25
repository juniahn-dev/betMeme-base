import Button from "@/components/Common/Button";
import { useMemo, useState } from "react";
import styles from "./index.module.scss";
import BetMemeModal from "@/components/BetMemeModal";
import clsx from "clsx";
import { frameLink, getCoingInfo, getPrice } from "@/utils/makeCoins";
import { DECIMAL_UNIT, RESULT_DURATION } from "@/constant/constant";
import { numberWithCommas } from "@/utils/formatNumber";
import { IGameProps } from "..";

interface IGameCardProps {
  game: IGameProps;
}

const GameCard: React.FC<IGameCardProps> = ({ game }) => {
  const [modalView, setModalView] = useState(false);

  const price = getPrice(game.token);
  const pricePercentage = useMemo(() => {
    if (game) {
      const percent =
        ((Number(price) - Number(game.markedPrice)) /
          Number(game.markedPrice)) *
        100;

      return percent;
    }

    return 0;
  }, [game]);

  const date = new Date();
  const lockedAmount = (
    (Number(game.upAmount) + Number(game.upAmount)) /
    DECIMAL_UNIT
  ).toFixed(6);
  let nowStatus = "";
  if (
    date.getTime() >
    1719446989613 + Number(game.duration) + RESULT_DURATION // 아무시간이나 넣어놨음 배팅 만들 때 만든 시간 넣어놔야 할지도
  ) {
    nowStatus = "expired";
  } else {
    nowStatus = "live";
  }

  const remain = (
    (Number(game.duration) - (date.getTime() - Number(1719446989613))) / // 아무시간이나 넣어놨음 배팅 만들 때 만든 시간 넣어놔야 할지도
    (1000 * 60)
  ).toFixed(2);

  return (
    <ul className={styles.container}>
      {game.isEnded && (
        <div
          className={clsx(
            styles.backgroundEnd,
            Number(game.lastPrice) - Number(game.markedPrice) > 0 && styles.up
          )}
        />
      )}
      <div className={styles.cardContent}>
        <div>
          <div className={styles.liveHeader}>
            <div className={styles.liveWrapper}>
              <div className={styles.isLive}>
                <div
                  className={clsx(
                    styles.circle,
                    styles[game.isEnded ? "expired" : "live"]
                  )}
                />
                {game.isEnded ? "Bet game ended" : "Betting now"}
              </div>
              <div>{game.isEnded ? "" : `( ${remain} min remain )`}</div>
            </div>
            <Button
              name="copy"
              onClick={() => {
                navigator.clipboard.writeText(
                  `${frameLink}${Number(game.gameId)}/${game.token}`
                );
                alert("copy frame link!");
              }}
              styled={styles.copyBtn}
            />
          </div>
          <div>
            <div className={styles.betInfo}>
              <img
                src={getCoingInfo(game.token).image}
                alt="img"
                className={styles.tokenImg}
              />
              {getCoingInfo(game.token).denom} 🦇 ${game.lastPrice}
            </div>
            <div className={styles.lockedContainer}>
              {game.isEnded && Number(game.lastPrice) > 0 ? (
                <>Final Price</>
              ) : (
                <>Current Price</>
              )}
              <div className={styles.betResult}>
                {game.isEnded && Number(game.lastPrice) > 0 ? (
                  <>
                    <>
                      $
                      {Number(Number(game.lastPrice) / DECIMAL_UNIT).toFixed(
                        10
                      )}
                    </>
                    {Number(game.lastPrice) - Number(game.markedPrice) > 0 ? (
                      <div className={clsx(styles.betPercent, styles.isPlus)}>
                        Up Win !
                      </div>
                    ) : (
                      <div className={clsx(styles.betPercent)}>Down Win !</div>
                    )}
                  </>
                ) : (
                  <>
                    ${price}
                    <div
                      className={clsx(
                        styles.betPercent,
                        pricePercentage > 0 && styles.isPlus
                      )}
                    >
                      {pricePercentage?.toFixed(2)} %
                    </div>
                  </>
                )}
              </div>
              <div className={styles.lockedAmount}>
                Locked Pool:
                <div>
                  {numberWithCommas(lockedAmount)}{" "}
                  {getCoingInfo(game.token).denom}
                </div>
              </div>
              <div className={styles.lockedAmount}>
                Bet Up:
                <div>
                  {numberWithCommas(Number(game.upAmount))}{" "}
                  {getCoingInfo(game.token).denom} ( win to{" "}
                  {numberWithCommas(
                    Number(game.upAmount) +
                      (Number(game.downAmount) * 0.7 + Number(game.prizeAmount))
                  )}{" "}
                  {getCoingInfo(game.token).denom} )
                </div>
              </div>
              <div className={styles.lockedAmount}>
                Bet Down:
                <div>
                  {numberWithCommas(Number(game.downAmount))}{" "}
                  {getCoingInfo(game.token).denom} ( win to{" "}
                  {numberWithCommas(
                    Number(game.downAmount) +
                      (Number(game.upAmount) * 0.7 + Number(game.prizeAmount))
                  )}{" "}
                  {getCoingInfo(game.token).denom} )
                </div>
              </div>
              <div className={styles.lockedAmount}>
                Prize Pool:
                <div>
                  {numberWithCommas(Number(game.prizeAmount))}{" "}
                  {getCoingInfo(game.token).denom}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.btnWrapper}>
          {nowStatus === "live" && (
            <Button
              styled={styles.betButton}
              name="Let's Bet !"
              onClick={() => setModalView(true)}
            />
          )}
          {nowStatus === "next" && (
            <div className={styles.betStatus}>
              <div
                className={clsx(
                  styles.status,
                  styles.up,
                  pricePercentage > 0 && styles.priceWin
                )}
              >
                [ Up ] Will be win
              </div>
              <div
                className={clsx(
                  styles.status,
                  styles.down,
                  pricePercentage < 0 && styles.priceWin
                )}
              >
                [ Down ] Will be win
              </div>
            </div>
          )}
          {/* {game.isEnded && Number(game.lastPrice) === 0 && (
            <Button styled={styles.checkButton} name="Check Price" onClick={() => updateLastPrice()} />
          )} */}
          {game.isEnded && Number(game.lastPrice) > 0 && (
            <Button
              styled={styles.button}
              name="Finished"
              disabled={game.isEnded}
            />
          )}
        </div>
      </div>
      <BetMemeModal
        game={game}
        modalView={modalView}
        onCloseModal={() => setModalView(false)}
      />
    </ul>
  );
};

export default GameCard;
