const koa=require('koa');
const app=new koa();
const router = require('koa-router')();
const  query =require('../../libs/async-db');
const logger = require('koa-log4').getLogger();
router.get('/',async ( ctx ) => {
  logger.debug(ctx.header);
  let sql_c = `SELECT src,title FROM cases`;
  let cases = await query.selectAllData(sql_c);
  let sql_b = `SELECT src FROM banner`;
  let banner = await query.selectAllData(sql_b);
  let sql_s = `SELECT src,title,contents FROM server_include`;
  let server_include = await query.selectAllData(sql_s);
  logger.info(sql_c);
  await ctx.render('web/index',{banner:banner,nav_now:"index",cases:cases,server_include:server_include});
});


module.exports=router;