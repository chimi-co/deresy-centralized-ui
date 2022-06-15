import Web3 from 'web3'

import { INFURA_MAINNET_BASE_URL } from '../constants/walletConstants'

export const web3InfuraClient = () => {
  const provider = `${INFURA_MAINNET_BASE_URL}/${process.env.VUE_APP_INFURA_API_KEY}`
  return new Web3(provider)
}

export const web3WalletClient = (provider) => {
  const web3 = new Web3(provider)

  web3.eth.extend({
    methods: [
      {
        name: 'chainId',
        call: 'eth_chainId',
        outputFormatter: web3.utils.hexToNumber,
      },
    ],
  })
  return web3
}
