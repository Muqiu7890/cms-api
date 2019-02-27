const mysql = require('mysql');

//创建一个连接池 效率更高 不需要每次都重新建立连接
const pool  = mysql.createPool({
    host            : 'localhost',
    user            : 'root',
    password        : 'Qj@123456',
    database        : 'cms'
});

//query方法 查返回数组 增删改返回对象
exports.query = function(sqlStr) {
    //从连接池中拿一个连接
    return new Promise((resolve,reject) => {
        pool.getConnection(function(err, connection) {
            if (err) {
                return reject(err)
            } // not connected!

            // Use the connection
            connection.query(sqlStr, (error, ...args) => {
                // 释放连接
                connection.release();
                if (err) {
                    return reject(err)
                }
                resolve(...args);
            });
        });
    })
}