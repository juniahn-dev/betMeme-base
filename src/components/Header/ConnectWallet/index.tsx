import { useEffect, useState } from "react";
import { Web3 } from "web3";

const ConnectWallet: React.FC = () => {
  const baseNetworkVersion = 84532;
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [connectedAccount, setConnectedAccount] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.ethereum) {
      setWeb3(new Web3(window.ethereum));
    }
  }, []);

  useEffect(() => {
    if (web3 && !connectedAccount) {
      connectMetamask();
    }
  }, [web3, connectedAccount]);

  const changeNetwork = async () => {
    if (web3 && window.ethereum?.networkVersion !== baseNetworkVersion) {
      try {
        await window.ethereum?.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: web3.utils.toHex(baseNetworkVersion) }],
        });
      } catch (err: any) {
        console.error("Network change failed", err);
        throw new Error(err.message);
      }
    }
  };

  const connectMetamask = async () => {
    if (window.ethereum) {
      try {
        await changeNetwork();

        await window.ethereum.request({ method: "eth_requestAccounts" });
        const accounts = await web3!.eth.getAccounts();
        setConnectedAccount(accounts[0]);
      } catch (err: any) {
        console.error(err.message);
      }
    } else {
      alert("Please download metamask");
    }
  };

  return (
    <button onClick={() => connectMetamask()}>
      {connectedAccount || "Connect"}
    </button>
  );
};

export default ConnectWallet;
