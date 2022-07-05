//IMPORTS
const router = require('express').Router();
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const limit = require('../routes/token')

const posts = [
    {
        name:"Daus",
        post:"Post Daus",
        email:"nandos@nandos.com.my"
    },
    {
        name:"Fitri",
        post:"Post Fitri",
        email:"nanssdos@nandssos.com.my"
    }
]

router.get('/register',limit,(req,res) => {
    res.json(posts.filter(post => post.email === req.user))
})

//REGISTER
router.post('/register', async (req, res) => {


    //CHECK IF USER ALREADY REGISTERED
    const check = await User.findOne({ email: req.body.email });

    if (check) {

        return res.status(400).send("Email Exists!");

    }


    //SEND TO MONGODB
    try {

        //GENERATE SALT
        const salt = await bcrypt.genSalt();

        //HASH PASSWORD
        const hash = await bcrypt.hash(req.body.password, salt);

        //ACCEPT DETAILS
        const post = new User({

            name: req.body.name,
            email: req.body.email,
            password: hash

        });

        const push = await post.save();
        res.json(push);


    } catch (error) {

        res.status(400).send(error);

    }

});

//LOGIN
router.post('/login', async (req,res) => {

    //CHECK IF USER ALREADY REGISTERED
    const check = await User.findOne({ email: req.body.email });

    //NOTIFY IF USER NOT REGISTER
    if (!check) {

        return res.status(400).send("Email Not Exists!");

    }

    //COMPARE PASSWORD
    const valid = await bcrypt.compare(req.body.password, check.password);

    //CHECK PASSWORD
    if(!valid){

        return res.status(400).send("Invalid Password!");

    }

    //GENERATE JWT TOKEN
    const token = jwt.sign(req.body.email , process.env.ACCESS_TOKEN_SECRET)

    //SET TOKEN TO HEADER
    res.header('auth-token', token).send(token);


})


//EXPORTS
module.exports = router;