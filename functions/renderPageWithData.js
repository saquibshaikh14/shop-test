/*
 * Copyright (c) 2020. Developed by saquib shaikh.
 */
function renderPageWithData(res, views, pageTitle, object) {
    if(!object) object = {};
    if(!object.breadCrumbLink) object.breadCrumbLink=null;
    if(!object.breadCrumbActive) object.breadCrumbActive='';
    if(!object.sortMethod) object.sortMethod = 1;
    if(!object.data) object.data=[];
    if(!object.pagination) object.pagination = {};

    return res.render(views, {
        pageTitle: pageTitle.toUpperCase(),
        breadCrumb: {link: object.breadCrumbLink, active: object.breadCrumbActive},
        sort: object.sortMethod,
        data: object.data,
        paginate: object.pagination
    });
}

module.exports = renderPageWithData;