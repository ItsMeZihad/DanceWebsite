const express = require("express");
const path = require("path");
const app = express();
const port = 80;
// const mongoose = require("mongoose");
const bodyparser = require("body-parser");

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
})
app.post('/contact', (req, res) => {
    const myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been send to the database")
    }).catch(() => {
        res.status(400).send("Item was not saved to the database")
    });
    // res.status(200).render('contact.pug');
})

//MongoDB DataBase
// getting-started.js
const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost/contactDance');
}

// Define Mongoose Schema
const contactSchema = new mongoose.Schema({
    name: String,
    Age: String,
    Email: String,
    Phone: String,
    Address: String,
});

const Contact = mongoose.model('Contact', contactSchema);


// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});