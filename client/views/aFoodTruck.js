Template.aFoodTruck.events({
	'submit form': function(e){
        e.preventDefault();
  console.log('aFoodTruck event !!!!!');
        
        var nom = $("input[name='nom']").val();
        var theme = $("input[name='theme']").val();
        var description = $("textarea[name='description']").val();
        var lon = Session.get('myLon');
        var lat = Session.get('myLat');
	if (myFdTk) {
        var truck = myFdTk.truck;
        var menu = myFdTk.menu;
        var logo = myFdTk.logo;
} else {
        var truck = '';
        var menu = '';
        var logo = '';
}
        var foodtruck = {
                nom: nom,
                theme: theme,
                description: description,
                lon: lon,
                lat: lat,
			truck: truck,
			menu: menu,
			logo: logo,
			truckerId: Meteor.userId()
        }
		if (myFdTk) {
			FoodTrucks.update({_id : myFdTk._id}, foodtruck, {upsert: true, multi: false,} );
			Session.set('signUp-visible', true);
			Session.set('majOk', true);
			console.log('update');
		} else {
			FoodTrucks.insert(foodtruck);
			Session.set('signUp-visible', true);
			Session.set('majOk', true);
			console.log('insert');
		}
    }
});



