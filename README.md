# Freakbook birthday example

### Freakbook data provider

Contains database of encrypted data from user ( birthdates in this case )
Structure of the data: 

| Birthdate                                                             | Address   |
|-----------------------------------------------------------------------|-----------|
| ```{ "Encrypted Date of Birth: " : "...","HashOfPlainText": "..."}``` | "0xab..." |

Freakbook also has an ethereum address and this address is used for freakbook identity provider initialization on chain.

***Data Provider Initialization*** happens by making it known in freakbook smart contract that certain address is playing a role of an identity provider by calling setIdentityProviderAddress() method.

### Freakbook user

Freakbook users want to be able to share certain properties of their data to other third parties which can verify these properties without having actual data in posession.

***User sign up process***
- Encrypt date of birth with user private key
- Hash non-encrypted version of the date (poseidon hashing)
- Store encrypted message and hash of original date to freakbook

***Share properties***
- Sign with FreakBook => signing the encrypted birthdate info + current timestamp + hash of date
- App calculates zkproof
- App decrypts encrypted birthdate
- Create proof => birthdate (private input) + 3 public inputs - referenceTime + hash of date (decrypted date) + current timestamp (from server)
- Share proof
- External verification

