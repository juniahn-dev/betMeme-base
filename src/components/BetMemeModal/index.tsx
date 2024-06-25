import Modal from "../Common/Modal";
import ModalHeader from "../Common/Modal/ModalHeader";
import styles from "./index.module.scss";
import { useState } from "react";
import CloseIconSVG from "@/assets/icons/common/CloseIcon.svg";
import clsx from "clsx";
import IncreaseIconPNG from "@/assets/icons/common/IncreaseIcon.png";
import DecreaseIconPNG from "@/assets/icons/common/DecreaseIcon.png";
import { numberWithCommas } from "@/utils/formatNumber";
import { ethers } from "ethers";
import { betMemeAbi, betMemeContractAddress } from "@/constant/betMeme";
import { IGameProps } from "../GameList";
import { getCoingInfo } from "@/utils/makeCoins";
import LottieContainer from "../Common/Loading";

interface IBetMemeModalProps {
  game: IGameProps;
  modalView: boolean;
  onCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const BetMemeModal: React.FC<IBetMemeModalProps> = ({
  game,
  modalView,
  onCloseModal,
}) => {
  const [amount, setAmount] = useState("0");
  const [txLoading, setTxLoading] = useState(false);
  const gameId = String(game.gameId);
  const upAmount = game.upAmount;
  const downAmount = game.downAmount;

  const betGame = async (gameId: string, position: boolean) => {
    if (!window.ethereum) {
      alert("Metamask가 설치되지 않았습니다.");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      betMemeContractAddress,
      betMemeAbi,
      signer
    );
    const tokenContract = new ethers.Contract(
      "0xBE5Da172BbffffF5AEa27017745e71eA1907dad1", // 특정 token
      betMemeAbi,
      signer
    );

    try {
      setTxLoading(true);

      const amountInWei = ethers.parseUnits(amount, "ether");
      const approveTx = await tokenContract.approve(
        betMemeContractAddress,
        amountInWei
      );
      await approveTx.wait();

      const tx = await contract.bet(
        gameId,
        position,
        ethers.parseUnits(amount, "ether")
      );

      await tx.wait();
      alert("게임 배팅 성공!");
    } catch (error) {
      console.error("게임 배팅 실패:", error);
      alert("게임 배팅 실패");
    } finally {
      setTxLoading(false);
    }
  };

  return (
    <Modal open={modalView} onClose={onCloseModal}>
      <>
        <ModalHeader>
          <img
            src={CloseIconSVG.src}
            onClick={() => onCloseModal(false)}
            className={styles.closeBtn}
          />
        </ModalHeader>
        <div className={styles.container}>
          <div>
            <div className={styles.betStatus}>
              Up
              <div className={styles.upAmount}>
                {numberWithCommas(Number(upAmount))}{" "}
                {getCoingInfo(game.token).denom}
              </div>
            </div>
            <div className={styles.betStatus}>
              Down
              <div className={styles.downAmount}>
                {numberWithCommas(Number(downAmount))}{" "}
                {getCoingInfo(game.token).denom}
              </div>
            </div>
            <div className={styles.amountInput}>
              <div
                className={styles.minAmount}
              >{`Minimun bet amount ${game.minAmount}`}</div>
              <div className={styles.inputContainer}>
                <img
                  src={getCoingInfo(game.token).image}
                  alt="meme-coin-img"
                  className={styles.tokenImg}
                />
                <input
                  className={styles.inputBox}
                  placeholder="How much?"
                  value={amount}
                  onChange={(val) => setAmount(val.target.value || "")}
                />
                <div className={styles.amountText}>Amount</div>
              </div>
            </div>
          </div>
          {txLoading ? (
            <div className={styles.loadingContainer}>
              <LottieContainer />
            </div>
          ) : (
            <div className={styles.buttonContainer}>
              <button
                className={clsx(styles.button, styles.up)}
                onClick={() => betGame(gameId, true)}
              >
                UP
                <div className={clsx(styles.cursor, styles.upImg)}>
                  <img src={IncreaseIconPNG.src} />
                </div>
              </button>
              <button
                className={clsx(styles.button, styles.down)}
                onClick={() => betGame(gameId, false)}
              >
                DOWN
                <div className={clsx(styles.cursor, styles.downImg)}>
                  <img src={DecreaseIconPNG.src} />
                </div>
              </button>
            </div>
          )}
        </div>
      </>
    </Modal>
  );
};

export default BetMemeModal;
