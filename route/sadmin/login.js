const router = require('koa-router')();
const common=require('../../libs/common');
const query =require('../../libs/async-db');
const log4js = require('koa-log4')
const logger = log4js.getLogger();

module.exports = router.get('/',async (ctx)=>{
  logger.error(ctx);
    await ctx.render('admin/login',{host:ctx.hostname});
  })

router.post('/',async (ctx)=>{
    let username=ctx.request.body.username;
    if(username==null){
      ctx.body={ok:false,msg:'用户名不可为空'};
    }
    let password=ctx.request.body.password;
    if(password==null){
      ctx.body={ok:false,msg:'密码不可为空'};
    }
    password=common.md5(password+common.MD5_SUFFIX);
     let sql = `SELECT id,username,password FROM user WHERE username='${username}'`;
      let result = await query.selectAllData(sql)
      if(result.length==0){
             ctx.body={ok:false,msg:'此用户不存在'};
      }else{
        if (result[0].password!=password) {
            ctx.body={ok:false,msg:'密码不正确'};
        }else {
            ctx.session['admin_id']=result[0].ID;
            ctx.session['username']=result[0].username;
            ctx.body={ok:true,msg:'登录成功'};
        }
      }
   
});