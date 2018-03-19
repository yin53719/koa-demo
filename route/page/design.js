const router = require('koa-router')();
const common=require('../../libs/common');
const  query =require('../../libs/async-db');
router.get('/',async (ctx)=>{
  let sql = `SELECT title,create_time,content FROM about WHERE modules='design'`;
  let dataList = await query.selectAllData(sql);
   
   await ctx.render('web/design',{nav_now:"design",about:dataList[0]});
});


module.exports=router;