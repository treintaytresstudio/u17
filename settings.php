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
        			<img class="userPP avatar" src="" alt="">
        			<h3 class="userName"></h3>
        		</div>

        		<form>

        		  <div class="form-group">
        		    <label for="settingsName">Name</label>
        		    <input type="text" class="form-control" id="settingsName"  placeholder="Enter Name">
        		    <small  class="form-text text-muted"></small>
        		  </div>

        		  <div class="form-group">
        		    <label for="settingsUserName">Username</label>
        		    <input type="text" class="form-control" id="settingsUserName"  placeholder="Enter User Name">
        		    <small  class="form-text text-muted">You can use onlye letters and numbers, space is not allowed</small>
        		  </div>

        		
        		  <div class="form-group">
        		    <label for="settingsBio">Bio</label>
        		    <textarea class="form-control" id="settingsBio" rows="3"></textarea>
        		  </div>

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