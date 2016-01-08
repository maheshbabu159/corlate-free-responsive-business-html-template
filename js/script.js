/* global angular */

// create the module and name it scotchApp
// also include ngRoute for all our routing needs
var scotchApp = angular.module('scotchApp', ['ngRoute']);

// configure our routes
scotchApp.config(function ($routeProvider) {
    $routeProvider

            // route for the home page
            .when('/', {
                templateUrl: 'pages//home/index.html',
                controller: 'mainController'
            })

            // route for the footer page
            .when('/header', {
                templateUrl: 'pages/users/login.html',
                controller: 'mainController'
            })
            // route for the login page
            .when('/header', {
                templateUrl: 'pages/common/header.html',
                controller: 'mainController'
            })
            // route for the about page
            .when('/about', {
                templateUrl: 'pages/about.html',
                controller: 'aboutController'
            })

            // route for the contact page
            .when('/contact', {
                templateUrl: 'pages/contact.html',
                controller: 'contactController'
            })

            // route for the login page
            .when('/login', {
                templateUrl: 'pages/users/login.html',
                controller: 'mainController'
            })
            // route for the login page
            .when('/dashboard-home', {
                templateUrl: 'pages/dashboard/index.html',
                controller: 'mainController'
            })
// route for the login page
            .when('/addMovie', {
                templateUrl: 'pages/dashboard/addMovie.html',
                controller: 'mainController'
            })
            // route for the login page
            .when('/movieDetails/:movieId', {
                templateUrl: 'pages/dashboard/movieDetails.html',
                controller: 'mainController'
            });

});
//Configuring all the constants values of the application
scotchApp.constant('constants', {
    appName: "Admin",
    appVerion: 1.0,
    serviceURL: 'https://api.parse.com/1/functions/function',
    restAPIURL: 'https://api.parse.com/1/classes/',
    defaultAPIURL: 'https://api.parse.com/1/',
    requestMethodType: "Post",
    requestMethodTypeGET: "GET",
    requestHeaders:
            {
                'X-Parse-Application-Id': '3iSUed31jR3LPJwMSBy9rKZDCwo5nYz5i56QMy7s',
                'X-Parse-REST-API-Key': 'PF90VEIV03MedSVp3SVz2Q75QO0SsUZWW2RC09WS',
                'Content-Type': 'application/json'
            },
    methodNames: {
        getAllUsers: 'getAllUsers',
        getAllRoles: 'getAllRoles',
        loginCheck: 'loginCheck',
        addOrEditUser: 'addOrEditUser',
        getMoviesByIndustry: 'getMoviesByIndustry',
        addOrEditMovieDetails: 'addOrEditMovieDetails',
        getMovieDetailsByObjectId: 'getMovieDetailsByObjectId',
        deleteMovieByObjectId: 'deleteMovieByObjectId'
    },
    ClassNames: {
        InstituteDetail: 'InstituteDetail',
        Branch: 'Branch',
        Users: 'users',
        City: 'City',
        Course: 'Course',
        CourseCategory: 'CourseCategory',
        State: 'State',
        TrainerDetail: 'TrainerDetail'


    }
});

scotchApp.controller("mainController", function ($rootScope, $scope, $http, constants, $routeParams, $route) {

    //Controller variables
    $scope.users = [];
    $scope.roles = [];
    $scope.branches = [];
    $scope.cities = [];
    $scope.courses = [];
    $scope.courseCategories = [];
    $scope.states = [];
    $scope.instituteDetails = [];
    $scope.message = "Good Start";
    $scope.moviesList = [];
    $scope.minutesArray = [];

    $scope.getAllMinutes = function(){
      
        for (var i = 1; i <= 30; i++) {
            $scope.minutesArray.push(i * 10);
        }
    };

    $scope.formLoginCheck = function () {

        $scope.dataLoading = true;

        $http({
            method: constants.requestMethodType,
            url: constants.serviceURL,
            headers: constants.requestHeaders,
            data: {
                "method": constants.methodNames.loginCheck,
                "username": $scope.username,
                "password": $scope.password
            }

        }).success(function (data) {

            $scope.dataLoading = false;
            window.location.href = "#dashboard-home";

        }).error(function (status) {

            $scope.dataLoading = false;
            $scope.errorMsg = status;
        });
    };
    $scope.getMoviesByIndustry = function () {

        $scope.dataLoading = true;
        $http({
            method: constants.requestMethodType,
            url: constants.serviceURL,
            headers: constants.requestHeaders,
            data: {
                "method": constants.methodNames.getMoviesByIndustry,
                "industry": 'Tollywood'
            }

        }).success(function (data) {

            $scope.dataLoading = false;
            $scope.moviesList = data['result'];

        }).error(function (status) {

            $scope.dataLoading = false;
            $scope.errorMsg = status;

        });
    };

    $scope.addOrEditMovieDetails = function (isEdit, movieId) {

        $scope.dataLoading = true;
       
        /*var file = $scope.myFile;

        console.log('file is ');
        console.dir(file);*/
     
        $http({
            method: constants.requestMethodType,
            url: constants.serviceURL,
            headers: constants.requestHeaders,
            data: {
                "method": constants.methodNames.addOrEditMovieDetails,
                "movieId": movieId,
                "name": $scope.movieName,
                "isEdit": isEdit,
                "industry": $scope.movieIndustry,
                "releaseDate": $scope.movieReleaseDate,
                "cast": $scope.movieCast,
                "movieLenght": parseInt($scope.movieLenght),
                "description": $scope.movieDescription
            }

        }).success(function () {

            $scope.dataLoading = false;
            window.location.href = "#dashboard-home";

        }).error(function (status) {

            $scope.dataLoading = false;
            $scope.errorMsg = status;
        });
    };
    $scope.getMovieDetailsByObjectId = function (movieId) {

       $scope.dataLoading = true;
       
       alert("ada");
     
        $http({
            method: constants.requestMethodType,
            url: constants.serviceURL,
            headers: constants.requestHeaders,
            data: {
                "method": constants.methodNames.getMovieDetailsByObjectId,
                "movieId": movieId
            }

        }).success(function (data) {

            console.log(data);
            $scope.dataLoading = false;
            $scope.movieDetails = data['result'];

        }).error(function (status) {

            $scope.dataLoading = false;
            $scope.errorMsg = status;
        });
    };
    $scope.deleteMovieByObjectId = function (movieId) {

       $scope.dataLoading = true;
           
        $http({
            method: constants.requestMethodType,
            url: constants.serviceURL,
            headers: constants.requestHeaders,
            data: {
                "method": constants.methodNames.deleteMovieByObjectId,
                "movieId": movieId
            }

        }).success(function (data) {

            console.log(data);
            $scope.dataLoading = false;
            window.location.href = "#dashboard-home";

        }).error(function (status) {

            $scope.dataLoading = false;
            $scope.errorMsg = status;
        });
    };
    $scope.loadDetailsView = function (movieId) {
        
        console.log("in on loadDetailsView");
        window.location.href = "#movieDetails/" + movieId;
    };
     $rootScope.$on('$routeChangeSuccess', function () {
        
        console.log("in on change");
        $scope.movieId = $routeParams.movieId;
    });
    
    $scope.addComment = function () {

        $scope.dataLoading = true;

        $http({
            method: constants.requestMethodType,
            url: constants.serviceURL,
            headers: constants.requestHeaders,
            data: {
                "method": constants.methodNames.loginCheck,
                "userId": $scope.username,
                "password": $scope.password
            }

        }).success(function (data) {

            $scope.dataLoading = false;


        }).error(function (status) {

            $scope.dataLoading = false;

            $scope.errorMsg = status;
        });
    };

    /*{
     "roleId": "ldxUEoDM5j",
     "username": "admin",
     "password": "admin",
     "email": "maheshbabu.somineni@gmail.com",
     "firstName": "Mahesh",
     "lastName": "Somineni",
     "isActive": true,
     "phoneNumber": "9876543",
     "isEdit": false,
     "method": "addOrEditUser",
     "userId": ""
     }*/
    $scope.addOrEditUser = function () {

        $http({
            method: constants.requestMethodType,
            url: constants.serviceURL,
            headers: constants.requestHeaders,
            data: {
                "method": constants.methodNames.addOrEditUser,
                "username": $scope.username,
                "password": $scope.password,
                "roleId": $scope.roleId,
                "email": $scope.email,
                "firstName": $scope.firstname,
                "lastName": $scope.lastname,
                "phoneNumber": $scope.phonenumber,
                "isActive": Boolean($scope.isActive),
                "isEdit": false,
                "userId": ""
            }

        }).success(function () {

            window.location.href = "users.html";

        }).error(function (status) {

            $scope.errorMsg = status;
        });
    };

    $scope.addOrEditInstitute = function () {

        $http({
            method: constants.requestMethodType,
            url: constants.serviceURL,
            headers: constants.requestHeaders,
            data: {
                "method": constants.methodNames.addOrEditInstituteDetails,
                "userId": $scope.userId,
                "isEdit": false,
                "name": $scope.institutename,
                "branchId": $scope.branchId
            }

        }).success(function () {

            window.location.href = "institutes.html";

        }).error(function (status) {

            $scope.errorMsg = status;
        });
    };
    $scope.addOrEditTrainer = function () {

        $http({
            method: constants.requestMethodType,
            url: constants.serviceURL,
            headers: constants.requestHeaders,
            data: {
                "method": constants.methodNames.addOrEditTrainerDetails,
                "userId": $scope.userId,
                "isEdit": false,
                "name": $scope.trainername,
                "instituteDetailId": $scope.instituteDetailId
            }

        }).success(function () {

            window.location.href = "trainers.html";

        }).error(function (status) {

            $scope.errorMsg = status;
        });
    };

    $scope.addOrEditBranch = function () {

        $http({
            method: constants.requestMethodType,
            url: constants.serviceURL,
            headers: constants.requestHeaders,
            data: {
                "method": constants.methodNames.addOrEditBranch,
                "cityId": $scope.cityId,
                "isEdit": false,
                "name": $scope.branchname,
                "branchId": ""
            }

        }).success(function () {

            window.location.href = "branches.html";

        }).error(function (status) {

            $scope.errorMsg = status;
        });
    };

    $scope.addOrEditCourse = function () {

        $http({
            method: constants.requestMethodType,
            url: constants.serviceURL,
            headers: constants.requestHeaders,
            data: {
                "method": constants.methodNames.addOrEditCourse,
                "courseCategoryId": $scope.courseCategoryId,
                "isEdit": false,
                "name": $scope.coursename,
                "courseId": ""
            }

        }).success(function () {

            window.location.href = "courses.html";

        }).error(function (status) {

            $scope.errorMsg = status;
        });
    };

    $scope.addOrEditCity = function () {

        $http({
            method: constants.requestMethodType,
            url: constants.serviceURL,
            headers: constants.requestHeaders,
            data: {
                "method": constants.methodNames.addOrEditCity,
                "stateId": $scope.stateId,
                "isEdit": false,
                "name": $scope.cityname,
                "cityId": ""
            }

        }).success(function () {

            window.location.href = "cities.html";

        }).error(function (status) {

            $scope.errorMsg = status;
        });
    };

    $scope.addOrEditCourseCategory = function () {

        $http({
            method: constants.requestMethodType,
            url: constants.serviceURL,
            headers: constants.requestHeaders,
            data: {
                "method": constants.methodNames.addOrEditCourseCategory,
                "isEdit": false,
                "name": $scope.courseCategoryname,
                "courseCategoryId": ""
            }

        }).success(function () {

            window.location.href = "courseCategories.html";

        }).error(function (status) {

            $scope.errorMsg = status;
        });
    };

    //Method for getting all the users response
    $scope.getAllUsers = function () {

        $http({
            method: constants.requestMethodTypeGET,
            url: constants.defaultAPIURL + constants.ClassNames.Users,
            headers: constants.requestHeaders

        }).success(function (data) {

            $scope.users = data['results'];

        }).error(function (status) {

            alert(status);
        });
    };

    //Method for getting all the users response

    $scope.getAllCities = function () {

        $http({
            method: constants.requestMethodTypeGET,
            url: constants.restAPIURL + constants.ClassNames.City,
            headers: constants.requestHeaders,
            data: {
            }

        }).success(function (data) {

            $scope.cities = data['results'];

        }).error(function (status) {

            alert(status);
        });
    };


    //Method for getting all the users response

    $scope.getAllStates = function () {

        $http({
            method: constants.requestMethodTypeGET,
            url: constants.restAPIURL + constants.ClassNames.State,
            headers: constants.requestHeaders,
            data: {
            }

        }).success(function (data) {

            $scope.states = data['results'];

        }).error(function (status) {

            alert(status);
        });
    };



    //Method for getting all the users response

    $scope.getAllCourseCategories = function () {

        $http({
            method: constants.requestMethodTypeGET,
            url: constants.restAPIURL + constants.ClassNames.CourseCategory,
            headers: constants.requestHeaders,
            data: {
            }

        }).success(function (data) {

            $scope.courseCategories = data['results'];

        }).error(function (status) {

            alert(status);
        });
    };

    //Method for getting all the users response
    $scope.getAllRoles = function () {

        $http({
            method: constants.requestMethodType,
            url: constants.serviceURL,
            headers: constants.requestHeaders,
            data: {
                "method": constants.methodNames.getAllRoles
            }

        }).success(function (data) {

            $scope.roles = data['result'];

        }).error(function (status) {

            alert(status);
        });
    };

    //Method for getting all the users response
    $scope.getAllBranches = function () {

        $http({
            method: constants.requestMethodTypeGET,
            url: constants.restAPIURL + constants.ClassNames.Branch,
            headers: constants.requestHeaders,
            data: {
            }

        }).success(function (data) {

            $scope.branches = data['results'];

        }).error(function (status) {

            alert(status);
        });
    };

    //Method for getting all the users response
    $scope.getAllCourses = function () {

        $http({
            method: constants.requestMethodTypeGET,
            url: constants.restAPIURL + constants.ClassNames.Course,
            headers: constants.requestHeaders,
            data: {
            }

        }).success(function (data) {

            $scope.courses = data['results'];

        }).error(function (status) {

            alert(status);
        });
    };
    //Method for getting all the users response
    $scope.getAllTrainerDetails = function () {

        $http({
            method: constants.requestMethodTypeGET,
            url: constants.restAPIURL + constants.ClassNames.TrainerDetail,
            headers: constants.requestHeaders,
            data: {
            }

        }).success(function (data) {

            $scope.trainers = data['results'];

        }).error(function (status) {

            alert(status);
        });
    };

    //Method for getting all the users response
    $scope.getAllInstituteDetails = function () {

        $http({
            method: constants.requestMethodTypeGET,
            url: constants.restAPIURL + constants.ClassNames.InstituteDetail,
            headers: constants.requestHeaders,
            data: {
            }

        }).success(function (data) {

            $scope.instituteDetails = data['results'];

        }).error(function (status) {

            alert(status);
        });
    };
});


