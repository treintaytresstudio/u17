//Get Notifications
function getNotifications(uid){

  //Obtenemos el usuario conectado
  var rootRef = firebase.database().ref().child("users/")
  .orderByChild("user_id")
  .equalTo(uid)

  rootRef.once('value')
    .then(function(snapshot){

      //Obtenemos el id del usuario
      user = snapshot.val();
      for(user_id in user){
        id = user_id;
      }

      //Mostramos notificaciones
      var notifications = firebase.database().ref().child("users/"+id).child("notifications")     
      notifications.on("child_added", snap =>{

      //Sacamos el total de notificaciones
      notifications.once('value')
        .then(function(snapshot){

          
          var total_notifications = snapshot.numChildren();
          
          if(total_notifications > 0){
            $(".menu-notifications-alert").css("display","flex")
            $("#total_notifications").html(total_notifications);
          }

      });

      

      //Obtenemos los valores de la notificación
      var notification_id = snap.key;
      var notification_type = snap.child("not_type").val();
      var notification_body = snap.child("not_body").val();
      var notification_seen = snap.child("not_seen").val();
      var notification_name = snap.child("not_user").val();
      var notification_pp = snap.child("not_pp").val();
      var notification_post_photo = snap.child("not_post_photo").val();
      var notification_post_id = snap.child("not_post_id").val();
      var notification_user_id = snap.child("not_user_id").val();
      var notification_seen = snap.child("not_seen").val();

      console.log(notification_seen);
      //Saber si ha sido leida
      if(notification_seen === 1){
        $(".not-item").css("background","#fff");
      }

      //Comentarios
      if(notification_type === 2){

        var html = `
                  <li class="not-item" id="${notification_id}">
                    <div class="not-comment">
                      <div class="not-item-pp">
                        <img src="${notification_pp}" alt="" class="avatar" />
                      </div>
                      <div class="not-body">
                        <a href="post.php?id=${notification_post_id}">
                            ${notification_body} <span class="bold">${notification_name}</span>
                        </a>
                      </div>
                      <div class="not-image">
                        <img src="${notification_post_photo}" alt="" class="not-img" />
                      </div>
                    </div>
                    
                  </li>
            
               `
        $("#notification_list").append(html);
      }

      //Follower
      if(notification_type === 1){
        var html = `
                  <li class="not-item" id="${notification_id}">
                    <div class="not-follower">
                      <div class="not-item-pp">
                        <img src="${notification_pp}" alt="" class="avatar" />
                      </div>
                      <div class="not-body">
                        <a href="profile.php?id=${notification_user_id}">
                            ${notification_body} <span class="bold">${notification_name}</span>
                        </a>
                      </div>
                      <div class="not-image"></div>
                    </div>
                  </li>
            
               `
        $("#notification_list").append(html);
      }

      //Like
      if(notification_type === 4){
        var html = `
                  <li class="not-item" id="${notification_id}">
                    <div class="not-comment">
                      <div class="not-item-pp">
                        <img src="${notification_pp}" alt="" class="avatar" />
                      </div>
                      <div class="not-body">
                        <a href="post.php?id=${notification_post_id}">
                            ${notification_body} <span class="bold">${notification_name}</span>
                        </a>
                      </div>
                      <div class="not-image">
                        <img src="${notification_post_photo}" alt="" class="not-img" />
                      </div>
                    </div>
                    
                  </li>
            
               `
        $("#notification_list").append(html);
      }

      
      });


    });

}

//Listen Notifications
function listenNotifications(uid){

  //Obtenemos el usuario conectado
  var rootRef = firebase.database().ref().child("users/")
  .orderByChild("user_id")
  .equalTo(uid)

  rootRef.once('value')
    .then(function(snapshot){

      //Obtenemos el id del usuario
      user = snapshot.val();
      for(user_id in user){
        id = user_id;
      }

      //Mostramos notificaciones
      var notifications = firebase.database().ref().child("users/"+id).child("notifications") 
      notifications.on("child_changed", snap =>{

      //Sacamos el total de notificaciones
      var total_notifications = snap.numChildren();
      console.log(total_notifications);
      $("#total_notifications").html(total_notifications);


      //Obtenemos los valores de la notificación
      var notification_id = snap.key;
      var notification_type = snap.child("not_type").val();
      var notification_body = snap.child("not_body").val();
      var notification_seen = snap.child("not_seen").val();

      var html = `
                <li class="not-item" id="${notification_id}">
                  <p>
                    ${notification_body}
                  </p>
                </li>
          
             `
      $("#notification_list").append(html);
      
      });


    });

}



