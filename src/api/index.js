const cryptography = require('@liskhq/lisk-cryptography');
const transactions = require('@liskhq/lisk-transactions');

const express = require('express')
const web3 = require('web3')
require('dotenv').config()
const postgres = require('@metamodules/postgres')()

const app = express()
const port = 4000

console.log("-------------------test-----starts-------------------")
var messageToSign = 'Please digitally sign this message for login on the platform:275657525'

console.log("messageToSign:", messageToSign)

var myLocalPassphrase = "nest trust happy owner notice shove green husband begin toy desert fault"

var signedData = cryptography.signMessageWithPassphrase(
  messageToSign,
  myLocalPassphrase
  );

// Output:
// signedData: {
// [api]   message: 'Please digitally sign this message for login on the platform:275657525',
// [api]   publicKey: <Buffer 5e 58 0b bd ce 52 ec 2a 9e d2 49 19 26 26 e8 11 b0 e7 e0 b6 8f 3e 70 86 dc 23 2e f4 46 cf e5 0b>,
// [api]   signature: <Buffer cd 44 e7 98 00 86 0f 6b 17 56 7c e6 6d 0c a9 1a 90 3b be b1 d5 79 aa 95 e4 6b a3 a4 ba c6 ff 05 27 24 fe 93 6b 0a 32 33 7f ff fd 46 10 09 95 92 d5 7d ... 14 more bytes>
// [api] }


// Here it is showing different public key extracted from the Passphrase as compared to the Phaeton APK
// If used with that public key to verify the above sign message, the verification results in false

console.log("signedData:", signedData)

var validSign = cryptography.verifyMessageWithPublicKey(signedData);
console.log("validSign:", validSign)


console.log("-------------------test------ends------------------")

app.get('/api/count', (req, res) => {
  postgres.query('SELECT count(*) AS count FROM clicks', (err, resp) => {
    res.send({ count: resp.rows[0].count || 0 })
  })
})

app.post('/api/count/increment', (req, res) => {
  postgres.query('INSERT INTO clicks DEFAULT VALUES', (err, insert) => {
    postgres.query('SELECT count(*) AS count FROM clicks', (err, resp) => {
      res.send({ count: resp.rows[0].count || 0 })
    })
  })
})

app.listen(port, () => console.log(`Example backend API listening on port ${port}!`))
