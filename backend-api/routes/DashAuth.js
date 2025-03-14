const express = require('express');
const bcrypt = require('bcrypt');
const route = express.Router();
const User = require('../models/UserModel');

// REGISTER
route.post('/register', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const passFilter = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: passFilter,
        });
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// LOGIN
route.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            return res.status(400).json("Wrong credentials");
        }

        const validated = await bcrypt.compare(req.body.password, user.password);
        if (!validated) {
            return res.status(400).json("Wrong credentials");
        }

        const { password, ...others } = user._doc;
        res.status(200).json(others);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = route;