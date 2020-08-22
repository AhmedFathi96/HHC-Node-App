const mongoose = require('mongoose');


const slider = mongoose.Schema({
    slider_img:{
        type: Buffer 
    },
    caption: {
        type: String,
        required: true
    },
    caption_font_size: {
        type: String,
        required: true
    },
    caption_font_wight: {
        type: String,
        required: true
    },
    caption_font_color: {
        type: String,
        required: true
    },
    sub_caption: {
        type: String,
        required: true
    },
    sub_caption_font_size: {
        type: String,
        required: true
    },
    sub_caption_font_wight: {
        type: String,
        required: true
    },
    sub_caption_font_color: {
        type: String,
        required: true
    },
    order:{
        type: Number,
        required: true
    }
    
}, {timestamps: true})


mongoose.set('useNewUrlParser', true);  
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Slider = mongoose.model('slider' , slider);
module.exports = Slider;