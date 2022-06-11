
import wasm_hasher from "./zkeys/Hasher_2-1.test.wasm";
import key_hasher from "./zkeys/Hasher_2-1.test.zkey";
import verification_key from "./zkeys/verification_key.json";

if (typeof module !== "undefined") var snarkjs = require('snarkjs')

export const calculateProof = async () => {
    const start = Date.now();
    const { proof, publicSignals } =
      await snarkjs.plonk.fullProve( {in: [0, 0]}, "http://0.0.0.0:8047/Hasher_2-1.test.wasm", "http://0.0.0.0:8047/Hasher_2-1.test.zkey");

    const end = Date.now();
    const timeTaken = ((end - start) / 1000).toString() + ' seconds';

    timeComponent.innerHTML = timeTaken;

    proofCompnent.innerHTML = JSON.stringify(proof, null, 1);

    const vkey = await fetch(verification_key).then( function(res) {
        return res.json();
    });

    const res = await snarkjs.plonk.verify(vkey, publicSignals, proof);
    return res;
}
