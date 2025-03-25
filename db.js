const mongoose = require('mongoose');
require('dotenv').config();

// const mongoURL = 'mongodb://127.0.0.1:27017/hotels';
// const mondoURL = process.env.MONGODB_URL_Local;

// const mongoURL = 'mongodb+srv://admin:AAGMan123@cluster0.8vwo0.mongodb.net/'; 
const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL);

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Connected to MongoDB');
});

db.on('error', (err) => {
    console.log('Error connecting to MongoDB', err);
}); 

db.on('disconnected', () => {   
    console.log('Disconnected from MongoDB');
});

module.exports = db; 