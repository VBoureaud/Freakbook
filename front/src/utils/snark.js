
import { utils } from "ethers";


if (typeof module !== "undefined") var snarkjs = require('snarkjs')

export const verifyProof = async (proof, publicSignals) => {
  const vkey = await fetch("http://0.0.0.0:3002/public/verification_key.json");
  const vkeyJSON = await vkey.json();
  console.log('VKey: ', vkeyJSON)
  console.log('Signals: ', publicSignals)
  console.log('Proof: ', proof)

  const res = await snarkjs.groth16.verify(vkeyJSON, publicSignals, proof);
  console.log({ res });
  return res;
}
  
export const calculateProof = async (dateYear) => {
    const time = new Date().getTime() / 1000 / 86400 / 365.25;
    const nowYear = parseInt(time);

    console.log({ dateYear });
    const { proof, publicSignals } =
      await snarkjs.groth16.fullProve({
        'birthdate': dateYear,
        'referenceTime': nowYear,
      },
      "http://0.0.0.0:3002/public/circuit.wasm",
      "http://0.0.0.0:3002/public/circuit_0001.zkey");

    return {
      proof,
      publicSignals,
    };    
}
