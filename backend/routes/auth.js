const express = require('express');
const router = express.Router();
const User = require("../models/User")

// Create a User:  POST "/api/auth" Dosent require auth
router.post('/', (req, res)=>{
    const user = User(req.body);
    user.save()
    console.log(req.body)
    res.send('hello')
})
module.exports = router