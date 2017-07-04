    <?php 
        $userProfile = $_GET['id'];
    ?>

    <!-- header include -->
    <?php include 'views/header.php' ?>  


    <!-- profile main -->
    <div class="fluid-container c-top-profile getProfile" id="<?php echo $userProfile; ?>">
        <div class="row" id="profileContainer"> 

            <!-- profile top -->   
            <div class="profile-top">

                    <!-- profile top info -->
                    <div class="profile-top-info userCoverPhoto">
                        <!-- profile top bg -->
                        <div class="profile-top-bg">

                        <div class="profile-top-info-wrap">

                            <!-- profile photo and name -->
                            <div class="flex-uses">
                                <div class="profile-top-info-pp">
                                    <img class="userProfilePhoto avatar" src="" alt="">
                                </div>
                                <div class="profile-top-info-name-bio">
                                    <h2 class="userProfileName"></h2>
                                    <h5 class="userProfileUserName"></h5>
                                    <p>
                                        This is a short bio description for user they can use links.
                                    </p>
                                    <h1 class="rootUser"></h1>
                                </div>
                            </div>
                            <!-- /profile number and name -->

                            <!-- profile cta -->
                            <div class="profile-top-cta">
                                <button type="button" class="btn btn-primary btn-lg" id="followBtn">Follow</button>

                                <button type="button" class="btn btn-primary btn-lg" id="settingsBtn">Settings</button>

                                <button type="button" class="btn btn-outline-secondary btn-lg" id="followingBtn">Following</button>
                            </div>
                            <!-- /profile cta -->

                            <!-- profile numbers -->
                            <div class="profile-top-numbers">
                                <ul>
                                    <li>
                                        <h6>753k</h6>
                                        <span>Followers</span>
                                    </li>
                                    <li>
                                        <h6>753k</h6>
                                        <span>Followings</span>
                                    </li>
                                    <li>
                                        <h6>753k</h6>
                                        <span>Posts</span>
                                    </li>
                                </ul>
                            </div>
                            <!-- /profile numbers -->       

                        </div>

                        </div>
                        <!-- /profile top bg -->

                    </div>
                    <!-- /profile top info -->

            </div>
            <!-- /profile top -->

        </div>
    </div>
    <!-- /profile main -->
    

    <!-- footer include -->
    <?php include 'views/footer.php' ?> 


