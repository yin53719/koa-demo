const router = require('koa-router')();
const common=require('../../libs/common');
const  query =require('../../libs/async-db');

router.get('/',async (ctx)=>{
  // if(common.checkLogin(ctx)){
  //    ctx.redirect('/admin/login');
  //    return;
  // }
  let sql_b = `SELECT id,src FROM banner`;
  let banner = await query.selectAllData(sql_b);
  let sql_c = `SELECT id,src,title FROM cases`;
  let cases = await query.selectAllData(sql_c);
  let sql_s = `SELECT id,src,title,contents FROM server_include`;
  let server_include = await query.selectAllData(sql_s);


  await ctx.render('admin/index',{nav_now:'index',banner:banner,username:ctx.session.username,cases:cases,server_include:server_include});
});









module.exports = router;