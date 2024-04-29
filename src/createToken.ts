import { TrustSet, convertStringToHex, TrustSetFlags } from "xrpl";
import { Payment } from "xrpl/src/models";

async function createToken({ issuer, receiver, client, tokenCode }: any) {
  // Create the trust line to send the token
  const trustSet: TrustSet = {
    TransactionType: "TrustSet",
    Account: receiver.classicAddress,
    LimitAmount: {
      currency: tokenCode,
      issuer: issuer.classicAddress,
      value: "500000000", // 500M tokens
    },
    Flags: TrustSetFlags.tfClearNoRipple,
  };
  console.log(trustSet);

  // Receiver opening trust lines
  const preparedTrust = await client.autofill(trustSet);
  const signedTrust = receiver.sign(preparedTrust);
  const resultTrust = await client.submitAndWait(signedTrust.tx_blob);

  console.log(resultTrust);
  console.log("Trust line issuance tx result: ", resultTrust.result.hash);

  // Send the token to the receiver
  const sendPayment: Payment = {
    TransactionType: "Payment",
    Account: issuer.classicAddress,
    Destination: receiver.classicAddress,
    Amount: {
      currency: tokenCode,
      issuer: issuer.classicAddress,
      value: "200000000", // 200M tokens
    },
  };
  console.log(sendPayment);

  const preparedPayment = await client.autofill(sendPayment);
  const signedPayment = issuer.sign(preparedPayment);
  const resultPayment = await client.submitAndWait(signedPayment.tx_blob);

  console.log(resultPayment);
  console.log("Transfer issuance tx result: ", resultPayment.result.hash);

  return;
}

export default createToken;