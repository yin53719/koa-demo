const router = require('koa-router')();
const common=require('../../libs/common');
const  query =require('../../libs/async-db');
router.get('/',async (ctx)=>{

  let sql = `SELECT title,create_time,content FROM about WHERE modules='service'`;
  let dataList = await query.selectAllData(sql);
   
   await ctx.render('web/service',{nav_now:"service",about:dataList[0]});
});


module.exports=router;