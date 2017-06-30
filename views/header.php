<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Ultra</title>
</head>
	
	<!-- material icons -->
	<link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      rel="stylesheet">
	
	<!--bootstrap-->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
	<script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
	<!--/bootstrap-->
    <link rel="stylesheet" href="public/css/main.css">
    
    <body>

    <!-- Loader -->
    <div class="loader-global">
        <svg class="spinner" width="45px" height="45px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
           <circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
        </svg>
    </div>

    <!-- BG Actions -->
    <div class="bg-actions"></div>

    <!-- headers -->
    <!-- si el usuario, está logueado -->
    <header class="headerUser">
        <div class="logo">
            <h1 class="logo-font">Ultra</h1>
        </div>
        <nav>
            <ul>
                <li> 
                    <a href="index.php">
                        <i class="material-icons">home</i>
                    </a> 
                </li>
                <li> 
                    <a>
                        <i class="material-icons">search</i>
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
                        <span class="userName"></span>
                    </a> 
                    <a href="#" onclick="logOut();" class="btn">Log out</a>
                </li>
            </ul>
        </nav>
    </header>
    
    <!-- si el usuario, no está logueado 
    <header class="headerNoUser">
        <div class="logo">
            <h1>Ultra</h1>
        </div>
        <nav>
            <ul>
                <li class="header-user"> 
                    <a href="#" onclick="loginWithFacebook();" class="btn">Log in with Facebook</a>
                </li>
            </ul>
        </nav>
    </header>
    <!-- /headers -->