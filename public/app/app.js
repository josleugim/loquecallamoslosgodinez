/**
 * Created by @josleugim on 12/23/15.
 */
angular.module('app', ['ngResource', 'ngRoute']);

angular.module('app').config(function ($routerProvider, $locationProvider) {
    $locationProvider.html5Mode({
        enabled: true,
        requireBase: false
    });

    $routerProvider
        .when('/', {
            templateUrl: '/partials/home/post'
        })
});