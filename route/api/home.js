const router = require('koa-router')();
const common=require('../../libs/common');
const  query =require('../../libs/async-db');

router.get('/',async (ctx)=>{
  if(common.checkLogin(ctx)){
     ctx.redirect('/api/login');
     return;
  }
  let id=ctx.session.admin_id;
  let sql = `SELECT username FROM user WHERE id='${id}'`;
  let dataList = await query.selectAllData(sql)
  await ctx.render('api/home',{username:dataList[0].username});
});









module.exports = router;