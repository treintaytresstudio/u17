//Traer todos los posts globales y escuchar cuando se agrega uno nuevo
function getGlobalPosts(){
    var rootRef = firebase.database().ref().child("posts/");
    rootRef.on("child_added", snap =>{

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
          <a href="post.php?id=${post_id}">
            <div class="post-img" style="background: url(${post_image});"></div>
          </a>
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
                    <p class="post-content-caption-p">
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
            <a href="post.php?id=${post_id}">
              <div class="post-img" style="background: url(${post_image});"></div>
            </a>
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

        //->Asginamos los valores al post

        //Referencia de la imagen
        var urlPhoto = metadata.downloadURLs;

        //Caption del post
        var post_caption = $("#post-form-input").val();

        // Datos del post
        var postData = {
          post_user_id:uid,
          post_user_name: name,
          post_user_profile_picture: photoUrl,
          post_image: urlPhoto,
          post_caption : post_caption,
          post_time: time,
          post_like_users:''
        };

        // Key asignada por firebase
        var newPostKey = firebase.database().ref().child('posts').push().key;

        // Guardamos el post, simultaneamente
        var updates = {};
        updates['/posts/' + newPostKey] = postData;
        updates['/user-posts/' + uid + '/' + newPostKey] = postData;
        updates['/user-feed/' + uid + '/' + newPostKey] = postData;

        //Mandamos llamar a la función para buscar o crear los hashtags del caption
        hashtagPost(post_caption,uid,newPostKey);

        //Ejecutamos la acciòn de guardar
        firebase.database().ref().update(updates);

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

//Hashtag captions
function hashtagPost(post_caption,uid,newPostKey){

  //recibimos el caption del post
  var caption = post_caption;

  //dividimos el post en un array
  var caption_split = caption.split(" ");

  //recorremos los items del arreglo
  for(var hashtag in caption_split) {
      
      //Si algun item del arreglo comienza con # entonces tenemos un hashtag, si no, lo ignoramos
      if (caption_split[hashtag].match("^#")) {

        //Le quitamos el # para poder trabajar con el string
        hashtag_clean = caption_split[hashtag].replace('#','');

        //Mandamos llamar la función hashtagExist para saber si existe, o no
        hashtagExist(hashtag_clean,uid,newPostKey);
        
      }
  }
 
}

function hashtagExist(hashtag_clean,uid,newPostKey){
  //Comprobamos si el hashtag ya existe en la base de datos
  var hashtag_exist = db.ref().child('hashtags/').orderByChild('hashtag_name')
  .equalTo(hashtag_clean)

  hashtag_exist.once('value')
  .then(function(snapshot){
    //Resultado de la consulta 
    result = snapshot.numChildren();
    
    //Si el resultado de la consulta es igual a 0, entonces el hashtag no existe y lo insertamos en la bd
    if(result === 0){

      // Key asignada por firebase
      var newHashtagKey = firebase.database().ref().child('hashtags').push().key;

      //Insertamos el hashtag
      var hashtag_ref = db.ref().child('hashtags/');
      hashtag_ref.push({
              hashtag_user_id:uid,
              hashtag_name:hashtag_clean,
              hashtag_posts: '',

          });

      var hashtag_exist = db.ref().child('hashtags/').orderByChild('hashtag_name')
      .equalTo(hashtag_clean)

      hashtag_exist.once('value')
      .then(function(snapshot){
        resultExist2 = snapshot.val();
        for(hashtagNoOk in resultExist2){

          id = hashtagNoOk;

          var hashtag_no_ok_insert = db.ref().child('hashtags/'+id).child('hashtag_posts')

          hashtag_no_ok_insert.push({
                hashtag_posts: newPostKey,
            });
        }

      });

    }
    //Si el resultado de la consulta es mayor a 0, el hashtag ya existe en la base de datos
    else{
      
      resultExist = snapshot.val();

      for(hashtagOk in resultExist){

        id = hashtagOk;

        var hashtag_ok_insert = db.ref().child('hashtags/'+id).child('hashtag_posts')

        hashtag_ok_insert.push({
              hashtag_posts: newPostKey,
          });
      }
    }

  });


}




