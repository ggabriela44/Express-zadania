// import
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const hbs = require("express-handlebars");

mongoose.connect("mongodb://localhost:27017/usersDB",);

const UserSchema= new mongoose.Schema({
    name: String,
    username: String,
    email: String,
    address: {
        street: String,
        suite: String,
        city: String,
        zipcode: String,
        geo: {
            lat: String,
            lng: String
        }
    },
    phone: String,
    website: String,
    company: {
        name: String,
        catchPhrase: String,
        bs: String
    }
});


const User = mongoose.model("User", UserSchema);


app.engine("hbs", hbs.engine({extname:"hbs"}));
app.set("view engine", "hbs");
app.set("views", "./views");

// main page
app.get("/", async (req, res) => {
    const users = await User.find().lean();
    res.render("users", {users});
});

const PORT = 3100;
app.listen(PORT, () => console.log(`Server working at http://localhost:${PORT}`));