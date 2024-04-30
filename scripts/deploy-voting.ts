import {ethers} from "hardhat";

const main = async () => {
    const VotingFactory = await ethers.getContractFactory("Voting");
    const voting = await VotingFactory.deploy(process.env.TOKEN_ADDRESS as string);
    const votingAddress = await voting.getAddress();

    console.log("Voting address: ", votingAddress);
}

main();