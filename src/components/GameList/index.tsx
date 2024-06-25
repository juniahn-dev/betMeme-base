import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { betMemeAbi, betMemeContractAddress } from "@/constant/betMeme";
import styles from "./index.module.scss";
import GameCard from "./GameCard";

export interface IGameProps {
  gameId: BigInt;
  startTime: BigInt;
  duration: BigInt;
  markedPrice: string;
  lastPrice: string;
  minAmount: string;
  upAmount: string;
  downAmount: string;
  prizeAmount: string;
  isEnded: boolean;
  token: string;
  betUsers: string[];
}

const GameList = () => {
  const [games, setGames] = useState<IGameProps[]>([]);

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
        const gameList = await contract.getGameList();
        const parseGameList = gameList.map((v: any) => {
          return {
            gameId: v[0],
            startTime: v[1],
            duration: v[2],
            markedPrice: ethers.formatUnits(v[3], "ether"),
            lastPrice: ethers.formatUnits(v[4], "ether"),
            minAmount: ethers.formatUnits(v[5], "ether"),
            upAmount: ethers.formatUnits(v[6], "ether"),
            downAmount: ethers.formatUnits(v[7], "ether"),
            prizeAmount: ethers.formatUnits(v[8], "ether"),
            isEnded: v[9],
            token: v[10],
            betUsers: v[11],
          };
        });

        setGames(parseGameList);
      } catch (error) {
        console.error("게임 목록 불러오기 실패:", error);
      }
    };

    fetchGameList();
  }, []);

  return (
    <ul id="memeList" className={styles.container}>
      {games.map((game, idx) => {
        return <GameCard key={`${String(game.gameId)}-${idx}`} game={game} />;
      })}
    </ul>
  );
};

export default GameList;
