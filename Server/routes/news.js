const { Router } = require('express');
const { newsController } = require('../controllers')
const { auth } = require("../middlewares");

const router = Router();
router.get('/', auth , newsController.getAllNews)
router.get('/sports', auth , newsController.getSportNews)
router.get('/political', auth , newsController.getPoliticalNews)
router.get('/economic', auth , newsController.getEconomicNews)
router.get('/:article', auth , newsController.getArticle)
module.exports = router;