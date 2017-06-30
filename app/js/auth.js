//Login con Facebook
function loginWithFacebook(){
    var provider = new firebase.auth.FacebookAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // ...
    }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
    });

    setTimeout(
      function() 
      {
        registerUser();
      }, 5000);

}

//Log Out
function logOut(){
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
    }, function (error) {
        // An error happened.
    });
}


//Registra el usuario en la base de datos
function registerUser() { 
    
    //Obetenemos los datos del usuario actual
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid;
    if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
        uid = user.uid;     
    }        

    //Verificamos si el usuario existe en la base de datos
    var ref = db.ref().child('users/').orderByChild("user_id").equalTo(uid);
    ref.once("value")
      .then(function(snapshot) {

        //Resultado de la consulta
        var user_result = snapshot.numChildren();

        console.log(user_result);

        if(user_result > 0){
            
        }else{
            
            //Si el usuario no existe, lo insertamos en la base de datos
            var time;
            time = firebase.database.ServerValue.TIMESTAMP;

            //Creamos el usuario
            db.ref('users/').push({
                    user_id:uid,
                    user_name: name,
                    user_profile_picture: photoUrl,
                    user_register_time: time,
                    user_uname:'',

                });
        }
    
        

      });


}






