// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./users');


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(express.static('public'));

const url = 'mongodb+srv://ssshankar1910:admin123@cluster0.yoeeqlo.mongodb.net/';
const dbName = 'sam';
mongoose.connect(url + dbName);

const db = mongoose.connection;

db.on('error', () => console.log("connection error"));
db.once('open', () => {
    console.log("db is connected");
});

app.get('/', (req, res) => {
    res.sendFile('C:\Users\S.S.Shakar\OneDrive\Desktop\project\public\signup.html')
});

app.get('/singup',(req,res)=>{
    es.sendFile('C:\Users\S.S.Shakar\OneDrive\Desktop\project\public\signup.html')
})

app.post('/signup', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    // Validate that both email and password are provided
    if (!email || !password) {
        return res.status(400).send('Email and password are required.');
    }

    try {
        const user = new User({
            email: email,
            password: password
        });

        const addedUser = await user.save();
        console.log(addedUser);
        res.redirect('/401.html');
    } catch (error) {
        console.error('Error creating user:', error.message);
        res.status(500).send('Internal Server Error');
    }
});


app.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findOne({ email: email, password: password });

        if (user) {
            res.redirect('/401.html');
        } else {
            res.redirect('/?error=InvalidCredentials');
            // res.status(401).send({ success: false, message: 'Invalid credentials. Please try again.' });
        }
    } catch (error) {
        console.error('Error querying the database', error);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
