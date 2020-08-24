const mongoose = require('mongoose');


const statistic = mongoose.Schema({
    statistic_img:{
        type: Buffer 
    },
    header: {
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

const Statistic = mongoose.model('statistic' , statistic);
module.exports = Statistic;