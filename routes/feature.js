const express = require('express')
const router  = express.Router();
const auth    = require('../middleware/auth');
const multer  = require('multer');
const feature  = require('../models/feature'); 
const sharp   = require('sharp')


const upload = multer({
    limits: {
        fileSize: 10000000
    },
    fileFilter(req, file, cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload and image with jpg or jpeg or png extension'))
        }

        cb(undefined , true)
    }
})

router.post('/add-feature', auth , upload.single('feature_img') ,async(req,res)=>{
    try{
        const buffer = await sharp(req.file.buffer).toBuffer()
        const data = new feature({
            feature_img:buffer,
            english_header: req.body.english_header,
            arabic_header: req.body.arabic_header,
            desktop_header_font_size: req.body.desktop_header_font_size,
            desktop_header_font_wight: req.body.desktop_header_font_wight,
            desktop_header_font_color: req.body.desktop_header_font_color,
            mobile_header_font_size: req.body.mobile_header_font_size,
            mobile_header_font_wight: req.body.mobile_header_font_wight,
            mobile_header_font_color: req.body.mobile_header_font_color,
            order: req.body.order,
            english_sub_header:req.body.english_sub_header,
            arabic_sub_header:req.body.arabic_sub_header,
            desktop_sub_header_font_size: req.body.desktop_sub_header_font_size,
            desktop_sub_header_font_wight: req.body.desktop_sub_header_font_wight,
            desktop_sub_header_font_color: req.body.desktop_sub_header_font_color,
            mobile_sub_header_font_size: req.body.mobile_sub_header_font_size,
            mobile_sub_header_font_wight: req.body.mobile_sub_header_font_wight,
            mobile_sub_header_font_color: req.body.mobile_sub_header_font_color,
        })

        await data.save();
        res.status(200).send({
            status:'success',
            data:req.body
        });
    }catch(e){
        res.status(400).send({
            status:'Error',
            Error: e
        });
    }
})

router.get('/get-features', auth , async(req,res)=>{
    
    try{
        const data = await feature.find({});
        res.status(200).send({
            status:'success',
            data:data
        });
    }catch(e){
        res.status(400).send({
            status:'Error',
            Error: e
        });
    }
})

router.get('/website-get-features' , async(req,res)=>{
    
    try{
        const data = await feature.find({});
        res.status(200).send({
            status:'success',
            data:data
        });
    }catch(e){
        res.status(400).send({
            status:'Error',
            Error: e
        });
    }
})
router.get('/get-feature/:id', auth , async(req,res)=>{
    
    try{
        const id = req.params.id
        const data = await feature.findById(id);
        res.status(200).send({
            status:'success',
            data:data
        });
    }catch(e){
        res.status(400).send({
            status:'Error',
            Error: e
        });
    }
})


router.get('/get-feature-image/:id/view' , async(req,res)=>{
    
    try{
        const id = req.params.id
        const data = await feature.findById(id);
        res.set('Content-type' , 'image/jpg');
        res.send(data.feature_img);
    }catch(e){
        res.status(400).send({
            status:'Error',
            status:'Error',
            Error: e
        });
    }
})

router.get('/website-get-feature-image/:id/view' , async(req,res)=>{
    
    try{
        const id = req.params.id
        const data = await feature.findById(id);
        res.set('Content-type' , 'image/jpg');
        res.send(data.feature_img);
    }catch(e){
        res.status(400).send({
            status:'Error',
            status:'Error',
            Error: e
        });
    }
})

router.put('/update-feature/:id', auth , upload.single('feature_img'), async (req,res)=>{
    try{
        const id = req.params.id;
        const data = await feature.findByIdAndUpdate(
            id, 
            {
                feature_img: req.file.buffer,

                english_header: req.body.english_header,
                arabic_header: req.body.arabic_header,
                desktop_header_font_size: req.body.desktop_header_font_size,
                desktop_header_font_wight: req.body.desktop_header_font_wight,
                desktop_header_font_color: req.body.desktop_header_font_color,
                mobile_header_font_size: req.body.mobile_header_font_size,
                mobile_header_font_wight: req.body.mobile_header_font_wight,
                mobile_header_font_color: req.body.mobile_header_font_color,

                order: req.body.order,

                english_sub_header:req.body.english_sub_header,
                arabic_sub_header:req.body.arabic_sub_header,
                desktop_sub_header_font_size: req.body.desktop_sub_header_font_size,
                desktop_sub_header_font_wight: req.body.desktop_sub_header_font_wight,
                desktop_sub_header_font_color: req.body.desktop_sub_header_font_color,
                mobile_sub_header_font_size: req.body.mobile_sub_header_font_size,
                mobile_sub_header_font_wight: req.body.mobile_sub_header_font_wight,
                mobile_sub_header_font_color: req.body.mobile_sub_header_font_color,
            
            },
            {new:true , runValidators:true , useFindAndModify:false}
        )
        if(!data){
            return res.status(400).send({
                status:'Error',
                Error: 'Something wrong'
            })
        }
        res.status(200).send({
            status: 'success',
            data: data
        })

    }catch(e){
        res.status(400).send({
            status:'Error',
            Error: e
        });
    }

})

router.delete('/delete-feature/:id',auth , async(req,res)=>{
    
    try{
        const id = req.params.id
        console.log('id==>' , id)
        const data = await feature.findByIdAndDelete(id);
        if(!data){
            res.status(400).send({
                status:'Error',
                Error: 'can\'t find that feature'
            });
        }
        res.status(200).send({
            status:'success',
            data:data
        });
    }catch(e){
        res.status(400).send({
            status:'Error',
            Error: e
        });
    }
})
module.exports = router;