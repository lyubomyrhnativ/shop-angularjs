var  module=angular.module('productApp',[]);

module.directive('currentItem',function(){
	return function(scope,element,attr){
		element.on('load',function(e){
			var path=e.target.contentDocument.body.innerHTML;
			if(!path) return;
			console.log(path);
			scope.$apply(function(){
				scope.newproduct.path=path;
			})
			
		})
	}
})
module.controller('productCtrl',function ($scope,$http) {
//масив продуктів
$scope.products=[];

$scope.loadProducts=function(item,psort){
	var item=item||'Всі категорії'
	var psort=psort||'По спаданню'
	$http.post('/loadProducts',{name:item}).then(function(data){
		$scope.products=data.data
		console.log($scope.products);
		$scope.sortMas(psort,$scope.products);
		$scope.setPage(1);
	})
}
$scope.loadProducts();

$scope.sortSelect="По спаданню"; 

$scope.sortMas=function(value,mas){
	function sortDesc(a,b){
		return b.price-a.price; //по спаданню
	}
	function sortAcces(a,b){
		return a.price-b.price; //по зростанню
	}
 if (value=='По спаданню') 
 	mas.sort(sortDesc)
 else 
 	mas.sort(sortAcces);
 	console.log('items:');
 	console.log($scope.items);
}	

$scope.getPage=function(totalItems,curentPage,pageSize){
		var curentPage=curentPage ||1;
		var pageSize=pageSize||5;
		var totalPage=Math.ceil(totalItems/pageSize);
		var startPage=null;
		var endPage=null;
		if (totalPage<10) {
			startPage=1;
			endPage=totalPage;
		}
		else{
			if(curentPage<=6){
				startPage=1;
				endPage=10;
			}
			else{
				if (curentPage+4>totalPage) {
					endPage=totalPage;
					startPage=totalPage-9;
				}
				else{
					endPage=curentPage+4;
					startPage=curentPage-5;
				}
			}
		}
	
		var pages=[];
		for(var i=startPage;i<=endPage;i++)
		pages.push(i);
	startIndex=(curentPage-1)*pageSize;
	endIndex=Math.min(startIndex+pageSize-1,totalItems-1);
	
	return {
		pages:pages,
		startIndex:startIndex,
		endIndex:endIndex,
		startPage:startPage,
		endPage:endPage,
		curentPage:curentPage,
		totalItems:totalItems,
		pageSize:pageSize
	}
}
$scope.items=[];
$scope.objpage={};
console.log($scope.objpage);
$scope.setPage=function(pageNamber){
	$scope.objpage=$scope.getPage($scope.products.length,pageNamber)
	console.log($scope.objpage);
	$scope.items=
	$scope.products.slice($scope.objpage.startIndex,$scope.objpage.endIndex+1)
	console.log($scope.items);
}

//додавання/редагування продукту (адміністрування)

//напис на кнопці
$scope.btnproduct="Add";
//новий продукт
$scope.newproduct={}
//відкриття форми додавання нового або редагування існуючого продукту
$scope.editOrCreate=function(obj){
	if(obj){
		$scope.newproduct=obj;
		$scope.btnproduct="Update"
	}
	else{
		$scope.newproduct={};
		$scope.btnproduct='Add';
	}
	$scope.ShowAdminAddProducts();
}
//
$scope.updateOrSave=function(obj){
	$http.post('/updatesave',obj).then(function(data){
		console.log(data.data);
		$scope.loadProducts();
		$scope.ShowAdminProducts();
	})
}
//знищення продукту з бази даних по id, оновлення html
$scope.deleteProduct=function(obj){
	var idobj={id:obj._id};
	$http.post('/deleteproduct',idobj).then(function(data){
		console.log(data.data);
		$scope.loadProducts();
	})
}

})