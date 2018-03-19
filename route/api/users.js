const router = require('koa-router')();
const common=require('../../libs/common');
const query =require('../../libs/async-db');
const log4js = require('koa-log4')
const logger = log4js.getLogger('http');


router.get('/list',async (ctx)=>{
    let username = common.getUrlparms(ctx.url,'name');
    let page=common.getUrlparms(ctx.url,'page');
    let limit=common.getUrlparms(ctx.url,'limit');
    let spage=(page-1)*10+1;
    if(page==1){
        spage=0;
    }
    let sql = `SELECT a.username as name,sex,age,birth,addr,id  FROM user as a WHERE username LIKE '%${username}%' limit ${spage},${limit}`;
    let users = await query.selectAllData(sql);
    let total = await query.selectAllData(`SELECT count(username) as total FROM user`);
    ctx.body={total:total[0].total,users:users};
})
router.post('/',async (ctx)=>{
    let username=ctx.request.body.name;
    let sex=ctx.request.body.sex;
    let age=ctx.request.body.age;
    let birth=ctx.request.body.birth;
    let addr=ctx.request.body.addr;
    let password=common.md5('123456'+common.MD5_SUFFIX);
    let user_id=new Date().getTime();
    let sql = `INSERT INTO user (username,password,sex,age,birth,addr,user_id)  VALUE ('${username}','${password}','${sex}','${age}','${birth}','${addr}','${user_id}')`;
    try {
        let users = await query.selectAllData(sql);
    } catch (error) {
        logger.error(error);
    }
    
    ctx.body={code:200};
})
router.put('/:id',async (ctx)=>{

    let username=ctx.request.body.name;
    let sex=ctx.request.body.sex;
    let age=ctx.request.body.age;
    let birth=ctx.request.body.birth;
    let addr=ctx.request.body.addr;

    let sql = `UPDATE user SET \
    username='${username}', sex='${sex}',age='${age}' ,birth='${birth}',addr='${addr}'\
    WHERE id='${ctx.params.id}'`;


    let users = await query.selectAllData(sql);

    ctx.body={code:200};
})
router.delete('/:id',async (ctx)=>{

    let sql = `DELETE FROM user WHERE id=${ctx.params.id}`;
    let users = await query.selectAllData(sql);
    ctx.body={code:200};
})

module.exports = router;