function getSettings(uid){

	//Ruta al usuario solicitado por medio de userProfileID que recibimos por parametro
	var rootRef = firebase.database().ref().child("users/").orderByChild("user_id")
	.equalTo(uid)

	  rootRef.once('value')
	    .then(function(snapshot) {

	        var user_on_settings = snapshot.val();

	        for(user in user_on_settings){

	                
	                //id asignado por firebase 
	                var id = user;

	                //Asignamos lo valores del objeto
	                var user_name = user_on_settings[user].user_name;
	                var user_profile_picture = user_on_settings[user].user_profile_picture;
	                var user_user_name = user_on_settings[user].user_user_name;
	                var user_cover_photo = user_on_settings[user].user_cover_photo;
	                var user_age = user_on_settings[user].user_age;
	                var user_bio = user_on_settings[user].user_bio;
	                var user_country = user_on_settings[user].user_country;
	                var user_facebook = user_on_settings[user].user_facebook;
	                var user_instagram = user_on_settings[user].user_instagram;
	                var user_twitter = user_on_settings[user].user_twitter;
	                var user_email = user_on_settings[user].user_email;


	                //Asignamos los valores para utilizarlos en el DOM
	                $(".settings_name").html(user_name);
	                $(".settings_profile_picture").attr("src", user_profile_picture);
	                $(".settings_user_name").html(user_user_name);
	                $(".settings_cover_photo").html(user_cover_photo);
	                $(".settings_age").html(user_age);
	                $(".settings_bio").html(user_bio);
	                $(".settings_country").html(user_country);
	                $(".settings_facebook").html(user_facebook);
	                $(".settings_instagram").html(user_instagram);
	                $(".settings_twitter").html(user_twitter);
	                $(".settings_email").html(user_email);


	                //Asignamos valores para usar en formulario
	                $(".settings_name_form").val(user_name);
	                $(".settings_user_name_form").val(user_user_name);
	                $(".settings_age_form").val(user_age);
	                $(".settings_bio_form").val(user_bio);
	                $(".settings_country_form").val(user_country);
	                $(".settings_facebook_form").val(user_facebook);
	                $(".settings_instagram_form").val(user_instagram);
	                $(".settings_twitter_form").val(user_twitter);
	                $(".settings_email_form").val(user_email);

	        }
	       
	})
	
}

//Escuchar si hay algùn cambio en los datos del usuario
function listenSettings(uid){
    //Ruta al usuario solicitado por medio de userProfileID que recibimos por parametro
    var rootRef = firebase.database().ref().child("users/").orderByChild("user_id")
    .equalTo(uid)
    rootRef.on("child_changed", snap =>{

	    //Asignamos los valores a las variables
	    var settings_name = snap.child("user_name").val();
	    var settings_profile_picture = snap.child("user_profile_picture").val();
	    var settings_user_name= snap.child("user_user_name").val();
	    var settings_cover_photo= snap.child("user_cover_photo").val();
	    var settings_age= snap.child("user_age").val();
	    var settings_bio= snap.child("user_bio").val();
	    var settings_country= snap.child("user_country").val();
	    var settings_facebook= snap.child("user_facebook").val();
	    var settings_instagram= snap.child("user_instagram").val();
	    var settings_twitter= snap.child("user_twitter").val();
	    var settings_email= snap.child("user_email").val();


	    //Asignamos los valores para utilizarlos en el DOM
	    $(".settings_name").html(settings_name);
	    $(".settings_profile_picture").attr("src", settings_profile_picture);
	    $(".settings_user_name").html(settings_user_name);
	    $(".settings_cover_photo").html(settings_cover_photo);
	    $(".settings_age").html(settings_age);
	    $(".settings_bio").html(settings_bio);
	    $(".settings_country").html(settings_country);
	    $(".settings_facebook").html(settings_facebook);
	    $(".settings_instagram").html(settings_instagram);
	    $(".settings_twitter").html(settings_twitter);
	    $(".settings_email").html(settings_email);



	    //Asignamos valores para usar en formulario
	    $(".settings_name_form").val(settings_name);
	    $(".settings_user_name_form").val(settings_user_name);
	    $(".settings_age_form").val(settings_age);
	    $(".settings_bio_form").val(settings_bio);
	    $(".settings_country_form").val(settings_country);
	    $(".settings_facebook_form").val(settings_facebook);
	    $(".settings_instagram_form").val(settings_instagram);
	    $(".settings_twitter_form").val(settings_twitter);
	    $(".settings_email_form").val(settings_email);
    
    });
}



//Función para actualizar los datos del usuario
function updateUser(uid){

	//Referencia para utilizar el usuario en firebase auth
	var user = firebase.auth().currentUser;

	//Asignamos los valores que vienen en el formulario
	var name_user= $("#nameUser").val();
	var bio_user= $("#bioUser").val();
	var age_user= $("#ageUser").val();
	var country_user= $("#countryUser").val();
	var facebook_user= $("#facebookUser").val();
	var instagram_user= $("#instagramUser").val();
	var twitter_user= $("#twitterUser").val();
	var email_user= $("#emailUser").val();
	var username_user= $("#usernameUser").val();

	//Función para actualizar al usuario en firebase auth 
	user.updateProfile({
	  displayName: name_user,
	  //photoURL: "https://example.com/jane-q-user/profile.jpg"
	}).then(function() {


			//Ruta al usuario solicitado por medio de userProfileID que recibimos por parametro
			var rootRef = firebase.database().ref().child("users/").orderByChild("user_id")
			.equalTo(uid)

			  //Sacamos el id firebase del usuario
			  rootRef.once('value')
			    .then(function(snapshot) {

			        var user_on_settings = snapshot.val();

			        for(user in user_on_settings){		                
			                //id asignado por firebase 
			                var id = user;

			                //Ruta del usuario a actualizar
			                var userUpdate = firebase.database().ref().child("users/"+id)

			                //Función y datos para actualizar
			                userUpdate.update({ 
			                	user_name:name_user,
			                	user_user_name:username_user,
			                	user_age:age_user,
			                	user_bio:bio_user,
			                	user_country:country_user,
			                	user_facebook:facebook_user,
			                	user_instagram:instagram_user,
			                	user_twitter:twitter_user, 
			                });

			        }

			       
			})

	}, function(error) {
	  console.log(error);
	});
}






