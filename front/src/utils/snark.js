
//import wasm_hasher from "./zkeys/Hasher_2-1.test.wasm";
//import birthdate from "./zkeys/birthdate.wasm";
//import key_hasher from "./zkeys/Hasher_2-1.test.zkey";
import verification_key from "./zkeys/verification_key.json";

if (typeof module !== "undefined") var snarkjs = require('snarkjs')

export const calculateProof = async () => {
    const start = Date.now();
    console.log('start calculateProof');
    const { proof, publicSignals } =

      await snarkjs.plonk.fullProve( {in: [0, 0]}, "http://0.0.0.0:4765/public/birthdate.wasm", "http://0.0.0.0:4765/public/Hasher_2-1.test.zkey");

    const end = Date.now();
    const timeTaken = ((end - start) / 1000).toString() + ' seconds';
    console.log('step 1/3');

    //timeComponent.innerHTML = timeTaken;

    //proofCompnent.innerHTML = JSON.stringify(proof, null, 1);

    console.log('fetch verification_key');
    const vkey = await fetch(verification_key).then( function(res) {
        return res.json();
    });
    console.log('fetched, go plonk');

    const res = await snarkjs.plonk.verify(vkey, publicSignals, proof);
    console.log({ res });
    return res;
}
