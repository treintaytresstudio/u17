<!-- formulario para crear un nuevo post -->
<div class="post-form" id="post-form-container">
    <h4>New post</h4>
    <form id="post-form">
            <div class="post-form-image">
                <input id="files-input" class="p-photo" type="file" label="Files"  accept="image/*,capture=camera">
            </div>
            <div class="post-form-caption">
                <input type="text" id="post-form-input" placeholder="Write your post!">              
            </div>
            <div class="post-form-submit">
                <button type="submit" id="createPostBtn">
                    Post
                </button>
            </div>  
    </form>
</div>
<!-- /formulario -->

<!-- cta post -->
<div class="cta-post" id="cta-post-btn">
    <a class="btn">
        <i class="material-icons">create</i>
    </a>
</div>
<!-- cta post -->

<!-- link no valid -->
<div id="link-novalid">
    <div>
        <h1>404</h1>
        <p>Oopss.  looks like you got lost</p>
        <a href="index.php" class="btn-action">HOME</a>
    </div>
    
</div>
<!-- /link no valid -->

</body>

	<script src="https://www.gstatic.com/firebasejs/4.1.3/firebase.js"></script>
	<script src="app/js/firebase-config.js"></script>
	<script src="app/js/auth.js"></script>
	<script src="app/js/ready.js"></script>
    <script src="app/js/app.js"></script>
    <script src="app/js/profile.js"></script>
    <script src="app/js/settings.js"></script>
    <script src="app/js/search.js"></script>

</html>