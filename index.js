const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const collection = require("./mongodb");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Paths
const templatePath = path.join(__dirname, "../templates");
app.set("view engine", "hbs");
app.set("views", templatePath);
app.use(express.urlencoded({extended:false}))

// Routes
app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

// Signup Route
app.post("/signup", async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            password: req.body.password,
        };
        await collection.insertMany([data]);
        res.render("home");
    } catch (err) {
        res.send("Error: " + err.message);
    }
});



app.post("/login", async (req, res) => {

       try{
        const check=await collection.findOne({name:req.body.name})

        if (check.password===req.body.password){
            res.render("home")
        }
        else{
            res.send("wrong ")
        }
       } 
       catch  {
        res.send("wrong details");
       }
});



app.listen(3000, () => {
    console.log("port connected");
    console.log("Server is running...");
});
