const User = require("./../models/user.models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")


async function handleUserSignUp(req, res) {
    const { name, email, password } = req.body;

    try {
        const isExists = await User.findOne({email })
        if(isExists) {
           return res.status(400).send({message : "User Already Exists"})
        }
       
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            'HAPPYREJOICE', 
            { expiresIn: '1h' }
        );

       
        res.cookie('token', token, { httpOnly: true });

       
        return res.status(201).send({
            message: "User Created Successfully",
            data: {
                payload: {
                    name: user.name,
                    email: user.email
                }, 
                token : token
            }
        });
    } catch (error) {
        
        return res.status(500).send({
            message: "An error occurred",
            error: error.message
        });
    }
}

async function handleUserSignIn(req, res) {
    const {  email, password } = req.body;

    try {
        const userData = await User.findOne({email })
        if(!userData) {
           return res.status(400).send({message : "User Deosn't Exists"})
        }

        const isAuth = bcrypt.compare(userData.password , password);

        if(!isAuth){
            return res.status(500).send({
                message : "Please Enter the Correct Password"
            })
        }


        const token = jwt.sign(
            { userId: userData._id, email: userData.email },
            'HAPPYREJOICE', 
            { expiresIn: '1h' }
        );

  
        res.cookie('token', token, { httpOnly: true });

        return res.status(201).send({
            message: "User LoggedIn Successfully",
            data: {
                payload: {
                    name: userData.name,
                    email: userData.email
                }, 
                token : token
            }
        });
    } catch (error) {
        // Handle any errors that occur during userData creation
        return res.status(500).send({
            message: "An error occurred",
            error: error.message
        });
    }
}

module.exports = { handleUserSignUp ,handleUserSignIn };