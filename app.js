var express = require('express');
var  app = express();
var port = process.env.PORT || 5000;
var moment = require('moment');
mongoose = require("mongoose"),
 bodyParser = require("body-parser"),
 blog = require('./models/blog');
mongoose.connect("mongodb://sjv97mhjn:1997@ds229380.mlab.com:29380/blog");
//var particlesJS = require('particles.js');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + "/public"));
//app.use(express.static(__dirname + "/views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

app.get('/',function(req,res){
	//res.send("Cool Dude");
	//res.send('directory name is ' +__dirname );
	//d = new Date();
	//localOffset = d.getTimezoneOffset() * 60000;
	//res.send(localOffset);
	res.render("main.ejs");
	//console.log(process.env.PORT);
})
app.get('/showblog/1234',function(req,res){
	blog.find( {},function(err,blogs){
		if(err){
			console.log(err);
			res.send(err);
		}
		else{
			console.log(blogs);
			//var utc = blogs[0].date;
            // var m = moment.unix(utc).tz('Asia/Kolkata').format('YYYY-MM-DD HH:mm:ss');
			//console.log(m);
			res.render("showblogs.ejs",{blogs:blogs,moment:moment });
		}

	}).sort({date:-1}); 
})
app.get('/deleteblog/:id',function(req,res){
	blog.remove( {_id:req.params.id},function(err,blogs){
		if(err){
			console.log(err);
			res.send(err);
		}
		else{
		
			res.redirect('/showblog');
		}

	}); 
})
app.get('/editblog/:id',function(req,res){
	blog.findOne( {_id:req.params.id},function(err,blog){
		if(err){
			console.log(err);
			res.send(err);
		}
		else{
			console.log(blog);
			res.render("editblog.ejs",{blog:blog});
		}

	}); 
})

app.post('/editblog',function(req,res){
	blog.findOne( {_id:req.body.id},function(err,Blog){
		if(err){
			console.log(err);
			res.send(err);
		}
		else{
			console.log(Blog);
			Blog.content=req.body.content;
		Blog.save(function(err,result){
		if(err){
			console.log(err);
			res.send(err);
		}
		else{
			res.redirect('/showblog');
		}
	})
		}
		
	}); 
})


app.get('/addBlog',function(req,res){
	res.render("add.ejs");
})

app.post('/addBlog',function(req,res){
	//res.send(req.body.content);
	var newBlog = new blog({
		content:req.body.content
	})
	newBlog.save(function(err,result){
		if(err){
			console.log(err);
			res.send(err);
		}
		else{
			res.redirect('/');
		}
	})
})
app.listen(port,function(req,res){
	console.log(`Listening on port ${port}`);
})
