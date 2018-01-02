import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';



//Session.set('myLat',-34.397);
//Session.set('myLon',150.644);
Session.set('myLat','?');
Session.set('myLon','?');
Session.set('signUp-visible', false);
Session.set('majOk', false);

import './main.html';

function getLocation() {
	  console.log('dÃ©but getLocation : myLat=' + Session.get('myLat') + ' myLon=' + Session.get('myLon'));
      navigator.geolocation.watchPosition(success, error, options);    
	  console.log('fin getLocation : myLat=' + Session.get('myLat') + ' myLon=' + Session.get('myLon'));
}

  
function success(position) {
  Session.set('myLat', position.coords.latitude);
  Session.set('myLon', position.coords.longitude);
  console.log('success : myLat=' + Session.get('myLat') + ' myLon=' + Session.get('myLon'));
    console.log('set my coords done...');
    console.log('success : call rendered');
}
    
function error(err) {
  console.warn('ERROR(' + err.code + '): ' + err.message);
};
    
options = {
  enableHighAccuracy: false,
  timeout: 360000,
  maximumAge: 0
};


Template.aFoodTruck.helpers({
  nom: function () {
	Session.set('menuImageUploaded', false);
	myFdTk=FoodTrucks.findOne({truckerId : Meteor.userId()});
     if (myFdTk) {
         if (myFdTk.menu) {
            if (myFdTk.menu!='') {
                    Session.set('menuImageUploaded', myFdTk.menu);
            }
         }
    };
    return myFdTk.nom;
  },

  
  myId: function () {
	if(myFdTk) {
		return myFdTk._id;
	} else {
		return 0;
	}
  },


  theme: function () {
	if(myFdTk) {
		return myFdTk.theme;
	} else {
		return '';
	}
  },

  description: function () {
	if(myFdTk) {
		return myFdTk.description;
	} else {
		return '';
	}
  },
  
locationLat: function () {
    if(Session.get('myLat') === '?'){
     console.log('locationlat helpers : avant getlocation');
 getLocation();
      console.log('locationlat helpers : après getlocation');
   }
	console.log('helpers locationLat : myLat=' + Session.get('myLat') + ' myLon=' + Session.get('myLon'));
    return Session.get('myLat');
  },
    
  locationLon: function () {
    if(Session.get('myLon') === '?'){
      console.log('locationlon helpers : avant getlocation');
     getLocation();
      console.log('locationlon helpers : après getlocation');
    }      
	console.log('helpers locationLon : myLat=' + Session.get('myLat') + ' myLon=' + Session.get('myLon'));
    return Session.get('myLon');
  },
  menu: function () {
		if(myFdTk) {
			return myFdTk.menu;
		} else {
			return '';
		}
  },
  truckExist: function () {
		return Session.get('signUp-visible');
 },
  messageOk: function () {
		return Session.get('majOk');
 }    


});



Template.uploadedFiles.helpers({
  uploadedFiles: function () {
    return Images.find();
  }
});


 Template.mapPostsList.rendered = function () {
   var mapOptions = {
    zoom: 12,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

// Je créé ma carte

  map = new google.maps.Map(document.getElementById("map-canvas"),
    mapOptions); 

  // Je détermine ma fonction de géolocalisation en HTML5

  if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      var pos = new google.maps.LatLng(position.coords.latitude,
                                       position.coords.longitude);

    console.log('rendered infowindow ');
      var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: 'Je suis ici !'
      });

    console.log('rendered: allFoodTrucks ');
//    allFoodTrucks = new Array();
//   allFoodTrucks = FoodTrucks.find();
//   FoodTrucks.find({}).forEach( function(foodTruck) {
//    console.log('rendered: allFoodTrucks.count()= '+allFoodTrucks.length);
//  var allFoodTrucks = Session.get('allFoodTrucks');
        
//    console.log('rendered: allFoodTrucks.count()= '+allFoodTrucks.count());
//    allFoodTrucks.forEach(function (foodTruck) {
/*   FoodTrucks.find({}).forEach( function(foodTruck) {
       console.log('rendered: boucle foodTruck.nom = :'+foodTruck.nom);
       var marker = new google.maps.Marker({
        position: new google.maps.LatLng(foodTruck.locationLat, foodTruck.locationLon),
        title: foodTruck.nom,
        postId: foodTruck._id
      });
    
    console.log('rendered: allFoodTrucks.forEach : foodTruck.nom = ' + foodTruck.nom + ' myLat=' +  foodTruck.locationLat + ' myLon=' + foodTruck.locationLon);
    marker.setMap(map);
    }); 
*/
        
var markers = {};
FoodTrucks.find().observe({
        added: function (foodTruck) {
    console.log('added: allFoodTrucks.observe : foodTruck.nom = ' + foodTruck.nom + ' myLat=' +  foodTruck.locationLat + ' myLon=' + foodTruck.locationLon);
        var marker = new google.maps.Marker({
        position: new google.maps.LatLng(foodTruck.locationLat, foodTruck.locationLon),
        title: foodTruck.nom,
        postId: foodTruck._id,
        map: map,
          });
          markers[document._id] = marker;
        },
        changed: function (foodTruck, oldDocument) {
    console.log('changed: allFoodTrucks.observe : foodTruck.nom = ' + foodTruck.nom + ' myLat=' +  foodTruck.locationLat + ' myLon=' + foodTruck.locationLon);
          markers[foodTruck._id].setPosition({ lat: foodTruck.locationLat, lng: foodTruck.locationLon });
        },
        removed: function (foodTruck) {
   console.log('removed: allFoodTrucks.observe : foodTruck.nom = ' + foodTruck.nom + ' myLat=' +  foodTruck.locationLat + ' myLon=' + foodTruck.locationLon);
           markers[foodTruck._id].setMap(null);
//          google.maps.event.clearInstanceListeners(markers[foodTruck._id]);
          delete markers[foodTruck._id];
        }
      });


// Je demande à ce que la carte soit centrée sur ma position

    console.log('setCenter ');
      map.setCenter(pos);
    }, 


// Je détermine comment doit agir la carte si la géolocalisation n'est pas possible

function() {
      handleNoGeolocation(true);
    });
  } else {

    handleNoGeolocation(false);
  }
 };



Template.uploadForm.onCreated(function () {
  this.currentUpload = new ReactiveVar(false);
});


Template.uploadForm.helpers({
  currentUpload: function () {
    return Template.instance().currentUpload.get();
  }
});

Template.uploadForm.events({
  'change #fileInput': function (e, template) {
    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case 
      // there was multiple files selected
      var file = e.currentTarget.files[0];
      if (file) {
        var uploadInstance = Images.insert({
          file: file,
          streams: 'dynamic',
          chunkSize: 'dynamic'
        }, false);

        uploadInstance.on('start', function() {
          template.currentUpload.set(this);
        });

        uploadInstance.on('end', function(error, fileObj) {
          if (error) {
            alert('Error during upload: ' + error.reason);
          } else {
            myFdTk=FoodTrucks.findOne({truckerId : Meteor.userId()});
			FoodTrucks.update({_id : myFdTk._id}, { $set: { menu: fileObj._id }});
//            alert('user=' + Meteor.userId() + ' myFdTk=' + myFdTk._id + ' File="' + fileObj.name + ' Image Id="' + fileObj._id + '" successfully uploaded and updated');
          }
          template.currentUpload.set(false);
        });

        uploadInstance.start();
      }
    }
  }
});

//  Template.truckerboard.helpers({
//    truckerboard: function () {
//            return  FoodTrucks.find({}, { sort: { nom: 1 } });
//    }
//  });

// var fdtkTab=[{ _id : "B4yZ2cFnteTQhxWH8", nom : "a", theme : "a", description : "aaa", menu : "ocMsKFxkdsTG6dyKx", truckerId : "nETu82E9zCX27ZGss" }];

  Template.truckerboard.helpers({
  truckerboard:   function () {
        console.log('helpers: truckerboard');
        fdtk = new Array();
        i=0;
//    var fdtkList = FoodTrucks.find({}, { sort: { nom: 1 } });
//    var fdtkList = FoodTrucks.find({});
//    var imgIds = fdtkList.map(function(p) { return p.menu});
//    alert('fdtkList=' + fdtkList.nom );
//    for(var i=0; i<fdtkList.length; i++) {
    FoodTrucks.find({}).forEach( function(oneFoodTruck) {
        console.log('helpers: boucle truckerboard :'+i);
                id= oneFoodTruck._id;
                nom= oneFoodTruck.nom;
                theme= oneFoodTruck.theme;
                description= oneFoodTruck.description;
                menuImage= Images.findOne({_id : oneFoodTruck.menu});
                lon= oneFoodTruck.locationLon;
                lat= oneFoodTruck.locationLat;
//                menuImage= Images.find();
                thisTruck = new Array();
                thisTruck['_id'] = id;
                thisTruck['nom'] = nom;
                thisTruck['theme'] = theme;
                thisTruck['description'] = description;
                thisTruck['menuImage'] = menuImage;
                thisTruck['locationLon'] = lon;
                thisTruck['locationLat'] = lat;
//                alert('thisTruck[nom]=' + thisTruck['nom'] );
//                alert('menuImage.path=' + menuImage.path );
                fdtk[i] = new Array();
//                fdtk[i]['nom'] = thisTruck['nom'] ;
                fdtk[i] = thisTruck ;
//                alert('fdtk[i][\'nom\']=' + fdtk[i]['nom'] + ' i=' + i );
                if (i > 0) {
                    j=i-1;
//                    alert('fdtk[i-1][\'nom\']=' + fdtk[j]['nom'] + ' i-1=' + j );
                }
                i=i+1;
        });
//        alert('fdtk[0]=' + fdtk[0] );
//           return fdtk;
//        return Images.find();
//        alert('fdtkList["nom"]=' + fdtkList[0].nom );
//        return [fdtkList, Images.find({_id: {$in: imgIds}})]
//        alert('fdtk[0][\'nom\']=' + fdtk[0]['nom'] );
//        alert('fdtk[1][\'nom\']=' + fdtk[1]['nom'] );
        return fdtk;
//        return [fdtkList];
    }
  });


  Template.myMenu.helpers({
menuUploaded: function () {
    menuImageUploaded= Session.get('menuImageUploaded');
    if (menuImageUploaded) {
        menuImage= Images.findOne({_id : menuImageUploaded});
        return menuImage;
    } else {
        return false
    }
 }
  });
