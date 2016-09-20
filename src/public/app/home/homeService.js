(function () {
    angular
        .module('forageApp')
        .service('homeService', homeService);

    function HomeService($http, $state) {

        this.getCurrentuser = enforce => {
            return $http.get('/auth/current')
                .then(response => response.data)
                .catch(err => {
                    if (err.status === 401 && enforce) {
                        $state.go('home');
                    }
                })
        };

        this.getCurrentUserId = id => {
            return $http.get('/api/users/' + id).then(response => response.data)
        };

        this.addReview = (id, obj) => {
            return $http.post('/api/users/reviews/' + id, obj).then(response => response.data)
        };


    }
})();