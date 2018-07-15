var module=angular.module('CartApp',[])
module.controller('CartCtrl',function($scope,$http) {
	$scope.cart=[]
	//метод який додає товар у корзину
	$scope.addProductCart=function(item){  //добавляємо товар
		var pos=$scope.cart.indexOf(item)
		if(pos==-1){
			item.newcount=1; 
			item.newprice=item.price;
			$scope.cart.push(item);
		}
		else{
			alert('Даний товар вже в корзині')
		}

	}

	$scope.deleteProductCart=function(item){
		var pos=$scope.cart.indexOf(item); //видаляєм товар
		$scope.cart.splice(pos,1);
	}

	$scope.plusCount=function(item){
		if (item.newcount+1>item.count){
			alert("Неможна замовити більше");
			return;
		}
		item.newcount++;
		item.newprice+=item.price
	}

	$scope.minusCount=function(item){
		if (item.newcount==1) {
			$scope.deleteProductCart(item);
			return;
		}
		item.newcount--;
		item.newprice-=item.price
	}
	$scope.sumTotal=function(){
		var res=0;
		$scope.cart.forEach(function(elem){
			res+=elem.newprice
		})
		return res;
	}
//Orders
	$scope.orders=[];
	$scope.neworder={};
	$scope.sendOrder=function(order){
		order.cart=$scope.cart;
		console.log($scope.sumTotal());
		order.total=$scope.sumTotal();
		order.check=false;
		$http.post('/sendorder',order).then(function(data){
			console.log(data.data);
			alert('Дані замовлення відправлені на пошту!');
			$scope.neworder={};
			$scope.cart=[];
			})
	}
	$scope.getOrders=function(){
		$http.get('/getorders').then(function(data){
			console.log(data.data);
			$scope.orders=data.data;

		})
	}
	$scope.getOrders();

	$scope.closeOrder=function(item){
		var obj={
			id:item._id,
			cart:item.cart
		}
		console.log(obj);
		$http.post('/closeorder',obj).then(function(data){
			console.log(data.data);
			$scope.getOrders();
		})

	}

})