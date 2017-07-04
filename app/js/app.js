
//Traer todos los posts globales y escuchar cuando se agrega uno nuevo
function getGlobalPosts(){
    var rootRef = firebase.database().ref().child("posts/");
    rootRef.on("child_added", snap =>{

    //Obtenemos el usuario conectado
    var user = firebase.auth().currentUser;
    var uid;
    uid = user.uid;


    var post_id = snap.key;
    console.log(post_id);
    var post_caption = snap.child("post_caption").val();
    var post_user_name = snap.child("post_user_name").val();
    var post_user_profile_picture = snap.child("post_user_profile_picture").val();
    var post_image = snap.child("post_image").val();
    var likedBy = snap.child("post_like_users").val();


    //Recorremos el objeto para saber si el usuario activo, ha dado like
    for(user in likedBy){
      //Asignamos lo valores del objeto
      var user_name = likedBy[user].like_user;

      //Si el usuario ya dio like, entonces pintamos de rojo el corazón
      if(user_name === uid){
        $(document).ready(function(){
          $("#"+post_id).find(".like-icon").css("color","red");
        })
        
      }

    }
  
    //Conseguimos el total de likes
    var total_likes = snap.child("post_like_users").numChildren();



    var html = `
        <!-- post -->
        <div class="post" id="${post_id}">
            <div class="post-img" style="background: url(${post_image});"></div>
            <div class="post-content">
                <div class="post-content-top">
                    <div class="post-content-pp">
                        <img src="${post_user_profile_picture}" class="avatar" alt="">
                    </div>
                    <div class="post-content-name-time">
                        <span>${post_user_name}</span> <br>
                        <small class="time-post"></small>
                    </div>

                </div>

                <div class="post-content-caption">
                    <p>
                        ${post_caption}
                    </p>
                </div>

                <div class="post-content-actions">
                    <ul>
                        <li class="like-action flex-uses">
                            <i class="material-icons like-icon">favorite</i>
                            <span>${total_likes}Likes</span>
                        </li>
                        <li class="like-action flex-uses">
                            <i class="material-icons">comment</i>
                            <span>12 Comments</span>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
        <!-- /post -->  
           `
    $("#posts").append(html);
    
    });
}

//Escuchar si hay algùn cambio en los posts globales
function listenGlobalPosts(uid){
    var rootRef = firebase.database().ref().child("posts");
    rootRef.on("child_changed", snap =>{

    var post_id = snap.key;
    var post_caption = snap.child("post_caption").val();
    var post_user_name = snap.child("post_user_name").val();
    var post_user_profile_picture = snap.child("post_user_profile_picture").val();
    var post_image = snap.child("post_image").val();

    //Obtenemos el usuario conectado
    var user = firebase.auth().currentUser;
    var uid;
    uid = user.uid;


    var post_id = snap.key;
    var post_caption = snap.child("post_caption").val();
    var post_user_name = snap.child("post_user_name").val();
    var post_user_profile_picture = snap.child("post_user_profile_picture").val();
    var post_image = snap.child("post_image").val();
    var likedBy = snap.child("post_like_users").val();

    console.log(likedBy);

     //Recorremos el objeto para saber si el usuario activo, ha dado like
    for(user in likedBy){
      //Asignamos lo valores del objeto
      var user_name = likedBy[user].like_user;

      //Si el usuario ya dio like, entonces pintamos de rojo el corazón
      if(user_name === uid){
        $(document).ready(function(){
          $("#"+post_id).find(".like-icon").css("color","red");
        })
        
      }

    }
    
    
    //Conseguimos el total de likes
    var total_likes = snap.child("post_like_users").numChildren();



    var html = `
            <div class="post-img" style="background: url(${post_image});"></div>
            <div class="post-content">
                <div class="post-content-top">
                    <div class="post-content-pp">
                        <img src="${post_user_profile_picture}" class="avatar" alt="">
                    </div>
                    <div class="post-content-name-time">
                        <span>${post_user_name}</span> <br>
                        <small class="time-post"></small>
                    </div>

                </div>

                <div class="post-content-caption">
                    <p>
                        ${post_caption}
                    </p>
                </div>

                <div class="post-content-actions">
                    <ul>
                        <li class="like-action flex-uses">
                            <i class="material-icons like-icon">favorite</i>
                            <span>${total_likes}Likes</span>
                        </li>
                        <li class="like-action flex-uses">
                            <i class="material-icons">comment</i>
                            <span>12 Comments</span>
                        </li>
                    </ul>
                </div>

            </div> 
           `
    $("#"+post_id).html(html);
    
    });
}


//Traer el feed del usuario
function getUserPosts(uid){
    var rootRef = firebase.database().ref().child("user_feed/"+uid+"/posts");
    rootRef.on("child_added", snap =>{

    var post_id = snap.key;
    var post_caption = snap.child("post_caption").val();
    var post_user_name = snap.child("post_user_name").val();
    var post_user_profile_picture = snap.child("post_user_profile_picture").val();
    var post_image = snap.child("post_image").val();


    var html = `
        <!-- post -->
        <div class="post" id="${post_id}">
            <div class="post-img" style="background: url(${post_image});"></div>
            <div class="post-content">
                <div class="post-content-top">
                    <div class="post-content-pp">
                        <img src="${post_user_profile_picture}" class="avatar" alt="">
                    </div>
                    <div class="post-content-name-time">
                        <span>${post_user_name}</span> <br>
                        <small class="time-post"></small>
                    </div>

                </div>

                <div class="post-content-caption">
                    <p>
                        ${post_caption}
                    </p>
                </div>

                <div class="post-content-actions">
                    <ul>
                        <li class="like-action">
                            <i class="material-icons">favorite</i>
                        </li>
                        <li>
                            <i class="material-icons">comment</i>
                        </li>
                    </ul>
                </div>

            </div>
        </div>
        <!-- /post -->  
           `
    //Agregamos el evento click para el like, ya que los elementos no existen en el dom
    $("#posts").append(html);
    
    });
}


//Escuchar si hay un cambio en los posts del feed del usuario
function getUserPostsNew(uid){
    var rootRef = firebase.database().ref().child("user_feed/"+uid+"/posts");
    rootRef.on("child_changed", snap =>{

    var post_id = snap.key;
    var post_caption = snap.child("post_caption").val();
    var post_user_name = snap.child("post_user_name").val();
    var post_user_profile_picture = snap.child("post_user_profile_picture").val();
    var post_image = snap.child("post_image").val();



    var html = `
          <div class="post-img" style="background: url(${post_image});"></div>
          <div class="post-content">
              <div class="post-content-top">
                  <div class="post-content-pp">
                      <img src="${post_user_profile_picture}" class="avatar" alt="">
                  </div>
                  <div class="post-content-name-time">
                      <span>${post_user_name}</span> <br>
                      <small>5 minutes a go</small>
                  </div>

              </div>

              <div class="post-content-caption">
                  <p>
                      ${post_caption}
                  </p>
              </div>

              <div class="post-content-actions">
                  <ul>
                      <li class="like-action">
                          <i class="material-icons">favorite</i>
                      </li>
                      <li>
                          <i class="material-icons">comment</i>
                      </li>
                  </ul>
              </div>

          </div> 
           `
    $("#"+post_id).html(html);
    
    });
}

//Crear Post con foto
function uploadPhoto(uid,input,name,photoUrl){

  //Referencias para guardar las fotos
  var storageRef = firebase.storage().ref('images/posts/uploads');

  //Valor del input , dònde viene la imagen
  var file =  input;

  //Metadatos
  var uploadsMetadata = {
    cacheControl: "max-age=" + (60 * 60 * 24 * 365) // One year of seconds
  };

  //Asignamos la fecha en la que se subió al nombre
  var time = $.now();

    // Upload the file
    var uploadTask = storageRef.child(time+uid+file.name).put(file, uploadsMetadata);
    return new Promise(function(resolve, reject) {
      uploadTask.on('state_changed', function(snap) {

        //Mostramos loader global
        $(".loader-global").css("display","flex");

        console.log('Progress: ', snap.bytesTransferred, '/', snap.totalBytes, ' bytes');
      }, function(err) {
        console.log('upload error', err);
        reject(err);
      }, function() {
        var metadata = uploadTask.snapshot.metadata;
        var key = metadata.md5Hash.replace(/\//g, ':');
        var fileRecord = {
          downloadURL: uploadTask.snapshot.downloadURL,
          key: key,
          metadata: {
            fullPath: metadata.fullPath,
            md5Hash: metadata.md5Hash,
            name: metadata.name,
            downloadURLs : metadata.downloadURLs

          }

        };

        //Ocultamos loader global
        $(".loader-global").css("display","none");

        //Asginamos los valores al post

        //Referencia de la imagen
        var urlPhoto = metadata.downloadURLs;
        //Caption del post
        var post_caption = $("#post-form-input").val();

         //Creamos el post global
         db.ref('posts/').push({
                  post_user_id:uid,
                  post_user_name: name,
                  post_user_profile_picture: photoUrl,
                  post_image: urlPhoto,
                  post_caption : post_caption,
                  post_time: time,
                  post_like_users:''

              });

         //Insertamos el post en el Feed del usuario
         var user_feed = db.ref().child('user_feed/'+uid).child('posts');
          user_feed.push({
                  post_user_id:uid,
                  post_user_name: name,
                  post_user_profile_picture: photoUrl,
                  post_image: urlPhoto,
                  post_caption : post_caption,
                  post_time: time,
                  post_like_users:''

              });

          //Insertamos el post en los post del usuario
          var user_posts = db.ref().child('user_posts/'+uid).child('posts');
          user_posts.push({
                  post_user_id:uid,
                  post_user_name: name,
                  post_user_profile_picture: photoUrl,
                  post_image: urlPhoto,
                  post_caption : post_caption,
                  post_time: time,
                  post_like_users:''

              });


          //Reset al formulario
          $("#post-form").trigger('reset');
          $("#post-form-container").hide();

          //Volvemos a mostrar el botòn
          $("#cta-post-btn").css("display","block");

          //Cerramos BG Actions
          $(".bg-actions").css("display","none");


        });  
      });
 
}









