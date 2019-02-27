exports.list = (req,res,next) => {

}
exports.create = async (req,res,next) => {
    const body = req.body;
    try {
        body.user_id = req.session.user.id;

        const sqlStr = `INSERT INTO topics(content,create_time,modify_time,article_id,user_id,reply_id) VALUES('${body.content}','${moment().format('YYYY-MM-DD hh:mm:ss')}','${moment().format('YYYY-MM-DD hh:mm:ss')}','',${body.user_id}',)`;
        const ret = await db.query(sqlStr);
        const [topic] = await db.query(`SELECT * FROM topics WHERE id=${ret.insertId}`);
        res.status(201).json(topic)
    } catch(err) {
        next(err)
    }

}
exports.update = (req,res,next) => {

}
exports.destroy = (req,res,next) => {

}