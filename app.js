const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
require("dotenv").config();
const noteRoutes = require("./routes/noteRoutes");
const authRoutes = require("./routes/authRoutes");

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("Database connected"))
.catch(err => console.log(err));

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use("/notes", noteRoutes);
app.use("/auth", authRoutes);

app.get("/", function(req, res){
    res.send("Notes API is running");
});

app.listen(3000 , () => {
    console.log("Server running on port 3000");
});