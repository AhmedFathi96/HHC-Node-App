const express = require('express')
const router  = express.Router();
const auth    = require('../middleware/auth');
const multer  = require('multer');
const project  = require('../models/project'); 
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

router.post('/add-project', auth , upload.single('project_img') ,async(req,res)=>{
    try{
        const buffer = await sharp(req.file.buffer).toBuffer()
        const data = new project({
            project_img:buffer,
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

router.get('/get-projects', auth , async(req,res)=>{
    
    try{
        const data = await project.find({});
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

router.get('/website-get-projects' , async(req,res)=>{
    
    try{
        const data = await project.find({});
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
router.get('/get-project/:id', auth , async(req,res)=>{
    
    try{
        const id = req.params.id
        const data = await project.findById(id);
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


router.get('/get-project-image/:id/view' , async(req,res)=>{
    
    try{
        const id = req.params.id
        const data = await project.findById(id);
        res.set('Content-type' , 'image/jpg');
        res.send(data.project_img);
    }catch(e){
        res.status(400).send({
            status:'Error',
            status:'Error',
            Error: e
        });
    }
})

router.get('/website-get-project-image/:id/view' , async(req,res)=>{
    
    try{
        const id = req.params.id
        const data = await project.findById(id);
        res.set('Content-type' , 'image/jpg');
        res.send(data.project_img);
    }catch(e){
        res.status(400).send({
            status:'Error',
            status:'Error',
            Error: e
        });
    }
})

router.put('/update-project/:id', auth , upload.single('project_img'), async (req,res)=>{
    try{
        const id = req.params.id;
        const data = await project.findByIdAndUpdate(
            id, 
            {
                project_img: req.file.buffer,

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

router.delete('/delete-project/:id',auth , async(req,res)=>{
    
    try{
        const id = req.params.id
        console.log('id==>' , id)
        const data = await project.findByIdAndDelete(id);
        if(!data){
            res.status(400).send({
                status:'Error',
                Error: 'can\'t find that project'
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