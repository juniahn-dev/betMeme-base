import Button from "@/components/Common/Button";
import { useState } from "react";
import styles from "./index.module.scss";
import BetMemeModal from "@/components/BetMemeModal";
import { ethers } from "ethers";

interface IGameCardProps {
  game: any;
}

const GameCard: React.FC<IGameCardProps> = ({ game }) => {
  const [modalView, setModalView] = useState(false);

  return (
    <ul className={styles.container}>
      <Button
        name="Make Frame"
        onClick={() =>
          navigator.clipboard.writeText(
            `https://ce5b-69-172-159-97.ngrok-free.app/api/${Number(game[0])}`
          )
        }
      />
      <li>
        <p>
          게임 시작 시간: {new Date(Number(game[1]) * 1000).toLocaleString()}
        </p>
        <p>지속 시간: {Number(game[2])}</p>
        <p>마크된 가격: {ethers.formatUnits(game[3], "ether")}</p>
        <p>마지막 가격: {ethers.formatUnits(game[4], "ether")}</p>
        <p>최소 금액: {ethers.formatUnits(game[5], "ether")}</p>
        <p>Up 금액: {ethers.formatUnits(game[6], "ether")}</p>
        <p>Down 금액: {ethers.formatUnits(game[7], "ether")}</p>
        <p>상금 금액: {ethers.formatUnits(game[8], "ether")}</p>
        <p>종료 여부: {game[9] ? "Yes" : "No"}</p>
        <p>토큰 주소: {game[10]}</p>
      </li>
      <Button
        styled={styles.betButton}
        name="Let's Bet !"
        onClick={() => setModalView(true)}
      />
      <BetMemeModal
        game={game}
        modalView={modalView}
        onCloseModal={() => setModalView(false)}
      />
    </ul>
  );
};

export default GameCard;
