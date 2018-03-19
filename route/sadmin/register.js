const router = require('koa-router')();
const common=require('../../libs/common');
const query  =require('../../libs/async-db');
const log4js = require('koa-log4')
const logger = log4js.getLogger();

router.get('/',async (ctx)=>{
     await ctx.render('admin/register',{host:ctx.hostname});
  });
router.post('/',async(ctx)=>{
  logger.error(ctx);
    let username=ctx.request.body.username;
    if(username==null){
      ctx.body={ok:false,msg:'用户名不可为空'};
    }
    let password=ctx.request.body.password;
    let code =password;
    if(password==null){
      ctx.body={ok:false,msg:'密码不可为空'};
    }
    let sql = `SELECT * FROM user WHERE username='${username}'`;
    let result = await query.selectAllData(sql);
    if(result.length>0){
       ctx.body={ok:false,msg:'用户名已存在'};
    }else{
       password=common.md5(password+common.MD5_SUFFIX);
       let user_id=new Date().getTime();
       let sql = `INSERT INTO user (username,password,code,user_id) VALUE('${username}', '${password}', '${code}', '${user_id}')`;
       let result = await query.selectAllData(sql);
       console.log(result+'1111');
       ctx.body={ok:true,msg:'注册成功'};
    }
});


module.exports = router;
