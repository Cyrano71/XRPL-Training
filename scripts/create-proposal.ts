import {ethers} from "hardhat";
import 'dotenv/config'

const main = async () => {
    const VotingFactory = await ethers.getContractFactory("Voting");
    const voting = VotingFactory.attach(process.env.VOTING_ADDRESS as string);

    const transaction = await voting.createProposal("My proposal !", 8_187_425);
    await transaction.wait(1);
}

main();