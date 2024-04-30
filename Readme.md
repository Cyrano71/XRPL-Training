# XRPL Training

## First Day

### Docs

https://github.com/XRPL-Commons/xrpl-training-april-2024

https://testnet.xrpl.org/accounts/rLeYKKxAcYrvBPvw69AMdHyGEAiZrCGrZu

### Liquidity Pools

![alt text](./assets/liquidity.PNG)

![alt text](./assets/liquidity2.PNG)

## Second Day

### EVM Side Chain

### Docs

https://opensource.ripple.com/docs/evm-sidechain/intro-to-evm-sidechain/

https://bridge.devnet.xrpl.org

https://wizard.openzeppelin.com/

https://github.com/Peersyst/xrpl-commons-workshop

### Result

hardhat run --network evmSidechain scripts/deploy-token.ts

XRPLCommonsToken address:  0xC85356E3da0f18da377C317440024cc72b2603ae

use npm install --save-dev ethers@5.7.2 to send to the mainchain

### Flatten

1. npm run flatten to create the Flattened.sol

2. go to the explorer and click on contract => verify 

![alt text](./assets/verify.PNG)

3. Enter these parameters

VerificationMethod = Solidity (Flattened source code)
Compiler = v0.8.24
Evm Version = Paris
Put the content of the Flattened.sol in Contract Code
Click on Verify & Publish button

![alt text](./assets/verify2.PNG)

4. As result you will see the code of the smart contract uploaded to
the blockchain and you will be able to directly call the functions

![alt text](./assets/verify3.PNG)

![alt text](./assets/verify4.PNG)


