var express = require('express');
var  app = express();
var port = process.env.PORT || 80;
var moment = require('moment');

mongoose = require("mongoose"),
 bodyParser = require("body-parser"),
 blog = require('./models/blog'),
user = require('./models/user'),
 friend = require('./models/friend');
mongoose.connect("mongodb://sjv97mhjn:1997@ds229380.mlab.com:29380/blog");
//var particlesJS = require('particles.js');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + "/public"));
//app.use(express.static(__dirname + "/views"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

 app.use(require("express-session")({
        secret:"My_Name_Is_Sajeev_Mahajan",
        resave:false,
        saveUninitialized :false
        
}));
// middleware 
 var myLogger = function (req, res, next) {
  console.log(req.session);
  if(req.session.user){
    next();
   }
   else
   	res.redirect('/');
}

// app.get('/adduser',function(req,res){ 
// 	res.render('user.ejs');
// })

// app.post('/adduser',function(req,res){ 
//  var newuser = new user ({
//    name:req.body.name,
//    password:req.body.password
//  });
//  newuser.save(function(err,result){
//  	if(err){
//  		console.log(err);
//  	}
// 		res.redirect('/');	 	
//  })

// })
app.get('/loginuser',function(req,res){ 
	res.render('loginuser.ejs');
})
app.post('/loginuser',function(req,res){ 

 user.findOne({name:req.body.name},function(err,result){
 	if(err||result==null){
 		console.log(err);
		res.redirect('/') 
	}
		else{

			if(result.password!=req.body.password){
				res.send("No user found");
			}
			else{
				req.session.user=result;
				console.log(req.session);
				res.redirect('/');
			}

		}	 	
 })

})

app.get('/',function(req,res){
	//res.send("Cool Dude");
	//res.send('directory name is ' +__dirname );
	//d = new Date();
	//localOffset = d.getTimezoneOffset() * 60000;
	//res.send(localOffset);
	var flag=0;
	if(req.session.user)
		flag=1;

	res.render("main.ejs",{flag:flag});
	//console.log(process.env.PORT);
})
app.get('/showblog',function(req,res){
	blog.find( {"date"  : {$gte : new Date("2019-10-11T19:42:28.197Z")}},function(err,blogs){
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

app.get('/showChapter1',function(req,res){
	blog.find( {"date"  : {$lte : new Date("2019-10-11T19:42:27.197Z")}},function(err,blogs){
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
app.get('/deleteblog/:id',myLogger,function(req,res){
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
app.get('/editblog/:id',myLogger,function(req,res){
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

app.post('/editblog',myLogger,function(req,res){
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


app.get('/addBlog',myLogger,function(req,res){
	res.render("add.ejs");
})

app.post('/addBlog',myLogger,function(req,res){
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
			res.redirect('/showblog');
		}
	})
})
app.get('/kaf',myLogger,function(req,res){ 
		//res.send("Nice");
		friend.find( {},function(err,friends){
		if(err){
			console.log(err);
			res.send(err);
		}
		else{
		res.render("kaf.ejs",{friends:friends});

	}
})
})

app.post('/af',myLogger,function(req,res){ 
	var newFriend = new friend ({ 
 		name : req.body.name, 
 		content : " ",
	});
	newFriend.save(function(err,result){
		if(err){
			console.log(err);
			res.send(err);
		}
		else{
			res.redirect('/kaf');
		}
	})
})
app.get('/sf/:id',function(req,res){
friend.findOne({_id:req.params.id},function(err,Friend){ 
	if(err){
			console.log(err);
			res.send(err);
		}
		else{
		res.render("sf.ejs",{Friend:Friend});

	}
})

})

app.post('/ef/:id',function(req,res){ 
friend.findOne( {_id:req.params.id},function(err,Friend){
		if(err){
			console.log(err);
			res.send(err);
		}
		else{
			console.log(Friend);
			Friend.content=req.body.content;
		Friend.save(function(err,result){
		if(err){
			console.log(err);
			res.send(err);
		}
		else{
			res.redirect('/sf/'+req.params.id);
		}
	})
		}
		
	}); 
})
app.get('/df/:id',function(req,res){
	friend.remove( {_id:req.params.id},function(err,Friend){
		if(err){
			console.log(err);
			res.send(err);
		}
		else{
		
			res.redirect('/kaf');
		}

	}); 
})

app.listen(port,function(req,res){
	console.log(`Listening on port ${port}`);
})
