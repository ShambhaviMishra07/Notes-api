const express = require("express");
const router = express.Router();
const User = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

router.post("/register",async (req, res) => {
    const {email, password} = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
        email,
        password: hashedPassword
    });

    res.json(user);
});

//Login
router.post("/login", async(req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(!User) return res.status(400).json({message: "User not found"});
    
    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch) return res.status(400).json({message: "Something went wrong"});

    const token = jwt.sign({id: user._id}, "secretkey");

    res.json({token});
});

module.exports = router;