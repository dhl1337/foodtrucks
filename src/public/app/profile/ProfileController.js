(function () {
    angular
        .module('forageApp')
        .controller('ProfileController', ['HomeService', 'FoodtruckService', 'ProfileService','$stateParams', ProfileController]);

    function ProfileController (HomeService, FoodtruckService, ProfileService, $stateParams) {
        var vm = this;
        vm.currentUserId = $stateParams.id;


        google.maps.visualRefresh = true;
        HomeService.getCurrentUserId(vm.currentUserId).then(user => vm.user = user);

        FoodtruckService.getFoodtruck().then(foodtruck => vm.foodtruck = foodtruck);

        vm.foodtrucksFavorite = () => {
            vm.arr = [];
            for (var i = 0; i < vm.user.length; i++) {
                for (var key in vm.user[i].favorites) {
                    vm.arr.push(vm.user[i].favorites[key]['foodtruckId']);
                }
            }
        };


        ProfileService.getReview(vm.currentUserId).then(foodtruck => {
            vm.foodtruck = foodtruck;
            vm.foundReview = [];
            for (var i = 0; i < vm.foodtruck.length; i++) {
                for (var j = 0; j < vm.foodtruck[i].reviews.length; j++) {
                    if (vm.foodtruck[i].reviews[j].userId == vm.user[0]._id) {
                        vm.foundReview.push(vm.foodtruck[i].reviews[j]);
                    }
                }
            }
        });


        $(function() {
            $('.ui.rating')
                .rating()
            ;
        });

        $('#userMenu').on('click','div', () => {
            $(this).addClass('active').siblings().removeClass('active');
        });
    }
})();