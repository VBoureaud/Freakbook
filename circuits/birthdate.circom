pragma circom 2.0.0;

include "./circomlib/poseidon.circom";
include "./circomlib/comparators.circom";

template isAdult() {
   signal input birthdate;
   signal input referenceTime;
   signal input messageHash;

   signal output out;

   component lt = LessThan(32);
   component hash = Poseidon(1);
   component eq = IsEqual();

   hash.inputs[0] <== birthdate;

   //eq[0] <== hash.out;
   //eq[1] <== messageHash;

   //if(eq.out) {
      // age in days
      var age = (referenceTime / 86400) - (birthdate / 86400);

      // maximum number of days in 18 years
      lt.in[0] <== 6575;
      lt.in[1] <== age;

      lt.out ==> out;
  // }
  //else {
  //    eq.out ==> out;
  //}
}

component main {public [referenceTime, messageHash]} = isAdult();

