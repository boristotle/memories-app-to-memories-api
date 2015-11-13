var app = angular.module('myApp', ['ngRoute'])

app.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    templateUrl: '/partials/home.html',
    controller: 'homeController'
  })
  .when('/years/:year', {
    templateUrl: '/partials/year.html',
    controller: 'yearController'
  })
  $locationProvider.html5Mode(true)
})

app.controller('homeController', function($scope, $http){
  $http.get('http://g12-darrin-bennett-memories.cfapps.io/api/v1/memories').then(function(response){
    var output = [];
    for (var i = 0; i < response.data.rows.length; i++) {
      output.push(response.data.rows[i])
    }
        $scope.memories = output;
  })

  $scope.addMemory = function() {
    $http.post('http://g12-darrin-bennett-memories.cfapps.io/api/v1/memories', {
  "data": {
    "type": "memory",
    "attributes": {
      "old_days": $scope.old_days,
      "these_days": $scope.these_days,
      "year": $scope.year
    }
  }
})
  }

})

app.controller('yearController', function($scope, $http, $location){
  var params = $location.url().split('/')[2];
  $http.get('http://g12-darrin-bennett-memories.cfapps.io/api/v1/memories/' + params).then(function(response){
   var output = [];
    for (var i = 0; i < response.data.rows.length; i++) {
      output.push(response.data.rows[i])
    }
    $scope.params = $location.url().split('/')[2];
        $scope.memories = output;
        console.log(output);
  })
})

  
