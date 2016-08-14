Meteor.startup(function () {
  UploadServer.init({
    tmpDir: '/myfdtk/uploads/tmp',
    uploadDir: '/myfdtk/uploads/',
	maxFileSize: 5000000,
	getFileName: function(file, formData) {
      return formData.nom+'_'+formData.prefix+'_'+file.name.split('.').shift()+'_'+formData.id+'.'+file.name.split('.').pop();
    },
    finished: function(file, formData) {
		console.log('==>file.name='+file.name);
		console.log('==>file.url='+file.url);
		console.log('==>prefix='+formData.prefix);
	  if (formData.prefix=='Menu') {
			console.log('pavé menu');
		console.log('prefix='+formData.prefix);
			FoodTrucks.update({_id : formData.id}, { $set: { menu: file }});
		}
	  if (formData.prefix=='Logo') {
			console.log('pavé logo');
		console.log('prefix='+formData.prefix);
			FoodTrucks.update({_id : formData.id}, { $set: { logo: file }});
		}
 	  if (formData.prefix=='Truck') {
			console.log('pavé truck');
		console.log('prefix='+formData.prefix);
			FoodTrucks.update({_id : formData.id}, { $set: { truck: file }});
		}
   }
  })
});