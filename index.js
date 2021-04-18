const cors = require("cors")
const express = require("express")
const stripe = require("stripe")("sk_test_51Ih9sJFg5jYmbghI8XpmckbEiZg4NDE84hcV4UCQdnN99iDNGO1ie6skwVDrHQ8MZ5Vun2FPV9cgXRhhjpWaTUFg00cUbWuYaS")
const { v4: uuid }= require("uuid")

const app = express()
 
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("IT WORKS")
})

app.post("/payment", (req, res) => {

    const {product, token} = req.body
    console.log("PRODUCT", product);
    console.log("PRICE", product.price);
    const idempotencyKey = uuid()

    return stripe.customers
    .create({
        email: token.email, 
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            // compulsory
            amount: product.price * 100,
            currency: 'aud',
            customer: customer.id,
            receipt_email: token.email,
            description: 'purchase of ${product.name}',
        }, {idempotencyKey})
    })
    .then(result => res.status(200).json(result))
    .catch(err => console.log(err))

})

app.listen(3001, () => console.log("LISTENING AT PORT 3001"))