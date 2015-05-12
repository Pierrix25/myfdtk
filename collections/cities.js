Schema = {};

Schema.Cities = new SimpleSchema({
    name: {
        type:String,
        max: 60
	},
    location: {
        type: String,
        autoform: {
            type: 'map',
			afFieldInput: {
				type: 'map',
					geolocation: true,
					searchBox: true,
					autolocate: true
				
			}
		}
	}
	});

Meteor.Cities.attachSchema(Schema.Cities);
