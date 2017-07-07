//Get Profile
function getProfile(userProfileID,uid){

  //Ruta al usuario solicitado por medio de userProfileID que recibimos por parametro
  var rootRef = firebase.database().ref().child("users/").orderByChild("user_id").equalTo(userProfileID)


  //Si el perfil del usuario es igual al usuario actual, entonces mostramos el botón de settings
  //de lo contrario mostramos el botón de follow
  if(userProfileID === uid){
    $("#settingsBtn").css("display", "block");
  }else{
    rootRef.once('value')
      .then(function(snapshot){

        var users = snapshot.val();
        for(user in users){

          //id asignado por firebase 
          var id = user;
          //Registros de followers del usuario
          var user_followers = users[user].user_followers;
          
          //Si el resultado de user_followers es indefinido, entonces no lo està siguiendo
          if(user_followers === undefined){
            //Mostramos el botón de follow
            $("#followBtn").css("display", "block");
          }
          //Si existe algún registro en user_followers, entonces el usuario ya lo está siguiendo
          else{
            //Mostramos el botón de following
            $("#followingBtn").css("display", "block");
          }
        
        }


      });

      
  }

  
  //Eejecutamos el query
  rootRef.once('value')
    .then(function(snapshot) {

      //Arroja el resultado del query
      var snapresult = snapshot.numChildren();

      //Si el resultado es igual a cero, el usuario no existe y muestra la pantalla de link no vàlido
      if(snapresult === 0){
        //Mostramos la pantalla del link no vàlido
        $("#link-novalid").css("display","flex");
      }
      //Si el resultado es diferente de 0 entonces, el usuario si existe y lo mostramos
      else{

        //Recorremos el objeto que arrojó snapshot para sacar sus valores
        snapshot.forEach(function(userSnapshot) {
          //Mostramos el contenedor del perfil
          $("#profileContainer").css("display","block");
          //Agregamos la clase header-profile al header para usar la transparencia
          $("header").addClass("header-profile");
          
          //Esperamos 2 segundos para mostrar el header
          setTimeout(
            function() 
            {
              $("header").show();

            }, 2000);

          //Asignamos las variables del objeto
          
          var user = userSnapshot.val();
          var user_id = user.user_id;
          var user_name_ =user.user_name;
          var user_uname =user.user_user_name;
          var user_pp = user.user_profile_picture;
          var user_cover_photo = user.user_cover_photo;

          //Foto de perfil del usuario
          $(".userProfilePhoto").attr("src", user_pp);
          //Foto de cover de perfil de usuario
          $(".userCoverPhoto").attr("style", "background:url("+user_cover_photo+");");
          //Nombre del usario
          $(".userProfileName").html(user_name_);
          //Nombre de usuario
          $(".userProfileUserName").html('@'+user_uname);

          $(".rootUser").html(user);
 

        })
      }
               
    }); 

}


//Escuchar si hay algùn cambio en el perfil del usuario
function listenProfile(userProfileID){

    //Ruta al usuario solicitado por medio de userProfileID que recibimos por parametro
    var rootRef = firebase.database().ref().child("users/").orderByChild("user_id").equalTo(userProfileID)

    //Eejecutamos el query
    rootRef.on("child_changed", snap =>{

    var user_name_ = snap.child("user_name").val();
    var user_uname = snap.child("user_user_name").val();
    var user_cover_photo = snap.child("user_cover_photo").val();
    var user_profile_photo = snap.child("user_profile_picture").val();

    //Nombre del usario
    $(".userProfileName").html(user_name_);
    //Nombre de usuario
    $(".userProfileUserName").html('@'+user_uname);
    //Foto de cover de perfil de usuario
    $(".userCoverPhoto").attr("style", "background:url("+user_cover_photo+");");
    //Foto de perfil del usuario
    $(".userProfilePhoto").attr("src", user_profile_photo);

    
    });
}


//Follow function
function follow(uid,userProfileID){

        //FOLLOWER
        
        //Ruta al usuario a to follow
        var rootRef = firebase.database().ref().child("users/").orderByChild("user_id")
        .equalTo(userProfileID)

          //Sacamos los valores del usuario
          rootRef.once('value')
            .then(function(snapshot) {

                var users = snapshot.val();
                for(user in users){

                  //id asignado por firebase 
                  var id = user;
                }

                //Ruta para agregar follower
                var user = firebase.database().ref().child("users/"+id).child("user_followers")
                
                //Agregamos follower
                user.push({
                  user_id:uid,
                });
               
        })

        //FOLLOWING

        //Ruta al usuario to following
        var rootRef = firebase.database().ref().child("users/").orderByChild("user_id")
        .equalTo(uid)

          //Sacamos los valores del usuario
          rootRef.once('value')
            .then(function(snapshot) {

                var users = snapshot.val();
                for(user in users){

                  //id asignado por firebase 
                  var id = user;
                }

                //Ruta para agregar follower
                var user = firebase.database().ref().child("users/"+id).child("user_following")
                
                //Agregamos follower
                user.push({
                  user_id:userProfileID,
                });
               
        })

        //Escondemos el botón de follow
        $("#followBtn").hide();
        //Mostramos el botón de following
        $("#followingBtn").show();


        
}


//Unfollow function
function unfollow(uid, userProfileID){

  //FOLLOWER

  //Ruta al perfil del usuario
  var refToDeleteFollower = db.ref().child('users/')
  .orderByChild("user_id")
  .equalTo(userProfileID)


  refToDeleteFollower.once('value')
    .then(function(snapshot){

      users = snapshot.val();
      
      //Recorremos los valores del objeto
      for(user in users){
        //Id Firebase
        id = user;

        //Ruta a los followers del usuario, buscamos un registro que concuerde con el uid del usuario activo
        var follower = db.ref().child('users/'+id).child('user_followers')
        .orderByChild('user_id')
        .equalTo(uid)


          follower.once('value')
            .then(function(snapshot){
              route = snapshot.val();
              //Recorremos los resultados del objeto
              for(route_follower in route){

                //Id Firebase
                id_follower = route_follower;

                //Ruta para borrar el registro del follower
                var followerRoute = db.ref().child('users/'+id)
                .child('/user_followers/'+id_follower)

                //Borramos el registro
                followerRoute.remove();
              }

            });
          
      }

    });


    //FOLLOWING

    //Ruta al perfil del usuario
    var refToDeleteFollowing = db.ref().child('users/')
    .orderByChild("user_id")
    .equalTo(uid)


    refToDeleteFollowing.once('value')
      .then(function(snapshot){

        users = snapshot.val();
        
        //Recorremos los valores del objeto
        for(user in users){
          //Id Firebase
          id = user;

          //Ruta a los followers del usuario, buscamos un registro que concuerde con el uid del usuario activo
          var following = db.ref().child('users/'+id).child('user_following')
          .orderByChild('user_id')
          .equalTo(userProfileID)


            following.once('value')
              .then(function(snapshot){
                route = snapshot.val();
                //Recorremos los resultados del objeto
                for(route_following in route){

                  //Id Firebase
                  id_following = route_following;

                  //Ruta para borrar el registro del follower
                  var followingRoute = db.ref().child('users/'+id)
                  .child('/user_following/'+id_following)

                  //Borramos el registro
                  followingRoute.remove();
                }

              });
            
        }

      });

    //Escondemos el boton de following
    $("#followingBtn").hide();
    //Mostramos el botón de follow
    $("#followBtn").show();
    


}
