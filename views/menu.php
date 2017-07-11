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

    <nav class="menu-nav">
        <ul class="menu-nav-list">
            <li class="menu-nav-list-item"> 
                <a href="index.php">
                    <i class="material-icons">home</i>
                </a> 
            </li class="menu-nav-list-item">
            <li class="menu-nav-list-item"> 
                <a href="#">
                    <i class="material-icons">public</i>
                </a> 
            </li class="menu-nav-list-item">
            <li class="menu-nav-list-item"> 
                <a>
                    <i class="material-icons">notifications</i>
                </a> 
            </li>
            <li class="menu-user menu-nav-list-item"> 
                <a href="#">
                    <img class="avatar userPP" src="" alt="">
                    <span class="userNameMenu"></span>
                </a> 

                <nav class="header-user-options animated fadeIn">
                    <ul class="header-user-options-list">
                        <li class="header-user-options-list-item">
                            <a href="profile.php" class="linkMyProfile" id="goProfile">
                                My Profile
                            </a>
                        </li>
                        <li class="header-user-options-list-item">
                            <a href="settings.php">
                                Settings
                            </a>
                        </li>
                        <li class="header-user-options-list-item">
                            <a href="#" onclick="logOut();">
                                Log Out
                            </a>
                        </li>
                    </ul>
                </nav>

            </li>
        </ul>
    </nav>
</header>
<!-- /header -->