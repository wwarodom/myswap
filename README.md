# My Swap
 
### swapExactInputMultiHop() #DevSession

Configure .env 
* API Key for alchemy
* Private key for deployer related to your wallet in Rinkeby


```shell
npm i
npx hardhat run scripts/deploy-swap-contract.ts --network rinkeby
npx hardhat run scripts/swap-by-router.ts --network rinkeby
```
 
[บทความอ้างอิง](https://werapun.com/%E0%B8%A7%E0%B8%B4%E0%B8%98%E0%B8%B5%E0%B8%81%E0%B8%B2%E0%B8%A3-swap-token-%E0%B8%81%E0%B8%B1%E0%B8%9A-uniswap-b6755468d628)