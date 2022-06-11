pragma circom 2.0.0;

//include "./circomlib/poseidon.circom";
include "./circomlib/comparators.circom";


template isAdult() {
   signal input birthdate;
   signal input referenceTime;
   // signal input birthdate_hash;
   signal output out;

   component lt = LessThan(32);

   // age in days
   var age = (referenceTime / 86400) - (birthdate / 86400);

   // minimal number of days in 18 years
   lt.in[0] <== 6570;
   lt.in[1] <== age;

   lt.out ==> out;
}

component main = isAdult();

