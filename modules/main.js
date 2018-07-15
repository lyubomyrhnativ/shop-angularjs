var module=angular.module("mainApp",["productApp","CategoryApp","CartApp"]);
module.controller('mainCtrl',function($scope,$http){
$scope.test='test';
$scope.fuser={};
$scope.fvisible=false;

$scope.fReqUser=function(){
	$http.get('/frequser').then(function(data){
		if(data.data){
		$scope.fuser=data.data;
		$scope.fvisible=true;
		}
	})
}
$scope.fReqUser();
$scope.logOutUser=function(){
	$http.get('/logout').then(function(data){
		console.log(data.data);
		location.reload();
	})
}


$scope.current={
	view:"views/products.html",
	header:"Товари"
};
$scope.showCart=function(){
	$scope.current.view="views/cart.html",
	$scope.current.header="Корзина"
};
$scope.ShowProducts=function(){
	$scope.current.view='views/products.html',
	$scope.current.header="Товари"
};

//Aдмін навігація та видимість
$scope.btnAddProduct=true;
$scope.adminMenu=["Товари","Категорії","Замовлення"];
$scope.currentAdminMenu="Товари";
$scope.setCurrentAdminMenu=function(item){
	$scope.currentAdminMenu=item;
	switch(item){
		case $scope.adminMenu[0]:
		$scope.ShowAdminProducts();
		break;
		case $scope.adminMenu[1]:
		$scope.ShowAdminCategory();
		$scope.btnAddProduct=false;
		break;
		case $scope.adminMenu[2]:
		$scope.ShowAdminOrders();
		$scope.btnAddProduct=false;
	}
}

$scope.ShowAdminProducts=function(){
	$scope.current.view="viewsadmin/adminproducts.html",
	$scope.current.header="Товари";
	$scope.btnAddProduct=true;
};
$scope.ShowAdminAddProducts=function(){
	$scope.current.view="viewsadmin/addproducts.html",
	$scope.current.header="Додати товар";
	$scope.btnAddProduct=false;
};
$scope.ShowAdminCategory=function(){
	$scope.current.view="viewsadmin/admincategory.html",
	$scope.current.header="Категорії";
};
$scope.ShowAdminOrders=function(){
	$scope.current.view="viewsadmin/adminorders.html",
	$scope.current.header="Замовлення";
};







})







//Не потрібно
// module.controller('Ctrl1',function($scope,$rootScope){
// 	$scope.value1='test1'
// 	$scope.sendData=function(){
// 	$rootScope.$broadcast('send',{data:$scope.value1});
// 	}
// 	$scope.sendData();
// })

// module.controller('Ctrl2',function($scope){
// 	$scope.value1='test2'
// 	$scope.$on('send',function(event,data){

// $scope.value1=data.data

// 	})
// })

