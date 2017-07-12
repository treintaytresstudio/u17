<?php

$string = "I have #coded this #PHP script to show off #SarthakMathur";
$array = explode(" ", $string);


$i = 0;
while ($i != count($array)){
    if (substr($array[$i], 0, 1) == "#"){
       //$array[$i] = "<a href='#'>".$array[$i]."</a>";
       echo $array[$i];
    }
    $i++;

}






?>