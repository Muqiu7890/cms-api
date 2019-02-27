const db = require('../models/db');
const moment = require('moment');

exports.list = async (req,res,next) => {
    //分页处理
    const {_page = 1,_limit = 20} = req.query;
    //校验
    if(_page < 1) {
        _page = 1;
    }
    if(_limit < 1) {
        _limit = 1;
    }
    if(_limit > 20) {
        _limit =20;
    }
    // 1 0 20
    // 2 20 40
    // 3 40 60
    const start = (_page - 1) * _limit
    //第一个参数表示从该参数的下一条数据开始，第二个参数表示每次返回的数据条数。
    const sqlStr = `SELECT * FROM topics LIMIT ${start},${_limit} `;
    try {
        const topics = await db.query(sqlStr)
        res.status(200).json(topics)
    } catch (err) {
        next(err)
    }

}
exports.create = async (req,res,next) => {
    const body = req.body;
    try {
    body.user_id = req.session.user.id;

    const sqlStr = `INSERT INTO topics(title,content,user_id,create_time,modify_time) VALUES('${body.title}','${body.content}','${body.user_id}','${moment().format('YYYY-MM-DD hh:mm:ss')}','${moment().format('YYYY-MM-DD hh:mm:ss')}')`;
    const ret = await db.query(sqlStr);
    const [topic] = await db.query(`SELECT * FROM topics WHERE id=${ret.insertId}`);
    res.status(201).json(topic)
    } catch(err) {
        next(err)
    }
}
exports.update = async (req,res,next) => {
    try {
        const {id} = req.params;
        const {title,content} = req.body;
        const sqlStr = `UPDATE topics SET title='${title}',content='${content}',modify_time='${moment().format('YYYY-MM-DD hh:mm:ss')}' WHERE id=${id}`;
        await db.query(sqlStr)
        const [topic] = await db.query(`SELECT * FROM topics WHERE id=${id}`);
        console.log(topic)
        res.status(201).json(topic);
    } catch(err) {
        next(err)
    }

}
exports.destroy = async (req,res,next) => {
    //url中的:id 动态路由参数
    try {
        const {id} = req.params
        const sqlStr = `DELETE FROM topics WHERE id=${id}`;
        await db.query(sqlStr)
        res.status(201).json({})
    } catch(err) {
        next(err)
    }

}