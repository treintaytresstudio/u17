$("document").ready(function(){


    //getProfile(ProfileID);
    var userProfileID = ("getProfile: ", $(".getProfile").attr('id'));
    //Si estamos en el perfil, lo mandamos llamar
    if(userProfileID){
            $("header").hide();
            getProfile(userProfileID);
            listenProfile(userProfileID);
            
    }
    

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
                $(".userPP").attr("alt", name);
                //Email del usuario
                $(".userEmail").html(email);
                //ID del usuario
                $(".userID").html(uid);

                //link al perfil de usuario
                $(".linkMyProfile").attr("href", "profile.php?id="+uid);

                $(".headerUser").css("display" ,"flex");
                $(".headerNoUser").css("display", "none");
                
                //Mostramos el botòn para crear publicación
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



                //Manejamos los likes del post
                $(document).on('click', '.like-action', function() { 
                    var post_id = $(this).closest( ".post").attr("id");
                      
                      //Referencia a el post solicitado , encargada de decirnos si el usuario ya ha dado like o no
                      var refToPost = db.ref().child('posts/'+post_id).child('post_like_users')
                        .orderByChild('like_user')
                        .equalTo(uid)
                        refToPost.once("value")
                          .then(function(snapshot) {

                            //Resultado de la consulta (ha dado like o no)
                            var user_result = snapshot.numChildren();
                            //var user = snapshot.val();
                            console.log(user_result);


                            //Si el resultado es igual a 0 , significa que no ha dado like, insertamos el like
                            if(user_result === 0){
                                
                                var refToPost2 = db.ref().child('posts/'+post_id)
                                refToPost2.child("post_like_users").push({
                                  like_user:uid,
                                });
                              
                            }
                            else{

                              //Si el resultado es diferente de 0 , entonces ya dio like
                              var refToPostDelete = db.ref().child('posts/'+post_id+'/post_like_users/')
                              .orderByChild("like_user")
                              .equalTo(uid)

                              refToPostDelete.once('value')
                                .then(function(snapshot){

                                  like = snapshot.val();
                                  
                                  for(like_user in like){
                                    id = like_user;
                                    
                                    var deleteLike = db.ref().child('posts/'+post_id+'/post_like_users/'+id)
                                      deleteLike.remove();
                                  }

                                });

                            

                            }

                              
                      });




                      
                    
                     
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


                //Saber si estamos en la secciòn settings
                var userSettings = ("userIsOnSettings: ", $("#userIsOnSettings").attr('id'));
                //Si estamos en settings
                if(userSettings){
                        //Agregamos la clase transparente al  header
                        $("header").addClass("header-profile");
                        //No mostramos el botòn de post
                        $("#cta-post-btn").css("display","none");

                        //Mandamos llamar la funciòn para obtener el perfil
                        getSettings(uid);
                        listenSettings(uid)
                }

                //Mandamos llamar a la funciòn para actualizar usuario
                $("#updateUserBtn").click(function(e){
                        e.preventDefault();

                        //imagen de cover valor
                        input_cover = $("#cover-input")[0].files[0];
                        //imagen de perfil valor
                        input_profile = $("#profile-input")[0].files[0];

                        updateUser(uid,input_cover,input_profile);

                        //Mostramos BG Actions
                        $(".bg-actions").css("display","block");

                        //Mostramos loader global
                        $(".loader-global").css("display","flex");  

                        setTimeout(
                          function() 
                          {

                            //Cerramos BG Actions
                            $(".bg-actions").css("display","none");

                            //Ocultamos loader global
                            $(".loader-global").css("display","none");
                          }, 1000);
                   
                        
                });


	  } else {
	        $(".headerNoUser").css("display", "flex");
                $(".headerUser").css("display" ,"none");
	  }

	});

	
});