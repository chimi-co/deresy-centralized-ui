const MAINNET_NETWORK_ID = 1
const RINKEBY_NETWORK_ID = 4
// const GANACHE_NETWORK_ID = 5777

export const INFURA_MAINNET_BASE_URL = 'https://mainnet.infura.io/v3'

export const NETWORK_IDS = {
  // development: GANACHE_NETWORK_ID
  development: RINKEBY_NETWORK_ID,
  production: MAINNET_NETWORK_ID,
  staging: MAINNET_NETWORK_ID,
}

export const NETWORK_NAMES = {
  1: 'Mainnet',
  3: 'Ropsten',
  4: 'Rinkeby',
  5: 'Goerli',
  5777: 'Ganache',
}
