const mysql = require('mysql')
const pool = mysql.createPool({
  host     : '118.25.66.58',
  user     : 'yinzc',
  password : 'Yinzc53719.',
  database : 'swtiny'
});
const log4js = require('koa-log4');
let query = function( sql, values ) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection(function(err, connection) {
      if (err) {
        reject( err )
      } else {
        connection.query(sql, values, ( err, rows) => {

          if ( err ) {
            reject( err )
          } else {
            resolve( rows )
          }
          connection.release()
        })
      }
    })
  })
};

query.selectAllData = function (sql){
  let dataList = query( sql )
  return dataList
};


module.exports = query
