const koa=require('koa');
const app=new koa();
const cors = require('koa-cors');
app.use(cors())
const bodyParser = require('koa-bodyparser')
const views = require('koa-views');
var session = require('koa-session');
(function (){
  app.keys=[];
  for(var i=0;i<100;i++){
    app.keys[i]='a_'+Math.random();
  }
})();
const router=require('koa-router')();
const path=require('path');
const json = require('koa-json')
const convert = require('koa-convert');
const static = require('koa-static')
//logger
const log4js = require('koa-log4')
const logger = log4js.getLogger('http');
logger.level = 'info';
log4js.configure(path.join(__dirname, 'log4js.json'))
app.use(log4js.koaLogger(logger),{level:"info"})
var CONFIG = {
  key: 'koa:sess', 
  maxAge: 30*60*1000, 
  overwrite: true, 
  httpOnly: true, 
  signed: true,
};
app.use(convert(session(CONFIG, app)));

// 加载模板引擎
app.use(views(path.join(__dirname, './template'), {
  extension: 'ejs'
}))
app.use(bodyParser());
app.use(convert(json()));
const page = require('./route/page/index');
const api = require('./route/api/index');
const sadmin = require('./route/sadmin/index');
router.use('/', page.routes(), page.allowedMethods())
router.use('/api', api.routes(), api.allowedMethods())
router.use('/sadmin', sadmin.routes(), sadmin.allowedMethods())
app.use(router.routes()).use(router.allowedMethods());


app.use(convert(static('./static')));

const port=5000;
app.listen(port);
console.log('service start ok'+port);
