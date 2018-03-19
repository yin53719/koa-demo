const router = require('koa-router')();
const common=require('../../libs/common');
const query =require('../../libs/async-db');
const log4js = require('koa-log4')
const logger = log4js.getLogger();


router.get('/',async (ctx)=>{
    logger.error(ctx);
    await ctx.render('admin/login',{host:ctx.hostname});
})

router.post('/',async (ctx)=>{

    let username=ctx.request.body.username;
    let password=ctx.request.body.password;
    if(username==null){
      ctx.body={ok:false,msg:'用户名不可为空'};
    }
    if(password==null){
      ctx.body={ok:false,msg:'密码不可为空'};
    }
    password=common.md5(password+common.MD5_SUFFIX);
     let sql = `SELECT id,username,password,avatar FROM user WHERE username='${username}'`;
      let result = await query.selectAllData(sql)
      if(result.length==0){
             ctx.body={ok:false,msg:'此用户不存在'};
      }else{
        if (result[0].password!=password) {
            ctx.body={ok:false,msg:'密码不正确'};
        }else {
            ctx.session['admin_id']=result[0].ID;
            ctx.session['username']=result[0].username;
            
            ctx.body={code:200,msg:'登录成功',user:{name:username,avatar:result[0].avatar}};
        }
      }
   
});
router.get('/getMenuList',async (ctx)=>{
  let sql = `SELECT * FROM tc_menu`;
  let result = await query.selectAllData(sql)
  var array=[];
  for(var i=0;i<result.length;i++){
     let newV=result[i];
     let p=newV.parent;
     var len=p.toString().length;
     var c=newV.menu_id.toString().slice(0,len);
     var leaf=true;
     if(newV.leaf==0){
        leaf=false;
     }
     var hidden=true;
     if(newV.hidden==1){
         hidden=false;
     }
     //取出一级菜单
     if(p== 0){
        
            let obj={
                id:newV.menu_id,
                name:newV.name,
                children:[],
                hidden:hidden,
                leaf:leaf,
                path:newV.path,
                iconCls:newV.iconCls,
                component:newV.component
            }
            array.push(obj);
        
     }
     //取出二级菜单
     if(len == 4){
        for(var j=0;j<array.length;j++){
          if(p==array[j].id){
                let obj={
                    id:newV.menu_id,
                    name:newV.name,
                    children:[],
                    hidden:hidden,
                    leaf:leaf,
                    path:newV.path,
                    iconCls:newV.iconCls,
                    component:newV.component
                }
                array[j].children.push(obj);
          }
        }
     }
     //取出三级菜单
     if(len == 6){
      for(var h=0;h<array.length;h++){
        for(var k=0;k<array[h].children.length;k++){
          if(p==array[h].children[k].id){
              let obj={
                  id:newV.menu_id,
                  name:newV.name,
                  children:[],
                  hidden:hidden,
                  leaf:leaf,
                  path:newV.path,
                  iconCls:newV.iconCls,
                  component:newV.component
              }
              array[h].children[k].children.push(obj);
            }
          }
          }
      }
      //取出四级菜单
      if(len == 8){

      }
  }
  ctx.body=array;
})
module.exports = router;