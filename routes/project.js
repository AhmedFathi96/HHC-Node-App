const express = require('express')
const router  = express.Router();
const auth    = require('../middleware/auth');
const multer  = require('multer');
const project  = require('../models/project'); 


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

router.post('/add-project', auth , upload.single('project_image') ,async(req,res)=>{

    try{
        const buffer = await sharp(req.file.buffer).toBuffer()
        const data = new project({
            project_image:buffer,
            name: req.body.name,
            name_font_size: req.body.name_font_size,
            name_font_wight: req.body.name_font_wight,
            name_font_color: req.body.name_font_color,
            header_description: req.body.header_description,
            header_description_font_size: req.body.header_description_font_size,
            header_description_font_wight: req.body.header_description_font_wight,
            header_description_font_color: req.body.header_description_font_color,
            full_description:req.body.full_description,
            full_description_font_size: req.body.full_description_font_size,
            full_description_font_wight: req.body.full_description_font_wight,
            full_description_font_color: req.body.full_description_font_color,
            order: req.body.order
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
        res.send(data.project_image);
    }catch(e){
        res.status(400).send({
            status:'Error',
            status:'Error',
            Error: e
        });
    }
})

router.put('/update-project/:id', auth ,upload.single('project_image'), async (req,res)=>{
    try{
        const id = req.params.id;
        const data = await project.findByIdAndUpdate(
            id, 
            {
                project_image:buffer,
                name: req.body.name,
                name_font_size: req.body.name_font_size,
                name_font_wight: req.body.name_font_wight,
                name_font_color: req.body.name_font_color,
                header_description: req.body.header_description,
                header_description_font_size: req.body.header_description_font_size,
                header_description_font_wight: req.body.header_description_font_wight,
                header_description_font_color: req.body.header_description_font_color,
                full_description:req.body.full_description,
                full_description_font_size: req.body.full_description_font_size,
                full_description_font_wight: req.body.full_description_font_wight,
                full_description_font_color: req.body.full_description_font_color,
                order: req.body.order
            
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