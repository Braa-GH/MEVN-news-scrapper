const express = require('express')

module.exports = {
    global: (app) => {
        /** define Body Parser for POST method body **/
        app.use(express.json()) // json body parser definition
        // every body parser should be defined in a app.use()

        app.use((req,res,next) => {
            /** check page number **/
            const page = req.query.page;
            if (!page || isNaN(page)){
                req.query.page = 1;
            }
            next();
        })


    },
    auth: require('./auth')
}