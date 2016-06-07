<?php

$page = $_GET["p"];

switch ($page) {

  case 'about':
    $page = "about";
    break;
  
  default:
    $page = "home";
    break;
}

?>

<!doctype html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Start</title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <link href="assets/css/styles.min.css" rel="stylesheet">
  </head>

  <body>
    <?php include 'views/'.$page.'.view.php'; ?>
    <script src="assets/js/scripts.min.js"></script>
  </body>
</html>
