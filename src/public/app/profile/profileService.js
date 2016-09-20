(function () {
    angular
        .module('foodtrucksApp')
        .service('profileService', profileService);

    function profileService ($http) {

        this.getReview = id => {
            return $http.get('/api/reviews/' + id).then(response => response.data);
        };

    }
})();