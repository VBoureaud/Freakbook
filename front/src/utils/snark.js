
if (typeof module !== "undefined") var snarkjs = require('snarkjs')

export const calculateProof = async (dateSeconds) => {
    const start = Date.now();
    const time = new Date().getTime() / 1000;
    const nowSeconds = parseInt(time);

    // timestamp date
    // timestamp current
    const { proof, publicSignals } =
      await snarkjs.groth16.fullProve({
        'birthdate': dateSeconds,
        'referenceTime': nowSeconds,
      },
      "http://0.0.0.0:3002/public/birthdate.wasm",
      "http://0.0.0.0:3002/public/birthdate_0001.zkey");

    const end = Date.now();
    const timeTaken = ((end - start) / 1000).toString() + ' seconds';
    console.log({timeTaken});
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
