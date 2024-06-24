import { betMemeAbi, betMemeContractAddress } from "@/constant/betMeme";
import { ethers } from "ethers";
import { useEffect, useState } from "react";

const UserBet = () => {
  const [bets, setBets] = useState([]);

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
        // const betList = await contract.getUserBet(1n);
        const betList = await contract.getUsersBetList();
        setBets(betList);
      } catch (error) {
        console.error("게임 목록 불러오기 실패:", error);
      }
    };

    fetchGameList();
  }, []);

  return (
    <div>
      {bets.map((v, idx) => {
        console.log(v);
        return (
          <div key={idx}>
            {v[0]}
            {v[1]}
            {idx}test
          </div>
        );
      })}
    </div>
  );
};

export default UserBet;
