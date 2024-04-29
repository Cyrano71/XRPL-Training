import {  Client,  Wallet, Payment, xrpToDrops, TrustSet }  from "xrpl" 
import convertStringToHexPadded from "./convertStringToHexPadded"
import enableRippling from "./enableRippling"
import createToken from "./createToken"
import createAMM from "./createAMM"

const client = new Client("wss://s.altnet.rippletest.net:51233")

const issuerSeed = 'sEdTLkGGQLbow2ydptZRjYvqS3c5Pxe'
const receiverSeed = 'sEdVH8bUeEnsx5SDC1VAqm7YCJ5QiLi' 

const main = async () => {
  console.log("lets get started...");
  await client.connect();

  const issuer = Wallet.fromSeed(issuerSeed)
  const receiver = Wallet.fromSeed(receiverSeed)

  console.log(receiver);

  console.log({
    balanceIssuer: await client.getBalances(issuer.classicAddress),
    balanceReceiver: await client.getBalances(receiver.classicAddress),
  });

    /*
  await enableRippling({wallet: issuer, client});

  await createToken({issuer, receiver, client, tokenCode: convertStringToHexPadded("JG")})
    */

  await createAMM({issuer, receiver, client, tokenCode: convertStringToHexPadded("JG")})

  await client.disconnect();
  console.log("all done!");
};

main();