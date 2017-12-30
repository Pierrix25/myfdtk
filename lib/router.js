Router.route('/', {
    name: 'accueil',
    	data: function(){
		var foodTrucks = FoodTrucks.find();
		
		return {
			foodTrucks: foodTrucks
		};
	},
	waitOn: function(){
		return Meteor.subscribe("allFoodTrucks");

/*
        subscribeAllFoodTrucks=Meteor.subscribe("allFoodTrucks");
        subscribeAllImages=Meteor.subscribe('files.images.all');
		return (subscribeAllFoodTrucks & subscribeAllImages);
*/
	}
});

