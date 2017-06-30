    <?php 
        $userProfile = $_GET['id'];
    ?>

    <!-- header include -->
    <?php include 'views/header.php' ?>  

    <div class="user">
        
    </div>

    <!-- profile main -->
    <div class="fluid-container c-top-profile getProfile" id="<?php echo $userProfile; ?>">
        <div class="row" id="profileContainer"> 

            <!-- profile top -->   
            <div class="profile-top">

                    <!-- profile top info -->
                    <div class="profile-top-info" style="background:url(public/img/bg.jpg); ">
                        <!-- profile top bg -->
                        <div class="profile-top-bg">

                        <div class="profile-top-info-wrap">

                            <!-- profile photo and name -->
                            <div class="flex-uses">
                                <div class="profile-top-info-pp">
                                    <img class="userProfilePhoto avatar" src="" alt="">
                                </div>
                                <div class="profile-top-info-name-bio">
                                    <h2>Nombre del Usuario</h2>
                                    <p>
                                        This is a short bio description for user they can use links.
                                    </p>
                                </div>
                            </div>
                            <!-- /profile number and name -->

                            <!-- profile cta -->
                            <div class="profile-top-cta">
                                <a href="#" class="btn">
                                    Follow
                                </a>
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


