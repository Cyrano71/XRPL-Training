import {
    Bridge,
    BridgeManager,
    BridgeDirection,
    XrplBridgeDoor,
    XrplXChainProvider,
    EthersXChainProvider, EthersBridgeDoor, XrplXChainWallet, EthersXChainSigner, EthersXChainWallet, XrplXChainSigner
} from "xchain-sdk";
import {Client, Wallet} from "xrpl";
import { Wallet as EthersWallet, providers } from "ethers";
import 'dotenv/config'

const MAINCHAIN_NODE_URL = "wss://s.devnet.rippletest.net:51233";
const SIDECHAIN_NODE_URL = "http://168.119.63.112:8545";
const MAINCHAIN_PROVIDER = new XrplXChainProvider(new Client(MAINCHAIN_NODE_URL));
const SIDECHAIN_PROVIDER = new EthersXChainProvider(new providers.JsonRpcProvider(SIDECHAIN_NODE_URL));

const MAINCHAIN_DOOR = new XrplBridgeDoor(MAINCHAIN_PROVIDER, "rnJnBjnpTZPmUyZsW2QSenZhEwPzEuRSxz", "XRPL Devnet");
const SIDECHAIN_DOOR = new EthersBridgeDoor(
    SIDECHAIN_PROVIDER,
    "0xB5f762798A53d543a014CAf8b297CFF8F2F937e8",
    "EVM Sidechain Devnet",
);

async function main() {
    console.clear();

    const bridgeManager = await BridgeManager.createAsync(MAINCHAIN_DOOR, SIDECHAIN_DOOR);

    const xChainBridges = await bridgeManager.getXChainBridges();

    //const xChainBridge = xChainBridges.find(
     //   (xChainBridge) => xChainBridge.lockingChain.forEvm().issue.issuer == process.env.TOKEN_ADDRESS)

    //console.log("xChainBridge", xChainBridges)

    const originSigner = new XrplXChainSigner(Wallet.fromSeed(process.env.XRP_DEV_WALLET_SEED as string), MAINCHAIN_PROVIDER);
    
    const originWallet = new XrplXChainWallet(originSigner);

    const destinationSigner = new EthersXChainSigner(new EthersWallet(process.env.MY_PRIVATE_KEY as string, new providers.JsonRpcProvider(SIDECHAIN_NODE_URL)));
    const destinationWallet = new EthersXChainWallet(SIDECHAIN_PROVIDER, destinationSigner);

    const bridge = new Bridge(BridgeDirection.LOCKING_TO_ISSUING, xChainBridges[0]!);

    try {
        await bridgeManager.transfer(bridge, originWallet, destinationWallet, "10");
        console.log("XChain transaction success")
    } catch (_e) {
        // Handled by the "failed" listener
        console.log(_e);
    }
}

main();
