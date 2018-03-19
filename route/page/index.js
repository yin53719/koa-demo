const router = require('koa-router')();
const home = require('./home');
const news = require('./news');
const design=require('./design');
const service=require('./service');
const about=require('./about');


router.use('', home.routes(), home.allowedMethods());
router.use('news', news.routes(), news.allowedMethods());
router.use('design', design.routes(), design.allowedMethods());
router.use('service', service.routes(), service.allowedMethods());
router.use('about', about.routes(), about.allowedMethods());

module.exports=router;
