pragma circom 2.0.0;

include "../node_modules/circomlib/circuits/comparators.circom";

template isAdult() {
   signal input birthdate;
   signal input referenceTime;

   signal output out;

   component lt = LessThan(32);

   // age in days
   var age = referenceTime - birthdate;

   // maximum number of days in 18 years
   lt.in[0] <== 17;
   lt.in[1] <== age;

   lt.out ==> out;
}

component main {public [referenceTime]} = isAdult();

