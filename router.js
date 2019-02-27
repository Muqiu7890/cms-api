const express = require('express');
const router = express.Router();
const userController = require('./controllers/user');
const topicController = require('./controllers/topic');
const commentController = require('./controllers/comment');
const sessionController = require('./controllers/session');
const db = require('./models/db')

function checkLogin(req,res,next) {
    const {user} = req.session
    if(!user) {
        return res.status(401).json({
            error: 'Unauthorized'
        })
    }
    next()
}
async function checkTopic(req,res,next) {
    const [topic] = await db.query(`SELECT * FROM topics WHERE id=${req.params.id}`)
    //资源不存在
    if(!topic) {
        return res.status(404).json({
            error: 'topic not Found.'
        })
    }
    //资源非用户所属 不可删除
    if(topic.user_id !== Number(req.session.user.id)) {
        return res.status(400).json({
            error: 'Action Invalid'
        })
    }
    next()
}
/*
 * 用户资源处理
 */
router
    .get('/users', userController.list)
    .post('/users', userController.create)
    .patch('/users/:id', userController.update)
    .delete('/users/:id', userController.destroy)

/*
 * 话题资源处理
 */
router
    .get('/topics',topicController.list)
    .post('/topics',checkLogin,topicController.create)
    .patch('/topics/:id',checkLogin,checkTopic,topicController.update)
    .delete('/topics/:id',checkLogin,checkTopic,topicController.destroy)

/*
 * 评论资源处理
 */
router
    .get('/comments',commentController.list)
    .post('/comments',commentController.create)
    .patch('/comments/:id',commentController.update)
    .delete('/comments/:id',commentController.destroy)


/*
 * 会话管理
 */
router
    .get('/session',sessionController.get)
    .post('/session',sessionController.create)
    .delete('/session',sessionController.destroy)

module.exports = router;
