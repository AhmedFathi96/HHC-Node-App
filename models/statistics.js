const mongoose = require('mongoose');


const statistic = mongoose.Schema({
    statistic_img:{
        type: Buffer 
    },

    number: {
        type: String,
        required: true
    },
    number_font_size: {
        type: String,
        required: true
    },
    number_font_wight: {
        type: String,
        required: true
    },
    number_font_color: {
        type: String,
        required: true
    },


    name: {
        type: String,
        required: true
    },
    name_font_size: {
        type: String,
        required: true
    },
    name_font_wight: {
        type: String,
        required: true
    },
    name_font_color: {
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