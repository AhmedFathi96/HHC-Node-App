const mongoose = require('mongoose');


const project = mongoose.Schema({
    project_image:{
        type: Buffer ,
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

    order: {
        type: Number,
        required: true
    },
    full_description: {
        type: String,
        required: true
    },
    full_description_font_size: {
        type: String,
        required: true
    },
    full_description_font_wight: {
        type: String,
        required: true
    },
    full_description_font_color: {
        type: String,
        required: true
    },
    header_description: {
        type: String,
        required: true
    },
    header_description_font_size: {
        type: String,
        required: true
    },
    header_description_font_wight: {
        type: String,
        required: true
    },
    header_description_font_color: {
        type: String,
        required: true
    },

}, {timestamps: true})


mongoose.set('useNewUrlParser', true);  
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const Project = mongoose.model('project' , project);
module.exports = Project;