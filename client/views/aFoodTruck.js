Template.aFoodTruck.events({
	'submit form': function(e){
        e.preventDefault();
        var nom = $("input[name='nom']").val();
        var theme = $("input[name='theme']").val();
        var description = $("textarea[name='description']").val();
	if (myFdTk) {
        var menu = myFdTk.menu;
} else {
        var menu = '';
}
        var foodtruck = {
                nom: nom,
                theme: theme,
                description: description,
			menu: menu,
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



