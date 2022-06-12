
//import wasm_hasher from "./zkeys/Hasher_2-1.test.wasm";
//import birthdate from "./zkeys/birthdate.wasm";
//import key_hasher from "./zkeys/Hasher_2-1.test.zkey";
//import verification_key from "./zkeys/verification_key.json";
import { BigNumber, utils } from "ethers";

if (typeof module !== "undefined") var snarkjs = require('snarkjs')

export const calculateProof = async (dateSeconds) => {
    const start = Date.now();
    console.log('start calculateProof');
    const time = new Date().getTime() / 1000;
    const nowSeconds = parseInt(time);
    console.log({ nowSeconds });
    console.log({ dateSeconds });
    const bigIntNow = BigNumber.from(nowSeconds);
    const bigIntBirthDate = BigNumber.from(dateSeconds);
    console.log(utils.hexlify(utils.arrayify(bigIntBirthDate)));
    console.log(utils.hexlify(utils.arrayify(bigIntNow)));
    // timestamp date
    // timestamp current
    const { proof, publicSignals } =
      await snarkjs.groth16.fullProve({
        'birthdate': utils.hexlify(utils.arrayify(bigIntBirthDate)),
        'referenceTime': utils.hexlify(utils.arrayify(bigIntNow)),
      },
      "http://0.0.0.0:4765/public/birthdate.wasm",
      "http://0.0.0.0:4765/public/birthdate_0001.zkey");

    const end = Date.now();
    const timeTaken = ((end - start) / 1000).toString() + ' seconds';
    console.log({proof});
    console.log({publicSignals});

    //timeComponent.innerHTML = timeTaken;

    //proofCompnent.innerHTML = JSON.stringify(proof, null, 1);

    /*console.log('fetch verification_key');
    const vkey = await fetch(verification_key).then( function(res) {
        return res.json();
    });
    console.log('fetched, go plonk');

    const res = await snarkjs.plonk.verify(vkey, publicSignals, proof);*/
    return true;
}
