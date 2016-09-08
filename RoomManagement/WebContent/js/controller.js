var myMod = angular.module('room_app',['ngRoute','ngCookies']);

var roomController = function($scope,$rootScope,$cookieStore){
	
	$scope.adminRegistration = function(){
		firstName = $scope.RAFname;
		lastName = $scope.RALname;
		userName = $scope.RAusername;
		password = $scope.RApassword;
		email = $scope.RAemail;
		phone = $scope.RAphone;
		
		$http(
				{
					method : 'POST',
					url : 'http://10.20.14.83:9000/register',
					headers : {
						'Content-Type' : 'application/json',
						'Access-Control-Allow-Origin' : 'http://10.20.14.83:9000'
					},
					data : {
						firstName : firstName,
						lastName : lastName,
						userName : userName,
						password : password,
						email : email,
						phone : phone
					}
				}).then(
				function successCallback(response) {
					
					if (data == "Registration successful") {
						
						$location.path("/login");
					} else {
						alert('Already existing user');
					}
				},
				function errorCallback(response) {
					alert("Server Error. Try After Some time: "
							+ response);
				});
	}
	
	
	$scope.adminLogin = function(){
		console.log("Login button clicked");
		username = $scope.Aname;
		password = $scope.Apwd;
		
		
		
		$http({
					method : 'POST',
					url : 'http://10.20.14.83:9000/login',
					headers : {
						'Content-Type' : 'application/json',
						'Access-Control-Allow-Origin' : 'http://10.20.14.83:9000'
					},
					data : {
						userName : username,
						password : password
					}
			 })
			 .then(
					function successCallback(response) {

				
					if (x=2){
						$rootScope.flag = "admin";
					}else{
					
					
					}
			      });
	}
	
	
	$scope.userRegistration = function(){
		firstName = $scope.RUFname;
		lastName = $scope.RULname;
		userName = $scope.RUusername;
		password = $scope.RUpassword;
		email = $scope.RUemail;
		phone = $scope.RUphone;
		
		$http(
				{
					method : 'POST',
					url : 'http://10.20.14.83:9000/register',
					headers : {
						'Content-Type' : 'application/json',
						'Access-Control-Allow-Origin' : 'http://10.20.14.83:9000'
					},
					data : {
						firstName : firstName,
						lastName : lastName,
						userName : userName,
						password : password,
						email : email,
						phone : phone
					}
				}).then(
				function successCallback(response) {
					
					if (data == "Registration successful") {
						
						$location.path("/login");
					} else {
						alert('Already existing user');
					}
				},
				function errorCallback(response) {
					alert("Server Error. Try After Some time: "
							+ response);
				});
		
		
	}
	
	
	$scope.userLogin = function(){
		console.log("Login button clicked");
		username = $scope.Uname;
		password = $scope.Upwd;
		
		
		
		$http({
					method : 'POST',
					url : 'http://10.20.14.83:9000/login',
					headers : {
						'Content-Type' : 'application/json',
						'Access-Control-Allow-Origin' : 'http://10.20.14.83:9000'
					},
					data : {
						userName : username,
						password : password
					}
			 })
			 .then(
					function successCallback(response) {

				
					if (x=2){
						$rootScope.flag = "user"
					}else{
					
					
					}
			      });
	}
	
	$scope.createRoom = function(){
		
		if($rootScope.flag == "admin"){
		   var bannerImage=document.getElementById("image_upload_preview");
		   var imgData = getBase64Image(bannerImage);
		   
		   function getBase64Image(img) {
			 var canvas = document.createElement("canvas");
			    canvas.width = img.width;
			    canvas.height = img.height;

			    var ctx = canvas.getContext("2d");
			    ctx.drawImage(img, 0, 0);

			    var dataURL = canvas.toDataURL("image/png");

			    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
		    }

		   console.log("imgData = " + imgData);
	       function readURL(input) {
			 if (input.files && input.files[0]) {
			        var reader = new FileReader();

			        reader.onload = function (e) {
			            $('#image_upload_preview').attr('src', e.target.result);
			        }

			        reader.readAsDataURL(input.files[0]);
			  }
			 }
		     $("#inputFile").change(function () {
				    readURL(this);
			 });

	
           $http({
			method : 'POST',
			url : 'http://10.20.14.83:9000/postAd',
			headers : {
				'Content-Type' : 'application/json',
				'Access-Control-Allow-Origin': 'http://10.20.14.83:9000',
				'auth-token': $cookieStore.get('auth-token')
			},
			data : {
				
				
				    title:p_title , 
				    name: p_sname, 
				    category: p_cat, 
				    description: p_desc,
				    price : p_price,
				    photoCount : 1,
				    photo1:imgData
			}		
		    }).then(function successCallback(response) {
			var data = response.data;
			if(response.data != null) {
				console.log(data);
				alert("Ad posting Successful!");
				$cookieStore.put("currentUser",data.data.userId);
				$location.path("/");
			} else {
				alert('Please enter the correct credentials');
			}		
		}, function errorCallback(response) {
			alert("Server Error. Try After Some time: " + response);

		});
	 }
		else{
			alert("You don't have the permission to add rooms!!");
		}
   }





}

myMod.controller('RoomController', roomController);

myMod.config(function($routeProvider){
	
	$routeProvider
	.when('/',{
		controller : "RoomController",
		templateURL : "index.html"
	})
});