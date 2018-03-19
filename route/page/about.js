const router = require('koa-router')();
const common=require('../../libs/common');
const  query =require('../../libs/async-db');
const logger = require('koa-log4').getLogger();
router.get('/',async (ctx)=>{
  logger.debug(ctx.header);
  let sql = `SELECT title,create_time,content FROM about`;
  logger.info(sql);
  let dataList = await query.selectAllData(sql);
   
   await ctx.render('web/about',{nav_now:"about",about:dataList[0]});
});


module.exports=router;