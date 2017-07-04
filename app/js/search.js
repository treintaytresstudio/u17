function getSearch(){

	//Ruta al usuario solicitado por medio de userProfileID que recibimos por parametro
	var rootRef = firebase.database().ref().child("users/")

	  rootRef.once('value')
	    .then(function(snapshot) {

	        var users = snapshot.val();
	        console.log(users);

	        for(user in users){    
	                //id asignado por firebase 
	                var id = user;


	                //Asignamos lo valores del objeto
	                var user_name = users[user].user_name;
	                var user_profile_picture = users[user].user_profile_picture;
	                var user_user_name = users[user].user_user_name;
	                var user_cover_photo = users[user].user_cover_photo;
	                var user_age = users[user].user_age;
	                var user_bio = users[user].user_bio;
	                var user_country = users[user].user_country;
	                var user_facebook = users[user].user_facebook;
	                var user_instagram = users[user].user_instagram;
	                var user_twitter = users[user].user_twitter;
	                var user_email = users[user].user_email;
	                var user_id = users[user].user_id;

                    var html = `
                        		
            					<li>
            						<a href="profile.php?id=${user_id}">${user_name}</a>
            					</li>

                           		`
                    $("#user-list-search").append(html);

	        }

	        
	       
	})
	

}