$("document").ready(function(){


    //Search
    $.ajaxSetup({ cache: false });
     $('#search').on('keyup',function(){
      $("#result").show();
      $('#result').html('');
      $('#state').val('');
      var searchField = $('#search').val();
      var expression = new RegExp(searchField, "i");
      $.getJSON('https://ultra-17.firebaseio.com/users.json', function(data) {
       $.each(data, function(key, value){
        var id = value.user_id;
        if (value.user_name.search(expression) != -1 || value.user_user_name.search(expression) != -1)
        {
         $('#result').append('<li class="list-group-item link-class"><a href="profile.php?id='+value.user_id+'"><img src="'+value.user_profile_picture+'" height="40" width="40" class="img-thumbnail" /> '+value.user_name+' | <span class="text-muted">'+value.user_user_name+'</span></a></li>');
        }
       });   
      });
     });
     
     $('#search').blur( function() {
       $("#result").hide();
     } );
    //End Search


    //menu de usuario
    $(".menu-user").click(function(){
        $(".header-user-options").toggle();
    })

    $(".menu-notifications-toggle").click(function(){
        $(".notification_list").toggle();
    });

    //Verificamos si el usuario está conectado
	firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
        //Cerramos login
        $(".login").css("display","none");
        
	    //Obetenemos los datos del usuario actual
	    var user = firebase.auth().currentUser;
	    var name, email, photoUrl, uid;
                name = user.displayName;
                email = user.email;
                photoUrl = user.photoURL;
                uid = user.uid;

                name_menu = user.displayName.split(' ')[0];

                //Nombre del usuario para el menu
                $(".userNameMenu").html(name_menu);

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

                //Notificaciones
                getNotifications(uid);
                //listenNotifications(uid);

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

                //Mandamos llamar a la función para crear comentario
                $(document).on('click', '#post_comment_send', function() { 
                    //ID del post
                    var post_id = $(this).closest( ".post").attr("id");
                    //Caption del comentario
                    var comment_caption = $("#post_comment_input").val();

                    //Llamamos la función
                    createComment(post_id,name, photoUrl, uid, comment_caption);
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
                           
                            //Si el resultado es igual a 0 , significa que no ha dado like, insertamos el like e insertamos la notificación
                            if(user_result === 0){
                                

                                var refToPost2 = db.ref().child('posts/'+post_id)
                                refToPost2.child("post_like_users").push({
                                  like_user:uid,
                                });

                                //Sacamos el id del usuario
                                var refToPost3 = db.ref().child('posts/'+post_id);
                                refToPost3.once('value')
                                    .then(function(snapshot){
                                        var data_snap = snapshot.val();
                                        var post_user_id = snapshot.child("post_user_id").val();
                                        var post_photo = snapshot.child("post_image").val();

                                        //Sacamos el id de firebase del usuario
                                        var getUser = db.ref().child('users')
                                            .orderByChild('user_id')
                                            .equalTo(post_user_id)

                                            getUser.once('value')
                                                .then(function(snapshot){
                                                    
                                                    var data_snap1 = snapshot.val();

                                                    for(user_data in data_snap1){
                                                        id_new = user_data;

                                                        //Insertamos la notificación
                                                        var notification = firebase.database().ref().child("users/"+id_new).child("notifications")
                                                        var not_body = 'You have a new like from';


                                                        //Agregamos la notificación
                                                        notification.push({
                                                          not_type:4,
                                                          not_user: name,
                                                          not_pp: photoUrl,
                                                          not_body: not_body,
                                                          not_seen:0,
                                                          not_post_photo:post_photo,
                                                          not_post_id:post_id,
                                                        });
                                                        
                                                    }
                                                });
                                        

                                        
                                        
                                    })
                              
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


                //getPost(PostID);
                var postID = ("getPost: ", $(".getPost").attr('id'));
                //Mandamos llamar los datos del post
                if(postID){
                    getPostOpen(postID,uid);
                    listenPostOpen(postID,uid);
                        
                }

                //getHashtagID(HashtagID);
                var hashtagName = ("getHashtagName: ", $(".getHashtagName").attr('id'));
                //Mandamos llamar los datos del post
                if(hashtagName){
                    getHashtagOpen(hashtagName,uid);
                        
                }

                //Hashtag Follow
                var hashtagName = ("getHashtagName: ", $(".getHashtagName").attr('id'));
                $("#hashtagFollow").click(function(){
                    hashtagFollow(uid,hashtagName);
                });

                //Hashtag Unfollow
                var hashtagName = ("getHashtagName: ", $(".getHashtagName").attr('id'));
                $("#hashtagFollowing").click(function(){
                    hashtagUnfollow(uid,hashtagName);
                });


                //getProfile(ProfileID);
                var userProfileID = ("getProfile: ", $(".getProfile").attr('id'));
                //Si estamos en el perfil, lo mandamos llamar
                if(userProfileID){
                        $("header").hide();
                        getProfile(userProfileID, uid);
                        listenProfile(userProfileID, uid);
                        
                }

                //Mandamos llamar la funcòn de follow
                $("#followBtn").click(function(){
                    follow(uid,userProfileID,name,photoUrl);
                });

                //Mandamos llamar la función unfollow
                $("#followingBtn").click(function(e){
                    e.preventDefault();
                    unfollow(uid,userProfileID);
                });


                //Saber si estamos en la secciòn settings
                var userSettings = ("userIsOnSettings: ", $("#userIsOnSettings").attr('id'));
                //Si estamos en settings
                if(userSettings){
                        //Agregamos la clase transparente al  header
                        //$("header").addClass("header-profile");
                        //No mostramos el botòn de post
                        $("#cta-post-btn").css("display","none");

                        //Mandamos llamar la funciòn para obtener el perfil
                        getSettings(uid);
                        listenSettings(uid)
                }


                //Saber si estamos en la secciòn search
                var userSearch = ("userIsOnSearch: ", $("#userIsOnSearch").attr('id'));
                //Si estamos en settings
                if(userSearch){
                        //No mostramos el botòn de post
                        $("#cta-post-btn").css("display","none");
                        //Mandamos llamar la funciòn para obtener el perfil
                        getSearch();
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
            $(".headerUser").hide();
	        $(".login").css("display","block");
	  }

	});

    



	
});