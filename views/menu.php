<!-- header -->
<!-- si el usuario, está logueado -->
<header class="menu">
    <div class="menu-left">
        <div class="menu-logo">
            <img src="public/img/logo.png" alt="logo ultra">
        </div>
        <div class="menu-search">
            <i class="material-icons">search</i>
            <input type="search" placeholder="Search">
        </div>
    </div>

    <nav>
        <ul>
            <li> 
                <a href="index.php">
                    <i class="material-icons">home</i>
                </a> 
            </li>
            <li> 
                <a href="#">
                    <i class="material-icons">public</i>
                </a> 
            </li>
            <li> 
                <a>
                    <i class="material-icons">notifications</i>
                </a> 
            </li>
            <li class="header-user"> 
                <a class="linkMyProfile" id="goProfile" href="profile.php">
                    <img class="avatar userPP" src="" alt="">
                    <span class="userNameMenu"></span>
                </a> 
                <!--<a href="#" onclick="logOut();" class="btn">Log out</a>-->
            </li>
        </ul>
    </nav>
</header>
<!-- /header -->