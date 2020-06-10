/*
 * Copyright (c) 2020. Developed by saquib shaikh.
 */

const mongoose = require('mongoose');
const config = require('config');
//const mongoURI = config.get('mongoURI');
const testMongoURI = config.get('testMongoURI');

const connectMongoose = async ()=>{
    try{
        await mongoose.connect(testMongoURI, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('mongoose connected')
    }catch (e) {
        console.log(e);
        process.exit(1);
    }
}

module.exports = connectMongoose;