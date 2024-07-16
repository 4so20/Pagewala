const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/productDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Define a schema and model for the product data
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    house: String,
    road: String,
    pincode: String,
    city: String,
    state: String,
    landmark: String
});

const Contact = mongoose.model('Contact', contactSchema);

// Handle form submissions
app.post('/submit', async (req, res) => {
    try {
        const newContact = new Contact(req.body);
        await newContact.save();
        res.status(201).send('Data saved to MongoDB');
    } catch (error) {
        res.status(400).send('Error saving data');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
