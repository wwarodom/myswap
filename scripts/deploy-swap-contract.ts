import { parseEther } from "@ethersproject/units";
import { constants } from "ethers";
import { ethers } from "hardhat";
import { ERC20__factory } from "../typechain";
import { MySwap } from "../typechain";

async function main() {
  const factory = await ethers.getContractFactory("MySwap");
  const contract: MySwap = (await factory.deploy()) as MySwap;

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  console.log("Account balance:", (await deployer.getBalance()).toString());

  console.log("pool fee: ", await contract.poolFee());

  const dai = ERC20__factory.connect(
    "0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa",
    deployer
  );

  console.log("balance dai: " + (await dai.balanceOf(deployer.address)));
  const tx = await dai.approve(contract.address, constants.MaxUint256);
  // const tx = await dai.decreaseAllowance(contract.address, 0);
  await tx.wait();

  console.log(
    "swap:",
    await contract.swapExactInputMultihop(parseEther("0.000001"))
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
