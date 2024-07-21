const User  = require('../Models/User');
const Place = require('../Models/Place')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Booking = require('../Models/Booking');
const password = "Random123897"
const stripe = require('stripe')('sk_test_51PebFdFEZRyQV6i8uxn5VjnaeMhPFbm6BYtom7dclW5pNJlX87tx8g61bvCPQwggbZEYQOczQt6a2WQyEHYLONsY00gQBqNxYc')
exports.routerController = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const val = await User.findOne({email})
        if(val){
           return res.status(403).json({
                msg:"Email already exist in the data base"
            })
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const data = await User.create({
            name,
            email,
            password: hashedPassword,
            profilePicture:''
        });
        console.log("Request Recieved and User Created");
        return res.status(200).json({
            name,
            email
        });
   } catch (err) {
        console.error(err);
        res.status(422).json({
            msg: "Error occurred while sending the request"
        });
    }
};

exports.loginController = async(req,res)=>{
    try{
        const {user} = req
        const token =await jwt.sign({id:user._id,email:user.email},password,{expiresIn:'7d'})
        // console.log("Error aagya h")
        // console.log(token);
         res.cookie('token',token).status(200).json({
           user
        })
    }
    catch(err){
        console.log("Error occured during login backend")
        console.log(err)
        return res.status(500).json({
            msg:"Some error occured"
        })
    }
}

exports.profileController = async (req, res) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            return res.json(null); // Corrected to sendStatus
        }
        jwt.verify(token, password, async (err, data) => {
            if (err) {
                console.log(err);
                if (err.name === 'TokenExpiredError') {
                    return res.status(403).json({ msg: 'Access token expired' });
                } else {
                    return res.status(403).json({ msg: 'Invalid token' });
                }
            }

            const userData = await User.findById(data.id);
            userData.password = undefined;
            // console.log(userData);
            return res.status(200).json({ userData });
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err }); // Changed to status 500
    }
};


exports.logoutController = (req,res)=>{
    res.cookie('token','').json(true)
}

exports.addPlacesController = (req,res)=>{
  const {token} = req.cookies
  if (!token) {
    return res.json(null); // Corrected to sendStatus
}
console.log(token)
  const {title,address,addedPhotos,
    description,perks,extraInfo,
    checkIn,checkOut,maxGuests,price} = req.body
    // console.log(perks)
    jwt.verify(token, password, async (err, data) => {
        if (err) {
            console.log(err);
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ msg: 'Access token expired' });
            } else {
                return res.status(403).json({ msg: 'Invalid token' });
            }
        }
    console.log(data)
    const placeDoc = await Place.create({
        owner:data.id,
        title,address,addedPhotos,
        description,perks,extraInfo,
        checkIn,checkOut,maxGuests,price
    })
    // console.log(placeDoc)
    res.json(placeDoc)
  })

}


exports.showPlace = (req,res)=>{
    const {token} = req.cookies
    jwt.verify(token, password, async (err, data) => {
        if (err) {
            console.log(err);
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ msg: 'Access token expired' });
            } else {
                return res.status(403).json({ msg: 'Invalid token' });
            }
        }
        const {id} = data
        res.json(await Place.find({owner:id}))
  })
}


exports.getPlaceById = async(req,res)=>{
    const {id} = req.params
    
    res.json(await Place.findById(id))
}

exports.putPlaceById = async(req,res)=>{
    const {token} = req.cookies
    const {title,id,address,addedPhotos,
        description,perks,extraInfo,
        checkIn,checkOut,maxGuests,price} = req.body
    jwt.verify(token, password, async (err, data) => {
        if (err) {
            console.log(err);
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ msg: 'Access token expired' });
            } else {
                return res.status(403).json({ msg: 'Invalid token' });
            }
        }
        const placeDoc = await Place.findById(id);
        if(data.id === placeDoc.owner.toString()){
            placeDoc.set({
                title,address,addedPhotos,
                description,perks,extraInfo,
                checkIn,checkOut,maxGuests,price
            })
            await placeDoc.save();
            res.json('ok')
        }
  })
}


exports.getAllPlaces = async(req,res)=>{
    res.json(await Place.find())
}


exports.bookingPlaces = (req,res)=>{
    const {token} = req.cookies
    if(!token)
       return res.status(403).json({ msg: 'No Token is available' });
    jwt.verify(token, password, async (err, data) => {
        if (err) {
            console.log(err);
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ msg: 'Access token expired' });
            } else {
                return res.status(403).json({ msg: 'Invalid token' });
            }
        }
        const {place,checkIn,checkOut,numberOfGuests,name,phone,price} = req.body;
        Booking.create({
            place,checkIn,checkOut,numberOfGuests,name,phone,price,user:data.id
        }).then((result)=>{
            res.json(result)
        }).catch(err=>{
            console.log(err)
        })
  })
}

exports.getBooking = async(req,res)=>{
    const {token} = req.cookies
    jwt.verify(token, password, async (err, data) => {
        if (err) {
            console.log(err);
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ msg: 'Access token expired' });
            } else {
                return res.status(403).json({ msg: 'Invalid token' });
            }
        }
      res.json(await Booking.find({user:data.id}).populate('place').exec())
  })
}

exports.makePayment = async (req, res) => {
    const {token} = req.cookies
    if(!token)
       return res.status(403).json({ msg: 'No Token is available' });
    jwt.verify(token, password, async (err, data) => {
        if (err) {
            console.log(err);
            if (err.name === 'TokenExpiredError') {
                return res.status(403).json({ msg: 'Access token expired' });
            } else {
                return res.status(403).json({ msg: 'Invalid token' });
            }
        }
        const result = req.body;
        const {place,checkIn,checkOut,numberOfGuests,name,phone,price} = result[0];
        Booking.create({
            place,checkIn,checkOut,numberOfGuests,name,phone,price,user:data.id
        }).catch(err=>{
            console.log(err)
        })
        const lineItems = result.map((product) => ({
            
            price_data: {
                currency: 'usd',
                product_data: {
                    name: product.name
                },
                unit_amount: product.price * 100
            },
            quantity: product.numberoOfMaxGuests,    
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: 'payment',
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel"
        });
        res.json({ url: session.url })
  })
};