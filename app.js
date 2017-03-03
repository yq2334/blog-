var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//设置我们的app应用的路由架构
var index = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup设置模板引擎
app.set('views', path.join(__dirname, 'views'));//设置/public/favicon.ico为favicon图标。
app.set('view engine', 'ejs');//设置视图模板引擎为 ejs。

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));//加载日志中间件
//用bodyParser解析post请求提交的数据
app.use(bodyParser.json());//加载解析json的中间件
app.use(bodyParser.urlencoded({ extended: false }));//加载解析urlencoded请求体的中间件
app.use(cookieParser());//加载解析cookie的中间件
//设置 views 文件夹为存放视图文件的目录, 即存放模板文件的地方,__dirname 为全局变量,
// 存储当前正在执行的脚本所在的目录
app.use(express.static(path.join(__dirname, 'public')));//设置静态路由

//路由映射，路由的设定应遵循restful设计原则
app.use('/', index);//根目录的路由
app.use('/users', users);//用户路由

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
