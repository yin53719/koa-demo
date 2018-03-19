const router = require('koa-router')();
const home = require('./home');
const about = require('./about');
const service = require('./service');
const design = require('./design');
const login = require('./login');
const register = require('./register');
// router.use(async (ctx,next)=>{
//     if(!ctx.session.admin_id && ctx.url !='/admin/login' && ctx.url !='/admin/register'){
//         ctx.redirect('/admin/login');
//     }else{
//       await next();
//     }  
// });

router.use('', home.routes(), home.allowedMethods());
router.use('/service', service.routes(), service.allowedMethods());
router.use('/design', design.routes(), design.allowedMethods());
router.use('/about', about.routes(), about.allowedMethods());
router.use('/login', login.routes(), login.allowedMethods());
router.use('/register', register.routes(), register.allowedMethods());
router.get('/logout',(ctx)=>{
  ctx.session=null;
  ctx.redirect('/admin/');
});

module.exports = router;