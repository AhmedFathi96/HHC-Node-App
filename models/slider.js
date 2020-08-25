const mongoose = require('mongoose');


const slider = mongoose.Schema({
    slider_img:{
        type: Buffer 
    },
    
    english_header: {
        type: String,
        required: true
    },
    arabic_header: {
        type: String,
        required: true
    },

    desktop_header_font_size: {
        type: String,
        required: true
    },
    desktop_header_font_wight: {
        type: String,
        required: true
    },
    desktop_header_font_color: {
        type: String,
        required: true
    },
    mobile_header_font_size: {
        type: String,
        required: true
    },
    mobile_header_font_wight: {
        type: String,
        required: true
    },
    mobile_header_font_color: {
        type: String,
        required: true
    },



    english_sub_header: {
        type: String,
        required: true
    },
    arabic_sub_header: {
        type: String,
        required: true
    },

    desktop_sub_header_font_size: {
        type: String,
        required: true
    },
    desktop_sub_header_font_wight: {
        type: String,
        required: true
    },
    desktop_sub_header_font_color: {
        type: String,
        required: true
    },


    mobile_sub_header_font_size: {
        type: String,
        required: true
    },
    mobile_sub_header_font_wight: {
        type: String,
        required: true
    },
    mobile_sub_header_font_color: {
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