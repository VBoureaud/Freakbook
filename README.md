Alice Bob

Plateform

Create an account Alice

Bob connect with Alice

Alice recieve request
Accept

Bob recieve data from alice


----

Central data provider: freakbook, with private key for signing, keeps records

-- Sign up process
1: Encrypt date of birth with user private key
2. Hash non-encrypted version of the date (poseidon hashing)
3: Store encrypted message and hash of original date to freakbook

-- Share info
1: Sign with FreakBook => signing the encrypted birthdate info + random number (can be current blockhash) + hash of date
2: App calculates zkproof
3. App decrypts encrypted birthdate
3: 1proof = birthdate (private input) + 3 public inputs - referenceTime + hash of date (decrypted date) + random number from server
4: share proof
5: external verification

groth16prove 
