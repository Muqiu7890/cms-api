const md5 = require('blueimp-md5');
const moment = require('moment');
const db = require('../models/db')

exports.list = (req,res,next) => {

}
exports.create = async (req,res,next) => {
    const body = req.body;
    //console.log(body);
    const sqlStr =
        `INSERT INTO users(username,password,email,nickname,avatar,gender,create_time,modify_time) VALUES('${body.email}','${md5(md5(body.password))}','${body.email}','${body.nickname}', 'default-avatar.png',0,'${moment().format('YYYY-MM-DD hh:mm:ss')}','${moment().format('YYYY-MM-DD hh:mm:ss')}')`;

    try {
        const ret = await db.query(sqlStr);
        const users = await db.query(`SELECT * FROM users WHERE id=${ret.insertId}`);
        res.status(201).json(users)
    } catch (err) {
        next(err)
    }
}
exports.update = (req,res,next) => {

}
exports.destroy = (req,res,next) => {

}