const mongoose = require('mongoose');


const feature = mongoose.Schema({
    feature_img:{
        type: Buffer 
    },
    header: {
        type: String,
        required: true
    },
    header_font_size: {
        type: String,
        required: true
    },
    header_font_wight: {
        type: String,
        required: true
    },
    header_font_color: {
        type: String,
        required: true
    },
    sub_header: {
        type: String,
        required: true
    },
    sub_header_font_size: {
        type: String,
        required: true
    },
    sub_header_font_wight: {
        type: String,
        required: true
    },
    sub_header_font_color: {
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

const Feature = mongoose.model('feature' , feature);
module.exports = Feature;