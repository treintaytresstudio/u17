function createComment(post_id,name,photoUrl,uid,comment_caption){

	var refToPost = db.ref().child('posts/'+post_id)
	refToPost.child("post_comments").push({
	  comment_user_name:name,
	  comment_user_photo: photoUrl,
	  comment_caption: comment_caption,
	  comment_user_uid: uid,
	});

	
	var post = db.ref().child('posts/'+post_id)
	post.once('value')
	.then(function(snapshot){
		posts = snapshot.val();
		post_user = posts.post_user_id;

		//Si el dueño del post, está comentando, entonces no hacemos nada
		if(uid === post_user){

		}
		//Si el que comenta no es el dueño del post, entonces insertamos la notificación
		else{

			//Sacamos el id del usuario
			var user = firebase.database().ref().child("users/")
			.orderByChild("user_id")
			.equalTo(post_user)

			user.once('value')
			.then(function(snapshot){
				var id_user = snapshot.val()

				for(data in id_user){
					id = data;
				}

				//Insertamos la notificación
				var notification = firebase.database().ref().child("users/"+id).child("notifications")
				var not_body = 'You have a new comment from';

				//Sacamos los datos del post
				var postInfo = db.ref().child('posts/'+post_id)
					postInfo.once('value')
						.then(function(snapshot){
							post = snapshot.val();
							post_photo = post.post_image;
							post_photo_s = post_photo[0];

							

							//Agregamos la notificación
							notification.push({
							  not_type:2,
							  not_user: name,
							  not_pp: photoUrl,
							  not_body: not_body,
							  not_seen:0,
							  not_post_photo:post_photo_s,
							  not_post_id:post_id,
							});

						});

			});	
		}

	});

}

function getComments(post_id){
	//Ruta al post
	var rootRef = firebase.database().ref().child("posts/"+post_id).child("post_comments")

	  rootRef.once('value')
	    .then(function(snapshot) {

	        var comments = snapshot.val();
	       
	        //Traemos todos los comentarios
	        for(comment in comments){    
	                //id asignado por firebase 
	                var id = comment;


	                //Asignamos lo valores del objeto
	                var comment_user_name= comments[comment].comment_user_name;
	                var comment_user_photo = comments[comment].comment_user_photo;
	                var comment_caption= comments[comment].comment_caption;
	                var comment_user_uid= comments[comment].comment_user_uid;

	                //Insertamos los comentarios
	                var comment_html = `
	                              <div class="post-content-comments-item" id="${id}">
	                                  <div class="flex-uses post-content-comments-item-user">
	                                    <img src="${comment_user_photo}" class="avatar" alt="" />
	                                    <a href="profile.php?id=${comment_user_uid}">${comment_user_name}</a>
	                                  </div>
	                                  <div class="post-content-comments-item-caption">
	                                    <p>
	                                        ${comment_caption}
	                                    </p>
	                                  </div>
	                                </div> 

	                            `
	                  $(".post-content-comments").append(comment_html);

	        }

	        
	       
	});
}

function getTotalComments(post_id){

	//Ruta al post
	var rootRef = firebase.database().ref().child("posts/"+post_id).child("post_comments")

	  rootRef.once('value')
	    .then(function(snapshot) {

	    	//Conseguimos el total de comentarios
    		var total_comments = snapshot.numChildren();
    		$("#post_comments_total").html(total_comments);

	 });



}