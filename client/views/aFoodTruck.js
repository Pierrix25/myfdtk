Template.aFoodTruck.events({
    'submit form': function(e){
        e.preventDefault();
//  console.log('aFoodTruck event !!!!!');
        
        var nom = $("input[name='nom']").val();
        var theme = $("input[name='theme']").val();
        var description = $("textarea[name='description']").val();
        var lon = Session.get('myLon');
        var lat = Session.get('myLat');
        
        var foodtruck = {
                nom: nom,
                theme: theme,
                description: description,
                lon: lon,
                lat: lat,
				truckerId: Meteor.userId()
        }
		if (myFdTk) {
			FoodTrucks.update({_id : myFdTk._id}, foodtruck, {upsert: true, multi: false,} );
		} else {
			FoodTrucks.insert(foodtruck);
		}
    }
});



