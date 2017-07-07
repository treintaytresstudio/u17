<?php 
    $postID = $_GET['id'];
?>

<!-- header include -->
<?php include 'views/header.php' ?>

<div class="container c-top">
	<div class="row">
		<div class="col-sm-12 col-md-12 col-lg-3 col-xl-3"></div>

		<div class="container getPost col-sm-12 col-md-12 col-lg-6 col-xl-6" id="<?php echo $postID; ?>">
			<div id="post-open"></div>
		</div>

		<div class="col-sm-12 col-md-12 col-lg-3 col-xl-3"></div>
	</div>
</div>

<!-- footer include -->
<?php include 'views/footer.php' ?> 