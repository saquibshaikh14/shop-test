/*
 * Copyright (c) 2020. Developed by saquib shaikh.
 */


$('document').ready(function () {
    //left panel uri navigete
    $('select.left-panel-select').on('change', function () {
       var uriCompoent =  $('select.left-panel-select option:selected').text();
       if(uriCompoent=='select category') return false;
       var url =  `/products/${encodeURIComponent(uriCompoent)}?p=1`;
       $(location).attr('href', url);
        return false;
    });
    //left panel desktop navigate
    $('.list-group a.list-group-item').on('click', function () {
        if($(this).hasClass('do-nothing'))
        return false;
        var uriComponent = $(this).text();
        var url = `/products/${encodeURIComponent(uriComponent)}?p=1`;
        $(location).attr('href', url);
    })

    //product catalog
    $('.product-catalog-sm').on('click', function(){

        $(location).attr('href', `/products/${$(this).attr('data-group')}/${$(this).attr('id')}`);
    });

    //sort product
    $('#sortProduct').on('change', function () {
        var uriComponent = $(this).attr('data-category');
        var url = `/products/${encodeURIComponent(uriComponent)}?p=1&sortMethod=${$(this).val()}`;
        $(location).attr('href', url);
    });

});

