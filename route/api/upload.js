const router = require('koa-router')();
const common=require('../../libs/common');
const mysql=require('mysql');
const path=require('path');
const fs=require('fs');
const COS = require('../../libs/cos-nodejs/sdk/cos');
const uploadFile = require('../../libs/upload');
const delFile  = require('../../libs/delFile');
const qqfilecos = require('../../libs/qqfilecos');
const util = require('../../libs/cos-nodejs/sdk/util');
const  query =require('../../libs/async-db');
router.post('/image',async (ctx)=>{
    // 上传文件请求处理
    let type=ctx.query.type;
    var result = { success: false,size:500 }
    let serverFilePath = path.join( __dirname, '../../static/upload');
    // 上传文件事件
    let flag=new Date().getTime();
    result = await uploadFile( ctx,{
        path:serverFilePath
    });
    let src=result.name;
    let sql = `UPDATE tmp SET src='${src}' WHERE id='1'`;
    let results = await query.selectAllData(sql);
    //要上传文件的本地路径
    let filePath = `${serverFilePath}/${result.name}`;
    let fileSize = fs.statSync(filePath).size;
    result.size= Math.ceil(fileSize/1024);
    let filename = result.name;
    let stats=await qqfilecos(filename,filePath,fileSize);
    await delFile(`./static/upload/`); 
    ctx.body=result;
    
})
router.post('/banner',async (ctx)=>{
   // 上传文件请求处理
    //let type=ctx.query.type;
    var result = { success: false,size:500 }
    let serverFilePath = path.join( __dirname, '../../static/upload');
    // 上传文件事件
    let flag=new Date().getTime();
    result = await uploadFile( ctx,{
        path:serverFilePath
    });
    let src=result.name;
    let sql = `INSERT INTO banner (src) VALUE('${src}')`;
    let results = await query.selectAllData(sql);
    //要上传文件的本地路径
    let filePath = `${serverFilePath}/${result.name}`;
    let fileSize = fs.statSync(filePath).size;
    result.size= Math.ceil(fileSize/1024);
    let filename = result.name;
    let stats=await qqfilecos(filename,filePath,fileSize);
    await delFile(`./static/upload/`); 
    ctx.body={status:0};
});
router.delete('/banner/:id',async (ctx)=>{

    let id=ctx.params.id;
    let sql=`DELETE FROM banner WHERE id = '${id}'`;
    let results = await query.selectAllData(sql);
    ctx.body={status:0};
});
router.post('/cases',async (ctx)=>{
    
   // 上传文件请求处理

    let title=ctx.request.body.title;
    let src=ctx.request.body.src;
    let sql = `INSERT INTO cases (src,title) VALUE('${src}','${title}')`;
    let results = await query.selectAllData(sql);

    ctx.body={status:0};
});
router.delete('/cases/:id',async (ctx)=>{

    let id=ctx.params.id;
    let sql=`DELETE FROM cases WHERE id = '${id}'`;
    let results = await query.selectAllData(sql);
    ctx.body={status:0};
});



module.exports = router;
