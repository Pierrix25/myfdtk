Meteor.startup(function () {
  UploadServer.init({
    tmpDir: 'c:/meteor/myfdtk/.uploads/tmp',
    uploadDir: 'c:/meteor/myfdtk/.uploads/',
	getFileName: function(file, formData) {
      return formData.nom+'_'+formData.prefix+'_'+formData.id+'.'+file.name.split('.').pop();
    },
    finished: function(file, formData) {
      console.log('Write to database: ' + file);
	  if (formData='Menu') {
			FoodTrucks.update({_id : formData.id}, { $push: { Menu: file }});
		}
	  if (formData='Logo') {
			FoodTrucks.update({_id : formData.id}, { $push: { Logo: file }});
		}
    }
  })
});