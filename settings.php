<!-- header include -->
<?php include 'views/header.php' ?> 


<div class="fluid-container bg-magic" id="userIsOnSettings">
        <div class="container">

                <div class="row">

                        <div class="col-sm-12 col-md-12 col-lg-3 col-xl-3"></div>

                        <!-- settings container -->
                        <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 p-bt">

                        <div class="settings">
                                
                                <div class="settings-pp">
                                <img class="avatar settings_profile_picture" src="" alt="">
                                <h3 class="settings_name"></h3>
                                </div>

                                <form>
                                <legend>User info</legend>                     
                                <div class="form-group">
                                <label>Name</label>
                                <input type="text" class="form-control settings_name_form"  placeholder="Enter Name" id="nameUser">
                                <small  class="form-text text-muted"></small>
                                </div>

                                <div class="form-group">
                                <label>Username</label>
                                <input type="text" class="form-control settings_user_name_form" id="usernameUser" placeholder="Enter User Name">
                                <small  class="form-text text-muted">You can use onlye letters and numbers, space is not allowed</small>
                                </div>

                                <div class="form-group">
                                <label>Age</label>
                                <input type="text" class="form-control settings_age_form" placeholder="Enter your Age" id="ageUser">
                                <small  class="form-text text-muted"></small>
                                </div>

                                <div class="form-group">
                                <label>Country</label>
                                <input type="text" class="form-control settings_country_form" id="countryUser" placeholder="Enter your Country">
                                <small  class="form-text text-muted"></small>
                                </div>


                                <div class="form-group">
                                <label>Bio</label>
                                <textarea class="form-control settings_bio_form" id="bioUser" rows="3"></textarea>
                                </div>

                                <legend>Social</legend>

                                <div class="form-group">
                                <label>Facebook</label>
                                <input type="text" class="form-control settings_facebook_form" id="facebookUser" placeholder="Facebook Profile">
                                <small  class="form-text text-muted">You can provide your facebook link</small>
                                </div>

                                <div class="form-group">
                                <label>Instagram</label>
                                <input type="text" class="form-control settings_instagram_form" id="instagramUser" placeholder="Instagram Profile">
                                <small  class="form-text text-muted">You can provide your instagram link</small>
                                </div>

                                <div class="form-group">
                                <label>Twitter</label>
                                <input type="text" class="form-control settings_twitter_form" id="twitterUser" placeholder="Twitter Profile">
                                <small  class="form-text text-muted">You can provide your twitter link</small>
                                </div>

                                <legend>Photos</legend>

                                <div class="form-group">
                                <label for="exampleInputFile" class="flex-uses"><i class="material-icons">photo_library</i>Cover Photo</label>
                                <input type="file" class="form-control-file" id="settings" aria-describedby="fileHelp">
                                <small id="fileHelp" class="form-text text-muted">Select your cover photo.</small>
                                </div>

                                <div class="form-group">
                                <label for="exampleInputFile" class="flex-uses"><i class="material-icons">insert_photo</i>Profile Photo</label>
                                <input type="file" class="form-control-file" id="settings" aria-describedby="fileHelp">
                                <small id="fileHelp" class="form-text text-muted">Select your profile photo.</small>
                                </div>


                                <button type="submit" id="updateUserBtn" class="btn btn-primary btn-action-colored">Submit</button>
                                </form>
                        </div>

                        </div>
                        <!-- /settings container -->

                        <div class="col-sm-12 col-md-12 col-lg-3 col-xl-3"></div>

                </div>

        </div>
</div>

<!-- footer include -->
<?php include 'views/footer.php' ?> 