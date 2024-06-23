import React, { useState } from "react";
import { ethers } from "ethers";
import styles from "./index.module.scss";
import { betMemeAbi, betMemeContractAddress } from "@/constant/betMeme";
import InputBox from "../Common/InputBox";
import Button from "../Common/Button";

const CreateGame = () => {
  const [markedPrice, setMarkedPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");

  const createGame = async () => {
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

    try {
      const tx = await contract.createGame(
        ethers.parseUnits(markedPrice, "ether"),
        duration,
        ethers.parseUnits(minAmount, "ether"),
        tokenAddress
      );

      await tx.wait();
      alert("게임 생성 성공!");
    } catch (error) {
      console.error("게임 생성 실패:", error);
      alert("게임 생성 실패.");
    }
  };

  return (
    <div className={styles.container}>
      <InputBox
        title="Marked Price"
        placeholder="Marked Price"
        value={markedPrice}
        onChange={(val) => setMarkedPrice(val.target.value)}
        required={true}
      />
      <InputBox
        title="Duration"
        placeholder="Duration"
        value={duration}
        onChange={(val) => setDuration(val.target.value)}
        required={true}
      />
      <InputBox
        title="Minimum Amount"
        placeholder="Minimum Amount"
        value={minAmount}
        onChange={(val) => setMinAmount(val.target.value)}
        required={true}
      />
      <InputBox
        title="Token Address"
        placeholder="Token Address"
        value={tokenAddress}
        onChange={(val) => setTokenAddress(val.target.value)}
        required={true}
      />
      <Button name="Create Game" onClick={createGame} />
    </div>
  );
};

export default CreateGame;
