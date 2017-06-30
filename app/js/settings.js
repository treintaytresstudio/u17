function getSettings(uid){

	//Ruta al usuario solicitado por medio de userProfileID que recibimos por parametro
	var rootRef = firebase.database().ref().child("users/")

	rootRef.update({
		user_name: "Nuevo nombre",
	}),function(){
		alert("me inserte bien");
	}

	

	
}