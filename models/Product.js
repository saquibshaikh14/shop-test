/*
 * Copyright (c) 2020. Developed by saquib shaikh.
 */
const mongoose = require('mongoose');

    const ProductSchema = new mongoose.Schema({
        productId: {type: String, required: true},
        image: {
            type: String,
            default: "default.png"
        },
        name: {
            type: String,
            required: true
        },
        discount: {default: 0},
        description: {
            type: String,
            default: "Description not found!!!"
        },
        price:[],
        totalCount: {default: 0},
        optionsAvailable: [],
        options: {}
    })

module.exports = ProductSchema;
