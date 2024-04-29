import {  Client,  Wallet, Payment, xrpToDrops }  from "xrpl" 
//import {xrpl} from "xrpl"

import printMoney from "./printMoney"

const client = new Client("wss://s.altnet.rippletest.net:51233")

const issuerSeed = 'sEdVH8bUeEnsx5SDC1VAqm7YCJ5QiLi'
const receiverSeed = 'sEdTLkGGQLbow2ydptZRjYvqS3c5Pxe'

const main = async () => {
  console.log("lets get started...");
  await client.connect();

//   // do something interesting here
//   console.log('lets fund 2 accounts...')
//   const { wallet: wallet1, balance: balance1 } = await client.fundWallet()
//   const { wallet: wallet2, balance: balance2 } = await client.fundWallet()
  
//   console.log('wallet1', wallet1)
  
//   console.log({ 
//       balance1, 
//       address1: wallet1.address, //wallet1.seed
//       balance2, 
//       address2: wallet2.address 
//   })

//   const tx:Payment  = {
//     TransactionType: "Payment",
//     Account: wallet1.classicAddress,
//     Destination: wallet2.classicAddress,
//     Amount: xrpToDrops("13")
//     };

//   const result = await client.submitAndWait(tx, {
//         autofill: true,
//         wallet: wallet1,
//     }); 

//    console.log(result)

//    console.log({
//     'balance 1': await client.getBalances(wallet1.classicAddress), 
//     'balance 2': await client.getBalances(wallet2.classicAddress)
//   })

  const wallet1 = Wallet.fromSeed(issuerSeed);
  const wallet2 = Wallet.fromSeed(receiverSeed);

  await printMoney({destinationWallet:wallet1, client:client})
/*
    const tx:Payment  = {
    TransactionType: "Payment",
    Account: wallet1.classicAddress,
    Destination: wallet2.classicAddress,
    Amount: xrpToDrops("13")
    };
    */

  await client.disconnect();
  console.log("all done!");

};

main();