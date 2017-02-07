<?php

$recepient = "pavel.panaitov@gmail.com";
$sitename = "My portfolio";

$name = trim($_POST["name"]);
$phone = trim($_POST["email"]);
$text = trim($_POST["message"]);
$message = "Имя: $name \nПочта: $phone \nТекст: $text";

$pagetitle = "Новое письмо с сайта \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");