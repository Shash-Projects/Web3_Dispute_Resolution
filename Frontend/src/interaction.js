const walletAddress = `0x70711309454497fc2460531e6dac20cc62349835`;

const walletAbi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "stakeAmount",
        type: "uint256",
      },
    ],
    name: "applyForJuror",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "tokenAmount",
        type: "uint256",
      },
    ],
    name: "buyTokens",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "chutiya1",
        type: "address",
      },
      {
        internalType: "address",
        name: "chutiya2",
        type: "address",
      },
      {
        internalType: "string",
        name: "desUrl",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_expiryHr",
        type: "uint256",
      },
    ],
    name: "createDispute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
    ],
    name: "OwnableInvalidOwner",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "OwnableUnauthorizedAccount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "appliedForJuror",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "disputeCreated",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "desUrl",
            type: "string",
          },
          {
            internalType: "address",
            name: "victim1",
            type: "address",
          },
          {
            internalType: "address",
            name: "victim2",
            type: "address",
          },
          {
            internalType: "bool",
            name: "isResolved",
            type: "bool",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "id",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "jurorAddress",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "stake",
                type: "uint256",
              },
              {
                internalType: "bool",
                name: "voted",
                type: "bool",
              },
              {
                internalType: "bool",
                name: "vote",
                type: "bool",
              },
              {
                internalType: "bool",
                name: "isOccupied",
                type: "bool",
              },
            ],
            internalType: "struct dispute_resolution.Juror[]",
            name: "assingedJurors",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "uint8",
                name: "vote",
                type: "uint8",
              },
              {
                internalType: "uint256",
                name: "backing_tokens",
                type: "uint256",
              },
            ],
            internalType: "struct dispute_resolution.vote[]",
            name: "voteOfJurors",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "expiry",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "solution",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct dispute_resolution.dispute",
        name: "",
        type: "tuple",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "disputeResolved",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "jurorId",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "desUrl",
            type: "string",
          },
          {
            internalType: "address",
            name: "victim1",
            type: "address",
          },
          {
            internalType: "address",
            name: "victim2",
            type: "address",
          },
          {
            internalType: "bool",
            name: "isResolved",
            type: "bool",
          },
          {
            components: [
              {
                internalType: "uint256",
                name: "id",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "jurorAddress",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "stake",
                type: "uint256",
              },
              {
                internalType: "bool",
                name: "voted",
                type: "bool",
              },
              {
                internalType: "bool",
                name: "vote",
                type: "bool",
              },
              {
                internalType: "bool",
                name: "isOccupied",
                type: "bool",
              },
            ],
            internalType: "struct dispute_resolution.Juror[]",
            name: "assingedJurors",
            type: "tuple[]",
          },
          {
            components: [
              {
                internalType: "uint8",
                name: "vote",
                type: "uint8",
              },
              {
                internalType: "uint256",
                name: "backing_tokens",
                type: "uint256",
              },
            ],
            internalType: "struct dispute_resolution.vote[]",
            name: "voteOfJurors",
            type: "tuple[]",
          },
          {
            internalType: "uint256",
            name: "expiry",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "solution",
            type: "uint256",
          },
        ],
        indexed: false,
        internalType: "struct dispute_resolution.dispute",
        name: "",
        type: "tuple",
      },
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "jurorAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "stake",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "voted",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "vote",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isOccupied",
            type: "bool",
          },
        ],
        indexed: false,
        internalType: "struct dispute_resolution.Juror[]",
        name: "",
        type: "tuple[]",
      },
    ],
    name: "jurorsAssigned",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "jurorAddress",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "stake",
            type: "uint256",
          },
          {
            internalType: "bool",
            name: "voted",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "vote",
            type: "bool",
          },
          {
            internalType: "bool",
            name: "isOccupied",
            type: "bool",
          },
        ],
        indexed: false,
        internalType: "struct dispute_resolution.Juror[]",
        name: "",
        type: "tuple[]",
      },
    ],
    name: "newJurorsSelected",
    type: "event",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    name: "tokensBought",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "index",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_vote",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "backingAmount",
        type: "uint256",
      },
    ],
    name: "voteForDispute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
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
    inputs: [],
    name: "avgStake",
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
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
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
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
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
    name: "disputeArray",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "desUrl",
        type: "string",
      },
      {
        internalType: "address",
        name: "victim1",
        type: "address",
      },
      {
        internalType: "address",
        name: "victim2",
        type: "address",
      },
      {
        internalType: "bool",
        name: "isResolved",
        type: "bool",
      },
      {
        internalType: "uint256",
        name: "expiry",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "solution",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "disputeJurors",
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
        internalType: "address",
        name: "user",
        type: "address",
      },
    ],
    name: "getTokens",
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
    name: "jurors",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "jurorAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "stake",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "voted",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "vote",
        type: "bool",
      },
      {
        internalType: "bool",
        name: "isOccupied",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "minStakeTokens",
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
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
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
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenPrice",
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
    inputs: [],
    name: "totalNoOfJurors",
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
    inputs: [],
    name: "totalSupply",
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
    name: "voteArray",
    outputs: [
      {
        internalType: "uint8",
        name: "vote",
        type: "uint8",
      },
      {
        internalType: "uint256",
        name: "backing_tokens",
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
    name: "wannabeJurorsPool",
    outputs: [
      {
        internalType: "address",
        name: "jurorAddress",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "stake",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "wannabePoolSize",
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
];

export { walletAddress, walletAbi };