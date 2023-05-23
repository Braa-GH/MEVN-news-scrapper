const newsRouter = require('./news')
const authRouter = require('./auth')
module.exports = (app) => {
    app.get('/', (req,res,next) => {
        //if there is no prefix go to news
        res.redirect('/news')
    })
    app.use('/news', newsRouter) //news Router
    app.use('/auth', authRouter) // authentication Router
}
