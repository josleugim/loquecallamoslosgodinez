/**
 * Created by @josleugim on 1/5/16.
 */
angular.module('app')
    .controller('mvHomeCtrl', function ($scope, mvPost) {
        $scope.posts = mvPost.query({currentPage:1});
    });