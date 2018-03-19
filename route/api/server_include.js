const router = require('koa-router')();
const common=require('../../libs/common');
const  query =require('../../libs/async-db');


router.post('/',async (ctx)=>{
    let title=ctx.request.body.title;
    let src=ctx.request.body.src;
    let contents=ctx.request.body.contents;
    console.log(contents);
    let sql = `INSERT INTO server_include (src,title,contents) VALUE('${src}','${title}','${contents}')`;
    let results = await query.selectAllData(sql);

    ctx.body={status:0};
});
router.delete('/:id',async (ctx)=>{

    let id=ctx.params.id;
    let sql=`DELETE FROM server_include WHERE id = '${id}'`;
    let results = await query.selectAllData(sql);
    ctx.body={status:0};
});

module.exports=router;