import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';

import './main.html';

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
        fdtk = new Array();
        i=0;
//    var fdtkList = FoodTrucks.find({}, { sort: { nom: 1 } });
//    var fdtkList = FoodTrucks.find({});
//    var imgIds = fdtkList.map(function(p) { return p.menu});
//    alert('fdtkList=' + fdtkList.nom );
//    for(var i=0; i<fdtkList.length; i++) {
    FoodTrucks.find({}).forEach( function(oneFoodTruck) {
                id= oneFoodTruck._id;
                nom= oneFoodTruck.nom;
                theme= oneFoodTruck.theme;
                description= oneFoodTruck.description;
                menuImage= Images.findOne({_id : oneFoodTruck.menu});
//                menuImage= Images.find();
                thisTruck = new Array();
                thisTruck['_id'] = id;
                thisTruck['nom'] = nom;
                thisTruck['theme'] = theme;
                thisTruck['description'] = description;
                thisTruck['menuImage'] = menuImage;
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