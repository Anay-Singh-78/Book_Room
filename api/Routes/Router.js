const express = require('express')
const router = express.Router()
const {LoginMiddleware} = require('../Middleware/LoginMiddleware')
const {routerController,loginController,profileController, logoutController,addPlacesController, showPlace,getPlaceById, putPlaceById, getAllPlaces, bookingPlaces, getBooking} = require('../Controller/RouterController')

router.post('/register',routerController);
router.post('/login',LoginMiddleware,loginController);
router.get('/profile',profileController)
router.post('/logout',logoutController)
router.post('/places',addPlacesController)
router.get('/user-places',showPlace)
router.get('/places/:id',getPlaceById)
router.put('/places',putPlaceById)
router.get('/places',getAllPlaces)
router.post('/booking',bookingPlaces)
router.get('/bookings',getBooking)
module.exports = router;