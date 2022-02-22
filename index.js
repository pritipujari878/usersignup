import express from 'express';
// const app = express();
import bodyParser from 'body-parser';
import mongoose from 'mongoose'

const app = express()

app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended: true
}))

mongoose.connect('mongodb://localhost:27017/Signupform')
    .then(() => {
        console.log('mongodb started');
    })
    .catch(() => {
        console.log('mongodb connection failed');
    })
var db = mongoose.connection;

db.on('error', () => console.log("Error in Connecting to Database"));
db.once('open', () => console.log("Connected to Database"))

app.post("/sign_up", (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var contactno = req.body.contactno;
    var password = req.body.password;

    var data = {
        "name": name,
        "email": email,
        "contactno": contactno,
        "password": password
    }

    db.collection('users').insertOne(data, (err, collection) => {
        if (err) {
            throw err;
        }
        console.log("Record Inserted Successfully");
    });

    return res.redirect('signup_success.html')

})


app.get("/", (req, res) => {
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);


console.log("Listening on PORT 3000");
