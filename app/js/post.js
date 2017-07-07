//Get Profile
function getPostOpen(postID,uid){

  var rootRef = firebase.database().ref().child("posts/")
  .orderByKey()
  .equalTo(postID)
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
  $("#post-open").append(html);
  
  });

}


//Escuchar si hay algùn cambio en los posts globales
function listenPostOpen(postID,uid){
    var rootRef = firebase.database().ref().child("posts/")
    .orderByKey()
    .equalTo(postID)
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
           `
    $("#"+post_id).html(html);
    
    });
}