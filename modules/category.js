var module=angular.module('CategoryApp',[]);
module.controller('CategoryCtrl',function($scope,$http) {

	$scope.category=[];
	$scope.onlyCategory=[];
$scope.loadCategory=function(){
	$http.get('/loadcategory').then(function(data){
		$scope.category=data.data
		$scope.category.unshift({name:"Всі категорії"})
		$scope.selectCategory=$scope.category[0].name;
		$scope.onlyCategory=$scope.category.slice(1);
	})
	}
$scope.loadCategory();

//Admin category
$scope.btncategory='Add';
$scope.newcategory={};
$scope.deleteCategory=function(item){
	var obj={id:item._id};
	$http.post('/deletecategory',obj).then(function(data){
		console.log(data.data);
		$scope.loadCategory();
	})
}
$scope.updateCategory=function(e,item){
	$scope.btncategory='Update';
	//шукаєм клас .orange
	var orange = angular.element(document.querySelector(".orange"));
	//якщо він існує - знищуємо його
	if(orange.length){
	orange.removeClass('orange');
    }
    //об'єкт, який провокує подію
    var target=e.target;
    //тег об'єкта події
    var tag=target.tagName;
    //elem - елемент td, якому необхідно додати клас .orange
    var elem=null;
    if(tag=='BUTTON'){
    	elem=angular.element(target).parent().addClass('orange');
    }
	else
		elem=angular.element(target).parent().parent().addClass('orange');
	//клонуємо об'єкт-параметр item
	var obj={}
	for(var key in item)
		obj[key]=item[key];
	$scope.newcategory=obj;
}
$scope.cancelCategory=function(){
	$scope.newcategory={};
	//шукаєм клас .orange
	var orange = angular.element(document.querySelector(".orange"));
	//якщо він існує - знищуємо його
	if(orange.length)
	orange.removeClass('orange');
	$scope.btncategory='Add';
}
$scope.addUpdateCategory=function(item){
	$http.post('/addcategory',item).then(function(data){
		console.log(data.data);
		$scope.newcategory={};
		$scope.loadCategory();
		$scope.btncategory='Add';
	})
}
})