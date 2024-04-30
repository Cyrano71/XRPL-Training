import {ethers} from "hardhat";
import 'dotenv/config'

const main = async () => {
    const factory = await ethers.getContractFactory("XRPLCommonsToken");
    const easyAToken = factory.attach(process.env.TOKEN_ADDRESS as string);

    const transaction = await easyAToken.buy({
        value: ethers.utils.parseEther("1"),
    });

    await transaction.wait(1);
}

main();