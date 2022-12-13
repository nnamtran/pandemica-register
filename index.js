require('dotenv').config()
const path = require('path')
 
PORT = process.env.PORT || 3000

const express = require('express')
const {MongoClient} = require('mongodb')
const cors = require('cors')
const uri = "mongodb+srv://nnamtran:87422491243Nam@cluster0.w7tfk6i.mongodb.net/?retryWrites=true&w=majority";

const app = express()
app.use(cors())
app.use(express.json())
// account: nnamtran - 87422491243Nam
app.get('/test', (req, res, next) => {
    res.json('Hello to my app')
}) 

app.post('/positive', async(req, res) => {
    const client = new MongoClient(uri)
    const formData = req.body.formData
    

    try {
        await client.connect()
        const database = client.db('app-data')
        const register = database.collection('register-result')

        const data = {
            day: formData.day,
            month: formData.month,
            year: formData.year,
            name: formData.full_name,
            medicare: formData.medicare,
            isoAddress: formData.isoAddress,
            mobile: formData.mobile,
            email: formData.email
        }

        const insertedRegister = await register.insertOne(data)
        res.status(200).send('Success')

    } catch(error) {
        console.log(error)
    }
})

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

app.listen(PORT, () => console.log('Server running on PORT' + PORT))