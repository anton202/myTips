const jwt = require('jsonwebtoken');
const User = require('../models/user');


module.exports = (req, res, next) => {
    let userName
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, 'thisisaverystrongsecrete');
        req.body.userName = decoded.userName;
        userName = decoded.userName;
      
    } catch (error) {
        console.log(error,'catch block')
        res.status(401).json({ message: 'token is not valid' });
    }

    User.findOne({userName:userName})
    .then(user =>{
        if(user === null){
            return res.status(500).json({ message: 'user does not exist' });
        }
        next();
    })
    .catch(error => res.status(500))
    
}