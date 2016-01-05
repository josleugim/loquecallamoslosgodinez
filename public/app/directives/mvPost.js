/**
 * Created by @josleugim on 1/5/16.
 */
angular.module('app').factory('mvPost', function ($resource) {
    var feedResource = $resource('/api/posts/:id/',
        {
            _id: "@id"
        },
        {
            get: {
                method: "GET",
                headers: {'Content-Type': 'application/json'}
            }
        }
    );

    return feedResource;
});