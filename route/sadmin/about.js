const router = require('koa-router')();
const common=require('../../libs/common');
const query  =require('../../libs/async-db');


  router.get('/',async function(ctx){
      let sql = `SELECT id,title,content,creat_time,modules FROM about WHERE modules='about'`;
      let data = await query.selectAllData(sql);
      await ctx.render('admin/about',{nav_now:'about',username:ctx.session.username,about:data[0]});

  });
    router.put('/',async (ctx)=>{
    

     let modules=ctx.request.body.modules;
     let creat_time=new Date().getTime();   
     let title=ctx.request.body.title;
     let content=ctx.request.body.content;
     let sql = `UPDATE about SET \
            title='${title}', content='${content}',creat_time='${creat_time}'\
            WHERE modules='${modules}'`;
     let data = await query.selectAllData(sql);
      ctx.body={status:0};
     
    
  });
module.exports = router;
