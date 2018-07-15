//підключаєм модуль express
var express=require('express');
var app=express();
app.use(express.static(__dirname));



//підключаєм модуль body-parser і інтегруєм в express
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//підключаєм cookie-parser
var cookieParser=require('cookie-parser');
app.use(cookieParser());

//підключаєм cookie-session, час життя сесії - 2 год.
var session=require('cookie-session');
app.use(session({keys:['secret'],
maxAge:2*60*60*1000}));

var Admin=require('./models/admin');
var User=require('./models/user');

//підключаєм passport
var passport=require('passport');
app.use(passport.initialize());
app.use(passport.session());

//підключаєм passport-local для автентифікації
var LocalStrategy=require('passport-local').Strategy;

//підключаєм passport-facebook для автентифікації
var FacebookStrategy=require('passport-facebook').Strategy;
var facebookAuth=require('./facebookauth');

passport.use(new FacebookStrategy({
    "clientID"        : facebookAuth.clientID,
    "clientSecret"    : facebookAuth.clientSecret,
    "callbackURL"     : facebookAuth.callbackURL,
    "profileFields": ['id', 'displayName', 'photos', 'email']
},
function (token, refreshToken, profile, done) {
	console.log("profile:");
	console.log(profile);
	User.find({id:profile.id}, function(err,data){
			if(data.length)
			return done(null,{id:data[0]._id});
			else{
				var newuser=new User({
				"id":       profile.id,
            	"name":     profile.displayName,
            	"email":    profile.emails[0].value||"",
            	"photos":   profile.photos[0].value||"",
            	"password": token
				})
				newuser.save(function(err,user){
				return done(null,{id:user._id});
				})
			}
	});
}));

passport.use(new LocalStrategy(
    function(username,password,done){
    console.log("username:");
    console.log(username);
    console.log("password:");
    console.log(password);
    Admin.find({username:username,password:password}, function(err,data){
    	console.log('datalength:');
    	console.log(data.length)
		if(data.length)
			return done(null,{id:data[0]._id});
		else
			User.find({name:username,password:password},function(err,data){
				console.log('userfind');
				console.log(data);
			if(data.length)
			return done(null,{id:data[0]._id});
			else
			return done(null,false);
			})
		});	
    }));


//записуєм дані об'єкта, які повертає local-стратегія після автентифікації в сесію,
//користувач авторизується
passport.serializeUser(function(user,done){
	console.log("serializeUser:");
	console.log(user);
	return done(null,user);
});

passport.deserializeUser(function(user,done){
	console.log("deserializeuser:")
	console.log(user);
	Admin.find({_id:user.id},function(err,data){
  	 	if(data.length)
		return done(null,{username:data[0].username,id:data[0]._id});
		else
		User.find({_id:user.id},function(err,data){
		console.log('data:');
		console.log(data);
		if(data.length)
		return done(null,data[0]);
	    })	
	});
});

// запуск автентифікації на основі local-стратегії з відповідним редіректом
var auth=passport.authenticate(
	'local',{
		successRedirect:'/admin',
		failureRedirect:'/login'
		
	});
var authnew=passport.authenticate(
	'local',{
		successRedirect:'/',
		failureRedirect:'/'
		
	}
	)

// middleware -перевіряє, чи користувач є авторизованим
var myAuth=function(req,res,next){
	if(req.isAuthenticated() && req.user.username)
		next();
	else {
		res.redirect('/login');
	}
}

// опрацювання шляху /login від клієнта
app.post('/login',auth);
app.post('/loginnew',authnew);
app.get('/login',function(req,res){
	res.sendFile(__dirname+'/viewsadmin/login.html');
})
// опрацювання кореневого шляху від клієнта
app.get('/admin',myAuth);
//get-запит - сторінка адміністрування
app.get('/admin',function(req,res){
	res.sendFile(__dirname+"/viewsadmin/admin.html");
})

app.get("/auth/facebook", passport.authenticate("facebook", { scope : "email" }));
// handle the callback after facebook has authenticated the user
app.get("/auth/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect : "/",
        failureRedirect : "/"
}));


//підключаєм модуль multer для завантаження файлів на сервер
var multer=require('multer');
var storage=multer.diskStorage({
	destination:function(res,file,cb){
		cb(null,'./img')
	},
	filename:function(res,file,cb){
		cb(null,file.originalname)
	}
})
var upload=multer({storage:storage})
app.post('/uploadfile',upload.single('upl'),function(req,res){
	console.log(req.filename);
	res.send(req.file.path);
})

//підключаєм роутер
var router=require('./router');
app.use('/',router);


app.listen(process.env.PORT||8080);
console.log('Run Server!');


