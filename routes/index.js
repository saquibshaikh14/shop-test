/*
 * Copyright (c) 2020. Developed by saquib shaikh.
 */

const express = require('express');
const router = express.Router();

//importing custom render function
var renderPageWithData = require('../functions/renderPageWithData');



//end point
//homepage
// public access


router.get('/', (req, res)=>{

    // res.render('index/index', {pageTitle: 'Home', breadCrumb:{link: null,active: ''}});
    renderPageWithData(res, 'index/index', 'Home');
});



//sample for breadcrumb data
// router.get('/', (req, res)=>{
//     res.render('index/index', {pageTitle: 'Home', breadCrumb:{link: 'Pen',active: 'Pen'}, sortMethod: null});
// });



module.exports = router;