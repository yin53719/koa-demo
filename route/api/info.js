const router = require('koa-router')();
const common=require('../../libs/common');
const query =require('../../libs/async-db');
const log4js = require('koa-log4')
const logger = log4js.getLogger('http');


router.get('/getCustomer',async (ctx)=>{
    let customer_name = common.getUrlparms(ctx.url,'customer_name');
    let page=common.getUrlparms(ctx.url,'page');
    let limit=common.getUrlparms(ctx.url,'limit');
    let spage=(page-1)*10;
    let sql = `SELECT customer_name,contacts,email,customer_phone,addr,id  FROM customer as a WHERE customer_name LIKE '%${customer_name}%' limit ${spage},${limit}`;
    let users = await query.selectAllData(sql);
    let total = await query.selectAllData(`SELECT count(customer_name) as total FROM customer WHERE customer_name LIKE '%${customer_name}%'`);
    ctx.body={total:total[0].total,users:users};
})
router.post('/addCustomer',async (ctx)=>{
    let customer_name=ctx.request.body.customer_name;
    let contacts=ctx.request.body.contacts;
    let email=ctx.request.body.email;
    let customer_phone=ctx.request.body.customer_phone;
    let addr=ctx.request.body.addr;
    let customer_id=new Date().getTime();
    let sql = `INSERT INTO customer (customer_name,contacts,email,customer_phone,addr,customer_id)  VALUE ('${customer_name}','${contacts}','${email}','${customer_phone}','${addr}','${customer_id}')`;
   
    try {
        let users = await query.selectAllData(sql);
    } catch (error) {
        logger.error(error);
    }
    
    ctx.body={code:200};
})
router.put('/editCustomer/:id',async (ctx)=>{

    let customer_name=ctx.request.body.customer_name;
    let contacts=ctx.request.body.contacts;
    let email=ctx.request.body.email;
    let customer_phone=ctx.request.body.customer_phone;
    let addr=ctx.request.body.addr;

    let sql = `UPDATE customer SET \
    customer_name='${customer_name}', contacts='${contacts}',email='${email}' ,customer_phone='${customer_phone}',addr='${addr}'\
    WHERE id='${ctx.params.id}'`;
    
    console.log(sql);
    let users = await query.selectAllData(sql);

    ctx.body={code:200};
})
router.delete('/removeCustomer/:id',async (ctx)=>{

    let sql = `DELETE FROM customer WHERE id=${ctx.params.id}`;
    let users = await query.selectAllData(sql);
    ctx.body={code:200};
})

module.exports = router;