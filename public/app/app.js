/**
 * Created by @josleugim on 12/23/15.
 */
'use strict'
angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });
    $routeProvider
        .when('/', {
            templateUrl: '/partials/home/index',
            controller: 'mvHomeCtrl'
        })
});

angular.module('app').run(function ($rootScope, $location) {
});