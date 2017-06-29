$("document").ready(function(){

        //Verificamos si el usuario está conectado
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
	    //Obetenemos los datos del usuario actual
	    var user = firebase.auth().currentUser;
	    var name, email, photoUrl, uid;
                name = user.displayName;
                email = user.email;
                photoUrl = user.photoURL;
                uid = user.uid;


                //Nombre del usuario
                $(".userName").html(name);
                //Foto de perfil del usuario 
                $(".userPP").attr("src", photoUrl);
                //Email del usuario
                $(".userEmail").html(email);
                //ID del usuario
                $(".userID").html(uid);

                $(".headerUser").css("display" ,"flex");
                $(".headerNoUser").css("display", "none");
                
                $(".cta-post").css("display", "block");

                //Feed del usuario
                getGlobalPosts();
                listenGlobalPosts();

                //Abrimos formulario para crear post
                $("#cta-post-btn").click(function(){
                        $(".bg-actions").css("display","block");
                        $("#post-form-container").toggle();
                        $("#cta-post-btn").css("display","none");
                });

                //Mandamos llamar a la funciòn para crear post
                $("#createPostBtn").click(function(e){
                        input = $("#files-input")[0].files[0];
                        e.preventDefault();
                        //createPost(uid,photoUrl,name,input);
                        uploadPhoto(uid,input,name,photoUrl);
                   
                        
                });

                //Mandamos llamar a la funciòn para subir foto
                $("#upload-photo-btn").click(function(e){
                        e.preventDefault();
                        uploadPhoto(uid);
                });


                /*
                //Mandamos llamar a la funciòn para dar like
                $(".like-action").click(function() {            
                        //var post_id = $(this).closest( ".post").attr("id");
                        //like(uid,post_id);
                        alert(this);
                });
                */
                
                $(document).on('click', '.like-action', function() { 
                        var post_id = $(this).closest( ".post").attr("id");
                        like(uid,post_id);
                        
                });

                //Cerrar Formulario para crear post desde BG Aactions
                $(".bg-actions").click(function(e){
                        //Cerramos BG Actions
                        $(".bg-actions").css("display","none");
                        
                        //Cerramos y damos reset al formulario
                        $("#post-form-container").hide();
                        $("#post-form").trigger('reset');

                        //Volvemos a mostrar el botòn
                        $("#cta-post-btn").css("display","block");
                });


	  } else {
	        $(".headerNoUser").css("display", "flex");
                $(".headerUser").css("display" ,"none");
	  }

	});

	
});