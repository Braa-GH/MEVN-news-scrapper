const { Scrapper } = require('../models');

//common code of all news
const returner = (type, req, res) => {
    const page = req.query.page;
    const pageData = {type, page};
    const scrapper = new Scrapper(pageData);
    scrapper.lastPage().then(lastPageNumber => {
        if (page > parseInt(lastPageNumber)){
            res.status(404).json({message: 'page is not found!'})
        }
        Scrapper.scrap(pageData).then(news => {
            res.status(200).json({
                lastPageNumber, news
            });
        })
    }).catch(e => e.message)

}

//all news
const getAllNews = (req,res,next) => {
    returner('news/latest',req,res)
}
//sport
const getSportNews = (req,res,next) => {
    returner('news/sport',req,res)
}
//political
const getPoliticalNews = (req,res,next) => {
    returner('regional',req,res)
}
//economic
const getEconomicNews = (req,res,next) => {
    returner('news/economy',req,res)
}
//page of the news
const getArticle = (req,res,next) => {
    const article = req.params.article;
    Scrapper.scrapArticle(article).then(artic => {
        res.status(200).json(artic);
    })
}

module.exports = {
    getAllNews, getSportNews, getPoliticalNews, getEconomicNews, getArticle
}