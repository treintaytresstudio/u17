<!-- formulario para crear un nuevo post -->
<div class="post-form animated zoomInUp" id="post-form-container">
    <div class="flex-uses post-form-header">
        <img class="userPP avatar" src="" alt="">
        <h4>New post</h4>
    </div>
    <form id="post-form">
            <div class="post-form-image flex-uses">
                <i class="material-icons">party_mode</i>
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
