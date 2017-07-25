//Get Profile
function getHashtagOpen(hashtagName,uid){

  //Buscamos el hashtag en la base de datos
  var rootRef = firebase.database().ref().child("hashtags/")
  .orderByChild("hashtag_name")
  .equalTo(hashtagName)

    rootRef.once('value')
      .then(function(snapshot) {

          var hashtag = snapshot.val();
         
          //Traemos el id del hashtag
          for(hashtag_item in hashtag){    
                  //id asignado por firebase 
                  var id = hashtag_item;
          }

          //Verificamos si el usuario ha dado follow al hashtag
          var hashtagRef = firebase.database().ref().child("hashtags/"+id)
          .child("hashtag_followers")
          .orderByChild("user")
          .equalTo(uid)

          //Hacemos la consulta
          hashtagRef.once('value')
            .then(function(snapshot){
              //Sacamos el numero de hijos que existen en el registro
              var datasnap = snapshot.numChildren();
              console.log(datasnap);

              //Si el resultado es igual a 0, significa que el usuario no ha seguido ese hashtag
              if(datasnap === 0){
                //Mostramos botón para seguir el hashtag
                $("#hashtagFollow").css("display","block");
              }else{
                //Mostramos botón para dejar de seguir el hashtag
                $("#hashtagFollowing").css("display","block");
              }

            });


          //Teniendo el id del hashtag , buscamos los post que pertenecen a este hashtag
          var rootRef2 = firebase.database().ref().child("hashtags/"+id)
          .child("hashtag_posts")

          rootRef2.once('value')
          .then(function(snapshot){

              var data = snapshot.val();

              var totalPost  = snapshot.numChildren();
              $(".totalPostInHashtag").html(totalPost+" Posts");
              
              //Sacamos el id del post
              for(hashtag_data in data){
                var id = hashtag_data;
                var post_id= data[hashtag_data].hashtag_posts;

                //Buscamos el post dentro de la base de datos
                var rootRef3 = firebase.database().ref().child("posts/"+post_id)
                rootRef3.once('value')
                .then(function(snapshot){
                  var hashtag_g = snapshot.val();

                  //Asignamos los valores al post
                  var caption = hashtag_g.post_caption;
                  var post_photo = hashtag_g.post_image;
                  var post_user_name = hashtag_g.post_user_name;
                  var post_user_photo = hashtag_g.post_user_profile_picture;

                  var post_name_short = post_user_name.split(' ')[0];
                  
                //Insertamos el post
                var hashtag_html = `
                              <div class="hashtag-item">
                                <div class="hashtag-item-image" style="background:url(${post_photo});">
                                  <div class="hashtag-item-user">
                                    <img src="${post_user_photo}" class="avatar hashtag-item-pp"  alt="" />
                                    <span>${post_name_short}</span>
                                  </div>
                                  
                                </div>
                              </div> 
                            `
                $(".hashtag-container").append(hashtag_html);



                });

              }

          });
               
         
  });

}

//Hashtag Follow
function hashtagFollow(uid, hashtagName){

  var rootRef = firebase.database().ref().child("hashtags/")
  .orderByChild("hashtag_name")
  .equalTo(hashtagName)

  rootRef.once('value')
    .then(function(snapshot){
      var hashtag = snapshot.val();
      
      for(hashtag_item in hashtag){
        var id = hashtag_item;
        
      }

      var rootRef2 = firebase.database().ref().child("hashtags/"+id)
      .child("hashtag_followers")
      rootRef2.push({
        user:uid,
      });



    });
  

}





