const express = require('express')
const router = require('./Routes/Router');
const { default: mongoose } = require('mongoose');
const cookieParser = require('cookie-parser')
const multer = require('multer')
const imageDownloader = require('image-downloader')
const cors = require('cors');
const fs = require('fs')

const app = express();
app.use(express.json())
app.use('/uploads',express.static(__dirname+'/uploads'))
app.use(cookieParser())
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200,
    methods: ["GET", "POST", "PUT", "DELETE"]
}
app.use(cors(corsOptions));
app.use(router);
require('dotenv').config()
const url = process.env.MONOGO_URL
mongoose.connect(url);
app.get('/',(req,res)=>{
    res.send("Hello world")
})
// console.log(__dirname);
app.get('/test',(req,res)=>{
    console.log("Test Route is working successfully")
})
app.post('/upload-by-link',async(req,res)=>{
    const {link} = req.body
    console.log("Hello with the link",link);
    const newName ='photo'+Date.now() + '.jpg'
    try{
        await imageDownloader.image({
            url:link,
            dest:__dirname +'/uploads/' + newName
        })
    }
    catch(err){
        console.log(err);
    }
    res.json(newName)
})
const photosMiddleware = multer({dest:'uploads'})
app.post('/upload',photosMiddleware.array('photos',100),(req,res)=>{
    const uploadedFiles = [];
        for(let i = 0 ;i<req.files.length;i++){
            const {path} = req.files[i];
            const {originalname} = req.files[i];
            const res = originalname.split('.');
            const exten = res[res.length - 1];
            const newPath = path+"."+exten
            fs.renameSync(path,newPath)
            uploadedFiles.push(newPath.replace('uploads\\',''))
        }
        res.json(uploadedFiles)
})
app.listen(5000,()=>{
    console.log("app is running on port number 5000")
})