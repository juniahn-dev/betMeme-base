export const frameLink =
  "https://1e97-119-205-221-93.ngrok-free.app/api/approve/";

const decimals = 10;
export const pudMinValue = 0.0000002;
export const pudMaxValue = 0.0000003;

export const getRandomBetween = (basePrice: number) => {
  const randomValue = Math.random() * 0.2 * basePrice + basePrice * 0.9;
  return randomValue.toFixed(decimals);
};

export const getPrice = (address: string) => {
  if (address.indexOf("0xBE5Da172BbffffF5AEa27017745e71eA1907dad1") >= 0) {
    return getRandomBetween(0.0000002688);
  } else if (
    address.indexOf("0xE4aB69C077896252FAFBD49EFD26B5D171A32410") >= 0
  ) {
    return getRandomBetween(0.0000003688);
  } else {
    return getRandomBetween(1);
  }
};

export const getCoinInfo = (address: string) => {
  if (address.indexOf("0xBE5Da172BbffffF5AEa27017745e71eA1907dad1") >= 0) {
    return {
      image:
        "https://assets.coingecko.com/coins/images/33610/standard/pug-head.png",
      denom: "PUD",
      address,
    };
  } else if (
    address.indexOf("0xE4aB69C077896252FAFBD49EFD26B5D171A32410") >= 0
  ) {
    return {
      image:
        "https://assets.coingecko.com/coins/images/877/standard/chainlink-new-logo.png?1696502009",
      denom: "LINK",
      address,
    };
  } else {
    return {
      image:
        "https://www.geckoterminal.com/_next/image?url=https%3A%2F%2Fcoin-images.coingecko.com%2Fcoins%2Fimages%2F32528%2Fsmall%2Fmemecoin_%25282%2529.png%3F1698912168&w=64&q=75",
      denom: "MEME",
      address,
    };
  }
};
