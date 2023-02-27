const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 4000

const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

//require database models
const User = require('./models/users')

//middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors()) // cross origin resource sharing

const dbURL = "mongodb://localhost:27017/foodie"
mongoose.connect(dbURL).then(() => {
    console.log("Connected to database");
})

app.post('/signup', async (req, res) => {
    User.findOne({ email: req.body.email }, (err, userData) => {
        if (userData) {
            res.send({ message: "Seems like you already have an account with this email address" })
        } else {
            const data = new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            })
            data.save(()=>{
                if (err) {
                    res.send(err)
                } else {
                    res.send({message:"User registered successfully"})
                }
            })
        }
    })
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})