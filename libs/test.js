// var User = require("./user.js");

// /**
//  * 插入
//  */
// function insert() {
 
//     var user = new User({
//         username : 'Tracy McGrady',                 //用户账号
//         userpwd: 'abcdaaaaaaaaaaa',                            //密码
//         userage: 137,                                //年龄
//         logindate : new Date()                      //最近登录时间
//     });

//     //var wherestr = {'userage' : 37};

//     user.save(function (err, res) {

//         if (err) {
//             console.log("Error:" + err);
//         }
//         else {
//             console.log("Res:" + res);
//         }

//     });
// }

// insert();


var Yinzc = require("./yinzc.js");

/**
 * 插入
 */
function insert() {
 
    var yinzc = new Yinzc({
        username : 'Tracy McGrady',                 //用户账号
        userpwd: 'abcdaaaaaaaaaaa',                            //密码
        userage: 137,                                //年龄
        logindate : new Date()                      //最近登录时间
    });

    //var wherestr = {'userage' : 37};

    yinzc.save(function (err, res) {

        if (err) {
            console.log("Error:" + err);
        }
        else {
            console.log("Res:" + res);
        }

    });
}

insert();