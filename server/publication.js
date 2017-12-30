Meteor.publish("allFoodTrucks", function(){
    return FoodTrucks.find({}, {
        fields: {nom: 1, theme: 1, description: 1, locationLon:1, locationLat:1, menu:1, truckerId:1}
    });
});
/*
  Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
  });
  */
