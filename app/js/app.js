
//Traer todos los posts globales y escuchar cuando se agrega uno nuevo
function getGlobalPosts(){
    var rootRef = firebase.database().ref().child("posts/");
    rootRef.on("child_added", snap =>{


    var post_id = snap.key;
    var post_caption = snap.child("post_caption").val();
    var post_user_name = snap.child("post_user_name").val();
    var post_user_profile_picture = snap.child("post_user_profile_picture").val();
    var post_image = snap.child("post_image").val();
 

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
                            <i class="material-icons">favorite</i>
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
                            <i class="material-icons">favorite</i>
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


//Crear Post sin foto
function createPost(uid,photoUrl,name,input) {
var urlPhoto;

//Mandamos llamar la funciòn para subir la foto
uploadPhoto(uid, input);

var post_caption = $("#post-form-input").val();
var time = $.now();
 //Creamos el post global
 db.ref('posts/').push({
          post_user_id:uid,
          post_user_name: name,
          post_user_profile_picture: photoUrl,
          post_image: urlPhoto,
          post_caption : post_caption,
          post_time: time,

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

      });

  //Mostramos loader global
  $(".loader-global").css("display","flex");

  setTimeout(
    function() 
    {
      //Reset al formulario
      $("#post-form").trigger('reset');
      $("#post-form-container").hide();

      //Volvemos a mostrar el botòn
      $("#cta-post-btn").css("display","block");

      //Cerramos BG Actions
      $(".bg-actions").css("display","none");

      //Ocultamos loader global
      $(".loader-global").css("display","none");
    }, 500);
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

        /* en caso de tener que guardar la referencia en la base de datos 

        asignar en el top de la funcion junto a otras referencias 
        var uploadsRef = firebase.database().ref('posts/uploads');
        
        //guardamos la referencia en la base de datos
        uploadsRef.child(key).set(fileRecord).then(resolve, reject);
        */


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

//Dar Like
function like(uid,post_id){
  
  var linkRemove = db.ref().child('posts/')
  console.log(linkRemove);
  
  //Referencia a el post solicitado , encargada de decirnos si el usuario ya ha dado like o no
  var refToPost = db.ref().child('posts/'+post_id).child('post_like_users').orderByChild('post_like_users')
  .equalTo(uid)
    refToPost.once("value")
      .then(function(snapshot) {

        //Resultado de la consulta (ha dado like o no)
        var user_result = snapshot.numChildren();
        var t = snapshot.val();
        var y = snapshot.key;
        var tt = snapshot.val().post_like_users;
        //var j = snapshot.snapshot.post_like_users.val();
        console.log(y);
        console.log(tt);

        //Si el resultado es mayor a 0 , significa que ya dio like
        if(user_result > 0){
            

          
        }
        //Si el resultado es 0 , entonces insertamos el like
        else{
          
            var refToPost2 = db.ref().child('posts/'+post_id)
            refToPost2.child("post_like_users").push({
              post_like_users:uid,
            });

        }

          
  });
  
}

//Get Profile
function getProfile(userProfileID){
  console.log(userProfileID);
  var rootRef = firebase.database().ref().child("users/").orderByChild("user_id").equalTo(userProfileID)

  rootRef.once('value')
    .then(function(snapshot) {

      snapshot.forEach(function(userSnapshot) {
        var user = userSnapshot.val();
        var user_id = user.user_id;
        var user_name_ =user.user_name;
        var user_pp = user.user_profile_picture;

        //Foto de perfil del usuario 
        $(".userProfilePhoto").attr("src", user_pp);
        
        console.log(user_id);
        if(userProfileID = user_id){
          //Mostramos perfil
          $("header").addClass("header-profile");
          setTimeout(
            function() 
            {

              $("header").show();

            }, 2000);
        }else{
          //Este no es mi perfil
        }



      })
               
    });
    

}









