const md5 = require('blueimp-md5');
const db = require('../models/db');
const session = require('express-session');

//获取当前会话信息
exports.get = (req,res,next) => {
    const {user} = req.session
    if(!user) {
        return res.status(401).json({
            error: 'Unauthorized'
        })
    }
    res.status(200).json(user)
}

//用户登陆
exports.create = async (req,res,next) => {
    const body = req.body;
    const sqlStr = `SELECT * FROM users WHERE email='${body.email}' and password='${md5(md5(body.password))}'`

    try {
        const [user] = await db.query(sqlStr)

        if(!user) {
            return res.status(404).json({
                error: 'Invalid email or password'
            })
        }

        //若用户存在 记录会话
        req.session.user = user;
        //发送响应
        res.status(201).json(user)
    } catch (err) {
        next(err)
    }
}
exports.destroy = (req,res,next) => {
    delete req.session.user
    res.status(201).json({})
}