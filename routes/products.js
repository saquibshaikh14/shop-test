/*
 * Copyright (c) 2020. Developed by saquib shaikh.
 */

const express = require('express');
const router = express.Router();
const productSchema = require('../models/Product');
const mongoose = require('mongoose');

const paginate = require('../functions/paginate');
//render function import
var renderPageWithData = require('../functions/renderPageWithData');


//end point

// public access
//display all the items of a particular category
router.get('/:category', async (req, res) => {
    try {

        const category = req.params.category; //get category
        const sortMethod = req.query.sortMethod||1;//sort method

        const page = parseInt(req.query.p||1); //get current page number
        console.log(sortMethod, page);
        var modCategory = category.trim().split(' ').join('_').toLowerCase(); //remove space and make mongoose suitable
        console.log(modCategory)
        const itemPerPage = 8;

        const Product = mongoose.model(modCategory, productSchema); //creating dynamic schema

        const products = await Product.find({}, {
            _id: 1,
            ProductId: 1,
            image: 1,
            name: 1,
            price: 1
        }).skip(itemPerPage * (page - 1)).limit(itemPerPage).sort({_id: -1});
//method 2 map data in new array.

        let data = {};
        data = products.map(product => {
            return {name: product.name,id: product._id, image: product.image, price: product.price,group: modCategory};
        })
        //console.log(data);

        const productCount = await Product.countDocuments(); //get total counts of document

        var pagination =  paginate(productCount, page, itemPerPage, 5);

        console.log(pagination);


        if (!products) {
            return res.render('index/product', {
                pageTitle: category.toUpperCase(),
                breadCrumb: {link: null, active: req.params.category},
                sort: sortMethod,
                data: [],
                pagination: pagination
            });
        }


        renderPageWithData(res, 'index/product', category, {
            breadCrumbActive: req.params.category,
            data: data,
            sortMethod: sortMethod,
            pagination: pagination
        });

    } catch (e) {
        console.log(e);
        //error render
        return res.render('index/product', {
            pageTitle: category.toUpperCase(),
            breadCrumb: {link: null, active: req.params.category},
            data: [],
            sort: sortMethod
        });
    }


});


//displaying particular item
//access public

router.get('/:category/:prod_id', (req, res) => {
//change id to name in breadcrumb link.

    res.render('index/product', {
        pageTitle: req.params.category.toUpperCase(),
        breadCrumb: {link: req.params.category, active: req.params.prod_id},
        sortMethod: null
    });
});


//export
module.exports = router;