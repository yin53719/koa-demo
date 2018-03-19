const router = require('koa-router')();
const common=require('../../libs/common');
const  query =require('../../libs/async-db');
router.get('/',async (ctx)=>{
  let sql = `SELECT id,title,create_time,content FROM news`;
  let dataList = await query.selectAllData(sql);
   
   await ctx.render('web/news',{news:dataList,nav_now:'news'});
});

router.get('/:id',async (ctx)=>{
  let sql = `SELECT id,title,create_time,content FROM news WHERE id='${ctx.params.id}'`;
  let dataList = await query.selectAllData(sql);
   await ctx.render('web/newsInfo',{news:dataList[0]});
});

module.exports=router;