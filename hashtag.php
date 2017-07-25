    <?php 
        $hashtagID = $_GET['id'];
    ?>

    <!-- header include -->
    <?php include 'views/header.php' ?>  

    <!-- Hashtag main -->
    <div class="container c-top" id="userOnHashtag">
        <div class="row">
            <div class="col-sm-12 col-md-12 col-lg-3 col-xl-3">
            </div>
            
            <!-- hashtag container -->
            <div class="col-sm-12 col-md-12 col-lg-6 col-xl-6 hashtag-container getHashtagName" id="<?php echo $hashtagID; ?>">
                <div class="sub-title-space">
                    <div class="flex-uses">
                        <h2>#<?php echo $hashtagID; ?></h2>
                        <span class="totalPostInHashtag"></span>
                    </div> 
                    <button class="btn btn-primary btn-large" id="hashtagFollow">Follow</button>
                    <button class="btn btn-primary btn-large" id="hashtagFollowing">Following</button>
                </div>
            </div>
            <!-- /hashtag container -->
            
            <div class="col-sm-12 col-md-12 col-lg-3 col-xl-3"></div>
            </div>
        </div>
    </div>
    <!-- /Hashtag main -->
    
    <!-- footer include -->
    <?php include 'views/footer.php' ?> 