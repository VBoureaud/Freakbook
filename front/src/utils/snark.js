
import { utils } from "ethers";


if (typeof module !== "undefined") var snarkjs = require('snarkjs')

export const calculateProof = async (dateYear) => {
    const start = Date.now();
    const time = new Date().getTime() / 1000 / 86400 / 365.25;
    const nowYear = parseInt(time);

    console.log({ dateYear });
    console.log({ nowYear });
    const hexDate = utils.hexValue(dateYear);
    const hexNow = utils.hexValue(nowYear);
    console.log(hexDate);
    console.log(hexNow);
    // timestamp date
    // timestamp current
    const { proof, publicSignals } =
      await snarkjs.groth16.fullProve({
        'birthdate': nowYear,
        'referenceTime': nowYear,
      },
      "http://0.0.0.0:3002/public/circuit.wasm",
      "http://0.0.0.0:3002/public/circuit_0001.zkey");

    const end = Date.now();
    const timeTaken = ((end - start) / 1000).toString() + ' seconds';
    console.log({timeTaken});
    console.log({proof});
    console.log({publicSignals});

    //timeComponent.innerHTML = timeTaken;

    //const proofComponent = JSON.stringify(proof, null, 1);

    console.log('fetch verification_key');
    const vkey = await fetch("http://0.0.0.0:3002/public/verification_key.json").then( function(res) {
        return res.json();
    });
    console.log('fetched, go plonk');

    const res = await snarkjs.groth16.verify(vkey, publicSignals, proof);
    console.log({ res });
    return res;
}
