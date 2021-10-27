import { constants } from "ethers";
import { ethers } from "hardhat";
import { ERC20__factory, SwapRouter__factory } from "../typechain";

import { parseFixed } from "@ethersproject/bignumber";

async function main() {

    const SWAP_V3_ROUTER = "0xE592427A0AEce92De3Edee1F18E0157C05861564";
    const DAI = "0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea";
    const USDC = "0x4dbcdf9b62e891a7cec5a2568c3f4faf9e8abe2b";
    const WETH9 = "0xc778417E063141139Fce010982780140Aa0cD5Ab";

    const fee = "3000"; // 0.3% fee as string 

    const [deployer] = await ethers.getSigners();
    console.log("Deployer account:", deployer.address);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    const dai = ERC20__factory.connect('0x5592EC0cfb4dbc12D3aB100b257153436a1f0FEa', deployer);
    console.log('balance dai: ' + await dai.balanceOf(deployer.address));

    // const tx = await dai.decreaseAllowance(SWAP_V3_ROUTER, 0); //remove approved
    // await tx.wait();

    // const allowance = await dai.allowance(deployer.address, SWAP_V3_ROUTER);
    // console.log('Allowance0: ' + allowance);

    const tx1 = await dai.approve(SWAP_V3_ROUTER, constants.MaxUint256);
    await tx1.wait();

    const allowance1 = await dai.allowance(deployer.address, SWAP_V3_ROUTER);
    console.log('Allowance1: ' + allowance1);

    const pathArr = [DAI, fee, USDC, fee, WETH9];
    const typeArr = ["address", "uint24", "address", "uint24", "address"];
    const pathInBytes = ethers.utils.solidityPack(typeArr, pathArr);

    const inputAmount = "0.001";
    const INPUT_TOKEN_DECIMAL = 18;
    const parsedInput = parseFixed(inputAmount, INPUT_TOKEN_DECIMAL);

    const params = {
        path: pathInBytes,
        recipient: deployer.address,
        deadline: Math.floor(new Date().getTime() / 1000) + 20 * 60,
        amountIn: parsedInput,
        amountOutMinimum: 0
    }

    try {
        const swapRouter = SwapRouter__factory.connect(SWAP_V3_ROUTER, deployer);
        const tx = await swapRouter.exactInput(params, { value: parsedInput });
        const result = await tx.wait();
        console.log('Tx hash: ', tx.hash);
        console.log('Result: ', result);

    }
    catch (e) {
        console.log('error: ', e);
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });


