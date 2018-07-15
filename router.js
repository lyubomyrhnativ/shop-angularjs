var express=require('express');
var router=express.Router();

var nodemailer=require('nodemailer');
var transport=require('./nodemailer');
var transporter = nodemailer.createTransport(transport);

//підключаєм моделі
var Product=require('./models/product');
var Category=require('./models/category');
var Order=require('./models/order');


router.get('/',(req,res)=>{
  res.sendFile(__dirname+'/views/index.html');
})

router.get('/frequser',function(req,res){
	res.send(req.user);
})
router.get('/logout',function(req,res){
	req.session=null;
	res.send('logout!');
})

router.post('/updatesave',function(req,res){
	console.log(req.body);
	if(req.body._id)
		Product.update({_id:req.body._id},req.body,function(err,data){
			res.send('update product!');
		})
	else{
		var product=new Product(req.body);
		product.save(function(err,data){
			console.log(data);
			res.send('save product!');
		})
	}
})
router.post('/deleteproduct',function(req,res){
	Product.remove({_id:req.body.id},function(err,data){
		res.send('delete product!');
	})
})
router.post('/deletecategory',function(req,res){
	console.log(req.body);
	Category.remove({_id:req.body.id},function(err,data){
		res.send('delete category');
	})
})
router.post('/addcategory',function(req,res){
	console.log(req.body);
	if(req.body._id)
		Category.update({_id:req.body._id},req.body,function(err,data){
			res.send('update category!');
		})
	else{
		var category=new Category(req.body);
		category.save(function(err,data){
			res.send('save category!');
		})
	}
})
router.get('/loadcategory',function(req,res){
	Category.find(function(err,data){
		res.send(data);
	})
});
router.post('/loadproducts',function(req,res){
	if(req.body.name=='Всі категорії')
	Product.find(function(err,data){
		res.send(data);
	})
	
else{
	Product.find({category:req.body.name},function(err,data){
		console.log(data);
		res.send(data);
	})
}
});

router.post('/sendorder',function(req,res){
	console.log(req.body);
	var order=new Order(req.body);
	order.save(function(err,data){
		var text='';
		var html='';
		for(var i=0;i<data.cart.length;i++){
			item=data.cart[i].name+' '+data.cart[i].model+
			'    '+data.cart[i].category+'     '+data.cart[i].newcount+'     '+
			data.cart[i].newprice;
			text+=item;
			html+='<p>'+item+'</p>';
		}
		var mailOptions = {
        from: '"AngularShop" <vitang.developer@gmail.com>', // sender address
        to: data.email, // list of receivers
        subject: 'You order', // Subject line
        text: text, // plain text body
        html: html // html body
    };
   
    transporter.sendMail(mailOptions, (error, info) => {
    	console.log('send');
    	console.log(error);
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        // Preview only available when sending through an Ethereal account
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
	
})
		res.send('sendorder');
	})
	
})
router.get('/getorders',function(req,res){
	Order.find({check:false},function(err,data){
		console.log('getorders:');
		console.log(data);
		res.send(data);
	})
})
router.post('/closeorder',function(req,res){
	console.log(req.body);
	Order.update({_id:req.body.id},{$set:{check:true}},function(err,data){
		console.log(data);
	});
	var cart=req.body.cart;
	for(var i=0;i<cart.length;i++){
		Product.update({model:cart[i].model},{$inc:{count:-cart[i].newcount}},
			function(err,data){
				console.log(data);
			})
	}
	
    res.send('close order!');
});


module.exports=router;



