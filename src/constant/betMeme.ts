export const betMemeContractAddress =
  "0x4a65BADe94B89214c243C4ea977B109d1Bc327Fb";

export const betMemeAbi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "bool",
        name: "betUp",
        type: "bool",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "BetPlaced",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "reward",
        type: "uint256",
      },
    ],
    name: "Claimed",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "GameCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "lastPrice",
        type: "uint256",
      },
    ],
    name: "GameEnded",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "betUp",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "bet",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "burnAddress",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "markedPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minAmount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "tokenAddress",
        type: "address",
      },
    ],
    name: "createGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastPrice",
        type: "uint256",
      },
    ],
    name: "endGame",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "gameCounter",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "games",
    outputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "startTime",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "markedPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "lastPrice",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "upAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "downAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "prizeAmount",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isEnded",
        type: "bool",
      },
      {
        internalType: "contract IERC20",
        name: "token",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getActiveGameList",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "gameId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "startTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "markedPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "upAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "downAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "prizeAmount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isEnded",
            type: "bool",
          },
          {
            internalType: "contract IERC20",
            name: "token",
            type: "address",
          },
        ],
        internalType: "struct BetMeme.Game[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getEndedGameList",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "gameId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "startTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "markedPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "upAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "downAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "prizeAmount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isEnded",
            type: "bool",
          },
          {
            internalType: "contract IERC20",
            name: "token",
            type: "address",
          },
        ],
        internalType: "struct BetMeme.Game[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
    ],
    name: "getGame",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "gameId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "startTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "markedPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "upAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "downAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "prizeAmount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isEnded",
            type: "bool",
          },
          {
            internalType: "contract IERC20",
            name: "token",
            type: "address",
          },
        ],
        internalType: "struct BetMeme.Game",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getGameList",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "gameId",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "startTime",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "duration",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "markedPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "lastPrice",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "minAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "upAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "downAmount",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "prizeAmount",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "isEnded",
            type: "bool",
          },
          {
            internalType: "contract IERC20",
            name: "token",
            type: "address",
          },
        ],
        internalType: "struct BetMeme.Game[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "gameId",
        type: "uint256",
      },
    ],
    name: "getUserBet",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "betUp",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct BetMeme.UserBet",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getUsersBetList",
    outputs: [
      {
        components: [
          {
            internalType: "bool",
            name: "betUp",
            type: "bool",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct BetMeme.UserBet[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "userBets",
    outputs: [
      {
        internalType: "bool",
        name: "betUp",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;
