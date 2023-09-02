import * as dotenv from 'dotenv';
import { HardhatUserConfig } from 'hardhat/config';
import '@typechain/hardhat'
import '@nomiclabs/hardhat-ethers'
import '@nomiclabs/hardhat-waffle'
import "@nomiclabs/hardhat-etherscan"
import "hardhat-gas-reporter";
import "@openzeppelin/hardhat-upgrades";

const { cmc, projectId, etherscan } = require('./secrets.json');

dotenv.config();
/* This loads the variables in your .env file to `process.env` */

const { 
  DEPLOYER_PRIVATE_KEY_1,
  DEPLOYER_PRIVATE_KEY_2,
  DEPLOYER_PRIVATE_KEY_3,
  DEPLOYER_PRIVATE_KEY_4,
  DEPLOYER_PRIVATE_KEY_5, 
  DEPLOYER_PRIVATE_KEY_6,
  DEPLOYER_PRIVATE_KEY_7,
  DEPLOYER_PRIVATE_KEY_8,
  DEPLOYER_PRIVATE_KEY_9,
  DEPLOYER_PRIVATE_KEY_10, 
  DEPLOYER_PRIVATE_KEY_11, 
  INFURA_PROJECT_ID 
} = process.env;

const config: HardhatUserConfig = {
  solidity: {
    compilers: [
        {
            version: "0.6.2",
            settings: {
              optimizer: {
                enabled: true,
                runs: 200,
              },
            },
        },
        {
          version: "0.7.6",
          settings: {
            optimizer: {
              enabled: true,
              runs: 200,
            },
          },
        },
        {
            version: "0.8.7",
            settings: {
              optimizer: {
                enabled: true,
                runs: 200,
              },
            },
        }
    ]
  },
  gasReporter: {
    coinmarketcap: cmc,
    currency: 'USD',
    gasPrice: 100
  },
  networks: {
    mainnet: {
      url: `https://mainnet.infura.io/v3/${INFURA_PROJECT_ID}`,
      chainId: 1,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY_1}`],
      gasPrice: 70000000000,

    },
    bscmainnet: {
      url: "https://bsc-dataseed.binance.org/",
      chainId: 56,
      gasPrice: 20000000000,
      accounts: [`0x${DEPLOYER_PRIVATE_KEY_1}`]
    },
    fuji: {
      url: 'https://api.avax-test.network/ext/bc/C/rpc',
      gasPrice: 225000000000,
      chainId: 43113,
      accounts: ["0x4a0493f32ce8ecd8c391283a16dc4df388fd9f6aeab2d34ecb5f79f26e696585"]
    },
    testnet: {
      url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [
        `0x${DEPLOYER_PRIVATE_KEY_1}`, 
        `0x${DEPLOYER_PRIVATE_KEY_2}`,
        `0x${DEPLOYER_PRIVATE_KEY_3}`,
        `0x${DEPLOYER_PRIVATE_KEY_4}`,
        `0x${DEPLOYER_PRIVATE_KEY_5}`,
        `0x${DEPLOYER_PRIVATE_KEY_6}`, 
        `0x${DEPLOYER_PRIVATE_KEY_7}`,
        `0x${DEPLOYER_PRIVATE_KEY_8}`,
        `0x${DEPLOYER_PRIVATE_KEY_9}`,
        `0x${DEPLOYER_PRIVATE_KEY_10}`,
        `0x${DEPLOYER_PRIVATE_KEY_11}`
      ],
    },
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${INFURA_PROJECT_ID}`,
      chainId: 4,
      accounts: [
        `0x${DEPLOYER_PRIVATE_KEY_1}`, 
        `0x${DEPLOYER_PRIVATE_KEY_2}`,
        `0x${DEPLOYER_PRIVATE_KEY_3}`,
        `0x${DEPLOYER_PRIVATE_KEY_4}`,
        `0x${DEPLOYER_PRIVATE_KEY_5}`,
        `0x${DEPLOYER_PRIVATE_KEY_6}`, 
        `0x${DEPLOYER_PRIVATE_KEY_7}`,
        `0x${DEPLOYER_PRIVATE_KEY_8}`,
        `0x${DEPLOYER_PRIVATE_KEY_9}`,
        `0x${DEPLOYER_PRIVATE_KEY_10}`,
        `0x${DEPLOYER_PRIVATE_KEY_11}`

      ],
      gasPrice: 35000000000,

    },
  },
  typechain: {
    outDir: "types",
    target: "ethers-v5",
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  mocha: {
    timeout: 500000
  }
};

export default config;

