(function () {
    angular
        .module('foodtrucksApp')
        .service('foodtruckService', foodtruckService);

    function foodtruckService ($http) {

        this.getFoodtruck = () => {
            return $http.get('/api/foodtrucks').then(response => response.data);
        };
        this.addNewFoodtruck = foodtruck => {
            return $http.post('/api/foodtrucks', foodtruck).then(response => response.data);
        };
        this.getFoodtruckId = id => {
            return $http.get('/api/foodtrucks/' + id).then(response => response.data);
        };
        this.updateFoodtruck = (id, obj) => {
            return $http.put('/api/foodtrucks/' + id, obj).then(response => response.data);
        };
        this.addReview = (id, obj) => {
            return $http.post('/api/reviews/' + id, obj).then(response => response.data);
        };
        this.addFavorite = (currentUserId, foodtruckId) => {
            return $http.post('/api/users/favorite/' + currentUserId, foodtruckId).then(response => response.data);
        };
        this.sendTextMessage = data => {
            return $http.post('/api/twilio', data).then(response => response.data);
        };

    }

})();