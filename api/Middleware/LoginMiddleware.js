const User = require("../Models/User");
const bcrypt = require('bcrypt')

exports.LoginMiddleware = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const val = await User.findOne({ email })
        if (!val) {
            console.log("There is no such user exist");
            return res.status(404).json({
                msg: "No such user exist",
            })
        }
        const check = await bcrypt.compare(password,val.password)
        if(!check){
            console.log("Incorrect Password")
            return res.status(401).json({
                msg:"Incorrect Password"
            })
        }
        val.password = undefined
        req.user = val
    }
    catch (err) {
        res.status(500).json({
            msg:"Some error Occured middleware"
        })
    }
    next();
}