const GOERLI_ARBITRUM_NETWORK_ID = 421613;
const ARBITRUM_NETWORK_ID = 42161;

export const NETWORK_IDS = {
  development: GOERLI_ARBITRUM_NETWORK_ID,
  production: ARBITRUM_NETWORK_ID,
  staging: GOERLI_ARBITRUM_NETWORK_ID,
};

export const NETWORK_NAMES = {
  1: "Mainnet",
  3: "Ropsten",
  4: "Rinkeby",
  5: "Goerli",
  5777: "Ganache",
  421613: "Goerli Arbitrum",
  42161: "Arbitrum",
};
