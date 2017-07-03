//Get Profile
function getProfile(userProfileID){

  //Ruta al usuario solicitado por medio de userProfileID que recibimos por parametro
  var rootRef = firebase.database().ref().child("users/").orderByChild("user_id").equalTo(userProfileID)

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
          var user_uname =user.user_uname;
          var user_pp = user.user_profile_picture;
          var user_cover_photo = user.user_cover_photo;

          //Foto de perfil del usuario
          $(".userProfilePhoto").attr("src", user_pp);
          //Foto de cover de perfil de usuario
          $(".userCoverPhoto").attr("style", "background:url("+user_cover_photo+")");
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
    var user_uname = snap.child("user_uname").val();
    var user_cover_photo = snap.child("user_cover_photo").val();
    var user_profile_photo = snap.child("user_profile_picture").val();

    //Nombre del usario
    $(".userProfileName").html(user_name_);
    //Nombre de usuario
    $(".userProfileUserName").html('@'+user_uname);
    //Foto de cover de perfil de usuario
    $(".userCoverPhoto").attr("style", "background:url("+user_cover_photo+")");
    //Foto de perfil del usuario
    $(".userProfilePhoto").attr("src", user_profile_photo);

    
    });
}
