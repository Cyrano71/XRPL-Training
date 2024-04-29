import {  Client,  Wallet, Payment, xrpToDrops }  from "xrpl" 

const printMoney = async ({destinationWallet, client}: any) => {
    const {wallet: wallet1, balance: balance1} = await client.fundWallet();

    console.log("wallet1", wallet1);

    const tx:Payment  = {
        TransactionType: "Payment",
        Account: wallet1.classicAddress,
        Destination: destinationWallet.classicAddress,
        Amount: xrpToDrops("90")
        };

        console.log("submitting the payment tx")

        const result = await client.submitAndWait(tx, {
        autofill: true,
        wallet: wallet1,
    }); 
}

export default printMoney;