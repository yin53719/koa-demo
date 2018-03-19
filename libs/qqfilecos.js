const path = require('path');
const fs = require('fs');
const COS = require('./cos-nodejs/sdk/cos');

function qqfile (filename,filepath,fileSize){
    //const filepath = path.resolve(__dirname,'../static/upload',filename);
    const params = {
        Bucket : 'static',    /* 必须 */
        Region : 'cn-east',  //cn-south、cn-north、cn-east  /* 必须 */
        Key : filename,    /* 必须 */
        Body : filepath,    /* 必须 */
        ContentLength : fileSize,    /* 必须 */
    };

    return new Promise((resolve, reject) => {
        COS.putObject(params, function(err, data) {
            if(err) {
                resolve(false);
            } else {
                resolve(true);
                
            }
        });
    });
}
module.exports =qqfile;

