function createComment(post_id,name,photoUrl,uid,comment_caption){
	//Referencia a el post solicitado , encargada de decirnos si el usuario ya ha dado like o no
	
	var refToPost = db.ref().child('posts/'+post_id)
	refToPost.child("post_comments").push({
	  comment_user_name:name,
	  comment_user_photo: photoUrl,
	  comment_caption: comment_caption,
	  comment_user_uid: uid,
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