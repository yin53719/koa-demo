const crypto=require('crypto');
const fs=require('fs');
module.exports={
  MD5_SUFFIX: 'FDSW$t34tregt5tO&$(#RHuyoyiUYE*&OI$HRLuy87odlfh是个风格热腾腾)',
  md5:(str)=>{
    var obj=crypto.createHash('md5');

    obj.update(str);

    return obj.digest('hex');
  },
  checkLogin:(ctx)=>{
     if(!ctx.session.admin_id){
     	return true;
     }else{
     	return false;
     }
  },
  getFileSize:(filePath)=>{    
    return new Promise((resolve, reject) => {
      var size=null;
      fs.stat(filePath, (err, stats) => {
         size=stats.size;
         console.log(filePath);
          resolve(size)
      })
     });
  },
  getUrlparms:function(url,key){
      var localhost_url=url.split('?')[1];
      if(!localhost_url){
          return false;
      }
      var str_data=localhost_url.split('&');
      var obj={};
      
      for(var i=0;i<str_data.length;i++){
          var list=str_data[i].split('=');
          var k=list[0];
          var value=list[1];
          obj[k]=value;
      }
      var data=obj[key];
      return data;
  }
};
