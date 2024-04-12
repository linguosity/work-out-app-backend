require("dotenv").config();
require("./models/index");

const express = require("express");
const app = express();
const cors = require("cors");

const routes = require("./controllers");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", routes);

app.use((req,res) =>{
    res.status(404).json({message: "Unspecified route"})
})

app.listen(process.env.PORT, ()=> {
    console.log("Connected and running")
})