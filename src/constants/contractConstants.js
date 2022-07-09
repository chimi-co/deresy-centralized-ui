// ABI for the StudioUno contract (always replace for current version)
export const DERESY_CONTRACT_ABI = [
  {
    inputs: [],
    name: "contractVersion",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "reviewFormsTotal",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "string[]",
        name: "questions",
        type: "string[]",
      },
      {
        internalType: "string[][]",
        name: "choices",
        type: "string[][]",
      },
      {
        internalType: "enum DeresyRequests.QuestionType[]",
        name: "questionTypes",
        type: "uint8[]",
      },
    ],
    name: "createReviewForm",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "address[]",
        name: "reviewers",
        type: "address[]",
      },
      {
        internalType: "string[]",
        name: "targets",
        type: "string[]",
      },
      {
        internalType: "string[]",
        name: "targetsIPFSHashes",
        type: "string[]",
      },
      {
        internalType: "string",
        name: "formIpfsHash",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "rewardPerReview",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "reviewFormIndex",
        type: "uint256",
      },
    ],
    name: "createRequest",
    outputs: [],
    stateMutability: "payable",
    type: "function",
    payable: true,
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "uint8",
        name: "targetIndex",
        type: "uint8",
      },
      {
        internalType: "string[]",
        name: "answers",
        type: "string[]",
      },
    ],
    name: "submitReview",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "closeReviewRequest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
    ],
    name: "getRequest",
    outputs: [
      {
        internalType: "address[]",
        name: "reviewers",
        type: "address[]",
      },
      {
        internalType: "string[]",
        name: "targets",
        type: "string[]",
      },
      {
        internalType: "string[]",
        name: "targetsIPFSHashes",
        type: "string[]",
      },
      {
        internalType: "string",
        name: "formIpfsHash",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "rewardPerReview",
        type: "uint256",
      },
      {
        components: [
          {
            internalType: "address",
            name: "reviewer",
            type: "address",
          },
          {
            internalType: "uint8",
            name: "targetIndex",
            type: "uint8",
          },
          {
            internalType: "string[]",
            name: "answers",
            type: "string[]",
          },
        ],
        internalType: "struct DeresyRequests.Review[]",
        name: "reviews",
        type: "tuple[]",
      },
      {
        internalType: "uint256",
        name: "reviewFormIndex",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isClosed",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_reviewFormIndex",
        type: "uint256",
      },
    ],
    name: "getReviewForm",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
      {
        internalType: "enum DeresyRequests.QuestionType[]",
        name: "",
        type: "uint8[]",
      },
      {
        internalType: "string[][]",
        name: "choices",
        type: "string[][]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
  {
    inputs: [],
    name: "getReviewRequestsNames",
    outputs: [
      {
        internalType: "string[]",
        name: "",
        type: "string[]",
      },
    ],
    stateMutability: "view",
    type: "function",
    constant: true,
  },
];

// Address for deployed contract within blockchain
export const DERESY_CONTRACT_ADDRESS = process.env.VUE_APP_CONTRACT_ADDRESS;
