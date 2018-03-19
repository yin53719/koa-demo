const router = require('koa-router')();
const home = require('./home');
 const upload = require('./upload');
const server_include = require('./server_include');
const login = require('./login');
const register = require('./register');
const users = require('./users');
const info = require('./info');

router.use('/', home.routes(), home.allowedMethods());
router.use('/upload', upload.routes(), upload.allowedMethods());
router.use('/server_include', server_include.routes(), server_include.allowedMethods());
router.use('/users', users.routes(), users.allowedMethods());
router.use('/info', info.routes(), info.allowedMethods());
router.use('/login', login.routes(), login.allowedMethods());
router.use('/register', register.routes(), register.allowedMethods());
router.get('/logout',(ctx)=>{
  ctx.session=null;
  ctx.redirect('/admin/');
});

module.exports = router;