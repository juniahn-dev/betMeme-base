import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { betMemeAbi, betMemeContractAddress } from "@/constant/betMeme";

const GameList = () => {
  const [games, setGames] = useState([]);

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
        setGames(gameList);
      } catch (error) {
        console.error("게임 목록 불러오기 실패:", error);
      }
    };

    fetchGameList();
  }, []);

  return (
    <div>
      <ul>
        {games.map((game, index) => {
          return (
            <li key={index}>
              <p>
                게임 시작 시간:{" "}
                {new Date(Number(game[0]) * 1000).toLocaleString()}
              </p>
              <p>지속 시간: {Number(game[1])}</p>
              <p>마크된 가격: {ethers.formatUnits(game[2], "ether")} ETH</p>
              <p>마지막 가격: {ethers.formatUnits(game[3], "ether")} ETH</p>
              <p>최소 금액: {ethers.formatUnits(game[4], "ether")} ETH</p>
              <p>Up 금액: {ethers.formatUnits(game[5], "ether")} ETH</p>
              <p>Down 금액: {ethers.formatUnits(game[6], "ether")} ETH</p>
              <p>상금 금액: {ethers.formatUnits(game[7], "ether")} ETH</p>
              <p>종료 여부: {game[8] ? "Yes" : "No"}</p>
              <p>토큰 주소: {game[9]}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default GameList;
