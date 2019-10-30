const mongoose = require('mongoose')

const Img = new mongoose.Schema({ 
    data: Buffer, 
    contentType: String 
});

module.exports = mongoose.model('Img',Img);