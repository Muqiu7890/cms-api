const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');
const session = require('express-session');
const app =express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    // 无论你是否使用 Session ，我都默认直接给你分配一把钥匙
    saveUninitialized: true
}))

app.use(router)

app.use((err,req,res,next) => {
    res.status(500).json({
        err: err.message
    })
})

app.listen(3000, () => {
    console.log("App is running at port 3000 ...");
})